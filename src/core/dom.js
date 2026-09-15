export function getAppElements() {
  return {
    stage: document.querySelector("#bookletStage"),
    viewport: document.querySelector("#bookletViewport"),
    canvas: document.querySelector(".booklet-canvas"),
    backgroundTrack: document.querySelector("#sceneBackgroundTrack"),
    object: document.querySelector("#bookletObject"),
    surface: document.querySelector(".booklet-surface"),
    slipRow: document.querySelector("#slipRow"),
    projectionCanvas: document.querySelector("#projectionLayer"),
    rollEnd: document.querySelector("#rollEnd"),
    progressBar: document.querySelector("#rollProgressBar"),
    titleLayer: document.querySelector("#bookletTitleLayer"),
    titleInkCanvas: document.querySelector("#bookletTitleInkCanvas"),
    titleZh: document.querySelector(".booklet-title--zh"),
    titleEn: document.querySelector(".booklet-title--en"),
    originCopy: document.querySelector("#bookletOriginCopy"),
    originOverlay: document.querySelector("#bookletOriginOverlay"),
    originOverlayCopy: document.querySelector(".booklet-origin-overlay__copy"),
    originOverlayContentViewport: document.querySelector(
      ".booklet-origin-overlay__viewport"
    ),
    originOverlayContentScroll: document.querySelector(
      ".booklet-origin-overlay__scroll"
    ),
    originOverlayImage: document.querySelector(
      ".booklet-origin-overlay__vintage"
    ),
    originButton: document.querySelector("#bookletOriginButton"),
    contentSlider: document.querySelector("#bookletContentSlider"),
    contentSliderBar: document.querySelector("#bookletContentSliderBar"),
    contentSliderThumb: document.querySelector(
      "#bookletContentSliderThumb"
    ),
    languageToggle: document.querySelector("#languageToggle"),
    previousButton: document.querySelector("#sectionPrevButton"),
    nextButton: document.querySelector("#sectionNextButton"),
    loader: document.querySelector("#assetLoader"),
    loaderLabel: document.querySelector("#assetLoaderLabel"),
    loaderTrack: document.querySelector("#assetLoaderTrack"),
    loaderFill: document.querySelector("#assetLoaderFill"),
    loaderPercent: document.querySelector("#assetLoaderPercent"),
  };
}
