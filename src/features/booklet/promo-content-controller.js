import {
  createMediaContentController,
  createMediaContentDetail,
} from "./media-content-controller.js?v=20260915-1";

export function createPromoContentDetail() {
  return createMediaContentDetail();
}

export function createPromoContentController(options = {}) {
  return createMediaContentController({
    ...options,
    contentKind: "promo",
    emptyVisualLabel: "卷首",
  });
}
