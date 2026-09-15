import {
  createMediaContentController,
  createMediaContentDetail,
} from "./media-content-controller.js?v=20260910-1";

export function createHorseContentDetail() {
  return createMediaContentDetail();
}

export function createHorseContentController(options = {}) {
  return createMediaContentController({
    ...options,
    contentKind: "horse",
    emptyVisualLabel: "为什么是一匹马",
  });
}
