import {
  createMediaContentController,
  createMediaContentDetail,
} from "./media-content-controller.js?v=20260910-1";

export function createFestivalContentDetail() {
  return createMediaContentDetail();
}

export function createFestivalContentController(options = {}) {
  return createMediaContentController({
    ...options,
    contentKind: "festival",
    emptyVisualLabel: "电影节",
  });
}
