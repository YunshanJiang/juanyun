export function createOriginOverlayController({
  overlay,
  button,
  overlayCopy,
  overlayImage,
  overlaySource,
  loadImageOnDemand,
  originCopy,
  sharedInkController,
  sliderController,
  originSection,
  originContentViewport,
  originContentScroll,
  onOpen,
}) {
  let animationTimer = 0;
  let assetsPromise = null;

  function ensureAssets() {
    if (assetsPromise) {
      return assetsPromise;
    }

    assetsPromise = sharedInkController
      ? sharedInkController.ensureAssets()
      : loadImageOnDemand(overlayImage, overlaySource);
    return assetsPromise;
  }

  function setOriginSlider(isOpen) {
    if (!sliderController) {
      return;
    }

    if (!isOpen) {
      sliderController.clearTarget();
      return;
    }

    sliderController.setTarget({
      id: "juan-shou",
      sectionIndex: 0,
      section: originSection,
      viewport: originContentViewport,
      scroll: originContentScroll,
    });
  }

  async function setOpen(isOpen) {
    if (sharedInkController) {
      if (isOpen) {
        onOpen?.();
        const result = await sharedInkController.showOrigin();
        if (result) {
          setOriginSlider(true);
        }
        return result;
      }

      setOriginSlider(false);
      return sharedInkController.hide();
    }

    if (!overlay || !button) {
      return Promise.resolve(false);
    }

    window.clearTimeout(animationTimer);
    overlay.classList.remove("is-opening", "is-closing");

    if (isOpen) {
      overlay.classList.add("is-open", "is-opening");
    } else {
      overlay.classList.remove("is-open");
      overlay.classList.add("is-closing");
    }

    overlay.setAttribute("aria-hidden", String(!isOpen));
    button.setAttribute("aria-expanded", String(isOpen));
    button.setAttribute(
      "aria-label",
      isOpen ? "隐藏卷首墨迹层" : "显示卷首墨迹层"
    );
    button.dataset.active = String(isOpen);
    originCopy?.classList.toggle("is-obscured", isOpen);
    setOriginSlider(isOpen);

    animationTimer = window.setTimeout(
      () => overlay.classList.remove("is-opening", "is-closing"),
      isOpen ? 1750 : 900
    );

    return Promise.resolve(true);
  }

  button?.addEventListener("click", async () => {
    const isOpening = button.getAttribute("aria-expanded") !== "true";

    if (isOpening) {
      button.disabled = true;
      try {
        await ensureAssets();
        await setOpen(true);
      } finally {
        button.disabled = false;
      }
      return;
    }

    await setOpen(false);
  });

  return {
    ensureAssets,
    setOpen,
    setLanguage(language) {
      overlayCopy?.setAttribute(
        "data-language",
        language === "en" ? "en" : "zh"
      );
      sliderController?.refresh();
    },
  };
}
