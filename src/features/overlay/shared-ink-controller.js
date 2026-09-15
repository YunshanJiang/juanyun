const INK_HIDE_DURATION = 180;
const INK_SHOW_DURATION = 760;

function wait(duration) {
  return new Promise((resolve) => window.setTimeout(resolve, duration));
}

function nextFrame() {
  return new Promise((resolve) => requestAnimationFrame(resolve));
}

export function createSharedInkController({
  layer,
  image,
  overlaySource,
  sectionOverlaySource,
  sectionOverlayIds = [],
  loadImageOnDemand,
  sectionElements = [],
  originCopy,
  originButton,
} = {}) {
  if (!layer) {
    return {
      ensureAssets: () => Promise.resolve(),
      getActiveSectionIndex: () => null,
      hide: () => Promise.resolve(false),
      showForSection: () => Promise.resolve(false),
      showOrigin: () => Promise.resolve(false),
      refreshPosition() {},
    };
  }

  const sections = Array.from(sectionElements).filter(Boolean);
  const sectionOverlayIdSet = new Set(sectionOverlayIds);
  let activeSectionIndex = null;
  let activeTarget = null;
  let alpha = 0;
  let operationId = 0;
  const assetPromises = new Map();

  function attachOverlaySource(source) {
    if (image && source && image.getAttribute("src") !== source) {
      image.setAttribute("src", source);
    }
  }

  function ensureAssets(source = overlaySource) {
    if (assetPromises.has(source)) {
      return assetPromises.get(source).then((result) => {
        // The shared image can switch between the vintage origin layer and
        // the media layer. Cached assets still need to be reattached when the
        // active section changes back to a previously loaded source.
        attachOverlaySource(source);
        return result;
      });
    }

    if (!image || !source || !loadImageOnDemand) {
      const ready = Promise.resolve();
      assetPromises.set(source, ready);
      return ready;
    }

    const promise = loadImageOnDemand(image, source).then((result) => {
      attachOverlaySource(source);
      return result;
    });
    assetPromises.set(source, promise);
    return promise;
  }

  function getOverlaySource(sectionIndex, target) {
    const sectionId = sections[sectionIndex]?.dataset.sectionId;

    if (
      target === "section" &&
      sectionOverlaySource &&
      sectionOverlayIdSet.has(sectionId)
    ) {
      return sectionOverlaySource;
    }

    return overlaySource;
  }

  function setAlpha(value, duration = 0) {
    alpha = Math.max(0, Math.min(1, Number(value) || 0));
    layer.style.setProperty("--ink-alpha", alpha.toFixed(3));
    layer.style.setProperty("--ink-transition-duration", `${duration}ms`);
  }

  function getSectionPosition(sectionIndex) {
    const section = sections[sectionIndex];
    const row = layer.parentElement;

    if (!section || !row) {
      return {
        left: 0,
        width: Math.max(1, row?.clientWidth || 1),
      };
    }

    const rowRect = row.getBoundingClientRect();
    const sectionRect = section.getBoundingClientRect();
    const left = Number.isFinite(section.offsetLeft)
      ? section.offsetLeft
      : sectionRect.left - rowRect.left;

    return {
      left,
      width: Math.max(1, section.offsetWidth || sectionRect.width),
    };
  }

  function positionAtSection(sectionIndex) {
    const { left, width } = getSectionPosition(sectionIndex);
    layer.style.setProperty("--ink-left", `${left}px`);
    layer.style.setProperty("--ink-width", `${width}px`);
    layer.dataset.sectionIndex = String(sectionIndex);
  }

  function setOriginControls(isOpen) {
    originCopy?.classList.toggle("is-obscured", isOpen);

    if (!originButton) {
      return;
    }

    originButton.setAttribute("aria-expanded", String(isOpen));
    originButton.setAttribute(
      "aria-label",
      isOpen ? "隐藏卷首墨迹层" : "显示卷首墨迹层"
    );
    originButton.dataset.active = String(isOpen);
  }

  async function showAt(sectionIndex, target) {
    const normalizedIndex = Math.max(
      0,
      Math.min(sections.length - 1, Number(sectionIndex) || 0)
    );
    const nextOverlaySource = getOverlaySource(normalizedIndex, target);
    const currentOperation = ++operationId;
    const sameTarget =
      layer.classList.contains("is-open") &&
      activeSectionIndex === normalizedIndex &&
      activeTarget === target &&
      alpha >= 0.999;

    if (sameTarget) {
      return true;
    }

    const shouldHideFirst = layer.classList.contains("is-open") && alpha > 0;

    if (shouldHideFirst) {
      layer.classList.remove("is-opening");
      layer.classList.add("is-closing");
      setAlpha(0, INK_HIDE_DURATION);
      await wait(INK_HIDE_DURATION);

      if (currentOperation !== operationId) {
        return false;
      }

      layer.classList.remove("is-closing");
    } else {
      // A fast second click may arrive while the previous hide animation is
      // still waiting. Clear its visual state before reusing this layer.
      layer.classList.remove("is-closing");
    }

    await ensureAssets(nextOverlaySource);

    if (currentOperation !== operationId) {
      return false;
    }

    positionAtSection(normalizedIndex);
    activeSectionIndex = normalizedIndex;
    activeTarget = target;
    layer.dataset.target = target;
    layer.classList.add("is-open", "is-opening");
    setOriginControls(target === "origin");
    setAlpha(0, 0);
    await nextFrame();

    if (currentOperation !== operationId) {
      return false;
    }

    setAlpha(1, INK_SHOW_DURATION);
    await wait(INK_SHOW_DURATION);

    if (currentOperation !== operationId) {
      return false;
    }

    layer.classList.remove("is-opening");
    alpha = 1;
    return true;
  }

  async function hide() {
    const currentOperation = ++operationId;

    if (!layer.classList.contains("is-open") && alpha <= 0) {
      setOriginControls(false);
      return false;
    }

    layer.classList.remove("is-opening");
    layer.classList.add("is-closing");
    setAlpha(0, INK_HIDE_DURATION);
    await wait(INK_HIDE_DURATION);

    if (currentOperation !== operationId) {
      return false;
    }

    layer.classList.remove("is-open", "is-closing");
    layer.dataset.target = "";
    activeSectionIndex = null;
    activeTarget = null;
    setOriginControls(false);
    return true;
  }

  function refreshPosition() {
    if (activeSectionIndex === null) {
      return;
    }

    positionAtSection(activeSectionIndex);
  }

  window.addEventListener("resize", refreshPosition);

  layer.dataset.target = "";
  layer.dataset.sectionIndex = "";
  setAlpha(0);

  return {
    ensureAssets,
    getActiveSectionIndex: () => activeSectionIndex,
    hide,
    showForSection(sectionIndex) {
      return showAt(sectionIndex, "section");
    },
    showOrigin() {
      return showAt(0, "origin");
    },
    refreshPosition,
  };
}
