export function createLanguageController({
  toggle,
  titleLayer,
  originCopy,
  overlayCopy,
  titleSourceImages,
  titleSourcePaths,
  loadImageOnDemand,
  titleInkRenderer,
  sectionContentController,
  sliderController,
}) {
  let language = "zh";

  function setLanguage(nextLanguage) {
    language = nextLanguage === "en" ? "en" : "zh";
    const isEnglish = language === "en";

    if (titleLayer) {
      titleLayer.dataset.language = language;
    }

    if (originCopy) {
      originCopy.dataset.language = language;
    }

    if (overlayCopy) {
      overlayCopy.dataset.language = language;
      overlayCopy.setAttribute(
        "aria-label",
        isEnglish ? "Origin content" : "卷首内容"
      );
    }

    if (toggle) {
      toggle.textContent = isEnglish ? "中" : "EN";
      toggle.setAttribute("aria-pressed", String(isEnglish));
      toggle.setAttribute(
        "aria-label",
        isEnglish ? "切换中文标题" : "切换英文标题"
      );
    }

    titleInkRenderer?.setLanguage(language);
    sectionContentController?.setLanguage(language);
    sliderController?.refresh();

    if (isEnglish) {
      loadImageOnDemand(titleSourceImages.en, titleSourcePaths.en).then(() => {
        if (language === "en") {
          titleInkRenderer?.setLanguage("en");
        }
      });
    }
  }

  setLanguage("zh");
  toggle?.addEventListener("click", () =>
    setLanguage(language === "en" ? "zh" : "en")
  );

  return {
    getLanguage: () => language,
    setLanguage,
  };
}
