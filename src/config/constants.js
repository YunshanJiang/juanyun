export const SLIP_TOTAL = 14;

export const SECTION_BACKGROUND_SOURCES = Object.freeze([
  "./Assets/Texture/optimized/A01.webp",
  "./Assets/Texture/optimized/A02.webp",
  "./Assets/Texture/optimized/A03.webp",
  "./Assets/Texture/optimized/A09-1.webp",
  "./Assets/Texture/optimized/A09-1-festivals.webp",
  "./Assets/Texture/optimized/A09-2.webp",
  "./Assets/Texture/optimized/A09-3.webp",
  "./Assets/Texture/optimized/A09-4.webp",
  "./Assets/Texture/optimized/A04.webp",
  "./Assets/Texture/optimized/A05-1.webp",
  "./Assets/Texture/optimized/A05-2.webp",
  "./Assets/Texture/optimized/A05-3.webp",
  "./Assets/Texture/optimized/A05-4.webp",
  "./Assets/Texture/optimized/A06.webp",
  "./Assets/Texture/optimized/A07.webp",
  "./Assets/Texture/optimized/A08.webp",
  "./Assets/Texture/optimized/A09-0.webp",
  "./Assets/Texture/optimized/A10.webp",
  "./Assets/Texture/optimized/A11.webp?v=20260910-2",
  "./Assets/Texture/optimized/A12.webp?v=20260910-2",
]);

export const SECTION_ICON_SOURCES = Object.freeze({
  A01: "./Assets/Texture/optimized/icon1.webp",
  A02: "./Assets/Texture/optimized/icon2.webp",
  A03: "./Assets/Texture/optimized/icon3.webp",
  A04: "./Assets/Texture/optimized/icon4.webp",
  A05: "./Assets/Texture/optimized/icon5.webp",
  "A05-1": "./Assets/Texture/optimized/icon5.webp",
  "A05-2": "./Assets/Texture/optimized/icon5.webp",
  "A05-3": "./Assets/Texture/optimized/icon5.webp",
  "A05-4": "./Assets/Texture/optimized/icon5.webp",
  A06: "./Assets/Texture/optimized/icon6.webp",
  A07: "./Assets/Texture/optimized/icon7.webp",
  A08: "./Assets/Texture/optimized/icon8.webp",
  "A09-0": "./Assets/Texture/optimized/icon9-0.webp",
  "A09-1": "./Assets/Texture/optimized/icon9-1.webp",
  "A09-1-festivals": "./Assets/Texture/optimized/icon9-1.webp",
  "A09-2": "./Assets/Texture/optimized/icon9-2.webp",
  "A09-3": "./Assets/Texture/optimized/icon9-3.webp",
  "A09-4": "./Assets/Texture/optimized/icon9-4.webp",
  A10: "./Assets/Texture/optimized/icon10.webp",
  A11: "./Assets/Texture/optimized/icon10.webp",
  A12: "./Assets/Texture/optimized/icon10.webp",
});

export const SECTION_COUNT = SECTION_BACKGROUND_SOURCES.length;
// Keep one extra neighbor on each side so the viewport's overscan never
// loses a section texture while the camera is settling on a seam.
export const SECTION_PREFETCH_RADIUS = 3;
export const SECTION_CACHE_LIMIT = SECTION_PREFETCH_RADIUS * 2 + 1;
export const SECTION_NAV_DURATION = 320;

export const ASSET_SOURCES = Object.freeze({
  slip: "./Assets/Texture/optimized/Roll_single_slip_content_A.webp",
  rollSide: "./Assets/Texture/optimized/roll_side_albedo.webp",
  rollCap: "./Assets/Texture/optimized/roll_cap.webp",
  rope: "./Assets/Texture/optimized/Rope.webp",
  desk: "./Assets/Texture/optimized/bg.webp",
  titleZh: "./Assets/Texture/optimized/JuanYunTitleC.webp",
  titleEn: "./Assets/Texture/optimized/JuanYunTitleE.webp",
  originButton: "./Assets/Texture/optimized/icon1.webp",
  originOverlay:
    "./Assets/Texture/overlays/core-copy-ink-layer-alpha-summed-top-v1.webp",
  sectionInkOverlay: "./Assets/Texture/optimized/inkFullLayer.webp",
  paperMask:
    "./Assets/Texture/optimized/papernkBG.webp?v=20260910-2",
  contentSliderBar:
    "./Assets/ConceptArt/HomeIcons/SliderControls/JuanYunSliderBar-Vertical-64x512.webp",
  contentSliderThumb:
    "./Assets/ConceptArt/HomeIcons/SliderControls/JuanYunSliderThumb-128.webp",
  sectionNavLeft:
    "./Assets/Texture/optimized/JuanYunNavButton-Left-128.webp",
  sectionNavRight:
    "./Assets/Texture/optimized/JuanYunNavButton-Right-128.webp",
  filmNavLeft:
    "./Assets/ConceptArt/HomeIcons/NavigationButtons/Type2/JuanYunNavButton-Type2-Left-128.webp",
  filmNavRight:
    "./Assets/ConceptArt/HomeIcons/NavigationButtons/Type2/JuanYunNavButton-Type2-Right-128.webp",
});

export const ROLL_SEGMENT_TOTAL = 16;
export const INK_REVEAL_POWER = 1.28;
export const TITLE_REVEAL_END = 0.44;
export const PROJECTION_REVEAL_START = 0.5;
export const ORIGIN_COPY_REVEAL_DURATION = 900;

export const CRITICAL_ASSET_SOURCES = Object.freeze([
  ...new Set([
    ASSET_SOURCES.slip,
    ASSET_SOURCES.rollSide,
    ASSET_SOURCES.rollCap,
    ASSET_SOURCES.rope,
    ASSET_SOURCES.desk,
    ...SECTION_BACKGROUND_SOURCES.slice(0, SECTION_PREFETCH_RADIUS),
    ASSET_SOURCES.titleZh,
    ASSET_SOURCES.originButton,
    ASSET_SOURCES.originOverlay,
    ASSET_SOURCES.sectionInkOverlay,
    ASSET_SOURCES.paperMask,
    ASSET_SOURCES.contentSliderBar,
    ASSET_SOURCES.contentSliderThumb,
    ASSET_SOURCES.sectionNavLeft,
    ASSET_SOURCES.sectionNavRight,
    ...Object.values(SECTION_ICON_SOURCES),
  ]),
]);

// 保留原有文件路径，让现有调试流程继续可用；渲染器通过 fetch 读取唯一 Shader 来源。
export const PROJECTION_SHADER_SOURCE = "./watercolor_wash_shader.glsl?v=20260905-5";
