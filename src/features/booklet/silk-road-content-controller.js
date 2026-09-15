import {
  createMediaContentController,
  createMediaContentDetail,
} from "./media-content-controller.js?v=20260910-1";

export function createSilkRoadContentDetail() {
  return createMediaContentDetail();
}

export function createSilkRoadContentController(options = {}) {
  return createMediaContentController({
    ...options,
    contentKind: "silkroad",
    emptyVisualLabel: "丝绸之路",
  });
}
