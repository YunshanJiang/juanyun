#version 300 es
precision highp float;

uniform sampler2D uProjectionMap;
uniform sampler2D uSlipMask;
uniform sampler2D uRevealMask;
uniform sampler2D uPaperMask;
uniform float uProjectionOpacity;
uniform float uProjectionAspect;
uniform float uSurfaceAspect;
uniform float uInkBoundary;
uniform float uInkProgress;
uniform float uInkSpread;
uniform float uInkDistortion;
uniform float uInkFeather;
uniform float uViewportLeft;
uniform float uViewportRight;
uniform float uViewportInkProgress;
uniform float uWashTime;
uniform float uMotionQuality;

in vec2 vProjectionUv;
in vec2 vSlipUv;
in vec2 vSectionUv;
in float vGapOnly;
out vec4 outColor;

const float WASH_NOISE_SCALE = 2.2;
const float WASH_WARP_STRENGTH = 0.25;
const float WASH_WARP_FREQUENCY = 1.8;
const float WASH_EDGE_SOFTNESS = 0.18;
const float WASH_FLOW_SPEED = 0.12;
const float WASH_RADIAL_FACTOR = 0.20;
const vec3 WASH_PIGMENT = vec3(0.114, 0.153, 0.212);

vec3 washMod289(vec3 value) {
  return value - floor(value * (1.0 / 289.0)) * 289.0;
}

vec2 washMod289(vec2 value) {
  return value - floor(value * (1.0 / 289.0)) * 289.0;
}

vec3 washPermute(vec3 value) {
  return washMod289(((value * 34.0) + 1.0) * value);
}

float washSimplex(vec2 coordinate) {
  const vec4 C = vec4(
    0.211324865405187,
    0.366025403784439,
    -0.577350269189626,
    0.024390243902439
  );
  vec2 cell = floor(coordinate + dot(coordinate, C.yy));
  vec2 local = coordinate - cell + dot(cell, C.xx);
  vec2 corner = local.x > local.y ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 offsets = local.xyxy + C.xxzz;
  offsets.xy -= corner;
  cell = washMod289(cell);
  vec3 permutation = washPermute(
    washPermute(cell.y + vec3(0.0, corner.y, 1.0)) +
    cell.x + vec3(0.0, corner.x, 1.0)
  );
  vec3 falloff = max(
    0.5 - vec3(
      dot(local, local),
      dot(offsets.xy, offsets.xy),
      dot(offsets.zw, offsets.zw)
    ),
    0.0
  );
  falloff = falloff * falloff;
  falloff = falloff * falloff;
  vec3 gradientX = 2.0 * fract(permutation * C.www) - 1.0;
  vec3 gradientH = abs(gradientX) - 0.5;
  vec3 gradientOffset = floor(gradientX + 0.5);
  vec3 gradient = gradientX - gradientOffset;
  falloff *= 1.79284291400159 -
    0.85373472095314 * (gradient * gradient + gradientH * gradientH);
  vec3 contribution;
  contribution.x = gradient.x * local.x + gradientH.x * local.y;
  contribution.yz = gradient.yz * offsets.xz + gradientH.yz * offsets.yw;

  return 130.0 * dot(falloff, contribution);
}

float washFbm(vec2 coordinate) {
  float value = 0.0;
  float amplitude = 0.5;
  mat2 rotation = mat2(0.87758, 0.47942, -0.47942, 0.87758);

  for (int octave = 0; octave < 4; octave += 1) {
    value += amplitude * washSimplex(coordinate);
    coordinate = rotation * coordinate * 2.0 + vec2(100.0);
    amplitude *= 0.5;
  }

  return value;
}

float washFbmFast(vec2 coordinate) {
  float value = 0.0;
  float amplitude = 0.5;
  mat2 rotation = mat2(0.87758, 0.47942, -0.47942, 0.87758);

  for (int octave = 0; octave < 2; octave += 1) {
    value += amplitude * washSimplex(coordinate);
    coordinate = rotation * coordinate * 2.0 + vec2(100.0);
    amplitude *= 0.5;
  }

  return value;
}

float washFbmAdaptive(vec2 coordinate) {
  if (uMotionQuality > 0.5) {
    return washFbmFast(coordinate);
  }

  return washFbm(coordinate);
}

void main() {
  vec2 sectionUv = vSectionUv;
  vec2 fittedUv = sectionUv;

  if (uSurfaceAspect > uProjectionAspect) {
    float visibleHeight = uProjectionAspect / uSurfaceAspect;
    fittedUv.y = (fittedUv.y - 0.5) * visibleHeight + 0.5;
  } else {
    float visibleWidth = uSurfaceAspect / uProjectionAspect;
    fittedUv.x = (fittedUv.x - 0.5) * visibleWidth + 0.5;
  }

  vec4 projection = texture(uProjectionMap, fittedUv);
  float projectionLuma = dot(projection.rgb, vec3(0.2126, 0.7152, 0.0722));
  float projectionChroma = max(
    projection.r,
    max(projection.g, projection.b)
  ) - min(
    projection.r,
    min(projection.g, projection.b)
  );
  float lightForeground = smoothstep(0.07, 0.22, projectionLuma);
  float colorForeground = smoothstep(0.025, 0.10, projectionChroma);
  float foregroundMask = max(lightForeground, colorForeground);
  vec4 slipSample = texture(uSlipMask, vSlipUv);
  float slipMask = slipSample.a;
  float gapOnly = step(0.5, vGapOnly);
  float paperAlphaMask = 1.0;
  if (gapOnly > 0.5) {
    // Keep the seam seal and the visible paper edge separate. The seal is
    // allowed to dilate into the seam, while the visible edge uses the
    // original Alpha so its natural feather is not turned into a hard outline.
    vec2 paperUv = vec2(vSectionUv.x, 1.0 - vSectionUv.y);
    float paperAlpha = texture(uPaperMask, paperUv).a;
    float paperDilatedAlpha = max(
      paperAlpha,
      max(
        textureOffset(uPaperMask, paperUv, ivec2(2, 0)).a,
        textureOffset(uPaperMask, paperUv, ivec2(-2, 0)).a
      )
    );
    paperDilatedAlpha = max(
      paperDilatedAlpha,
      max(
        textureOffset(uPaperMask, paperUv, ivec2(0, 2)).a,
        textureOffset(uPaperMask, paperUv, ivec2(0, -2)).a
      )
    );
    // A wider transition makes the outer paper contour softer. fwidth keeps
    // the transition stable while the camera moves or the section scales.
    float paperAa = max(fwidth(paperAlpha) * 1.25, 0.006);
    float paperFeatherMask = smoothstep(
      0.015 - paperAa,
      0.28 + paperAa,
      paperAlpha
    );
    // This remains hard enough to hide the dark seam beneath the paper.
    float paperSealMask = smoothstep(0.01, 0.12, paperDilatedAlpha);
    // Only the opaque interior receives the seam seal; the outer contour
    // remains governed by the softer original-Alpha transition.
    float paperInteriorMask = smoothstep(0.14, 0.32, paperAlpha);
    paperAlphaMask = mix(
      paperFeatherMask,
      paperSealMask,
      paperInteriorMask
    );
  }
  float frontNoise = clamp(
    washFbmAdaptive(vec2(sectionUv.x * 7.0, sectionUv.y * 14.0) + vec2(3.7, 8.1)) * 0.5 + 0.5,
    0.0,
    1.0
  );
  float stainNoise = clamp(
    washFbmAdaptive(vec2(sectionUv.x * 15.0, sectionUv.y * 5.0) + vec2(21.4, 2.6)) * 0.5 + 0.5,
    0.0,
    1.0
  );
  float pigmentNoise = clamp(frontNoise * 0.62 + stainNoise * 0.38, 0.0, 1.0);
  float distanceBehindRoll = vProjectionUv.x - uInkBoundary;
  float distortedDistance =
    distanceBehindRoll + (frontNoise - 0.5) * uInkDistortion;
  float inkAge = clamp(
    (distortedDistance - 0.004) / uInkSpread,
    0.0,
    1.0
  );
  float settled = smoothstep(0.94, 1.0, uInkProgress);
  // The supplied paper Alpha is the only coverage gate for gap geometry.
  // Expanding the quad fixes the seam inset, but transparent source pixels
  // must remain transparent so the paper's original range is preserved.
  float gapCoverageMask = paperAlphaMask;
  float woodLuma = dot(slipSample.rgb, vec3(0.2126, 0.7152, 0.0722));
  float grooveAbsorption = 1.0 - smoothstep(0.22, 0.72, woodLuma);
  inkAge = clamp(
    max(inkAge, settled) + (grooveAbsorption - 0.45) * 0.04,
    0.0,
    1.0
  );
  float inkThreshold = 1.0 - inkAge;
  float inkMask = smoothstep(
    inkThreshold - uInkFeather,
    inkThreshold + uInkFeather,
    pigmentNoise
  );
  inkMask = mix(inkMask, 1.0, settled);
  float edgeFade =
    smoothstep(0.0, 0.018, vProjectionUv.x) *
    smoothstep(0.0, 0.018, sectionUv.y) *
    smoothstep(0.0, 0.018, 1.0 - vProjectionUv.x) *
    smoothstep(0.0, 0.018, 1.0 - sectionUv.y);
  float viewportFeather = 0.006;
  float viewportBoundsMask =
    smoothstep(
      uViewportLeft - viewportFeather,
      uViewportLeft + viewportFeather,
      vProjectionUv.x
    ) *
    (1.0 - smoothstep(
      uViewportRight - viewportFeather,
      uViewportRight + viewportFeather,
      vProjectionUv.x
    ));
  float viewportWidth = max(0.0001, uViewportRight - uViewportLeft);
  vec2 washUv = vec2(
    (vProjectionUv.x - uViewportLeft) / viewportWidth,
    sectionUv.y
  );
  vec2 washWarp = vec2(
    washFbmAdaptive(washUv * WASH_WARP_FREQUENCY + vec2(uWashTime * WASH_FLOW_SPEED, 0.0)),
    washFbmAdaptive(washUv * WASH_WARP_FREQUENCY + vec2(0.0, uWashTime * WASH_FLOW_SPEED))
  );
  vec2 warpedWashUv = washUv + washWarp * WASH_WARP_STRENGTH;
  float washNoise = washFbmAdaptive(warpedWashUv * WASH_NOISE_SCALE) * 0.5 + 0.5;
  float washDistance = length(washUv - vec2(0.72, 0.48)) * 1.414;
  float washComposite = mix(
    washNoise,
    mix(washNoise, washDistance, 0.65),
    WASH_RADIAL_FACTOR
  );
  float washThreshold =
    uViewportInkProgress * (1.0 + WASH_EDGE_SOFTNESS * 2.0) -
    WASH_EDGE_SOFTNESS;
  float viewportInkMask = 1.0 - smoothstep(
    washThreshold - WASH_EDGE_SOFTNESS,
    washThreshold + WASH_EDGE_SOFTNESS,
    washComposite
  );
  viewportInkMask = mix(
    viewportInkMask,
    1.0,
    smoothstep(0.97, 1.0, uViewportInkProgress)
  );
  float openingWashThreshold =
    uInkProgress * (1.0 + WASH_EDGE_SOFTNESS * 2.0) -
    WASH_EDGE_SOFTNESS;
  float openingWashMask = 1.0 - smoothstep(
    openingWashThreshold - WASH_EDGE_SOFTNESS,
    openingWashThreshold + WASH_EDGE_SOFTNESS,
    washComposite
  );
  openingWashMask = mix(
    openingWashMask,
    1.0,
    smoothstep(0.94, 1.0, uInkProgress)
  );
  float activeWashMask = min(viewportInkMask, openingWashMask);
  float persistentReveal = texture(uRevealMask, vec2(vProjectionUv.x, 0.5)).r;
  activeWashMask = max(persistentReveal, activeWashMask);
  float wetPigmentRim =
    smoothstep(0.0, 0.15, activeWashMask) *
    (1.0 - smoothstep(0.15, 0.45, activeWashMask));
  projection.rgb = mix(
    projection.rgb,
    WASH_PIGMENT * 0.2,
    wetPigmentRim * 0.12
  );

  float receiverMask = mix(slipMask, gapCoverageMask, gapOnly);
  float receiverForegroundMask = mix(foregroundMask, 1.0, gapOnly);
  float receiverEdgeFade = mix(edgeFade, 1.0, gapOnly);
  float receiverInkMask = mix(inkMask, 1.0, gapOnly);
  float receiverViewportBoundsMask = mix(viewportBoundsMask, 1.0, gapOnly);
  float receiverSourceAlpha = mix(
    projection.a,
    1.0,
    gapOnly * settled
  );
  projection.a *= uProjectionOpacity * receiverEdgeFade * receiverMask * receiverForegroundMask * receiverInkMask * receiverViewportBoundsMask * activeWashMask;
  projection.a = max(
    projection.a,
    receiverSourceAlpha * uProjectionOpacity * gapOnly * gapCoverageMask * settled * activeWashMask
  );
  outColor = projection;
}
