const DESIGN_WIDTH = 960;
const CONTENT_SLIDER_WIDTH = 28;
const CONTENT_SLIDER_THUMB_SIZE = 40;
const OVERFLOW_THRESHOLD = 4;
const DETAIL_SLIDER_LAYOUT = Object.freeze({
  x: 848,
  top: 124.2,
  height: 218,
});
const MEDIA_DETAIL_SLIDER_LAYOUT = Object.freeze({
  x: 912,
  top: 124.2,
  height: 218,
});
const SUMMARY_SLIDER_LAYOUT = Object.freeze({
  x: 842,
  top: 135,
  height: 211,
});
const MEDIA_CONTENT_KINDS = new Set([
  "promo",
  "film",
  "festival",
  "game",
  "culture",
  "travel",
  "silkroad",
  "horse",
  "certification",
]);

function clamp(value, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

function getSectionDesignUnit(section) {
  if (!section) {
    return 1;
  }

  const width = section.offsetWidth || section.getBoundingClientRect().width;
  return Math.max(0.001, width / DESIGN_WIDTH);
}

export function createContentSliderController({
  slider,
  bar,
  thumb,
} = {}) {
  if (!slider || !bar || !thumb) {
    return {
      setTarget() {},
      clearTarget() {},
      refresh() {},
      syncHitSurface() {},
      getState: () => ({ active: false, overflow: false, progress: 0 }),
    };
  }

  const progressByTarget = new Map();
  const stage = slider.closest(".booklet-stage");
  const interactionParent = slider.offsetParent || stage;
  const interactionSurface = document.createElement("div");
  const pointerSurface = stage ? interactionSurface : slider;
  let activeTarget = null;
  let activeProgress = 0;
  let maxScroll = 0;
  let isDragging = false;
  let dragPointerId = null;
  let dragStartY = 0;
  let dragStartProgress = 0;
  let suppressPointerClick = false;
  let pointerClickResetId = 0;
  let interactionSyncFrame = 0;
  let contentDrag = null;
  let suppressContentClickUntil = 0;

  // Use the visible text rectangle so flat link proxies also support dragging.
  stage?.addEventListener("pointerdown", (event) => {
    if (event.button !== 0 || event.isPrimary === false ||
        !activeTarget || activeTarget.surface === "summary" ||
        !measureActiveTarget()) return;
    if (event.target.closest?.("button, input, select, textarea, video")) return;
    const rect = activeTarget.viewport.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom) return;
    contentDrag = {
      id: event.pointerId, y: event.clientY, progress: activeProgress,
      target: activeTarget, moved: false,
      scale: rect.height / Math.max(1, activeTarget.viewport.clientHeight),
    };
    event.stopPropagation();
  }, true);

  stage?.addEventListener("pointermove", (event) => {
    if (!contentDrag || event.pointerId !== contentDrag.id) return;
    if (contentDrag.target !== activeTarget) { contentDrag = null; return; }
    const delta = event.clientY - contentDrag.y;
    if (!contentDrag.moved && Math.abs(delta) < 5) return;
    contentDrag.moved = true;
    stage.setPointerCapture?.(event.pointerId);
    event.preventDefault();
    event.stopPropagation();
    setProgress(contentDrag.progress -
      delta / Math.max(1, maxScroll * contentDrag.scale));
  }, { capture: true, passive: false });

  function finishContentDrag(event) {
    if (!contentDrag || event.pointerId !== contentDrag.id) return;
    if (contentDrag.moved) {
      suppressContentClickUntil = performance.now() + 400;
      event.preventDefault();
      event.stopPropagation();
    }
    if (stage.hasPointerCapture?.(event.pointerId)) {
      stage.releasePointerCapture(event.pointerId);
    }
    contentDrag = null;
  }
  stage?.addEventListener("pointerup", finishContentDrag, true);
  stage?.addEventListener("pointercancel", finishContentDrag, true);
  stage?.addEventListener("click", (event) => {
    if (performance.now() < suppressContentClickUntil) {
      event.preventDefault();
      event.stopImmediatePropagation();
      suppressContentClickUntil = 0;
    }
  }, true);

  interactionSurface.className = "booklet-content-slider-hit-surface";
  interactionSurface.dataset.visible = "false";
  interactionSurface.setAttribute("aria-hidden", "true");
  interactionParent?.appendChild(interactionSurface);

  function syncInteractionSurfaceNow() {
    if (!stage || slider.dataset.visible !== "true") {
      return;
    }

    // Keep the real DOM hit surface aligned with the visible track. The
    // stage-level fallback below still provides a forgiving area, but this
    // transparent element must not sit on top of nearby content links.
    const hitWidth = Math.max(slider.offsetWidth, 28);
    interactionSurface.style.left = `${
      slider.offsetLeft - (hitWidth - slider.offsetWidth) / 2
    }px`;
    interactionSurface.style.top = `${slider.offsetTop}px`;
    interactionSurface.style.width = `${hitWidth}px`;
    interactionSurface.style.height = `${slider.offsetHeight}px`;
  }

  function scheduleInteractionSync() {
    window.cancelAnimationFrame(interactionSyncFrame);
    syncInteractionSurfaceNow();
    const syncUntil = performance.now() + 900;
    const sync = (time) => {
      if (!stage || slider.dataset.visible !== "true") {
        interactionSyncFrame = 0;
        return;
      }
      syncInteractionSurfaceNow();
      if (time < syncUntil) {
        interactionSyncFrame = requestAnimationFrame(sync);
      } else {
        interactionSyncFrame = 0;
      }
    };
    interactionSyncFrame = requestAnimationFrame(sync);
  }

  function setVisibility(isVisible) {
    slider.dataset.visible = String(isVisible);
    slider.setAttribute("aria-hidden", String(!isVisible));
    thumb.tabIndex = isVisible ? 0 : -1;
    interactionSurface.dataset.visible = String(Boolean(stage && isVisible));
    if (isVisible) {
      // The section can still be settling when overflow is detected. Place
      // the flat hit surface immediately, then keep it synced frame by frame.
      scheduleInteractionSync();
    } else {
      window.cancelAnimationFrame(interactionSyncFrame);
      interactionSyncFrame = 0;
    }
  }

  function positionAtTarget(target) {
    const section = target?.section;
    const unit = getSectionDesignUnit(section);
    const sectionLeft = section?.offsetLeft || 0;
    const layout =
      target?.sliderLayout ||
      (target?.surface === "summary"
        ? SUMMARY_SLIDER_LAYOUT
        : MEDIA_CONTENT_KINDS.has(target?.contentKind)
          ? MEDIA_DETAIL_SLIDER_LAYOUT
          : DETAIL_SLIDER_LAYOUT);

    slider.style.setProperty(
      "--slider-left",
      `${sectionLeft + layout.x * unit}px`
    );
    slider.style.setProperty(
      "--slider-top",
      `${layout.top * unit}px`
    );
    slider.style.setProperty(
      "--slider-width",
      `${CONTENT_SLIDER_WIDTH * unit}px`
    );
    slider.style.setProperty(
      "--slider-height",
      `${layout.height * unit}px`
    );
    slider.style.setProperty(
      "--slider-thumb-size",
      `${CONTENT_SLIDER_THUMB_SIZE * unit}px`
    );
    scheduleInteractionSync();
  }

  function getThumbTravel() {
    return Math.max(0, slider.clientHeight - thumb.offsetHeight);
  }

  function updateThumbPosition() {
    thumb.style.setProperty(
      "--thumb-y",
      `${getThumbTravel() * activeProgress}px`
    );
    thumb.setAttribute("aria-valuenow", String(Math.round(activeProgress * 100)));
  }

  function setProgress(nextProgress, { persist = true } = {}) {
    if (!activeTarget) {
      return;
    }

    activeProgress = clamp(Number(nextProgress) || 0);
    const offset = -maxScroll * activeProgress;
    activeTarget.scroll.style.setProperty("--content-scroll-offset", `${offset}px`);
    activeTarget.scroll.style.setProperty(
      "--content-scroll-progress",
      activeProgress.toFixed(4)
    );
    updateThumbPosition();

    if (persist) {
      progressByTarget.set(activeTarget.id, activeProgress);
    }
  }

  function detachWheel(target) {
    target?.viewport?.removeEventListener("wheel", handleWheel);
  }

  function attachWheel(target) {
    target?.viewport?.addEventListener("wheel", handleWheel, { passive: false });
  }

  function measureActiveTarget() {
    if (!activeTarget?.viewport || !activeTarget?.scroll) {
      maxScroll = 0;
      slider.dataset.overflow = "false";
      return false;
    }

    maxScroll = Math.max(
      0,
      activeTarget.scroll.scrollHeight - activeTarget.viewport.clientHeight
    );
    const hasOverflow = maxScroll > OVERFLOW_THRESHOLD;
    slider.dataset.overflow = String(hasOverflow);
    return hasOverflow;
  }

  function handleWheel(event) {
    if (!activeTarget || !measureActiveTarget()) {
      return;
    }

    event.preventDefault();
    const delta = event.deltaMode === 1 ? event.deltaY * 16 : event.deltaY;
    setProgress(activeProgress + delta / Math.max(1, maxScroll));
  }

  function refresh() {
    if (!activeTarget?.viewport || !activeTarget?.scroll) {
      setVisibility(false);
      return;
    }

    positionAtTarget(activeTarget);
    const hasOverflow = measureActiveTarget();
    // A summary slider exists only when the currently visible language needs
    // scrolling. Hidden zh/en nodes must not make the other language appear
    // scrollable.
    setVisibility(hasOverflow);

    if (!hasOverflow) {
      activeProgress = 0;
      activeTarget.scroll.style.setProperty("--content-scroll-offset", "0px");
      updateThumbPosition();
      return;
    }

    setProgress(progressByTarget.get(activeTarget.id) || 0, {
      persist: false,
    });
  }

  function setTarget(target) {
    if (target?.contentKind === "contact") {
      clearTarget();
      return;
    }
    if (!target?.viewport || !target?.scroll) {
      clearTarget();
      return;
    }

    if (activeTarget && activeTarget !== target) {
      detachWheel(activeTarget);
    }

    activeTarget = target;
    activeProgress = progressByTarget.get(target.id) || 0;
    slider.dataset.target = target.id;
    slider.dataset.sectionIndex = String(target.sectionIndex ?? "");
    attachWheel(target);
    refresh();
  }

  function clearTarget() {
    if (activeTarget) {
      detachWheel(activeTarget);
      activeTarget.scroll.style.setProperty("--content-scroll-offset", "0px");
    }

    activeTarget = null;
    activeProgress = 0;
    maxScroll = 0;
    slider.dataset.target = "";
    slider.dataset.sectionIndex = "";
    slider.dataset.overflow = "false";
    setVisibility(false);
    thumb.style.setProperty("--thumb-y", "0px");
  }

  function progressAtClientY(clientY) {
    const rect = slider.getBoundingClientRect();
    return clamp((clientY - rect.top) / Math.max(1, rect.height));
  }

  function beginDrag(event, { seekToPointer = false } = {}) {
    if (!activeTarget || !measureActiveTarget()) {
      return;
    }

    event.preventDefault();
    if (seekToPointer) {
      setProgress(progressAtClientY(event.clientY));
    }

    isDragging = true;
    dragPointerId = event.pointerId;
    dragStartY = event.clientY;
    dragStartProgress = activeProgress;
    thumb.dataset.dragging = "true";
    pointerSurface.setPointerCapture?.(event.pointerId);
  }

  function isInsideVisibleThumb(clientX, clientY) {
    const thumbRect = thumb.getBoundingClientRect();
    return (
      clientX >= thumbRect.left &&
      clientX <= thumbRect.right &&
      clientY >= thumbRect.top &&
      clientY <= thumbRect.bottom
    );
  }

  function isInsideSliderHitBounds(clientX, clientY) {
    const sliderRect = slider.getBoundingClientRect();
    if (sliderRect.width <= 0 || sliderRect.height <= 0) {
      return false;
    }

    const xPadding = Math.max(18, Math.min(32, sliderRect.width * 0.5));
    // Keep the forgiving hit zone inside the reserved band above the button.
    // A larger lower padding would make the slider steal button clicks.
    const yPadding = Math.max(8, Math.min(16, sliderRect.height * 0.05));
    return (
      clientX >= sliderRect.left - xPadding &&
      clientX <= sliderRect.right + xPadding &&
      clientY >= sliderRect.top - yPadding &&
      clientY <= sliderRect.bottom + yPadding
    );
  }

  function isInteractionSurfaceTarget(target) {
    return Boolean(
      target === interactionSurface ||
        target?.closest?.(".booklet-content-slider-hit-surface")
    );
  }

  function isInteractiveContentTarget(target) {
    return Boolean(
      target?.closest?.(
        "a[href], button, input, textarea, select, [role='button'], [role='link'], [contenteditable='true']"
      )
    );
  }

  function shouldBypassStageSlider(event) {
    return (
      !isInteractionSurfaceTarget(event.target) &&
      isInteractiveContentTarget(event.target)
    );
  }

  let suppressStageSliderClick = false;
  let stageSliderClickResetId = 0;
  const markStageSliderPointer = () => {
    suppressStageSliderClick = true;
    window.clearTimeout(stageSliderClickResetId);
    stageSliderClickResetId = window.setTimeout(() => {
      suppressStageSliderClick = false;
    }, 250);
  };

  stage?.addEventListener(
    "pointerdown",
    (event) => {
      if (shouldBypassStageSlider(event)) {
        return;
      }
      if (
        event.button !== 0 ||
        event.isPrimary === false ||
        isInteractionSurfaceTarget(event.target) ||
        !isInsideSliderHitBounds(event.clientX, event.clientY) ||
        !activeTarget ||
        !measureActiveTarget()
      ) {
        return;
      }

      event.preventDefault();
      markStageSliderPointer();
      beginDrag(event, {
        seekToPointer: !isInsideVisibleThumb(event.clientX, event.clientY),
      });
    },
    true
  );
  stage?.addEventListener(
    "click",
    (event) => {
      if (shouldBypassStageSlider(event)) {
        return;
      }
      if (suppressStageSliderClick) {
        suppressStageSliderClick = false;
        window.clearTimeout(stageSliderClickResetId);
        return;
      }
      if (
        isInteractionSurfaceTarget(event.target) ||
        !isInsideSliderHitBounds(event.clientX, event.clientY) ||
        !activeTarget ||
        !measureActiveTarget()
      ) {
        return;
      }

      event.preventDefault();
      setProgress(progressAtClientY(event.clientY));
    },
    true
  );

  pointerSurface.addEventListener("pointerdown", (event) => {
    // The transparent hit area extends beyond the visible thumb. Treat only
    // the visible thumb itself as a direct drag; clicks on the exposed track
    // (including the upper area covered by that hit box) must seek first.
    suppressPointerClick = true;
    window.clearTimeout(pointerClickResetId);
    pointerClickResetId = window.setTimeout(() => {
      suppressPointerClick = false;
    }, 250);
    beginDrag(event, {
      seekToPointer: !isInsideVisibleThumb(event.clientX, event.clientY),
    });
  });

  pointerSurface.addEventListener("click", (event) => {
    if (suppressPointerClick) {
      suppressPointerClick = false;
      window.clearTimeout(pointerClickResetId);
      return;
    }

    if (!activeTarget || maxScroll <= 0) {
      return;
    }

    // Fallback for transformed hit regions that dispatch click without the
    // pointer sequence. The full track, including its upper half, can seek.
    setProgress(progressAtClientY(event.clientY));
  });

  pointerSurface.addEventListener("pointermove", (event) => {
    if (!isDragging || event.pointerId !== dragPointerId) {
      return;
    }

    const travel = getThumbTravel();
    if (travel <= 0) {
      return;
    }

    setProgress(dragStartProgress + (event.clientY - dragStartY) / travel);
  });

  function endDrag(event) {
    if (!isDragging || (event?.pointerId && event.pointerId !== dragPointerId)) {
      return;
    }

    isDragging = false;
    thumb.dataset.dragging = "false";
    if (dragPointerId !== null) {
      pointerSurface.releasePointerCapture?.(dragPointerId);
    }
    dragPointerId = null;
  }

  pointerSurface.addEventListener("pointerup", endDrag);
  pointerSurface.addEventListener("pointercancel", endDrag);
  thumb.addEventListener("keydown", (event) => {
    if (!activeTarget || maxScroll <= 0) {
      return;
    }

    const page = activeTarget.viewport.clientHeight / Math.max(1, maxScroll);
    const increments = {
      ArrowUp: -0.08,
      ArrowDown: 0.08,
      PageUp: -page,
      PageDown: page,
      Home: -1,
      End: 1,
    };
    const increment = increments[event.key];

    if (increment === undefined) {
      return;
    }

    event.preventDefault();
    if (event.key === "Home" || event.key === "End") {
      setProgress(event.key === "End" ? 1 : 0);
      return;
    }
    setProgress(activeProgress + increment);
  });

  window.addEventListener("resize", refresh);
  slider.dataset.target = "";
  slider.dataset.sectionIndex = "";
  slider.dataset.overflow = "false";
  setVisibility(false);

  return {
    setTarget,
    clearTarget,
    refresh,
    syncHitSurface: syncInteractionSurfaceNow,
    getState: () => ({
      active: Boolean(activeTarget),
      target: activeTarget?.id || null,
      sectionIndex: activeTarget?.sectionIndex ?? null,
      overflow: maxScroll > OVERFLOW_THRESHOLD,
      maxScroll,
      progress: activeProgress,
    }),
  };
}
