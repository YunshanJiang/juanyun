import { clampValue, prefersReducedMotion, smoothStep } from "../../utils/math.js";

export function createRollEndController({
  bookletStage,
  bookletObject,
  bookletSurface,
  slipRow,
  rollEnd,
  progressBar,
  bookletTitleLayer,
  bookletOriginCopy,
  bookletOriginButton,
  rollSlipItems,
  rollSegmentTotal,
  inkRevealPower,
  titleRevealEnd,
  projectionRevealStart,
  originCopyRevealDuration,
  titleInkRenderer,
  events = {},
}) {
  if (!bookletObject || !rollEnd) {
    return {
      getProgress: () => 0,
      replay() {},
      animateToProgress() {},
      setProgress() {},
      start() {},
    };
  }

  const rollFaces = [];
  const groundShadow = document.createElement("span");
  const cylinder = document.createElement("span");
  const cylinderCore = document.createElement("span");
  const topCap = document.createElement("span");
  const bottomCap = document.createElement("span");

  groundShadow.className = "roll-end-ground-shadow";
  cylinder.className = "roll-cylinder";
  cylinderCore.className = "roll-cylinder-core";
  topCap.className = "roll-cap roll-cap--top";
  bottomCap.className = "roll-cap roll-cap--bottom";
  cylinder.appendChild(cylinderCore);

  for (let index = 0; index < rollSegmentTotal; index += 1) {
    const face = document.createElement("span");
    const topRope = document.createElement("span");
    const bottomRope = document.createElement("span");
    const baseAngle = (Math.PI * 2 * index) / rollSegmentTotal;
    const textureX = (index / (rollSegmentTotal - 1)) * 100;

    face.className = "roll-cylinder-face";
    face.style.setProperty("--face-angle", `${baseAngle}rad`);
    face.style.setProperty("--texture-x", `${textureX}%`);
    face.dataset.rollSegment = String(index);

    topRope.className = "roll-face-rope roll-face-rope--top";
    bottomRope.className = "roll-face-rope roll-face-rope--bottom";
    face.append(topRope, bottomRope);
    cylinder.appendChild(face);
    rollFaces.push({ element: face, baseAngle });
  }

  rollEnd.append(groundShadow, cylinder, topCap, bottomCap);

  let rollProgress = 0;
  let animationFrame = 0;
  let originCopyAnimationFrame = 0;
  let originCopyRevealProgress = 0;

  function setOriginCopyRevealProgress(value) {
    const progress = clampValue(0, Number(value) || 0, 1);
    const hiddenProgress = 1 - progress;
    originCopyRevealProgress = progress;

    if (!bookletOriginCopy) {
      return;
    }

    bookletOriginCopy.style.setProperty(
      "--origin-copy-opacity",
      progress.toFixed(3)
    );
    bookletOriginCopy.style.setProperty(
      "--origin-copy-clip",
      `${(hiddenProgress * 100).toFixed(3)}%`
    );
    bookletOriginCopy.style.setProperty(
      "--origin-copy-offset",
      `calc(${(hiddenProgress * 12).toFixed(3)} * var(--design-unit))`
    );
    bookletOriginCopy.style.setProperty(
      "--origin-copy-blur",
      `calc(${(hiddenProgress * 5).toFixed(3)} * var(--design-unit))`
    );
    bookletOriginCopy.dataset.reveal = progress.toFixed(3);
    bookletOriginCopy.setAttribute("aria-hidden", String(progress < 0.999));

    if (bookletOriginButton) {
      bookletOriginButton.disabled = progress < 0.999;
      bookletOriginButton.style.setProperty(
        "--origin-button-opacity",
        progress.toFixed(3)
      );
      bookletOriginButton.style.setProperty(
        "--origin-button-scale",
        (0.88 + progress * 0.12).toFixed(3)
      );
      bookletOriginButton.style.setProperty(
        "--origin-button-blur",
        `calc(${(hiddenProgress * 5).toFixed(3)} * var(--design-unit))`
      );
      bookletOriginButton.dataset.reveal = progress.toFixed(3);
    }
  }

  function stopOriginCopyReveal() {
    if (originCopyAnimationFrame) {
      cancelAnimationFrame(originCopyAnimationFrame);
      originCopyAnimationFrame = 0;
    }
  }

  function hideOriginCopy() {
    stopOriginCopyReveal();
    setOriginCopyRevealProgress(0);
  }

  function playOriginCopyReveal() {
    stopOriginCopyReveal();

    if (!bookletOriginCopy) {
      return;
    }

    if (prefersReducedMotion()) {
      setOriginCopyRevealProgress(1);
      return;
    }

    const startProgress = originCopyRevealProgress;
    const startTime = performance.now();

    const animate = (timestamp) => {
      const linearProgress = clampValue(
        0,
        (timestamp - startTime) / originCopyRevealDuration,
        1
      );
      const easedProgress = 1 - (1 - linearProgress) ** 3;

      setOriginCopyRevealProgress(
        startProgress + (1 - startProgress) * easedProgress
      );

      if (linearProgress < 1) {
        originCopyAnimationFrame = requestAnimationFrame(animate);
      } else {
        originCopyAnimationFrame = 0;
      }
    };

    originCopyAnimationFrame = requestAnimationFrame(animate);
  }

  function getRollMetrics() {
    const height = Math.max(1, bookletObject.getBoundingClientRect().height);
    const openRadius = clampValue(32, height * 0.048, 58);
    const closedRadius = clampValue(openRadius * 1.44, height * 0.074, 86);
    const overlap = clampValue(14, openRadius * 0.43, 25);
    const bookletLength = Math.max(
      1,
      bookletSurface?.offsetWidth || slipRow.offsetWidth || bookletObject.offsetWidth
    );

    return { bookletLength, closedRadius, openRadius, overlap };
  }

  function syncRollEnd(value) {
    const progress = clampValue(0, Number(value) || 0, 1);
    const { bookletLength, closedRadius, openRadius, overlap } =
      getRollMetrics();
    const radius = Math.sqrt(
      openRadius ** 2 +
        (1 - progress) * (closedRadius ** 2 - openRadius ** 2)
    );
    const diameter = radius * 2;
    const faceWidth =
      2 * radius * Math.tan(Math.PI / rollSegmentTotal) + 1.2;
    const phase = -progress * Math.PI * 2.3;
    const rightCenterX = bookletLength - overlap - closedRadius;
    const leftCenterX = overlap - openRadius;
    const centerX = rightCenterX + (leftCenterX - rightCenterX) * progress;
    const revealBoundary = clampValue(0, centerX + radius, bookletLength);
    const revealClipPercent = (revealBoundary / bookletLength) * 100;
    const inkProgress = progress ** inkRevealPower;
    const closedBoundaryNormalized = clampValue(
      0,
      (bookletLength - overlap) / bookletLength,
      1
    );
    const openBoundaryNormalized = clampValue(
      0,
      overlap / bookletLength,
      1
    );
    const inkBoundaryNormalized =
      closedBoundaryNormalized +
      (openBoundaryNormalized - closedBoundaryNormalized) * inkProgress;
    const titleRevealProgress = smoothStep(
      clampValue(0, inkProgress / titleRevealEnd, 1)
    );
    const projectionRevealProgress = smoothStep(
      clampValue(
        0,
        (inkProgress - projectionRevealStart) /
          (1 - projectionRevealStart),
        1
      )
    );
    const projectionBoundaryNormalized =
      closedBoundaryNormalized +
      (openBoundaryNormalized - closedBoundaryNormalized) *
        projectionRevealProgress;

    rollProgress = progress;
    bookletObject.style.setProperty(
      "--reveal-clip",
      `${revealClipPercent.toFixed(3)}%`
    );
    const shadowReveal = smoothStep(progress);
    bookletObject.style.setProperty(
      "--booklet-shadow-opacity",
      (0.48 * shadowReveal).toFixed(3)
    );
    bookletObject.style.setProperty(
      "--booklet-contact-shadow-opacity",
      (0.18 * shadowReveal).toFixed(3)
    );
    rollEnd.style.setProperty("--roll-radius", `${radius}px`);
    rollEnd.style.setProperty("--roll-diameter", `${diameter}px`);
    rollEnd.style.setProperty("--roll-face-width", `${faceWidth}px`);
    rollEnd.style.setProperty("--roll-face-left", `${faceWidth * -0.5}px`);
    rollEnd.style.setProperty("--roll-center-x", `${centerX}px`);
    rollEnd.style.setProperty("--roll-cap-offset", `${-radius}px`);
    rollEnd.style.setProperty("--roll-core-left", `${radius * -0.76}px`);
    rollEnd.style.setProperty("--roll-core-width", `${radius * 1.52}px`);
    rollEnd.style.setProperty("--roll-shadow-left", `${radius * -1.36}px`);
    rollEnd.style.setProperty("--roll-shadow-width", `${radius * 2.72}px`);
    rollEnd.style.setProperty(
      "--roll-shadow-opacity",
      `${(0.28 + (1 - progress) * 0.06).toFixed(3)}`
    );
    rollEnd.style.setProperty("--roll-phase", `${phase}rad`);
    rollEnd.dataset.progress = progress.toFixed(3);
    rollEnd.dataset.radius = radius.toFixed(2);
    rollEnd.dataset.position = centerX.toFixed(2);

    rollSlipItems.forEach((slip) => {
      const sectionLeft = slip.parentElement?.offsetLeft || 0;
      const slipLeft = sectionLeft + slip.offsetLeft;
      const slipWidth = Math.max(1, slip.offsetWidth);
      const slipRight = slipLeft + slipWidth;
      const localReveal = clampValue(
        0,
        (slipRight - revealBoundary) / slipWidth,
        1
      );
      const reveal = smoothStep(localReveal);
      const hiddenLeft = (1 - reveal) * 100;
      const clipValue = `inset(0 0 0 ${hiddenLeft.toFixed(3)}%)`;

      slip.style.removeProperty("clip-path");
      slip.style.removeProperty("-webkit-clip-path");
      slip.style.removeProperty("opacity");
      Array.from(slip.children).forEach((part) => {
        if (part.tagName !== "IMG") {
          return;
        }

        part.style.clipPath = clipValue;
        part.style.webkitClipPath = clipValue;
        part.style.opacity = reveal >= 0.999 ? "1" : reveal.toFixed(3);
      });
      slip.dataset.reveal = reveal.toFixed(3);
    });

    if (bookletTitleLayer) {
      bookletTitleLayer.style.clipPath = "none";
      bookletTitleLayer.style.webkitClipPath = "none";
      bookletTitleLayer.style.opacity = titleRevealProgress > 0 ? "1" : "0";
      bookletTitleLayer.dataset.reveal = titleRevealProgress.toFixed(3);
    }

    titleInkRenderer?.render(titleRevealProgress);

    const projectionLayer = document.querySelector("#projectionLayer");
    if (projectionLayer) {
      const revealClip = Math.round(revealBoundary);
      projectionLayer.style.clipPath = `inset(0 0 0 ${revealClip}px)`;
      projectionLayer.style.webkitClipPath = `inset(0 0 0 ${revealClip}px)`;
      projectionLayer.dataset.revealBoundary = String(revealClip);
      projectionLayer.dataset.revealBoundaryNormalized =
        projectionBoundaryNormalized.toFixed(5);
      projectionLayer.dataset.revealProgress =
        projectionRevealProgress.toFixed(3);
      projectionLayer.dataset.titleRevealProgress =
        titleRevealProgress.toFixed(3);
    }

    events.syncProjectionReveal?.(
      projectionBoundaryNormalized,
      projectionRevealProgress,
      projectionRevealProgress
    );

    if (progress >= 0.999) {
      events.markProjectionViewportRevealed?.();
    }

    if (progressBar) {
      progressBar.value = progress.toFixed(3);
      progressBar.style.setProperty("--progress", `${progress * 100}%`);
      progressBar.setAttribute("aria-valuetext", `${Math.round(progress * 100)}%`);
    }

    rollFaces.forEach(({ element, baseAngle }) => {
      const currentAngle = baseAngle + phase;
      const diffuse = Math.max(0, Math.cos(currentAngle + 0.48));
      const sideFalloff = 1 - Math.abs(Math.cos(currentAngle));
      const shade = clampValue(
        0.1,
        0.12 + (1 - diffuse) * 0.47 + sideFalloff * 0.08,
        0.68
      );
      element.style.setProperty("--face-shade", shade.toFixed(3));
    });
  }

  function stopRollAnimation() {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    }
  }

  function playRollOpening() {
    stopRollAnimation();
    hideOriginCopy();
    bookletStage?.classList.add("is-auto-opening");

    if (prefersReducedMotion()) {
      syncRollEnd(1);
      rollEnd.dataset.state = "open";
      bookletStage?.classList.remove("is-auto-opening");
      playOriginCopyReveal();
      return;
    }

    const duration = 3600;
    const delay = 180;
    let startTime;

    syncRollEnd(0);
    rollEnd.dataset.state = "opening";

    const animate = (timestamp) => {
      if (startTime === undefined) {
        startTime = timestamp + delay;
      }

      const elapsed = Math.max(0, timestamp - startTime);
      const linearProgress = clampValue(0, elapsed / duration, 1);
      const easedProgress = 1 - (1 - linearProgress) ** 4;

      syncRollEnd(easedProgress);

      if (linearProgress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        animationFrame = 0;
        rollEnd.dataset.state = "open";
        bookletStage?.classList.remove("is-auto-opening");
        playOriginCopyReveal();
      }
    };

    animationFrame = requestAnimationFrame(animate);
  }

  const rollResizeObserver = new ResizeObserver(() => syncRollEnd(rollProgress));
  rollResizeObserver.observe(bookletObject);
  syncRollEnd(0);

  function animateToProgress(value, duration = 320) {
    stopRollAnimation();
    bookletStage?.classList.remove("is-auto-opening");
    hideOriginCopy();
    rollEnd.classList.add("is-ready");

    const startProgress = rollProgress;
    const targetProgress = clampValue(0, Number(value) || 0, 1);

    if (prefersReducedMotion()) {
      syncRollEnd(targetProgress);
      rollEnd.dataset.state =
        targetProgress >= 0.999
          ? "open"
          : targetProgress <= 0.001
            ? "closed"
            : "manual";
      if (targetProgress >= 0.999) {
        playOriginCopyReveal();
      }
      return;
    }

    const startTime = performance.now();
    rollEnd.dataset.state = "section-transition";

    const animate = (timestamp) => {
      const progress = clampValue(
        0,
        (timestamp - startTime) / Math.max(1, Number(duration) || 0),
        1
      );
      const easedProgress = 1 - (1 - progress) ** 3;
      syncRollEnd(
        startProgress + (targetProgress - startProgress) * easedProgress
      );

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        animationFrame = 0;
        rollEnd.dataset.state =
          targetProgress >= 0.999
            ? "open"
            : targetProgress <= 0.001
              ? "closed"
              : "manual";
        if (targetProgress >= 0.999) {
          playOriginCopyReveal();
        }
      }
    };

    animationFrame = requestAnimationFrame(animate);
  }

  function setProgress(value) {
    stopRollAnimation();
    bookletStage?.classList.remove("is-auto-opening");
    rollEnd.classList.add("is-ready");
    rollEnd.dataset.state = "manual";
    syncRollEnd(value);

    if (Number(value) >= 0.999) {
      playOriginCopyReveal();
    } else {
      hideOriginCopy();
    }
  }

  progressBar?.addEventListener("pointerdown", () => {
    stopRollAnimation();
    bookletStage?.classList.remove("is-auto-opening");
    hideOriginCopy();
    rollEnd.classList.add("is-ready");
    rollEnd.dataset.state = "manual";
    syncRollEnd(progressBar.value);
  });

  progressBar?.addEventListener("input", () => {
    stopRollAnimation();
    bookletStage?.classList.remove("is-auto-opening");
    hideOriginCopy();
    rollEnd.classList.add("is-ready");
    rollEnd.dataset.state = "manual";
    syncRollEnd(progressBar.value);

    if (Number(progressBar.value) >= 0.999) {
      playOriginCopyReveal();
    }
  });

  const controller = {
    getProgress: () => rollProgress,
    replay: playRollOpening,
    animateToProgress,
    setProgress,
    start(results = []) {
      const hasAssetErrors = results.some(({ status }) => status === "error");
      rollEnd.classList.add("is-ready");
      rollEnd.dataset.status = hasAssetErrors ? "asset-error" : "ready";
      events.alignViewportRightEdge?.();
      syncRollEnd(0);
      rollEnd.dataset.state = "closed";
      playRollOpening();
    },
  };

  window.bookletRollEnd = Object.freeze(controller);
  return controller;
}
