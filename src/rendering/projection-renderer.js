import { clampValue, prefersReducedMotion } from "../utils/math.js";

function createUnavailableRenderer(canvas, status = "unavailable") {
  if (canvas) {
    canvas.dataset.renderer = status;
  }

  return {
    available: false,
    beginCameraMotion() {},
    markViewportRevealed() {},
    render() {},
    revealViewport() {},
    scheduleCameraSettled() {},
    setOpacity() {},
    setMotionQuality() {},
    setSlipMask() {},
    setSource() {},
    sync() {},
    syncProjectionReveal() {},
    syncViewportBounds() {},
    uploadSectionProjectionTexture() {},
    releaseSectionTexture() {},
    markReady() {},
  };
}

export function createProjectionRenderer({
  canvas,
  slipRow,
  bookletViewport,
  sectionSources,
  getCurrentSectionIndex,
  requestSectionBackgroundsAround,
  fragmentSource,
  paperMaskSource,
  paperMaskPromise,
}) {
  if (!canvas || !slipRow || !bookletViewport || !fragmentSource) {
    return createUnavailableRenderer(canvas);
  }

  const gl = canvas.getContext("webgl2", {
    alpha: true,
    antialias: true,
    premultipliedAlpha: true,
  });

  if (!gl) {
    return createUnavailableRenderer(canvas);
  }

  const vertexSource = `#version 300 es
    in vec2 aPosition;
    in vec2 aProjectionUv;
    in vec2 aSlipUv;
    in vec2 aSectionUv;
    in float aGapOnly;

    uniform float uViewportLeft;
    uniform float uViewportRight;

    out vec2 vProjectionUv;
    out vec2 vSlipUv;
    out vec2 vSectionUv;
    out float vGapOnly;

    void main() {
      vProjectionUv = aProjectionUv;
      vSlipUv = aSlipUv;
      vSectionUv = aSectionUv;
      vGapOnly = aGapOnly;
      float viewportWidth = max(0.00001, uViewportRight - uViewportLeft);
      float clipX = ((aPosition.x - uViewportLeft) / viewportWidth) * 2.0 - 1.0;
      gl_Position = vec4(clipX, aPosition.y, 0.0, 1.0);
    }
  `;

  function compileShader(type, source) {
    const shader = gl.createShader(type);

    if (!shader) {
      throw new Error("无法创建投影着色器。");
    }

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const message = gl.getShaderInfoLog(shader) || "投影着色器编译失败。";
      gl.deleteShader(shader);
      throw new Error(message);
    }

    return shader;
  }

  function createProgram() {
    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentSource);
    const nextProgram = gl.createProgram();

    if (!nextProgram) {
      throw new Error("无法创建投影渲染程序。");
    }

    gl.attachShader(nextProgram, vertexShader);
    gl.attachShader(nextProgram, fragmentShader);
    gl.linkProgram(nextProgram);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    if (!gl.getProgramParameter(nextProgram, gl.LINK_STATUS)) {
      const message = gl.getProgramInfoLog(nextProgram) || "投影程序链接失败。";
      gl.deleteProgram(nextProgram);
      throw new Error(message);
    }

    return nextProgram;
  }

  let program;
  try {
    program = createProgram();
  } catch (error) {
    console.error(error);
    return createUnavailableRenderer(canvas, "error");
  }

  const vertexArray = gl.createVertexArray();
  const vertexBuffer = gl.createBuffer();
  const positionLocation = gl.getAttribLocation(program, "aPosition");
  const projectionUvLocation = gl.getAttribLocation(program, "aProjectionUv");
  const slipUvLocation = gl.getAttribLocation(program, "aSlipUv");
  const sectionUvLocation = gl.getAttribLocation(program, "aSectionUv");
  const projectionMapLocation = gl.getUniformLocation(program, "uProjectionMap");
  const slipMaskLocation = gl.getUniformLocation(program, "uSlipMask");
  const revealMaskLocation = gl.getUniformLocation(program, "uRevealMask");
  const paperMaskLocation = gl.getUniformLocation(program, "uPaperMask");
  const projectionOpacityLocation = gl.getUniformLocation(
    program,
    "uProjectionOpacity"
  );
  const projectionAspectLocation = gl.getUniformLocation(
    program,
    "uProjectionAspect"
  );
  const surfaceAspectLocation = gl.getUniformLocation(program, "uSurfaceAspect");
  const inkBoundaryLocation = gl.getUniformLocation(program, "uInkBoundary");
  const inkProgressLocation = gl.getUniformLocation(program, "uInkProgress");
  const inkSpreadLocation = gl.getUniformLocation(program, "uInkSpread");
  const inkDistortionLocation = gl.getUniformLocation(
    program,
    "uInkDistortion"
  );
  const inkFeatherLocation = gl.getUniformLocation(program, "uInkFeather");
  const viewportLeftLocation = gl.getUniformLocation(program, "uViewportLeft");
  const viewportRightLocation = gl.getUniformLocation(program, "uViewportRight");
  const viewportInkProgressLocation = gl.getUniformLocation(
    program,
    "uViewportInkProgress"
  );
  const washTimeLocation = gl.getUniformLocation(program, "uWashTime");
  const motionQualityLocation = gl.getUniformLocation(
    program,
    "uMotionQuality"
  );

  if (!vertexArray || !vertexBuffer) {
    return createUnavailableRenderer(canvas, "error");
  }

  gl.bindVertexArray(vertexArray);
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 36, 0);
  gl.enableVertexAttribArray(projectionUvLocation);
  gl.vertexAttribPointer(projectionUvLocation, 2, gl.FLOAT, false, 36, 8);
  gl.enableVertexAttribArray(slipUvLocation);
  gl.vertexAttribPointer(slipUvLocation, 2, gl.FLOAT, false, 36, 16);
  gl.enableVertexAttribArray(sectionUvLocation);
  gl.vertexAttribPointer(sectionUvLocation, 2, gl.FLOAT, false, 36, 24);
  const gapOnlyLocation = gl.getAttribLocation(program, "aGapOnly");
  gl.enableVertexAttribArray(gapOnlyLocation);
  gl.vertexAttribPointer(gapOnlyLocation, 1, gl.FLOAT, false, 36, 32);

  const sectionProjectionTextures = new Map();
  const slipMaskTexture = gl.createTexture();
  const revealMaskTexture = gl.createTexture();
  const paperMaskTexture = gl.createTexture();

  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, slipMaskTexture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([255, 255, 255, 255])
  );

  const revealMaskWidth = 2048;
  const revealMaskPixels = new Uint8Array(revealMaskWidth * 4);
  for (let index = 0; index < revealMaskWidth; index += 1) {
    revealMaskPixels[index * 4 + 3] = 255;
  }

  gl.activeTexture(gl.TEXTURE2);
  gl.bindTexture(gl.TEXTURE_2D, revealMaskTexture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    revealMaskWidth,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    revealMaskPixels
  );

  gl.activeTexture(gl.TEXTURE3);
  gl.bindTexture(gl.TEXTURE_2D, paperMaskTexture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 0, 0])
  );

  gl.useProgram(program);
  gl.uniform1i(projectionMapLocation, 0);
  gl.uniform1i(slipMaskLocation, 1);
  gl.uniform1i(revealMaskLocation, 2);
  gl.uniform1i(paperMaskLocation, 3);
  gl.uniform1f(projectionOpacityLocation, 0);
  gl.uniform1f(projectionAspectLocation, 16 / 9);
  gl.uniform1f(surfaceAspectLocation, 1);
  gl.uniform1f(inkBoundaryLocation, 1);
  gl.uniform1f(inkProgressLocation, 0);
  gl.uniform1f(inkSpreadLocation, 0.095);
  gl.uniform1f(inkDistortionLocation, 0.024);
  gl.uniform1f(inkFeatherLocation, 0.085);
  gl.uniform1f(viewportLeftLocation, 0);
  gl.uniform1f(viewportRightLocation, 1);
  gl.uniform1f(viewportInkProgressLocation, 1);
  gl.uniform1f(washTimeLocation, 0);
  gl.uniform1f(motionQualityLocation, 0);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  if (paperMaskTexture && (paperMaskPromise || paperMaskSource)) {
    const paperMaskReady = paperMaskPromise || new Promise((resolve, reject) => {
      const paperMaskImage = new Image();
      paperMaskImage.decoding = "async";
      paperMaskImage.addEventListener("load", () => resolve({ image: paperMaskImage, status: "ready" }), { once: true });
      paperMaskImage.addEventListener("error", reject, { once: true });
      paperMaskImage.src = paperMaskSource;
    });

    canvas.dataset.paperMask = "loading";
    paperMaskReady.then(({ image, status }) => {
      if (status !== "ready" || !image?.naturalWidth) {
        throw new Error("纸张 Alpha 遮罩加载失败。");
      }

      gl.activeTexture(gl.TEXTURE3);
      gl.bindTexture(gl.TEXTURE_2D, paperMaskTexture);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image
      );
      canvas.dataset.paperMask = "ready";
      renderProjection();
    }).catch(() => {
      canvas.dataset.paperMask = "error";
    });
  }

  let vertexCount = 0;
  let receivers = [];
  let sectionVertexRanges = new Map();
  let sectionGapVertexRanges = new Map();
  let sectionBounds = new Map();
  let projectionOpacity = 0;
  let projectionStage = 0;
  let projectionAspect = 16 / 9;
  let surfaceAspect = 1;
  let inkBoundary = 1;
  let inkProgress = 0;
  let viewportLeft = 0;
  let viewportRight = 1;
  let viewportInkProgress = 1;
  let washTime = 0;
  let viewportRevealAnimation = 0;
  let cameraSettleTimer = 0;
  let projectionCameraMoving = false;
  let projectionCameraState = "settled";
  let settledViewportLeft = 0;
  let settledViewportRight = 1;
  let hasSettledViewport = false;
  let revealMaskCommitCount = 0;
  let revealTargetLeft = 0;
  let revealTargetRight = 1;
  const maxProjectionPixelRatio = 1.25;
  const cameraRevealDuration = 650;
  const cameraSettleDelay = 40;
  let renderAnimationFrame = 0;
  let viewportSyncAnimationFrame = 0;
  let motionQuality = 0;
  let lastImmediateSyncKey = "";

  canvas.dataset.renderer = "webgl2";
  canvas.dataset.viewportInkProgress = "1.000";
  canvas.dataset.cameraMotion = "settled";
  canvas.dataset.revealMaskCommits = "0";
  canvas.dataset.shaderQuality = "full";

  function getProjectionViewportMetrics() {
    const rowWidth = Math.max(1, slipRow.clientWidth);
    const rowHeight = Math.max(1, slipRow.clientHeight);
    // Do not derive the projection bounds from getBoundingClientRect(). The
    // booklet is tilted in 3D, so its screen-space bounding box is a
    // perspective-distorted trapezoid. ScrollLeft and the layout offsets are
    // already in the same local coordinate system as the slips, which keeps
    // the WebGL canvas coplanar with them while the camera moves.
    const rowObject = slipRow.closest(".booklet-object");
    const rowSurface = slipRow.closest(".booklet-surface");
    const rowContentOffset =
      (rowObject?.offsetLeft || 0) +
      (rowSurface?.offsetLeft || 0) +
      (slipRow.offsetLeft || 0);
    const viewportWidth = Math.max(1, bookletViewport.clientWidth);
    const viewportStart = bookletViewport.scrollLeft - rowContentOffset;
    const viewportOverscanPx = viewportWidth * 0.12;
    const leftPx = clampValue(
      0,
      viewportStart - viewportOverscanPx,
      rowWidth
    );
    const rightPx = clampValue(
      0,
      viewportStart + viewportWidth + viewportOverscanPx,
      rowWidth
    );
    const left = leftPx / rowWidth;
    const right = Math.max(left, rightPx / rowWidth);

    return {
      left,
      right: Math.max(left, right),
      rowWidth,
      rowHeight,
      viewportOverscan: viewportOverscanPx / rowWidth,
      rowContentOffset,
      viewportStart,
    };
  }

  function syncProjectionCanvasGeometry({
    left,
    right,
    rowWidth,
    rowHeight,
  }) {
    const canvasWidth = Math.max(1, (right - left) * rowWidth);
    const pixelRatio = Math.min(
      window.devicePixelRatio || 1,
      maxProjectionPixelRatio
    );
    const drawingWidth = Math.max(1, Math.round(canvasWidth * pixelRatio));
    const drawingHeight = Math.max(1, Math.round(rowHeight * pixelRatio));

    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${rowHeight}px`;
    canvas.style.setProperty(
      "--projection-canvas-left",
      `${left * rowWidth}px`
    );

    if (canvas.width !== drawingWidth) {
      canvas.width = drawingWidth;
    }
    if (canvas.height !== drawingHeight) {
      canvas.height = drawingHeight;
    }

    canvas.dataset.canvasCssWidth = canvasWidth.toFixed(1);
    canvas.dataset.canvasCssHeight = rowHeight.toFixed(1);
    canvas.dataset.canvasPixelRatio = pixelRatio.toFixed(2);
  }

  function renderProjectionNow() {
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    if (!projectionOpacity || !vertexCount) {
      return;
    }

    gl.useProgram(program);
    gl.bindVertexArray(vertexArray);
    gl.uniform1f(projectionOpacityLocation, projectionOpacity);
    gl.uniform1f(projectionAspectLocation, projectionAspect);
    gl.uniform1f(surfaceAspectLocation, surfaceAspect);
    gl.uniform1f(inkBoundaryLocation, inkBoundary);
    gl.uniform1f(inkProgressLocation, inkProgress);
    gl.uniform1f(viewportLeftLocation, viewportLeft);
    gl.uniform1f(viewportRightLocation, viewportRight);
    gl.uniform1f(viewportInkProgressLocation, viewportInkProgress);
    gl.uniform1f(washTimeLocation, washTime);
    gl.uniform1f(motionQualityLocation, motionQuality);

    const rowWidth = Math.max(1, slipRow.clientWidth);
    const viewportStart = viewportLeft * rowWidth;
    const viewportEnd = viewportRight * rowWidth;

    const visibleProjectionSections = [];
    sectionProjectionTextures.forEach((texture, sectionIndex) => {
      const range = sectionVertexRanges.get(sectionIndex);
      const gapRanges = sectionGapVertexRanges.get(sectionIndex) || [];
      const bounds = sectionBounds.get(sectionIndex);

      if (
        (!range && !gapRanges.length) ||
        !bounds ||
        bounds.right < viewportStart ||
        bounds.left > viewportEnd
      ) {
        return;
      }

      visibleProjectionSections.push({ texture, range, gapRanges });
    });

    // Draw regular receivers first. Gap quads are intentionally rendered in a
    // second pass so their small overlap can cover antialiased receiver edges,
    // including a gap that straddles two section textures.
    visibleProjectionSections.forEach(({ texture, range }) => {
      if (!range) {
        return;
      }

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.drawArrays(gl.TRIANGLES, range.start, range.count);
    });

    visibleProjectionSections.forEach(({ texture, gapRanges }) => {
      if (!gapRanges.length) {
        return;
      }

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gapRanges.forEach(({ start, count }) => {
        gl.drawArrays(gl.TRIANGLES, start, count);
      });
    });
  }

  function renderProjection(immediate = false) {
    if (immediate) {
      if (renderAnimationFrame) {
        cancelAnimationFrame(renderAnimationFrame);
        renderAnimationFrame = 0;
      }
      renderProjectionNow();
      return;
    }

    if (renderAnimationFrame) {
      return;
    }

    renderAnimationFrame = requestAnimationFrame(() => {
      renderAnimationFrame = 0;
      renderProjectionNow();
    });
  }

  function uploadSectionProjectionTexture(sectionIndex, source) {
    if (!source?.naturalWidth && !source?.width) {
      return;
    }

    const previousTexture = sectionProjectionTextures.get(sectionIndex);
    if (previousTexture) {
      gl.deleteTexture(previousTexture);
    }

    const texture = gl.createTexture();
    if (!texture) {
      return;
    }

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      source
    );
    sectionProjectionTextures.set(sectionIndex, texture);
    canvas.dataset.textureSections = Array.from(
      sectionProjectionTextures.keys()
    ).join(",");
    renderProjection();
  }

  function releaseSectionTexture(sectionIndex) {
    const texture = sectionProjectionTextures.get(sectionIndex);
    if (!texture) {
      return;
    }

    gl.deleteTexture(texture);
    sectionProjectionTextures.delete(sectionIndex);
    canvas.dataset.textureSections = Array.from(
      sectionProjectionTextures.keys()
    ).join(",");
    renderProjection();
  }

  function syncProjectionViewportBounds({ immediate = false } = {}) {
    if (viewportSyncAnimationFrame) {
      cancelAnimationFrame(viewportSyncAnimationFrame);
      viewportSyncAnimationFrame = 0;
    }

    const metrics = getProjectionViewportMetrics();
    const syncKey = [
      bookletViewport.scrollLeft,
      metrics.left.toFixed(6),
      metrics.right.toFixed(6),
      metrics.rowWidth,
      metrics.rowHeight,
    ].join("|");

    if (immediate && syncKey === lastImmediateSyncKey) {
      return;
    }

    if (immediate) {
      lastImmediateSyncKey = syncKey;
    }

    viewportLeft = metrics.left;
    viewportRight = metrics.right;
    syncProjectionCanvasGeometry(metrics);

    if (!hasSettledViewport) {
      settledViewportLeft = viewportLeft;
      settledViewportRight = viewportRight;
      hasSettledViewport = true;
    }

    canvas.dataset.viewportLeft = viewportLeft.toFixed(5);
    canvas.dataset.viewportRight = viewportRight.toFixed(5);
    canvas.dataset.viewportOverscan = metrics.viewportOverscan.toFixed(5);
    canvas.dataset.viewportLayoutStart = metrics.viewportStart.toFixed(2);
    canvas.dataset.rowContentOffset = metrics.rowContentOffset.toFixed(2);
    requestSectionBackgroundsAround?.(getCurrentSectionIndex?.() || 0);

    // Scene scrolling already runs inside a frame callback. Draw immediately
    // in that path so the WebGL image uses the same viewport as the slips.
    renderProjection(immediate);
  }

  function scheduleViewportSync() {
    if (projectionCameraMoving) {
      syncProjectionViewportBounds({ immediate: true });
      return;
    }

    if (viewportSyncAnimationFrame) {
      return;
    }

    viewportSyncAnimationFrame = requestAnimationFrame(() => {
      viewportSyncAnimationFrame = 0;
      syncProjectionViewportBounds();
    });
  }

  function syncReceivers() {
    const width = Math.max(1, slipRow.clientWidth);
    const height = Math.max(1, slipRow.clientHeight);
    const viewportMetrics = getProjectionViewportMetrics();
    const slips = Array.from(slipRow.querySelectorAll(".slip-item"));
    const sections = Array.from(slipRow.querySelectorAll(".slip-section"));
    const projectionSeamInset = Math.max(
      2.2,
      Math.min(5, (width / Math.max(1, slips.length)) * 0.03)
    );
    const projectionSeamBleed = Math.max(
      1.25,
      Math.min(2.5, projectionSeamInset * 0.75)
    );
    const vertices = [];

    // Expand every gap over the neighboring receiver seam insets and add a
    // small overlap. The paper image is sampled as an alpha mask in this
    // geometry, so it cannot tint the slips; the overlap removes the dark edge
    // left by antialiased receiver boundaries and fractional layout metrics.
    const nextSectionGapVertexRanges = new Map();
    const addGapRange = (sectionIndex, start) => {
      const ranges = nextSectionGapVertexRanges.get(sectionIndex) || [];
      ranges.push({ start, count: 6 });
      nextSectionGapVertexRanges.set(sectionIndex, ranges);
    };

    const appendGapQuad = ({
      sectionIndex,
      sectionLeft,
      sectionTop,
      sectionWidth,
      sectionHeight,
      gapLeft,
      gapRight,
    }) => {
      if (gapRight <= gapLeft) {
        return;
      }

      const left = sectionLeft + gapLeft;
      const right = sectionLeft + gapRight;
      const top = sectionTop;
      const bottom = sectionTop + sectionHeight;
      const projectionLeft = left / width;
      const projectionRight = right / width;
      const projectionTop = top / height;
      const projectionBottom = bottom / height;
      const clipTop = 1 - projectionTop * 2;
      const clipBottom = 1 - projectionBottom * 2;
      const sectionUvLeft = gapLeft / sectionWidth;
      const sectionUvRight = gapRight / sectionWidth;
      const vertexStart = vertices.length / 9;

      vertices.push(
        projectionLeft, clipTop, projectionLeft, projectionTop, 0, 0, sectionUvLeft, 0, 1,
        projectionLeft, clipBottom, projectionLeft, projectionBottom, 0, 1, sectionUvLeft, 1, 1,
        projectionRight, clipBottom, projectionRight, projectionBottom, 1, 1, sectionUvRight, 1, 1,
        projectionLeft, clipTop, projectionLeft, projectionTop, 0, 0, sectionUvLeft, 0, 1,
        projectionRight, clipBottom, projectionRight, projectionBottom, 1, 1, sectionUvRight, 1, 1,
        projectionRight, clipTop, projectionRight, projectionTop, 1, 0, sectionUvRight, 0, 1
      );
      addGapRange(sectionIndex, vertexStart);
    };

    const sectionEntries = sections
      .map((section) => ({
        index: Number(section.dataset.section) || 0,
        left: section.offsetLeft || 0,
        top: section.offsetTop || 0,
        width: Math.max(1, section.offsetWidth || width),
        height: Math.max(1, section.offsetHeight || height),
        slips: Array.from(
          section.querySelectorAll(":scope > .slip-item")
        ).sort((first, second) => first.offsetLeft - second.offsetLeft),
      }))
      .sort((first, second) => first.left - second.left);

    sectionEntries.forEach((entry) => {
      for (let index = 0; index < entry.slips.length - 1; index += 1) {
        const firstSlip = entry.slips[index];
        const secondSlip = entry.slips[index + 1];
        const rawGapLeft = firstSlip.offsetLeft + firstSlip.offsetWidth;
        const rawGapRight = secondSlip.offsetLeft;

        if (rawGapRight <= rawGapLeft) {
          continue;
        }

        appendGapQuad({
          sectionIndex: entry.index,
          sectionLeft: entry.left,
          sectionTop: entry.top,
          sectionWidth: entry.width,
          sectionHeight: entry.height,
          gapLeft: Math.max(
            0,
            rawGapLeft - projectionSeamInset - projectionSeamBleed
          ),
          gapRight: Math.min(
            entry.width,
            rawGapRight + projectionSeamInset + projectionSeamBleed
          ),
        });
      }
    });

    // The padding at the edge of two sections is also a real seam. Add a
    // cross-section quad so the last and first slip of adjacent sections do
    // not leave an unpainted strip at that boundary.
    for (let index = 0; index < sectionEntries.length - 1; index += 1) {
      const firstSection = sectionEntries[index];
      const secondSection = sectionEntries[index + 1];
      const firstSlip = firstSection.slips[firstSection.slips.length - 1];
      const secondSlip = secondSection.slips[0];

      if (!firstSlip || !secondSlip) {
        continue;
      }

      const rawGapLeft =
        firstSection.left + firstSlip.offsetLeft + firstSlip.offsetWidth;
      const rawGapRight = secondSection.left + secondSlip.offsetLeft;

      if (rawGapRight <= rawGapLeft) {
        continue;
      }

      appendGapQuad({
        sectionIndex: firstSection.index,
        sectionLeft: firstSection.left,
        sectionTop: firstSection.top,
        sectionWidth: firstSection.width,
        sectionHeight: firstSection.height,
          gapLeft: Math.max(
            0,
            rawGapLeft - firstSection.left - projectionSeamInset - projectionSeamBleed
          ),
          gapRight:
            rawGapRight - firstSection.left + projectionSeamInset + projectionSeamBleed,
        });
    }

    syncProjectionCanvasGeometry(viewportMetrics);
    surfaceAspect = Math.max(1, sections[0]?.clientWidth || width) / height;

    receivers = slips.map((slip, index) => {
      const section = slip.parentElement;
      const sectionLeft = section?.offsetLeft || 0;
      const sectionTop = section?.offsetTop || 0;
      const rawLeft = sectionLeft + slip.offsetLeft;
      const rawRight = sectionLeft + slip.offsetLeft + slip.offsetWidth;
      const leftInset = rawLeft <= 1 ? 0 : projectionSeamInset;
      const rightInset = rawRight >= width - 1 ? 0 : projectionSeamInset;
      const left = rawLeft + leftInset;
      const top = sectionTop + slip.offsetTop;
      const right = rawRight - rightInset;
      const bottom = top + slip.offsetHeight;
      const clipTop = 1 - (top / height) * 2;
      const clipBottom = 1 - (bottom / height) * 2;
      const uvLeft = left / width;
      const uvRight = right / width;
      const uvTop = top / height;
      const uvBottom = bottom / height;
      const sectionIndex = Number(slip.dataset.section) || 0;
      const sectionWidth = Math.max(1, section?.offsetWidth || width);
      const sectionHeight = Math.max(1, section?.offsetHeight || height);
      const rawSlipWidth = Math.max(1, rawRight - rawLeft);
      const slipUvLeft = Math.min(0.49, leftInset / rawSlipWidth);
      const slipUvRight = 1 - Math.min(0.49, rightInset / rawSlipWidth);
      // The receiver geometry is inset, so its projection UV must be inset by
      // the same amount. Keeping the raw slip UV here creates a visible image
      // jump exactly where the gap quad meets the receiver.
      const sectionUvLeft = clampValue(
        0,
        (left - sectionLeft) / sectionWidth,
        1
      );
      const sectionUvRight = clampValue(
        0,
        (right - sectionLeft) / sectionWidth,
        1
      );
      const sectionUvTop = slip.offsetTop / sectionHeight;
      const sectionUvBottom =
        (slip.offsetTop + slip.offsetHeight) / sectionHeight;

      const vertexStart = vertices.length / 9;
      vertices.push(
        uvLeft, clipTop, uvLeft, uvTop, slipUvLeft, 0, sectionUvLeft, sectionUvTop, 0,
        uvLeft, clipBottom, uvLeft, uvBottom, slipUvLeft, 1, sectionUvLeft, sectionUvBottom, 0,
        uvRight, clipBottom, uvRight, uvBottom, slipUvRight, 1, sectionUvRight, sectionUvBottom, 0,
        uvLeft, clipTop, uvLeft, uvTop, slipUvLeft, 0, sectionUvLeft, sectionUvTop, 0,
        uvRight, clipBottom, uvRight, uvBottom, slipUvRight, 1, sectionUvRight, sectionUvBottom, 0,
        uvRight, clipTop, uvRight, uvTop, slipUvRight, 0, sectionUvRight, sectionUvTop, 0
      );

      return {
        index,
        section: sectionIndex,
        left,
        top,
        width: Math.max(0, right - left),
        height: Math.max(0, bottom - top),
        vertexStart,
      };
    });

    vertexCount = vertices.length / 9;
    sectionVertexRanges = new Map();
    sectionGapVertexRanges = nextSectionGapVertexRanges;
    sectionBounds = new Map();

    sections.forEach((section) => {
      const sectionIndex = Number(section.dataset.section) || 0;
      const sectionLeft = section.offsetLeft || 0;
      const sectionRight = sectionLeft + (section.offsetWidth || width);
      const existingBounds = sectionBounds.get(sectionIndex) || {
        left: sectionLeft,
        right: sectionRight,
      };
      existingBounds.left = Math.min(existingBounds.left, sectionLeft);
      existingBounds.right = Math.max(existingBounds.right, sectionRight);
      sectionBounds.set(sectionIndex, existingBounds);
    });

    receivers.forEach((receiver, receiverIndex) => {
      const range = sectionVertexRanges.get(receiver.section) || {
        start: receiver.vertexStart,
        count: 0,
      };
      range.count += 6;
      sectionVertexRanges.set(receiver.section, range);

      const bounds = sectionBounds.get(receiver.section) || {
        left: receiver.left,
        right: receiver.left + receiver.width,
      };
      bounds.left = Math.min(bounds.left, receiver.left);
      bounds.right = Math.max(bounds.right, receiver.left + receiver.width);
      sectionBounds.set(receiver.section, bounds);
    });

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
    canvas.dataset.receivers = String(receivers.length);
    canvas.dataset.sections = String(sections.length);
    canvas.dataset.sectionAspect = surfaceAspect.toFixed(5);
    canvas.dataset.seamInset = projectionSeamInset.toFixed(2);
    canvas.dataset.seamBleed = projectionSeamBleed.toFixed(2);
    canvas.dataset.cameraAngle = getComputedStyle(document.documentElement)
      .getPropertyValue("--camera-angle")
      .trim();
    syncProjectionViewportBounds();
    renderProjection();
  }

  function setViewportInkProgress(value) {
    viewportInkProgress = clampValue(0, Number(value) || 0, 1);
    washTime = performance.now() * 0.001;
    canvas.dataset.viewportInkProgress = viewportInkProgress.toFixed(3);
    canvas.dataset.washTime = washTime.toFixed(3);
    renderProjection();
  }

  function animateViewportInk(targetProgress, duration, onComplete = null) {
    if (viewportRevealAnimation) {
      cancelAnimationFrame(viewportRevealAnimation);
      viewportRevealAnimation = 0;
    }

    const target = clampValue(0, Number(targetProgress) || 0, 1);
    if (prefersReducedMotion()) {
      setViewportInkProgress(target);
      onComplete?.();
      return;
    }

    const startProgress = viewportInkProgress;
    const startTime = performance.now();
    const animate = (timestamp) => {
      const progress = clampValue(
        0,
        (timestamp - startTime) / Math.max(1, duration),
        1
      );
      const easedProgress = progress * progress * (3 - 2 * progress);
      setViewportInkProgress(
        startProgress + (target - startProgress) * easedProgress
      );

      if (progress < 1) {
        viewportRevealAnimation = requestAnimationFrame(animate);
      } else {
        viewportRevealAnimation = 0;
        onComplete?.();
      }
    };

    viewportRevealAnimation = requestAnimationFrame(animate);
  }

  function isRevealRangeComplete(left, right) {
    const start = Math.max(
      0,
      Math.floor(clampValue(0, left, 1) * (revealMaskWidth - 1))
    );
    const end = Math.min(
      revealMaskWidth - 1,
      Math.ceil(clampValue(0, right, 1) * (revealMaskWidth - 1))
    );

    for (let index = start; index <= end; index += 1) {
      if (revealMaskPixels[index * 4] < 255) {
        return false;
      }
    }

    return true;
  }

  function markViewportRevealed(
    left = viewportLeft,
    right = viewportRight,
    amount = 1
  ) {
    const start = Math.max(
      0,
      Math.floor(clampValue(0, left, 1) * (revealMaskWidth - 1))
    );
    const end = Math.min(
      revealMaskWidth - 1,
      Math.ceil(clampValue(0, right, 1) * (revealMaskWidth - 1))
    );
    const revealAmount = clampValue(0, Number(amount) || 0, 1);
    const revealByte = Math.round(revealAmount * 255);
    let changed = false;

    for (let index = start; index <= end; index += 1) {
      const pixelIndex = index * 4;
      if (revealMaskPixels[pixelIndex] < revealByte) {
        revealMaskPixels[pixelIndex] = revealByte;
        changed = true;
      }
    }

    if (!changed) {
      return;
    }

    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, revealMaskTexture);
    gl.texSubImage2D(
      gl.TEXTURE_2D,
      0,
      0,
      0,
      revealMaskWidth,
      1,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      revealMaskPixels
    );
    revealMaskCommitCount += 1;
    canvas.dataset.revealMaskCommits = String(revealMaskCommitCount);
    canvas.dataset.revealedRange = `${(
      start / (revealMaskWidth - 1)
    ).toFixed(5)}-${(end / (revealMaskWidth - 1)).toFixed(5)}`;
    canvas.dataset.revealedAmount = revealAmount.toFixed(3);
    renderProjection();
  }

  function startMovingViewportReveal() {
    // Let the new viewport start washing in immediately. Persistent reveal
    // data keeps previously shown regions visible while the camera moves.
    setViewportInkProgress(0);
    animateViewportInk(1, cameraRevealDuration);
  }

  function setMotionQuality(value, shouldRender = true) {
    motionQuality = clampValue(0, Number(value) || 0, 1);
    canvas.dataset.shaderQuality = motionQuality > 0.5 ? "fast" : "full";

    if (shouldRender) {
      renderProjection();
    }
  }

  function revealProjectionViewport() {
    setMotionQuality(0, false);
    projectionCameraState = "revealing";
    canvas.dataset.cameraMotion = "revealing";
    revealTargetLeft = viewportLeft;
    revealTargetRight = viewportRight;
    const revealDuration = Math.max(
      180,
      Math.round(cameraRevealDuration * (1 - viewportInkProgress))
    );
    animateViewportInk(1, revealDuration, () => {
      markViewportRevealed(revealTargetLeft, revealTargetRight, 1);
      settledViewportLeft = viewportLeft;
      settledViewportRight = viewportRight;
      hasSettledViewport = true;
      projectionCameraState = "settled";
      canvas.dataset.cameraMotion = "settled";
    });
  }

  function beginCameraMotion() {
    if (cameraSettleTimer) {
      window.clearTimeout(cameraSettleTimer);
      cameraSettleTimer = 0;
    }

    if (projectionCameraState === "revealing") {
      markViewportRevealed(
        revealTargetLeft,
        revealTargetRight,
        viewportInkProgress
      );
    }

    if (projectionCameraMoving) {
      return;
    }

    projectionCameraMoving = true;
    projectionCameraState = "moving";
    canvas.dataset.cameraMotion = "moving";
    setMotionQuality(1);
    startMovingViewportReveal();
  }

  function scheduleCameraSettled() {
    if (cameraSettleTimer) {
      window.clearTimeout(cameraSettleTimer);
    }

    cameraSettleTimer = window.setTimeout(() => {
      cameraSettleTimer = 0;
      syncProjectionViewportBounds();
      projectionCameraMoving = false;
      setMotionQuality(0, false);

      if (isRevealRangeComplete(viewportLeft, viewportRight)) {
        if (viewportRevealAnimation) {
          cancelAnimationFrame(viewportRevealAnimation);
          viewportRevealAnimation = 0;
        }
        setViewportInkProgress(1);
        projectionCameraState = "settled";
        canvas.dataset.cameraMotion = "settled";
        settledViewportLeft = viewportLeft;
        settledViewportRight = viewportRight;
        hasSettledViewport = true;
        return;
      }

      revealProjectionViewport();
    }, cameraSettleDelay);
  }

  function syncProjectionReveal(boundary, progress, stage = progress) {
    inkBoundary = clampValue(0, Number(boundary) || 0, 1);
    inkProgress = clampValue(0, Number(progress) || 0, 1);
    projectionStage = clampValue(0, Number(stage) || 0, 1);
    projectionOpacity = projectionStage;
    canvas.dataset.inkBoundary = inkBoundary.toFixed(5);
    canvas.dataset.inkProgress = inkProgress.toFixed(3);
    canvas.dataset.projectionStage = projectionStage.toFixed(3);
    renderProjection();
  }

  function setSource(source, sectionAspect = null, sourceLabel = "custom") {
    uploadSectionProjectionTexture(0, source);
    const sourceWidth = source.naturalWidth || source.videoWidth || source.width || 1;
    const sourceHeight =
      source.naturalHeight || source.videoHeight || source.height || 1;
    projectionAspect =
      Number(sectionAspect) > 0 ? Number(sectionAspect) : sourceWidth / sourceHeight;
    projectionOpacity = projectionStage;
    canvas.dataset.source = sourceLabel;
    renderProjection();
  }

  function setSlipMask(source) {
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, slipMaskTexture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      source
    );
    renderProjection();
  }

  function setOpacity(value) {
    projectionOpacity = clampValue(0, Number(value) || 0, 1);
    renderProjection();
  }

  function markReady() {
    canvas.dataset.sources = sectionSources.join("|");
    canvas.dataset.sectionCount = String(sectionSources.length);
    canvas.dataset.status = "ready";
    requestSectionBackgroundsAround?.(getCurrentSectionIndex?.() || 0);
    syncProjectionViewportBounds();
  }

  const resizeObserver = new ResizeObserver(syncReceivers);
  resizeObserver.observe(slipRow);

  const slipImages = Array.from(
    slipRow.querySelectorAll(".slip-item > img:first-child")
  );
  slipImages.forEach((image) => {
    if (!image.complete) {
      image.addEventListener("load", syncReceivers, { once: true });
    }
  });

  const firstSlipImage = slipImages[0];
  if (firstSlipImage?.complete && firstSlipImage.naturalWidth) {
    setSlipMask(firstSlipImage);
  } else {
    firstSlipImage?.addEventListener("load", () => setSlipMask(firstSlipImage), {
      once: true,
    });
  }

  const renderer = {
    available: true,
    beginCameraMotion,
    markViewportRevealed,
    render: renderProjection,
    revealViewport: revealProjectionViewport,
    scheduleCameraSettled,
    setOpacity,
    setMotionQuality,
    setSlipMask,
    setSource,
    sync: syncReceivers,
    syncProjectionReveal,
    syncViewportBounds: scheduleViewportSync,
    uploadSectionProjectionTexture,
    releaseSectionTexture,
    markReady,
    getReceivers: () => receivers.map((receiver) => ({ ...receiver })),
  };

  window.bookletProjection = Object.freeze({
    clear() {
      projectionOpacity = 0;
      renderProjection();
    },
    getReceivers: renderer.getReceivers,
    setOpacity,
    setSource,
    sync: syncReceivers,
  });

  requestAnimationFrame(() => {
    syncReceivers();
  });

  return renderer;
}
