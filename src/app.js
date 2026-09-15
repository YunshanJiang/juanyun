import {
  ASSET_SOURCES,
  CRITICAL_ASSET_SOURCES,
  INK_REVEAL_POWER,
  ORIGIN_COPY_REVEAL_DURATION,
  PROJECTION_REVEAL_START,
  PROJECTION_SHADER_SOURCE,
  ROLL_SEGMENT_TOTAL,
  SECTION_BACKGROUND_SOURCES,
  SECTION_CACHE_LIMIT,
  SECTION_COUNT,
  SECTION_NAV_DURATION,
  SECTION_PREFETCH_RADIUS,
  SLIP_TOTAL,
  TITLE_REVEAL_END,
} from "./config/constants.js?v=20260915-3";
import { SECTIONS } from "./config/sections.js?v=20260915-3";
import { PROMO_CONTENT_PAGES } from "./config/promo-content.js?v=20260915-3";
import { FILM_CONTENT_PAGES } from "./config/film-content.js?v=20260910-1";
import { FESTIVAL_CONTENT_PAGES } from "./config/festival-content.js?v=20260912-1";
import { GAME_CONTENT_PAGES } from "./config/game-content.js?v=20260915-10";
import { CULTURE_CONTENT_PAGES } from "./config/culture-content.js?v=20260910-1";
import { TRAVEL_CONTENT_PAGES } from "./config/travel-content.js?v=20260910-1";
import { SILK_ROAD_CONTENT_PAGES } from "./config/silk-road-content.js?v=20260915-10";
import { HORSE_CONTENT_PAGES } from "./config/horse-content.js?v=20260910-1";
import { CERTIFICATION_CONTENT_PAGES } from "./config/certification-content.js?v=20260910-1";
import { createAssetLoader } from "./core/asset-loader.js";
import { getAppElements } from "./core/dom.js";
import { createLanguageController } from "./features/language/language-controller.js";
import { createOriginOverlayController } from "./features/overlay/origin-overlay-controller.js";
import { createSharedInkController } from "./features/overlay/shared-ink-controller.js?v=20260901-4";
import { createRollEndController } from "./features/roll/roll-end-controller.js?v=20260906-1";
import { createSceneController } from "./features/scene/scene-controller.js";
import { createSlipSections } from "./features/booklet/slip-factory.js?v=20260915-1";
import { createSectionContentController } from "./features/booklet/section-content-controller.js?v=20260915-6";
import { createContentSliderController } from "./features/booklet/content-slider-controller.js?v=20260915-3";
import { createFilmContentController } from "./features/booklet/film-content-controller.js?v=20260910-1";
import { createFestivalContentController } from "./features/booklet/festival-content-controller.js?v=20260911-1";
import { createPromoContentController } from "./features/booklet/promo-content-controller.js?v=20260915-1";
import { createGameContentController } from "./features/booklet/game-content-controller.js?v=20260915-6";
import { createCultureContentController } from "./features/booklet/culture-content-controller.js?v=20260910-1";
import { createTravelContentController } from "./features/booklet/travel-content-controller.js?v=20260910-1";
import { createSilkRoadContentController } from "./features/booklet/silk-road-content-controller.js?v=20260910-1";
import { createHorseContentController } from "./features/booklet/horse-content-controller.js?v=20260910-1";
import { createCertificationContentController } from "./features/booklet/certification-content-controller.js?v=20260910-1";
import { createTitleInkController } from "./features/title/title-ink-controller.js";
import { createProjectionRenderer } from "./rendering/projection-renderer.js?v=20260905-5";
import { loadShaderSource } from "./rendering/shader-loader.js";

async function bootstrap() {
  const elements = getAppElements();

  if (!elements.slipRow) {
    return;
  }

  document.documentElement.style.setProperty(
    "--section-count",
    String(SECTION_COUNT)
  );

  const assetLoader = createAssetLoader({
    elements: {
      loader: elements.loader,
      label: elements.loaderLabel,
      track: elements.loaderTrack,
      fill: elements.loaderFill,
      percent: elements.loaderPercent,
    },
    criticalSources: CRITICAL_ASSET_SOURCES,
    sectionSources: SECTION_BACKGROUND_SOURCES,
    prefetchRadius: SECTION_PREFETCH_RADIUS,
    cacheLimit: SECTION_CACHE_LIMIT,
  });

  const { sceneSections, rollSlipItems, sectionContentLayers } = createSlipSections({
    sceneBackgroundTrack: elements.backgroundTrack,
    slipRow: elements.slipRow,
    sectionSources: SECTION_BACKGROUND_SOURCES,
    sectionDefinitions: SECTIONS,
    slipSource: ASSET_SOURCES.slip,
    ropeSource: ASSET_SOURCES.rope,
    slipTotal: SLIP_TOTAL,
  });

  sceneSections.forEach((section, index) => {
    const content = SECTIONS[index];
    if (!content) {
      return;
    }
    section.dataset.sectionId = content.id;
    section.dataset.slug = content.slug;
    section.dataset.aspect = String(content.aspect);
  });

  const originSection = elements.slipRow.querySelector(
    '.slip-section[data-section="0"]'
  );
  if (originSection) {
    [
      elements.titleLayer,
      elements.originCopy,
      elements.originButton,
    ].forEach((element) => element && originSection.appendChild(element));
    // A01 now uses the same content-button flow as the other chapters. Keep
    // the old ink toggle detached from the reading surface so it cannot sit
    // on top of the promotional-film button.
    elements.originCopy.hidden = true;
    elements.originButton.hidden = true;
    elements.originButton.setAttribute("aria-hidden", "true");
    originSection.dataset.contentAttached = "true";
  }

  const sharedInkController = createSharedInkController({
    layer: elements.originOverlay,
    image: elements.originOverlayImage,
    overlaySource: ASSET_SOURCES.originOverlay,
    sectionOverlaySource: ASSET_SOURCES.sectionInkOverlay,
    sectionOverlayIds: ["A09-1", "A09-1-festivals", "A09-2", "A09-3", "A09-4"],
    loadImageOnDemand: assetLoader.loadImageOnDemand,
    sectionElements: elements.slipRow.querySelectorAll(".slip-section"),
    originCopy: elements.originCopy,
    originButton: elements.originButton,
  });

  const contentSliderController = createContentSliderController({
    slider: elements.contentSlider,
    bar: elements.contentSliderBar,
    thumb: elements.contentSliderThumb,
  });

  const promoContentLayer = sectionContentLayers.find(
    (layer) => layer.dataset.sectionId === "A01"
  );
  const promoContentController = createPromoContentController({
    layer: promoContentLayer,
    pages: PROMO_CONTENT_PAGES,
    loadImageOnDemand: assetLoader.loadImageOnDemand,
    preloadAsset: assetLoader.preloadAsset,
    sliderController: contentSliderController,
  });

  const filmContentLayer = sectionContentLayers.find(
    (layer) => layer.dataset.sectionId === "A09-1"
  );
  const filmContentController = createFilmContentController({
    layer: filmContentLayer,
    pages: FILM_CONTENT_PAGES,
    loadImageOnDemand: assetLoader.loadImageOnDemand,
    preloadAsset: assetLoader.preloadAsset,
    sliderController: contentSliderController,
  });

  const gameContentLayer = sectionContentLayers.find(
    (layer) => layer.dataset.sectionId === "A09-2"
  );
  const gameContentController = createGameContentController({
    layer: gameContentLayer,
    pages: GAME_CONTENT_PAGES,
    loadImageOnDemand: assetLoader.loadImageOnDemand,
    preloadAsset: assetLoader.preloadAsset,
    sliderController: contentSliderController,
  });

  const festivalContentLayer = sectionContentLayers.find(
    (layer) => layer.dataset.sectionId === "A09-1-festivals"
  );
  const festivalContentController = createFestivalContentController({
    layer: festivalContentLayer,
    pages: FESTIVAL_CONTENT_PAGES,
    loadImageOnDemand: assetLoader.loadImageOnDemand,
    preloadAsset: assetLoader.preloadAsset,
    sliderController: contentSliderController,
  });

  const cultureContentLayer = sectionContentLayers.find(
    (layer) => layer.dataset.sectionId === "A09-3"
  );
  const cultureContentController = createCultureContentController({
    layer: cultureContentLayer,
    pages: CULTURE_CONTENT_PAGES,
    loadImageOnDemand: assetLoader.loadImageOnDemand,
    preloadAsset: assetLoader.preloadAsset,
    sliderController: contentSliderController,
  });

  const travelContentLayer = sectionContentLayers.find(
    (layer) => layer.dataset.sectionId === "A09-4"
  );
  const travelContentController = createTravelContentController({
    layer: travelContentLayer,
    pages: TRAVEL_CONTENT_PAGES,
    loadImageOnDemand: assetLoader.loadImageOnDemand,
    preloadAsset: assetLoader.preloadAsset,
    sliderController: contentSliderController,
  });

  const silkRoadContentLayer = sectionContentLayers.find(
    (layer) => layer.dataset.sectionId === "A03"
  );
  const silkRoadContentController = createSilkRoadContentController({
    layer: silkRoadContentLayer,
    pages: SILK_ROAD_CONTENT_PAGES,
    loadImageOnDemand: assetLoader.loadImageOnDemand,
    preloadAsset: assetLoader.preloadAsset,
    sliderController: contentSliderController,
  });

  const horseContentLayer = sectionContentLayers.find(
    (layer) => layer.dataset.sectionId === "A02"
  );
  const horseContentController = createHorseContentController({
    layer: horseContentLayer,
    pages: HORSE_CONTENT_PAGES,
    loadImageOnDemand: assetLoader.loadImageOnDemand,
    preloadAsset: assetLoader.preloadAsset,
    sliderController: contentSliderController,
  });

  const certificationContentLayer = sectionContentLayers.find(
    (layer) => layer.dataset.sectionId === "A11"
  );
  const certificationContentController = createCertificationContentController({
    layer: certificationContentLayer,
    pages: CERTIFICATION_CONTENT_PAGES,
    loadImageOnDemand: assetLoader.loadImageOnDemand,
    preloadAsset: assetLoader.preloadAsset,
    sliderController: contentSliderController,
  });

  const sectionContentController = createSectionContentController({
    layers: sectionContentLayers,
    inkController: sharedInkController,
    sliderController: contentSliderController,
    promoContentController,
    filmContentController,
    gameContentController,
    cultureContentController,
    travelContentController,
    silkRoadContentController,
    horseContentController,
    certificationContentController,
    festivalContentController,
  });

  const integrationEvents = {};
  const sceneController = createSceneController({
    bookletViewport: elements.viewport,
    sceneBackgroundTrack: elements.backgroundTrack,
    sceneSections,
    previousButton: elements.previousButton,
    nextButton: elements.nextButton,
    sectionCount: SECTION_COUNT,
    navigationDuration: SECTION_NAV_DURATION,
    events: integrationEvents,
  });

  const titleSourceImages = {
    zh: elements.titleZh,
    en: elements.titleEn,
  };
  const titleSourcePaths = {
    zh: ASSET_SOURCES.titleZh,
    en: ASSET_SOURCES.titleEn,
  };
  const titleInkRenderer = createTitleInkController({
    layer: elements.titleLayer,
    canvas: elements.titleInkCanvas,
    sourceImages: titleSourceImages,
    sourcePaths: titleSourcePaths,
    preloadedAssets: assetLoader.preloadedAssets,
  });

  const overlayController = createOriginOverlayController({
    overlay: elements.originOverlay,
    button: elements.originButton,
    overlayCopy: elements.originOverlayCopy,
    overlayImage: elements.originOverlayImage,
    overlaySource: ASSET_SOURCES.originOverlay,
    loadImageOnDemand: assetLoader.loadImageOnDemand,
    originCopy: elements.originCopy,
    sharedInkController,
    sliderController: contentSliderController,
    originSection,
    originContentViewport: elements.originOverlayContentViewport,
    originContentScroll: elements.originOverlayContentScroll,
    onOpen: () => sectionContentController.closeAll({ hideInk: false }),
  });

  createLanguageController({
    toggle: elements.languageToggle,
    titleLayer: elements.titleLayer,
    originCopy: elements.originCopy,
    overlayCopy: elements.originOverlayCopy,
    titleSourceImages,
    titleSourcePaths,
    loadImageOnDemand: assetLoader.loadImageOnDemand,
    titleInkRenderer,
    sectionContentController,
    sliderController: contentSliderController,
  });

  let shaderSource = "";
  const shaderResult = await loadShaderSource(PROJECTION_SHADER_SOURCE).catch(
    (error) => ({ error })
  );
  if (typeof shaderResult === "string") {
    shaderSource = shaderResult;
  } else {
    console.error(shaderResult.error);
  }

  const projectionRenderer = createProjectionRenderer({
    canvas: elements.projectionCanvas,
    slipRow: elements.slipRow,
    bookletViewport: elements.viewport,
    sectionSources: SECTION_BACKGROUND_SOURCES,
    getCurrentSectionIndex: sceneController.getCurrentIndex,
    requestSectionBackgroundsAround:
      assetLoader.requestSectionBackgroundsAround,
    fragmentSource: shaderSource,
    paperMaskSource: ASSET_SOURCES.paperMask,
    paperMaskPromise: assetLoader.preloadAsset(ASSET_SOURCES.paperMask),
  });

  assetLoader.setSectionImageReadyCallback(
    projectionRenderer.uploadSectionProjectionTexture
  );
  assetLoader.setReleaseSectionTexture(projectionRenderer.releaseSectionTexture);

  integrationEvents.onWarmSections =
    assetLoader.requestSectionBackgroundsAround;
  integrationEvents.onCameraMotion = projectionRenderer.beginCameraMotion;
  integrationEvents.onViewportSync = () => {
    contentSliderController.syncHitSurface?.();
    sectionContentController.syncHitProxy?.();
    projectionRenderer.syncViewportBounds();
  };
  integrationEvents.onCameraSettled = () => {
    sectionContentController.setCurrentSectionIndex?.(
      sceneController.getCurrentIndex()
    );
    projectionRenderer.scheduleCameraSettled();
  };
  sectionContentController.setCurrentSectionIndex?.(
    sceneController.getCurrentIndex()
  );
  integrationEvents.syncProjectionReveal =
    projectionRenderer.syncProjectionReveal;
  integrationEvents.markProjectionViewportRevealed =
    projectionRenderer.markViewportRevealed;
  integrationEvents.alignViewportRightEdge =
    sceneController.alignBookletViewportRightEdge;

  const rollController = createRollEndController({
    bookletStage: elements.stage,
    bookletObject: elements.object,
    bookletSurface: elements.surface,
    slipRow: elements.slipRow,
    rollEnd: elements.rollEnd,
    progressBar: elements.progressBar,
    bookletTitleLayer: elements.titleLayer,
    bookletOriginCopy: elements.originCopy,
    bookletOriginButton: elements.originButton,
    rollSlipItems,
    rollSegmentTotal: ROLL_SEGMENT_TOTAL,
    inkRevealPower: INK_REVEAL_POWER,
    titleRevealEnd: TITLE_REVEAL_END,
    projectionRevealStart: PROJECTION_REVEAL_START,
    originCopyRevealDuration: ORIGIN_COPY_REVEAL_DURATION,
    titleInkRenderer,
    events: integrationEvents,
  });

  assetLoader.criticalAssetsReady.then((results) => {
    projectionRenderer.markReady();
    sceneController.alignBookletViewportRightEdge();
    rollController.start(results);
  });

  window.bookletApp = Object.freeze({
    assetLoader,
    overlayController,
    sharedInkController,
    contentSliderController,
    filmContentController,
    festivalContentController,
    gameContentController,
    cultureContentController,
    travelContentController,
    silkRoadContentController,
    horseContentController,
    projectionRenderer,
    rollController,
    sectionContentController,
    sceneController,
    sections: SECTIONS,
  });
}

bootstrap().catch((error) => {
  console.error("卷云传初始化失败。", error);
  document.body.classList.remove("is-loading");
});
