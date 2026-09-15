import {
  createMediaContentController,
  createMediaContentDetail,
} from "./media-content-controller.js?v=20260915-6";

export function createGameContentDetail() {
  return createMediaContentDetail();
}

export function createGameContentController(options = {}) {
  return createMediaContentController({
    ...options,
    contentKind: "game",
    emptyVisualLabel: "游戏",
  });
}
