import {
  createMediaContentController,
  createMediaContentDetail,
} from "./media-content-controller.js?v=20260910-1";

export function createCultureContentDetail() {
  return createMediaContentDetail();
}

export function createCultureContentController(options = {}) {
  return createMediaContentController({
    ...options,
    contentKind: "culture",
    emptyVisualLabel: "文创与出版",
  });
}
