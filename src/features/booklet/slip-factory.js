import { createSectionContentLayer } from "./section-content-controller.js?v=20260915-1";

export function createSlipSections({
  sceneBackgroundTrack,
  slipRow,
  sectionSources,
  sectionDefinitions = [],
  slipSource,
  ropeSource,
  slipTotal,
}) {
  const backgroundFragment = document.createDocumentFragment();

  sectionSources.forEach((source, sectionIndex) => {
    const sceneSection = document.createElement("div");
    sceneSection.className = "scene-background";
    sceneSection.dataset.section = String(sectionIndex);
    sceneSection.dataset.backgroundSource = source;
    backgroundFragment.appendChild(sceneSection);
  });

  sceneBackgroundTrack?.appendChild(backgroundFragment);

  const slipFragment = document.createDocumentFragment();
  const rollSlipItems = [];
  const sectionContentLayers = [];

  sectionSources.forEach((_, sectionIndex) => {
    const section = document.createElement("div");
    section.className = "slip-section";
    section.dataset.section = String(sectionIndex);
    section.dataset.sectionId = sectionDefinitions[sectionIndex]?.id || "";

    for (let visualIndex = 0; visualIndex < slipTotal; visualIndex += 1) {
      const slip = document.createElement("span");
      const image = document.createElement("img");

      slip.className = "slip-item";
      slip.dataset.section = String(sectionIndex);
      slip.dataset.slipIndex = String(visualIndex);
      slip.dataset.projectionReceiver = String(
        sectionIndex * slipTotal + visualIndex
      );

      image.src = slipSource;
      image.alt = "";
      image.draggable = false;
      slip.appendChild(image);

      ["top", "bottom"].forEach((position) => {
        const rope = document.createElement("img");
        rope.className = `slip-rope slip-rope--${position}`;
        rope.src = ropeSource;
        rope.alt = "";
        rope.draggable = false;
        rope.setAttribute("aria-hidden", "true");
        slip.appendChild(rope);
      });

      section.appendChild(slip);
      rollSlipItems.push(slip);
    }

    const contentLayer = createSectionContentLayer(
      sectionDefinitions[sectionIndex],
      sectionIndex
    );
    if (contentLayer) {
      section.appendChild(contentLayer);
      sectionContentLayers.push(contentLayer);
    }

    slipFragment.appendChild(section);
  });

  slipRow.appendChild(slipFragment);

  return {
    sceneSections: Array.from(
      sceneBackgroundTrack?.querySelectorAll(".scene-background") || []
    ),
    rollSlipItems,
    sectionContentLayers,
  };
}
