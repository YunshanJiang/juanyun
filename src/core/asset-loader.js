export function createAssetLoader({
  elements,
  criticalSources,
  sectionSources,
  prefetchRadius,
  cacheLimit,
}) {
  const {
    loader,
    label,
    track,
    fill,
    percent,
  } = elements;
  const criticalAssetSet = new Set(criticalSources);
  const preloadedAssets = new Map();
  const assetPromises = new Map();
  const sectionImageCache = new Map();
  const sectionImagePromises = new Map();
  let sectionImageReadyCallback = () => {};
  let releaseSectionTexture = () => {};
  let sectionUsageClock = 0;
  let activeSectionWarmSet = new Set();
  let loadedAssetCount = 0;
  let failedAssetCount = 0;

  function updateLoader() {
    const total = criticalSources.length;
    const ratio = total ? loadedAssetCount / total : 1;
    const value = Math.round(ratio * 100);

    if (fill) {
      fill.style.width = `${value}%`;
    }

    if (track) {
      track.setAttribute("aria-valuenow", String(value));
    }

    if (percent) {
      percent.textContent = `${value}%`;
    }

    if (label) {
      label.textContent =
        value >= 100
          ? "首屏素材载入完成"
          : `正在载入首屏素材 ${loadedAssetCount}/${total}`;
    }
  }

  function preloadAsset(source) {
    if (assetPromises.has(source)) {
      return assetPromises.get(source);
    }

    const promise = new Promise((resolve) => {
      const image = new Image();
      let settled = false;

      const finish = (status) => {
        if (settled) {
          return;
        }

        settled = true;
        preloadedAssets.set(source, image);

        if (criticalAssetSet.has(source)) {
          loadedAssetCount += 1;
          if (status === "error") {
            failedAssetCount += 1;
          }
          updateLoader();
        }

        resolve({ image, source, status });
      };

      image.decoding = "async";
      image.addEventListener(
        "load",
        () => {
          const decoded =
            typeof image.decode === "function"
              ? image.decode()
              : Promise.resolve();

          Promise.resolve(decoded)
            .catch(() => {})
            .then(() => finish("ready"));
        },
        { once: true }
      );
      image.addEventListener("error", () => finish("error"), { once: true });
      image.src = source;
    });

    assetPromises.set(source, promise);
    return promise;
  }

  function getSectionElement(sectionIndex) {
    return document.querySelector(
      `.slip-section[data-section="${sectionIndex}"]`
    );
  }

  function trimSectionImageCache(protectedIndices = activeSectionWarmSet) {
    const candidates = Array.from(sectionImageCache.entries())
      .filter(([index]) => !protectedIndices.has(index))
      .sort(([, first], [, second]) => first.lastUsed - second.lastUsed);

    while (sectionImageCache.size > cacheLimit && candidates.length) {
      const [sectionIndex] = candidates.shift();
      const entry = sectionImageCache.get(sectionIndex);

      if (!entry) {
        continue;
      }

      releaseSectionTexture(sectionIndex);
      entry.image.removeAttribute("src");
      sectionImageCache.delete(sectionIndex);
      sectionImagePromises.delete(sectionIndex);

      // A critical section image can also be held by the generic preload maps.
      // Once its src is removed, that Image can no longer be reused on a
      // later visit. Drop only the records that still point at this exact
      // image so the next request creates a fresh Image and re-uploads its
      // WebGL texture.
      if (preloadedAssets.get(entry.source) === entry.image) {
        preloadedAssets.delete(entry.source);
        assetPromises.delete(entry.source);
      }

      const section = getSectionElement(sectionIndex);
      if (section) {
        section.dataset.backgroundStatus = "evicted";
      }
    }
  }

  function adoptSectionImage(sectionIndex, image, status = "ready") {
    if (status !== "ready" || !image?.naturalWidth) {
      const section = getSectionElement(sectionIndex);
      if (section) {
        section.dataset.backgroundStatus = "error";
      }
      return { image, status: "error" };
    }

    sectionUsageClock += 1;
    sectionImageCache.set(sectionIndex, {
      image,
      lastUsed: sectionUsageClock,
      source: sectionSources[sectionIndex],
    });

    const section = getSectionElement(sectionIndex);
    if (section) {
      section.dataset.backgroundStatus = "ready";
    }

    sectionImageReadyCallback(sectionIndex, image);
    trimSectionImageCache();
    return { image, status: "ready" };
  }

  function loadSectionImage(sectionIndex) {
    const index = Math.min(
      sectionSources.length - 1,
      Math.max(0, Number(sectionIndex) || 0)
    );
    const cached = sectionImageCache.get(index);

    if (cached) {
      sectionUsageClock += 1;
      cached.lastUsed = sectionUsageClock;
      return Promise.resolve({ image: cached.image, status: "ready" });
    }

    if (sectionImagePromises.has(index)) {
      return sectionImagePromises.get(index);
    }

    const source = sectionSources[index];
    const existingAssetPromise = assetPromises.get(source);
    const promise = existingAssetPromise
      ? existingAssetPromise.then(({ image, status }) =>
          adoptSectionImage(index, image, status)
        )
      : new Promise((resolve) => {
          const image = new Image();
          let settled = false;

          const finish = (status) => {
            if (settled) {
              return;
            }
            settled = true;
            resolve(adoptSectionImage(index, image, status));
          };

          image.decoding = "async";
          image.addEventListener(
            "load",
            () => {
              const decoded =
                typeof image.decode === "function"
                  ? image.decode()
                  : Promise.resolve();
              Promise.resolve(decoded)
                .catch(() => {})
                .then(() => finish("ready"));
            },
            { once: true }
          );
          image.addEventListener("error", () => finish("error"), {
            once: true,
          });
          image.src = source;
        });

    sectionImagePromises.set(index, promise);
    return promise;
  }

  function requestSectionBackgroundsAround(centerIndex) {
    const center = Math.min(
      sectionSources.length - 1,
      Math.max(0, Number(centerIndex) || 0)
    );
    const warmSet = new Set();

    for (
      let index = center - prefetchRadius;
      index <= center + prefetchRadius;
      index += 1
    ) {
      if (index >= 0 && index < sectionSources.length) {
        warmSet.add(index);
      }
    }

    activeSectionWarmSet = warmSet;
    trimSectionImageCache();
    warmSet.forEach((index) => loadSectionImage(index).catch(() => {}));
  }

  function attachImageSource(element, source) {
    if (!element || element.getAttribute("src") === source) {
      return;
    }
    element.setAttribute("src", source);
  }

  function loadImageOnDemand(element, source) {
    return preloadAsset(source).then((result) => {
      attachImageSource(element, source);
      return result;
    });
  }

  updateLoader();
  const criticalAssetsReady = Promise.all(criticalSources.map(preloadAsset));

  criticalAssetsReady.then((results) => {
    if (loader) {
      loader.dataset.status = failedAssetCount ? "partial" : "ready";
      loader.dataset.loaded = String(results.length);
      loader.classList.add("is-complete");
    }

    document.body.classList.remove("is-loading");
  });

  return {
    criticalAssetsReady,
    failedAssetCount: () => failedAssetCount,
    loadImageOnDemand,
    loadSectionImage,
    preloadAsset,
    preloadedAssets,
    requestSectionBackgroundsAround,
    setReleaseSectionTexture(callback) {
      releaseSectionTexture = callback || (() => {});
    },
    setSectionImageReadyCallback(callback) {
      sectionImageReadyCallback = callback || (() => {});
    },
    getCachedSectionEntries() {
      return Array.from(sectionImageCache.entries());
    },
  };
}
