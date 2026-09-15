import { createFilmContentDetail } from "./film-content-controller.js?v=20260910-1";
import { createGameContentDetail } from "./game-content-controller.js?v=20260915-6";
import { createCultureContentDetail } from "./culture-content-controller.js?v=20260910-1";
import { createTravelContentDetail } from "./travel-content-controller.js?v=20260910-1";
import { createSilkRoadContentDetail } from "./silk-road-content-controller.js?v=20260906-1";
import { createHorseContentDetail } from "./horse-content-controller.js?v=20260908-1";
import { createCertificationContentDetail } from "./certification-content-controller.js?v=20260910-1";
import { createFestivalContentDetail } from "./festival-content-controller.js?v=20260911-1";
import { createPromoContentDetail } from "./promo-content-controller.js?v=20260915-1";

const LANGUAGES = ["zh", "en"];
const SPECIAL_CONTENT_KINDS = Object.freeze({
  A01: "promo",
  A03: "silkroad",
  A02: "horse",
  "A09-1": "film",
  "A09-1-festivals": "festival",
  "A09-2": "game",
  "A09-3": "culture",
  "A09-4": "travel",
  A11: "certification",
  A12: "contact",
});
const SPECIAL_DETAIL_FACTORIES = Object.freeze({
  promo: createPromoContentDetail,
  film: createFilmContentDetail,
  game: createGameContentDetail,
  culture: createCultureContentDetail,
  travel: createTravelContentDetail,
  silkroad: createSilkRoadContentDetail,
  horse: createHorseContentDetail,
  certification: createCertificationContentDetail,
  festival: createFestivalContentDetail,
});

function addLanguageText(parent, className, tagName, copy, key) {
  LANGUAGES.forEach((language) => {
    const element = document.createElement(tagName);
    element.className = `${className} section-content__language--${language}`;
    element.textContent = copy?.[language]?.[key] || "";
    parent.appendChild(element);
  });
}

function addContactSummary(parent, copy) {
  const contact = document.createElement("div");
  contact.className = "section-content-contact";

  LANGUAGES.forEach((language) => {
    const languagePanel = document.createElement("div");
    languagePanel.className = `section-content-contact__language section-content__language--${language}`;

    const core = document.createElement("p");
    core.className = "section-content-contact__core";
    core.textContent = copy?.[language]?.core || "";

    const email = document.createElement("a");
    const address = copy?.[language]?.email || "";
    email.className = "section-content-contact__email";
    email.href = address ? `mailto:${address}` : "#";
    email.textContent = address;
    email.setAttribute("aria-label", address ? `Email ${address}` : "Email");

    const qrGrid = document.createElement("div");
    qrGrid.className = "section-content-contact__qr-grid";
    const qrItems = [
      {
        key: "whatsapp",
        label: language === "zh" ? "WhatsApp" : "WhatsApp",
        alt: language === "zh" ? "WhatsApp 二维码" : "WhatsApp QR code",
      },
      {
        key: "wechat",
        label: language === "zh" ? "微信" : "WeChat",
        alt: language === "zh" ? "微信二维码" : "WeChat QR code",
      },
    ];

    qrItems.forEach(({ key, label, alt }) => {
      const figure = document.createElement("figure");
      const image = document.createElement("img");
      const caption = document.createElement("figcaption");

      figure.className = "section-content-contact__qr-item";
      image.className = "section-content-contact__qr";
      image.src = copy?.qr?.[key] || "";
      image.alt = alt;
      image.loading = "lazy";
      image.decoding = "async";
      image.draggable = false;
      caption.textContent = label;
      figure.append(image, caption);
      qrGrid.appendChild(figure);
    });

    languagePanel.append(core, email, qrGrid);
    contact.appendChild(languagePanel);
  });

  parent.appendChild(contact);
}

export function createSectionContentLayer(section, sectionIndex) {
  if (!section || !section.copy || !section.icon) {
    return null;
  }

  const layer = document.createElement("div");
  const summary = document.createElement("div");
  const summaryViewport = document.createElement("div");
  const summaryScroll = document.createElement("div");
  const detail = document.createElement("div");
  const detailViewport = document.createElement("div");
  const detailScroll = document.createElement("div");
  const iconButton = document.createElement("button");
  const icon = document.createElement("img");

  layer.className = "section-content-layer";
  layer.dataset.sectionContent = "true";
  layer.dataset.sectionIndex = String(sectionIndex);
  layer.dataset.sectionId = section.id;
  layer.dataset.language = "zh";
  layer.dataset.open = "false";
  layer.dataset.contentKind = SPECIAL_CONTENT_KINDS[section.id] || "standard";

  summary.className = "section-content-summary";
  summary.setAttribute("aria-hidden", "false");
  summaryViewport.className = "section-content-summary__viewport";
  summaryScroll.className = "section-content-summary__scroll";
  addLanguageText(
    summaryScroll,
    "section-content__headline",
    "p",
    section.copy,
    "title"
  );
  addLanguageText(
    summaryScroll,
    "section-content__quote",
    "p",
    section.copy,
    "quote"
  );
  const isContact = layer.dataset.contentKind === "contact";
  if (isContact) {
    addContactSummary(summaryScroll, section.copy);
    summaryViewport.appendChild(summaryScroll);
    summary.appendChild(summaryViewport);
    layer.append(summary);
    return layer;
  }

  summaryViewport.appendChild(summaryScroll);
  summary.appendChild(summaryViewport);

  detail.className = "section-content-detail";
  detail.setAttribute("aria-hidden", "true");
  if (SPECIAL_DETAIL_FACTORIES[layer.dataset.contentKind]) {
    const mediaDetail = SPECIAL_DETAIL_FACTORIES[layer.dataset.contentKind]();
    detail.append(mediaDetail.frame, mediaDetail.navigation);
  } else {
    detailViewport.className = "section-content-detail__viewport";
    detailScroll.className = "section-content-detail__scroll";
    addLanguageText(
      detailScroll,
      "section-content__core",
      "p",
      section.copy,
      "core"
    );
    addLanguageText(
      detailScroll,
      "section-content__short",
      "p",
      section.copy,
      "short"
    );
    if (section.copy?.zh?.email || section.copy?.en?.email) {
      const email = document.createElement("div");
      email.className = "section-content__email";
      LANGUAGES.forEach((language) => {
        const address = section.copy?.[language]?.email || "";
        const link = document.createElement("a");
        link.className = "section-content__language--" + language;
        link.href = "mailto:" + address;
        link.textContent = address;
        link.setAttribute("aria-label", "Email " + address);
        email.appendChild(link);
      });
      detailScroll.appendChild(email);
    }
    detailViewport.appendChild(detailScroll);
    detail.appendChild(detailViewport);
  }

  iconButton.className = "section-content-button";
  iconButton.type = "button";
  iconButton.dataset.active = "false";
  iconButton.setAttribute("aria-expanded", "false");
  iconButton.setAttribute("aria-controls", `section-content-${section.id}`);
  iconButton.setAttribute("aria-label", "显示完整文案");

  icon.className = "section-content-button__image";
  icon.src = section.icon;
  icon.alt = "";
  icon.draggable = false;
  iconButton.appendChild(icon);

  detail.id = `section-content-${section.id}`;
  layer.append(summary, detail, iconButton);

  return layer;
}

export function createSectionContentController({
  layers = [],
  inkController,
  sliderController,
  promoContentController,
  filmContentController,
  gameContentController,
  cultureContentController,
  travelContentController,
  silkRoadContentController,
  horseContentController,
  certificationContentController,
  festivalContentController,
} = {}) {
  const contentLayers = Array.from(layers).filter(Boolean);
  const stage = contentLayers[0]?.closest(".booklet-stage") || null;
  const buttonHitProxy = document.createElement("button");
  const linkHitProxyLayer = document.createElement("div");
  const toggleByLayer = new Map();
  let language = "zh";
  let activeLayer = null;
  let activeSummaryLayer = null;
  let proxyLayer = null;
  let proxySyncFrame = 0;
  let proxyHideTimerId = 0;
  let proxyForwardLink = null;
  let linkProxySyncFrame = 0;
  let linkProxySyncRunning = false;
  const linkProxies = new Map();

  buttonHitProxy.className = "section-content-button-hit-proxy";
  buttonHitProxy.type = "button";
  buttonHitProxy.tabIndex = -1;
  buttonHitProxy.setAttribute("aria-hidden", "true");
  buttonHitProxy.dataset.visible = "false";
  stage?.appendChild(buttonHitProxy);

  linkHitProxyLayer.className = "section-content-link-hit-proxy-layer";
  linkHitProxyLayer.setAttribute("aria-hidden", "true");
  stage?.appendChild(linkHitProxyLayer);

  function syncButtonHitProxy() {
    const button = proxyLayer?.querySelector(".section-content-button");
    if (!button || !stage) {
      return;
    }

    const buttonRect = button.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();
    // The visible button lives inside the perspective-transformed booklet.
    // On touch browsers its painted circle and its hit-test polygon can
    // diverge by a few pixels while the horizontal viewport is settling.
    // Keep a flat stage-level target around it and make that target slightly
    // more forgiving on coarse pointers.
    const hasCoarsePointer =
      window.matchMedia?.("(pointer: coarse)").matches ||
      window.matchMedia?.("(hover: none)").matches;
    const hitPadding = hasCoarsePointer
      ? Math.min(14, Math.max(8, buttonRect.width * 0.18))
      : 0;
    buttonHitProxy.style.left = `${buttonRect.left - stageRect.left - hitPadding}px`;
    buttonHitProxy.style.top = `${buttonRect.top - stageRect.top - hitPadding}px`;
    buttonHitProxy.style.width = `${buttonRect.width + hitPadding * 2}px`;
    buttonHitProxy.style.height = `${buttonRect.height + hitPadding * 2}px`;
  }

  function hideLinkHitProxies() {
    linkProxies.forEach((proxy) => {
      proxy.dataset.visible = "false";
    });
  }

  function getClippedRect(rect, clipRects) {
    let left = rect.left;
    let top = rect.top;
    let right = rect.right;
    let bottom = rect.bottom;

    clipRects.forEach((clipRect) => {
      left = Math.max(left, clipRect.left);
      top = Math.max(top, clipRect.top);
      right = Math.min(right, clipRect.right);
      bottom = Math.min(bottom, clipRect.bottom);
    });

    if (right <= left || bottom <= top) {
      return null;
    }

    return { left, top, right, bottom };
  }

  function getOrCreateLinkProxy(anchor) {
    let proxy = linkProxies.get(anchor);
    if (proxy) {
      return proxy;
    }

    proxy = document.createElement("a");
    proxy.className = "section-content-link-hit-proxy";
    proxy.tabIndex = -1;
    proxy.setAttribute("aria-hidden", "true");
    proxy.dataset.visible = "false";
    linkHitProxyLayer.appendChild(proxy);
    linkProxies.set(anchor, proxy);
    return proxy;
  }

  function syncLinkHitProxies() {
    if (
      !stage ||
      !activeLayer ||
      activeLayer.dataset.open !== "true" ||
      !linkHitProxyLayer
    ) {
      hideLinkHitProxies();
      return;
    }

    const detailViewport = activeLayer.querySelector(
      ".section-content-detail__viewport"
    );
    const stageRect = stage.getBoundingClientRect();
    const viewportRect = detailViewport?.getBoundingClientRect();
    const bookletViewportRect = stage
      .querySelector(".booklet-viewport")
      ?.getBoundingClientRect();

    if (
      !detailViewport ||
      !viewportRect ||
      viewportRect.width <= 0 ||
      viewportRect.height <= 0 ||
      stageRect.width <= 0 ||
      stageRect.height <= 0
    ) {
      hideLinkHitProxies();
      return;
    }

    const clipRects = [stageRect, viewportRect, bookletViewportRect].filter(
      (rect) => rect && rect.width > 0 && rect.height > 0
    );
    const anchors = Array.from(
      activeLayer.querySelectorAll(".section-content-detail a[href]")
    );
    const activeAnchors = new Set(anchors);
    const visibleAnchors = new Set();

    anchors.forEach((anchor) => {
      const anchorRect = anchor.getBoundingClientRect();
      if (anchorRect.width <= 0 || anchorRect.height <= 0) {
        return;
      }

      const visibleRect = getClippedRect(anchorRect, clipRects);
      if (!visibleRect) {
        return;
      }

      const proxy = getOrCreateLinkProxy(anchor);
      proxy.href = anchor.href;
      if (anchor.target) {
        proxy.target = anchor.target;
      } else {
        proxy.removeAttribute("target");
      }
      if (anchor.rel) {
        proxy.rel = anchor.rel;
      } else {
        proxy.removeAttribute("rel");
      }
      proxy.style.left = `${visibleRect.left - stageRect.left}px`;
      proxy.style.top = `${visibleRect.top - stageRect.top}px`;
      proxy.style.width = `${visibleRect.right - visibleRect.left}px`;
      proxy.style.height = `${visibleRect.bottom - visibleRect.top}px`;
      proxy.dataset.visible = "true";
      visibleAnchors.add(anchor);
    });

    linkProxies.forEach((proxy, anchor) => {
      if (!activeAnchors.has(anchor) || !visibleAnchors.has(anchor)) {
        proxy.dataset.visible = "false";
      }
    });
  }

  function stopLinkHitProxySync() {
    linkProxySyncRunning = false;
    window.cancelAnimationFrame(linkProxySyncFrame);
    linkProxySyncFrame = 0;
    hideLinkHitProxies();
  }

  function startLinkHitProxySync() {
    if (!stage || linkProxySyncRunning) {
      syncLinkHitProxies();
      return;
    }

    linkProxySyncRunning = true;
    syncLinkHitProxies();
    const sync = () => {
      if (
        !linkProxySyncRunning ||
        !activeLayer ||
        activeLayer.dataset.open !== "true"
      ) {
        stopLinkHitProxySync();
        return;
      }

      syncLinkHitProxies();
      linkProxySyncFrame = window.requestAnimationFrame(sync);
    };
    linkProxySyncFrame = window.requestAnimationFrame(sync);
  }

  function showButtonHitProxy(layer) {
    proxyLayer = layer;
    buttonHitProxy.dataset.visible = "true";
    startLinkHitProxySync();
    window.clearTimeout(proxyHideTimerId);
    window.cancelAnimationFrame(proxySyncFrame);

    // Sync immediately, then keep following the transformed section while
    // it settles. This proxy is also kept for the closed summary, because a
    // first mobile tap must not depend on the transformed button's native
    // hit-test region.
    syncButtonHitProxy();
    const syncUntil = performance.now() + 720;
    const sync = (time) => {
      if (proxyLayer !== layer || buttonHitProxy.dataset.visible !== "true") {
        proxySyncFrame = 0;
        return;
      }
      syncButtonHitProxy();
      if (time < syncUntil) {
        proxySyncFrame = requestAnimationFrame(sync);
      } else {
        proxySyncFrame = 0;
      }
    };
    proxySyncFrame = requestAnimationFrame(sync);
  }

  function keepButtonHitProxyDuringClose(layer) {
    if (proxyLayer !== layer) {
      proxyLayer = layer;
    }
    buttonHitProxy.dataset.visible = "true";
    window.clearTimeout(proxyHideTimerId);
    window.cancelAnimationFrame(proxySyncFrame);
    syncButtonHitProxy();
    // Keep the flat target over the button while it animates back to its
    // closed position. This makes a close followed by an immediate reopen
    // use the same reliable hit target instead of the moving 3D button.
    const syncUntil = performance.now() + 720;
    const sync = (time) => {
      if (proxyLayer !== layer || buttonHitProxy.dataset.visible !== "true") {
        proxySyncFrame = 0;
        return;
      }
      syncButtonHitProxy();
      if (time < syncUntil) {
        proxySyncFrame = requestAnimationFrame(sync);
      } else {
        proxySyncFrame = 0;
      }
    };
    proxySyncFrame = requestAnimationFrame(sync);
    proxyHideTimerId = window.setTimeout(() => {
      if (proxyLayer === layer && layer.dataset.open !== "true") {
        // Keep the flat target active for the closed summary. Navigation or
        // closeAll() explicitly hides it when the visible section changes.
        syncButtonHitProxy();
      }
      proxyHideTimerId = 0;
    }, 720);
  }

  function hideButtonHitProxy(layer = proxyLayer) {
    if (layer && proxyLayer !== layer) {
      return;
    }
    window.cancelAnimationFrame(proxySyncFrame);
    proxySyncFrame = 0;
    window.clearTimeout(proxyHideTimerId);
    proxyHideTimerId = 0;
    proxyLayer = null;
    buttonHitProxy.dataset.visible = "false";
    stopLinkHitProxySync();
  }

  function getSliderTarget(layer, surface = "detail") {
    const isSummary = surface === "summary";
    const baseId = layer.dataset.sectionId || layer.dataset.sectionIndex;
    const targetLanguage = isSummary ? language : null;
    return {
      id: isSummary
        ? `${baseId}:summary:${targetLanguage}`
        : baseId,
      sectionIndex: Number(layer.dataset.sectionIndex),
      section: layer.closest(".slip-section"),
      surface,
      language: targetLanguage,
      contentKind: layer.dataset.contentKind,
      viewport: layer.querySelector(
        isSummary
          ? ".section-content-summary__viewport"
          : ".section-content-detail__viewport"
      ),
      scroll: layer.querySelector(
        isSummary
          ? ".section-content-summary__scroll"
          : ".section-content-detail__scroll"
      ),
    };
  }

  function setSummarySection(sectionIndex) {
    if (activeLayer) {
      return;
    }

    const targetLayer = contentLayers.find(
      (layer) => Number(layer.dataset.sectionIndex) === Number(sectionIndex)
    );
    if (!targetLayer) {
      activeSummaryLayer = null;
      hideButtonHitProxy();
      sliderController?.clearTarget();
      return;
    }

    if (activeSummaryLayer === targetLayer) {
      if (
        proxyLayer !== targetLayer ||
        buttonHitProxy.dataset.visible !== "true"
      ) {
        showButtonHitProxy(targetLayer);
      }
      sliderController?.refresh();
      return;
    }

    activeSummaryLayer = targetLayer;
    // A flat, forgiving target keeps the first tap reliable on mobile even
    // though the visible summary button remains inside the tilted booklet.
    showButtonHitProxy(targetLayer);
    sliderController?.setTarget(getSliderTarget(targetLayer, "summary"));
  }

  function updateLayerState(layer, isOpen) {
    layer.dataset.open = String(isOpen);
    const summary = layer.querySelector(".section-content-summary");
    const detail = layer.querySelector(".section-content-detail");
    const button = layer.querySelector(".section-content-button");

    summary?.setAttribute("aria-hidden", String(isOpen));
    detail?.setAttribute("aria-hidden", String(!isOpen));
    button?.setAttribute("aria-expanded", String(isOpen));
    button?.setAttribute(
      "aria-label",
      isOpen ? "隐藏完整文案" : "显示完整文案"
    );
    if (button) {
      button.dataset.active = String(isOpen);
    }
  }

  function syncSpecializedLayer(layer, isOpen) {
    const controllers = {
      promo: promoContentController,
      silkroad: silkRoadContentController,
      horse: horseContentController,
      film: filmContentController,
      game: gameContentController,
      culture: cultureContentController,
      travel: travelContentController,
      certification: certificationContentController,
      festival: festivalContentController,
    };
    controllers[layer.dataset.contentKind]?.setOpen?.(layer, isOpen);
  }

  function setLanguage(nextLanguage) {
    language = nextLanguage === "en" ? "en" : "zh";
    contentLayers.forEach((layer) => {
      layer.dataset.language = language;
    });
    filmContentController?.setLanguage(language);
    promoContentController?.setLanguage(language);
    gameContentController?.setLanguage(language);
    cultureContentController?.setLanguage(language);
    travelContentController?.setLanguage(language);
    silkRoadContentController?.setLanguage(language);
    horseContentController?.setLanguage(language);
    certificationContentController?.setLanguage(language);
    festivalContentController?.setLanguage(language);
    if (activeSummaryLayer && !activeLayer) {
      sliderController?.setTarget(
        getSliderTarget(activeSummaryLayer, "summary")
      );
    } else {
      sliderController?.refresh();
    }
  }

  function closeAll({ hideInk = true } = {}) {
    contentLayers.forEach((layer) => {
      updateLayerState(layer, false);
      syncSpecializedLayer(layer, false);
    });
    activeLayer = null;
    activeSummaryLayer = null;
    hideButtonHitProxy();
    sliderController?.clearTarget();

    if (hideInk) {
      inkController?.hide();
    }
  }

  contentLayers.forEach((layer) => {
    const button = layer.querySelector(".section-content-button");
    let suppressPointerClick = false;
    let pointerClickResetId = 0;
    const toggleLayer = () => {
      const isOpen = layer.dataset.open === "true";

      if (isOpen) {
        keepButtonHitProxyDuringClose(layer);
        updateLayerState(layer, false);
        syncSpecializedLayer(layer, false);
        if (activeLayer === layer) {
          activeLayer = null;
          activeSummaryLayer = layer;
          sliderController?.setTarget(getSliderTarget(layer, "summary"));
          inkController?.hide();
        }
        return;
      }

      contentLayers.forEach((otherLayer) => {
        if (otherLayer !== layer) {
          updateLayerState(otherLayer, false);
          syncSpecializedLayer(otherLayer, false);
        }
      });
      sliderController?.clearTarget();
      activeLayer = layer;
      activeSummaryLayer = null;
      updateLayerState(layer, true);
      showButtonHitProxy(layer);
      syncSpecializedLayer(layer, true);
      sliderController?.setTarget(getSliderTarget(layer));
      inkController?.showForSection(Number(layer.dataset.sectionIndex));
    };
    toggleByLayer.set(layer, toggleLayer);

    button?.addEventListener("pointerdown", (event) => {
      if (
        event.isPrimary === false ||
        (event.pointerType !== "touch" && event.button !== 0)
      ) {
        return;
      }

      // The media button changes position as the detail opens. Activating on
      // pointerdown keeps the control reliable even if that movement prevents
      // the browser from producing a matching click on pointerup.
      event.preventDefault();
      button.focus({ preventScroll: true });
      suppressPointerClick = true;
      window.clearTimeout(pointerClickResetId);
      pointerClickResetId = window.setTimeout(() => {
        suppressPointerClick = false;
      }, 250);
      toggleLayer();
    });
    button?.addEventListener("click", () => {
      if (suppressPointerClick) {
        suppressPointerClick = false;
        window.clearTimeout(pointerClickResetId);
        return;
      }

      // Some transformed controls can receive click without a matching
      // pointerdown. This fallback also covers keyboard and assistive tools.
      toggleLayer();
    });
    updateLayerState(layer, false);
    syncSpecializedLayer(layer, false);
  });

  let suppressProxyClick = false;
  let proxyClickResetId = 0;
  function getInteractiveLinkBelowProxy(clientX, clientY) {
    const previousPointerEvents = buttonHitProxy.style.pointerEvents;
    buttonHitProxy.style.pointerEvents = "none";
    const elementBelow = document.elementFromPoint(clientX, clientY);
    buttonHitProxy.style.pointerEvents = previousPointerEvents;
    return elementBelow?.closest?.("a[href]") || null;
  }

  buttonHitProxy.addEventListener("pointerdown", (event) => {
    if (
      event.isPrimary === false ||
      (event.pointerType !== "touch" && event.button !== 0) ||
      !proxyLayer
    ) {
      return;
    }
    const linkBelow = getInteractiveLinkBelowProxy(
      event.clientX,
      event.clientY
    );
    if (linkBelow) {
      // The proxy is above transformed content for reliable button
      // activation. If a scrolled link is underneath it, forward the click
      // to that link instead of toggling the content layer.
      proxyForwardLink = linkBelow;
      return;
    }
    proxyForwardLink = null;
    event.preventDefault();
    suppressProxyClick = true;
    window.clearTimeout(proxyClickResetId);
    proxyClickResetId = window.setTimeout(() => {
      suppressProxyClick = false;
    }, 250);
    toggleByLayer.get(proxyLayer)?.();
  });
  buttonHitProxy.addEventListener("click", (event) => {
    const linkBelow =
      proxyForwardLink ||
      getInteractiveLinkBelowProxy(event.clientX, event.clientY);
    proxyForwardLink = null;
    if (linkBelow) {
      linkBelow.click();
      return;
    }
    if (suppressProxyClick) {
      suppressProxyClick = false;
      window.clearTimeout(proxyClickResetId);
      return;
    }
    toggleByLayer.get(proxyLayer)?.();
  });

  window.addEventListener("resize", syncButtonHitProxy);

  setLanguage(language);

  return {
    getLanguage: () => language,
    setLanguage,
    setCurrentSectionIndex: setSummarySection,
    closeAll,
    syncHitProxy: () => {
      if (buttonHitProxy.dataset.visible === "true") {
        syncButtonHitProxy();
      }
      syncLinkHitProxies();
    },
    setOpen(layer, isOpen) {
      if (contentLayers.includes(layer)) {
        const shouldOpen = Boolean(isOpen);
        if (shouldOpen) {
          contentLayers.forEach((otherLayer) => {
            if (otherLayer !== layer) {
              updateLayerState(otherLayer, false);
              syncSpecializedLayer(otherLayer, false);
            }
          });
          activeLayer = layer;
          activeSummaryLayer = null;
          updateLayerState(layer, true);
          showButtonHitProxy(layer);
          syncSpecializedLayer(layer, true);
          sliderController?.setTarget(getSliderTarget(layer));
        } else {
          updateLayerState(layer, false);
          keepButtonHitProxyDuringClose(layer);
          syncSpecializedLayer(layer, false);
          if (activeLayer === layer) {
            activeLayer = null;
            activeSummaryLayer = layer;
            sliderController?.setTarget(getSliderTarget(layer, "summary"));
          }
        }
      }
    },
  };
}
