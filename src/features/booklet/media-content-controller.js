import { ASSET_SOURCES } from "../../config/constants.js?v=20260901-4";

function createTextElement(tagName, className, text = "") {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = text;
  return element;
}

function setEmphasizedText(element, text = "", terms = []) {
  element.replaceChildren();
  const value = String(text || "");
  const matches = Array.from(new Set(terms.filter(Boolean))).sort(
    (left, right) => right.length - left.length
  );

  if (!matches.length) {
    element.textContent = value;
    return;
  }

  const pattern = new RegExp(
    matches.map((term) => term.replace(/[.*+?^\${}()|[\]\\]/g, "\\$&")).join("|"),
    "g"
  );
  let cursor = 0;
  let match = pattern.exec(value);
  while (match) {
    if (match.index > cursor) {
      element.appendChild(document.createTextNode(value.slice(cursor, match.index)));
    }
    const strong = document.createElement("strong");
    strong.textContent = match[0];
    element.appendChild(strong);
    cursor = match.index + match[0].length;
    match = pattern.exec(value);
  }
  if (cursor < value.length) {
    element.appendChild(document.createTextNode(value.slice(cursor)));
  }
}

function createMediaNavigationButton(source, className, label) {
  const button = document.createElement("button");
  const image = document.createElement("img");

  button.className = className;
  button.type = "button";
  button.setAttribute("aria-label", label);
  image.src = source;
  image.alt = "";
  image.draggable = false;
  button.appendChild(image);
  return button;
}

export function createMediaContentDetail() {
  const frame = document.createElement("div");
  const visual = document.createElement("figure");
  const image = document.createElement("img");
  const video = document.createElement("video");
  const documentFrame = document.createElement("iframe");
  const visualPlaceholder = document.createElement("div");
  const visualCaption = document.createElement("figcaption");
  const visualLink = document.createElement("a");
  const viewport = document.createElement("div");
  const scroll = document.createElement("div");
  const copyZh = document.createElement("div");
  const copyEn = document.createElement("div");
  const navigation = document.createElement("div");
  const previousButton = createMediaNavigationButton(
    ASSET_SOURCES.filmNavLeft,
    "media-content__nav-button film-content__nav-button media-content__nav-button--previous film-content__nav-button--previous",
    "上一页"
  );
  const nextButton = createMediaNavigationButton(
    ASSET_SOURCES.filmNavRight,
    "media-content__nav-button film-content__nav-button media-content__nav-button--next film-content__nav-button--next",
    "下一页"
  );
  const pageCounter = document.createElement("span");
  const currentPage = document.createElement("span");
  const totalPage = document.createElement("span");

  frame.className = "media-content__frame film-content__frame";

  visual.className = "media-content__visual film-content__visual";
  visual.dataset.mode = "placeholder";
  image.className = "media-content__visual-image film-content__visual-image";
  image.dataset.mediaImage = "true";
  image.dataset.filmImage = "true";
  image.alt = "";
  image.draggable = false;
  video.className = "media-content__visual-video film-content__visual-video";
  video.dataset.mediaVideo = "true";
  video.dataset.filmVideo = "true";
  video.dataset.state = "empty";
  video.muted = true;
  video.loop = true;
  video.autoplay = true;
  video.playsInline = true;
  video.preload = "none";
  video.controls = false;
  video.setAttribute("aria-hidden", "true");
  video.setAttribute("tabindex", "-1");
  documentFrame.className =
    "media-content__visual-document film-content__visual-document";
  documentFrame.dataset.mediaDocument = "true";
  documentFrame.dataset.state = "empty";
  documentFrame.title = "";
  documentFrame.setAttribute("aria-hidden", "true");
  documentFrame.setAttribute("loading", "lazy");
  documentFrame.setAttribute("tabindex", "-1");
  documentFrame.setAttribute("frameborder", "0");
  documentFrame.addEventListener("load", () => {
    if (documentFrame.dataset.fit !== "fill") {
      return;
    }

    try {
      const embeddedDocument = documentFrame.contentDocument;
      if (!embeddedDocument?.head) {
        return;
      }

      if (embeddedDocument.getElementById("juanyun-iframe-fill")) {
        return;
      }

      const fitStyle = document.createElement("style");
      fitStyle.id = "juanyun-iframe-fill";
      fitStyle.textContent = `
        html,
        body,
        #shell,
        #stage {
          width: 100% !important;
          height: 100% !important;
        }

        #stage {
          max-width: none !important;
          max-height: none !important;
        }
      `;
      embeddedDocument.head.appendChild(fitStyle);
    } catch {
      // Cross-origin documents keep their own sizing rules.
    }
  });
  visualPlaceholder.className =
    "media-content__visual-placeholder film-content__visual-placeholder";
  visualPlaceholder.setAttribute("aria-hidden", "true");
  visualCaption.className =
    "media-content__visual-caption film-content__visual-caption";
  visualLink.className =
    "media-content__visual-link film-content__visual-link";
  visualLink.dataset.state = "inactive";
  visualLink.setAttribute("aria-hidden", "true");
  visual.append(
    image,
    video,
    documentFrame,
    visualPlaceholder,
    visualCaption,
    visualLink
  );

  viewport.className =
    "section-content-detail__viewport media-content__viewport film-content__viewport";
  scroll.className =
    "section-content-detail__scroll media-content__body-scroll film-content__body-scroll";
  copyZh.className = "media-content__copy film-content__copy media-content__copy--zh film-content__copy--zh";
  copyZh.dataset.mediaLanguage = "zh";
  copyZh.dataset.filmLanguage = "zh";
  copyEn.className = "media-content__copy film-content__copy media-content__copy--en film-content__copy--en";
  copyEn.dataset.mediaLanguage = "en";
  copyEn.dataset.filmLanguage = "en";
  scroll.append(copyZh, copyEn);
  viewport.appendChild(scroll);
  frame.append(visual, viewport);

  navigation.className =
    "media-content__navigation film-content__navigation";
  pageCounter.className =
    "media-content__page-counter film-content__page-counter";
  pageCounter.setAttribute("aria-live", "polite");
  currentPage.dataset.mediaPageCurrent = "true";
  currentPage.dataset.filmPageCurrent = "true";
  totalPage.dataset.mediaPageTotal = "true";
  totalPage.dataset.filmPageTotal = "true";
  pageCounter.append(currentPage, " / ", totalPage);
  navigation.append(previousButton, pageCounter, nextButton);

  return {
    frame,
    visual,
    image,
    video,
    documentFrame,
    visualPlaceholder,
    visualCaption,
    visualLink,
    viewport,
    scroll,
    navigation,
    previousButton,
    nextButton,
    currentPage,
    totalPage,
  };
}

export function getMediaContentDetailElements(root) {
  if (!root) {
    return null;
  }

  return {
    frame: root.querySelector(".media-content__frame"),
    visual: root.querySelector(".media-content__visual"),
    image: root.querySelector("[data-media-image='true']"),
    video: root.querySelector("[data-media-video='true']"),
    documentFrame: root.querySelector("[data-media-document='true']"),
    visualPlaceholder: root.querySelector(
      ".media-content__visual-placeholder"
    ),
    visualCaption: root.querySelector(".media-content__visual-caption"),
    visualLink: root.querySelector(".media-content__visual-link"),
    viewport: root.querySelector(".media-content__viewport"),
    scroll: root.querySelector(".media-content__body-scroll"),
    navigation: root.querySelector(".media-content__navigation"),
    previousButton: root.querySelector(
      ".media-content__nav-button--previous"
    ),
    nextButton: root.querySelector(".media-content__nav-button--next"),
    currentPage: root.querySelector("[data-media-page-current='true']"),
    totalPage: root.querySelector("[data-media-page-total='true']"),
  };
}

function appendPageCopy(container, pageCopy) {
  container.replaceChildren();

  if (!pageCopy) {
    return;
  }

  const title = createTextElement(
    "h2",
    "media-content__title film-content__title",
    pageCopy.title || ""
  );

  container.appendChild(title);

  if (pageCopy.statement) {
    container.appendChild(
      createTextElement(
        "p",
        "media-content__statement film-content__statement",
        pageCopy.statement
      )
    );
  }

  (pageCopy.paragraphs || []).forEach((paragraph) => {
    container.appendChild(
      createTextElement(
        "p",
        "media-content__paragraph film-content__paragraph",
        paragraph
      )
    );
  });

  if (pageCopy.principles?.length) {
    const principles = document.createElement("section");
    const principlesTitle = createTextElement(
      "h3",
      "media-content__principles-title film-content__principles-title",
      pageCopy.principlesTitle || ""
    );
    const principlesList = document.createElement("div");

    principles.className =
      "media-content__principles film-content__principles";
    principlesList.className =
      "media-content__principles-list film-content__principles-list";

    pageCopy.principles.forEach((principle, index) => {
      const principleElement = document.createElement("article");
      const value = createTextElement(
        "span",
        "media-content__principle-value film-content__principle-value",
        principle.value || String(index + 1).padStart(2, "0")
      );
      const principleTitle = createTextElement(
        "h4",
        "media-content__principle-title film-content__principle-title",
        principle.title || ""
      );
      const principleText = createTextElement(
        "p",
        "media-content__principle-text film-content__principle-text",
        principle.text || ""
      );

      principleElement.className =
        "media-content__principle film-content__principle";
      principleElement.append(value, principleTitle, principleText);
      principlesList.appendChild(principleElement);
    });

    principles.append(principlesTitle, principlesList);
    container.appendChild(principles);
  }

  if (pageCopy.items?.length) {
    const items = document.createElement("div");
    items.className = "media-content__items film-content__items";

    pageCopy.items.forEach((item) => {
      const itemElement = document.createElement("article");
      const value = createTextElement(
        "span",
        "media-content__item-value film-content__item-value",
        item.value || ""
      );
      const itemTitle = document.createElement("h3");
      itemTitle.className =
        "media-content__item-title film-content__item-title";
      if (item.href) {
        const itemLink = document.createElement("a");
        itemLink.className =
          "media-content__item-link film-content__item-link";
        itemLink.href = item.href;
        itemLink.target = "_blank";
        itemLink.rel = "noopener noreferrer";
        setEmphasizedText(itemLink, item.title || "", item.titleEmphasis);
        itemTitle.appendChild(itemLink);
      } else {
        setEmphasizedText(itemTitle, item.title || "", item.titleEmphasis);
      }
      const itemText = document.createElement("p");
      itemText.className =
        "media-content__item-text film-content__item-text";
      setEmphasizedText(itemText, item.text || "", item.textEmphasis);

      itemElement.className = "media-content__item film-content__item";
      itemElement.append(value, itemTitle, itemText);

      if (item.tag) {
        itemElement.appendChild(
          createTextElement(
            "span",
            "media-content__item-tag film-content__item-tag",
            item.tag
          )
        );
      }

      items.appendChild(itemElement);
    });

    container.appendChild(items);
  }

  if (pageCopy.note) {
    container.appendChild(
      createTextElement(
        "p",
        "media-content__note film-content__note",
        pageCopy.note
      )
    );
  }
}

export function createMediaContentController({
  layer,
  pages = [],
  contentKind = "media",
  emptyVisualLabel = "内容",
  loadImageOnDemand,
  preloadAsset,
  sliderController,
} = {}) {
  if (!layer) {
    return {
      setLanguage() {},
      setOpen() {},
      closeAll() {},
      isLayer: () => false,
    };
  }

  const detail = layer.querySelector(".section-content-detail");
  const content = getMediaContentDetailElements(detail);
  const pageList = Array.from(pages).filter(Boolean);
  let language = "zh";
  let pageIndex = 0;
  let renderToken = 0;
  const prefetchedVisuals = new Set();

  if (!detail || !content || !pageList.length) {
    return {
      setLanguage() {},
      setOpen() {},
      closeAll() {},
      isLayer: (candidate) => candidate === layer,
    };
  }

  layer.dataset.contentKind = contentKind;
  detail.classList.add(`section-content-detail--${contentKind}`);

  function getPage(index) {
    return pageList[Math.max(0, Math.min(pageList.length - 1, index))];
  }

  function updatePageControls() {
    content.currentPage.textContent = String(pageIndex + 1).padStart(2, "0");
    content.totalPage.textContent = String(pageList.length).padStart(2, "0");
    content.previousButton.disabled = pageIndex <= 0;
    content.nextButton.disabled = pageIndex >= pageList.length - 1;
    content.previousButton.setAttribute(
      "aria-disabled",
      String(content.previousButton.disabled)
    );
    content.nextButton.setAttribute(
      "aria-disabled",
      String(content.nextButton.disabled)
    );
  }

  function resetScroll() {
    content.scroll.style.setProperty("--content-scroll-offset", "0px");
    sliderController?.refresh();
  }

  function resetVisualMedia() {
    content.video.onloadeddata = null;
    content.video.onerror = null;
    content.video.pause();
    content.video.removeAttribute("src");
    content.video.load();
    content.video.dataset.state = "empty";
    content.video.removeAttribute("aria-label");

    content.documentFrame.removeAttribute("src");
    content.documentFrame.title = "";
    content.documentFrame.dataset.fit = "";
    content.documentFrame.dataset.state = "empty";
    content.documentFrame.setAttribute("aria-hidden", "true");

    content.image.removeAttribute("src");
    content.image.alt = "";
    content.image.dataset.state = "empty";
  }

  function loadVideoOnDemand(source, currentToken) {
    return new Promise((resolve) => {
      let settled = false;

      const finish = (success) => {
        if (settled) {
          return;
        }

        settled = true;
        content.video.onloadeddata = null;
        content.video.onerror = null;

        if (currentToken === renderToken) {
          content.video.dataset.state = success ? "ready" : "error";
          if (success) {
            content.video.play().catch(() => {});
          }
        }

        resolve(success);
      };

      content.video.onloadeddata = () => finish(true);
      content.video.onerror = () => finish(false);
      content.video.src = source;
      content.video.load();

      if (content.video.readyState >= 2) {
        finish(true);
      }
    });
  }

  function renderPage(nextIndex, { loadImage = false } = {}) {
    if (!pageList.length) {
      return Promise.resolve(false);
    }

    pageIndex = Math.max(0, Math.min(pageList.length - 1, nextIndex));
    const page = getPage(pageIndex);
    const currentToken = ++renderToken;
    const pageKey = page.id || String(pageIndex);

    layer.dataset.contentPage = pageKey;
    if (contentKind) {
      layer.dataset[`${contentKind}Page`] = pageKey;
      layer.dataset[`${contentKind}PageIndex`] = String(pageIndex);
    }
    const hasImage = Boolean(page.image);
    const hasVideo = Boolean(page.video);
    const hasDocument = Boolean(page.document);
    content.video.loop = page.loop !== false;
    content.video.controls = page.controls === true;
    content.video.setAttribute(
      "aria-hidden",
      String(!hasVideo || page.controls !== true)
    );
    if (hasVideo && page.controls === true) {
      content.video.removeAttribute("tabindex");
    } else {
      content.video.setAttribute("tabindex", "-1");
    }
    const visualHref = page.visualHref || "";
    content.visual.dataset.mode = hasImage
      ? "image"
      : hasVideo
        ? "video"
        : hasDocument
          ? "document"
          : "placeholder";
    content.visualPlaceholder.textContent = page.section || emptyVisualLabel;
    content.visualCaption.textContent = hasImage || hasVideo || hasDocument
      ? page.alt?.[language] || ""
      : page.section || emptyVisualLabel;
    if (visualHref) {
      content.visualLink.href = visualHref;
      content.visualLink.target = "_blank";
      content.visualLink.rel = "noopener noreferrer";
      content.visualLink.dataset.state = "active";
      content.visualLink.removeAttribute("aria-hidden");
      content.visualLink.setAttribute(
        "aria-label",
        page.visualLinkLabel?.[language] || page.alt?.[language] || "打开外部视频页面"
      );
      content.visualLink.title =
        page.visualLinkLabel?.[language] || "打开外部视频页面";
    } else {
      content.visualLink.removeAttribute("href");
      content.visualLink.removeAttribute("target");
      content.visualLink.removeAttribute("rel");
      content.visualLink.removeAttribute("aria-label");
      content.visualLink.removeAttribute("title");
      content.visualLink.dataset.state = "inactive";
      content.visualLink.setAttribute("aria-hidden", "true");
    }

    appendPageCopy(
      layer.querySelector(".media-content__copy--zh"),
      page.zh
    );
    appendPageCopy(
      layer.querySelector(".media-content__copy--en"),
      page.en
    );
    updatePageControls();
    resetScroll();
    resetVisualMedia();
    content.documentFrame.dataset.fit = page.documentFit || "";

    if (!hasImage && !hasVideo && !hasDocument) {
      return Promise.resolve(true);
    }

    const visualAlt = page.alt?.[language] || "";
    if (hasDocument) {
      content.documentFrame.title =
        page.documentTitle?.[language] || visualAlt || emptyVisualLabel;
      content.documentFrame.dataset.state = loadImage ? "ready" : "deferred";
      content.documentFrame.setAttribute("aria-hidden", String(!loadImage));
      if (loadImage) {
        content.documentFrame.src = page.document;
      }
      return Promise.resolve(true);
    }

    if (hasVideo) {
      content.video.setAttribute("aria-label", visualAlt);
      content.video.dataset.state = loadImage ? "loading" : "deferred";

      if (!loadImage) {
        return Promise.resolve(true);
      }

      return loadVideoOnDemand(page.video, currentToken);
    }

    content.image.alt = visualAlt;
    content.image.dataset.state = loadImage ? "loading" : "deferred";

    if (!loadImage || !loadImageOnDemand) {
      return Promise.resolve(true);
    }

    return loadImageOnDemand(content.image, page.image)
      .then(() => {
        if (currentToken === renderToken) {
          content.image.dataset.state = "ready";
        }
        return true;
      })
      .catch(() => {
        if (currentToken === renderToken) {
          content.image.dataset.state = "error";
        }
        return false;
      });
  }

  function preloadVisuals() {
    if (!preloadAsset) return;
    // Avoid downloading and decoding the whole gallery on a mobile tap.
    for (const index of [pageIndex - 1, pageIndex + 1]) {
      const source = pageList[index]?.image;
      if (!source || prefetchedVisuals.has(source)) continue;
      prefetchedVisuals.add(source);
      preloadAsset(source).catch(() => prefetchedVisuals.delete(source));
    }
  }

  function setPage(nextIndex) {
    if (!layer.matches('[data-open="true"]')) {
      return;
    }

    renderPage(nextIndex, { loadImage: true });
    preloadVisuals();
  }

  function bindPageButton(button, direction) {
    let pointerActivated = false;
    button.addEventListener("pointerdown", (event) => {
      if (button.disabled || event.button !== 0 || event.isPrimary === false) return;
      event.preventDefault();
      pointerActivated = true;
      button.focus({ preventScroll: true });
      setPage(pageIndex + direction);
    });
    button.addEventListener("click", (event) => {
      if (event.detail !== 0 && pointerActivated) {
        pointerActivated = false;
        return;
      }
      setPage(pageIndex + direction);
    });
  }
  bindPageButton(content.previousButton, -1);
  bindPageButton(content.nextButton, 1);

  renderPage(0);

  return {
    isLayer: (candidate) => candidate === layer,
    setLanguage(nextLanguage) {
      language = nextLanguage === "en" ? "en" : "zh";
      layer.dataset.language = language;
      renderPage(pageIndex, {
        loadImage: layer.matches('[data-open="true"]'),
      });
    },
    setOpen(candidate, isOpen) {
      if (candidate !== layer) {
        return;
      }

      if (!isOpen) {
        content.video.pause();
        return;
      }

      pageIndex = 0;
      renderPage(0, { loadImage: true });
      preloadVisuals();
    },
    closeAll() {},
    getPageIndex: () => pageIndex,
  };
}
