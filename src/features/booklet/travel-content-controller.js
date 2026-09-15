import {
  createMediaContentController,
  createMediaContentDetail,
} from "./media-content-controller.js?v=20260910-1";

export function createTravelContentDetail() {
  return createMediaContentDetail();
}

export function createTravelContentController(options = {}) {
  return createMediaContentController({
    ...options,
    contentKind: "travel",
    emptyVisualLabel: "餐饮与文旅",
  });
}
