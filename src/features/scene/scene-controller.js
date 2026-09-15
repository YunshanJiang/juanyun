import { clampValue, prefersReducedMotion } from "../../utils/math.js";

export function createSceneController({
  bookletViewport,
  sceneBackgroundTrack,
  sceneSections,
  previousButton,
  nextButton,
  sectionCount,
  navigationDuration,
  events = {},
}) {
  let sceneSectionIndex = 0;
  let sceneScrollAnimation = 0;
  let sceneIsAnimating = false;

  const maxSectionIndex = () =>
    Math.max(0, Math.min(sectionCount, sceneSections.length) - 1);

  function getRollProgressForSection(index) {
    const maxIndex = maxSectionIndex();
    if (maxIndex === 0) {
      return 0;
    }

    const normalizedIndex = clampValue(0, Number(index) || 0, maxIndex);
    return (maxIndex - normalizedIndex) / maxIndex;
  }

  function getSceneSectionWidth() {
    return Math.max(
      1,
      sceneSections[0]?.offsetWidth || bookletViewport?.clientWidth || 1
    );
  }

  function getSceneSectionScrollLeft(index) {
    if (!bookletViewport) {
      return 0;
    }

    const section = sceneSections[index];
    const maxScroll = Math.max(
      0,
      bookletViewport.scrollWidth - bookletViewport.clientWidth
    );
    const sectionOffset = section
      ? (sceneBackgroundTrack?.offsetLeft || 0) + section.offsetLeft
      : index * getSceneSectionWidth();
    const sectionCenter =
      sectionOffset +
      (section?.offsetWidth || getSceneSectionWidth()) / 2;
    const centeredScroll = sectionCenter - bookletViewport.clientWidth / 2;

    return clampValue(0, centeredScroll, maxScroll);
  }

  function syncSceneSectionControls() {
    if (!bookletViewport || !sceneSections.length) {
      return;
    }

    const maxIndex = maxSectionIndex();
    const viewportCenter =
      bookletViewport.scrollLeft + bookletViewport.clientWidth / 2;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    sceneSections.forEach((section, index) => {
      const sectionOffset =
        (sceneBackgroundTrack?.offsetLeft || 0) + section.offsetLeft;
      const sectionCenter = sectionOffset + section.offsetWidth / 2;
      const distance = Math.abs(sectionCenter - viewportCenter);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    const activeIndex = sceneIsAnimating ? sceneSectionIndex : nearestIndex;
    if (!sceneIsAnimating) {
      sceneSectionIndex = nearestIndex;
    }

    bookletViewport.dataset.section = `${activeIndex + 1}/${maxIndex + 1}`;

    if (previousButton) {
      const disabled = activeIndex >= maxIndex;
      previousButton.disabled = disabled;
      previousButton.setAttribute("aria-disabled", String(disabled));
    }

    if (nextButton) {
      const disabled = activeIndex <= 0;
      nextButton.disabled = disabled;
      nextButton.setAttribute("aria-disabled", String(disabled));
    }
  }

  function moveToSceneSection(direction) {
    if (!bookletViewport) {
      return;
    }

    const targetIndex = clampValue(
      0,
      sceneSectionIndex + direction,
      maxSectionIndex()
    );

    if (targetIndex === sceneSectionIndex && !sceneIsAnimating) {
      syncSceneSectionControls();
      return;
    }

    events.onWarmSections?.(targetIndex);

    if (sceneScrollAnimation) {
      cancelAnimationFrame(sceneScrollAnimation);
      sceneScrollAnimation = 0;
    }

    const startScroll = bookletViewport.scrollLeft;
    const targetScroll = getSceneSectionScrollLeft(targetIndex);
    const distance = targetScroll - startScroll;
    const startTime = performance.now();

    sceneSectionIndex = targetIndex;
    sceneIsAnimating = true;
    syncSceneSectionControls();
    events.onCameraMotion?.();

    if (prefersReducedMotion()) {
      bookletViewport.scrollLeft = targetScroll;
      sceneScrollAnimation = 0;
      sceneIsAnimating = false;
      syncSceneSectionControls();
      events.onViewportSync?.();
      events.onCameraSettled?.();
      return;
    }

    const animate = (timestamp) => {
      const progress = clampValue(
        0,
        (timestamp - startTime) / navigationDuration,
        1
      );
      const easedProgress = 1 - (1 - progress) ** 3;

      bookletViewport.scrollLeft = startScroll + distance * easedProgress;
      events.onViewportSync?.();

      if (progress < 1) {
        sceneScrollAnimation = requestAnimationFrame(animate);
        return;
      }

      bookletViewport.scrollLeft = targetScroll;
      sceneScrollAnimation = 0;
      sceneIsAnimating = false;
      syncSceneSectionControls();
      events.onViewportSync?.();
      events.onCameraSettled?.();
    };

    sceneScrollAnimation = requestAnimationFrame(animate);
  }

  function alignBookletViewportRightEdge() {
    if (!bookletViewport) {
      return;
    }

    events.onCameraMotion?.();
    bookletViewport.scrollLeft = Math.max(
      0,
      bookletViewport.scrollWidth - bookletViewport.clientWidth
    );
    sceneSectionIndex = 0;
    syncSceneSectionControls();
    events.onViewportSync?.();
    events.onCameraSettled?.();
  }

  bookletViewport?.addEventListener(
    "scroll",
    () => {
      events.onCameraMotion?.();
      syncSceneSectionControls();
      events.onViewportSync?.();
      events.onCameraSettled?.();
    },
    { passive: true }
  );

  previousButton?.addEventListener("click", () => moveToSceneSection(1));
  nextButton?.addEventListener("click", () => moveToSceneSection(-1));

  window.addEventListener("resize", () => {
    events.onCameraMotion?.();
    requestAnimationFrame(() => {
      if (!bookletViewport) {
        return;
      }

      bookletViewport.scrollLeft = getSceneSectionScrollLeft(sceneSectionIndex);
      syncSceneSectionControls();
      events.onViewportSync?.();
      events.onCameraSettled?.();
    });
  });

  requestAnimationFrame(alignBookletViewportRightEdge);

  return {
    alignBookletViewportRightEdge,
    getCurrentIndex: () => sceneSectionIndex,
    getRollProgressForSection,
    getSceneSectionScrollLeft,
    moveToSceneSection,
    syncSceneSectionControls,
  };
}
