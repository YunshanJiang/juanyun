import {
  createMediaContentController,
  createMediaContentDetail,
} from "./media-content-controller.js?v=20260910-1";

export function createCertificationContentDetail() {
  return createMediaContentDetail();
}

export function createCertificationContentController(options = {}) {
  return createMediaContentController({
    ...options,
    contentKind: "certification",
    emptyVisualLabel: "IP版权认证",
  });
}
