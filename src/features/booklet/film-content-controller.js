import {
  createMediaContentController,
  createMediaContentDetail,
  getMediaContentDetailElements,
} from "./media-content-controller.js?v=20260910-1";

export function createFilmContentDetail() {
  return createMediaContentDetail();
}

export function getFilmContentDetailElements(root) {
  return getMediaContentDetailElements(root);
}

export function createFilmContentController(options = {}) {
  return createMediaContentController({
    ...options,
    contentKind: "film",
    emptyVisualLabel: "电影",
  });
}
