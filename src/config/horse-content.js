const HORSE_VISUAL_ROOT = "./Assets/Texture/optimized/";
const HORSE_FILM_ROOT = `${HORSE_VISUAL_ROOT}film/`;
const HORSE_GENERATED_ROOT = `${HORSE_FILM_ROOT}generated/`;

// A02 follows the same visual, paged structure as the Silk Road explainer.
// The first three pages establish the Bronze Galloping Horse as the source
// image, historical object, and creative starting point before the story
// pages return to Juan Yun's character arc.
export const HORSE_CONTENT_PAGES = Object.freeze([
  {
    id: "bronze-horse-leap",
    kind: "visual",
    section: "00 / 铜奔马",
    image: `${HORSE_VISUAL_ROOT}horse/bronze-galloping-horse-cc0.webp`,
    alt: {
      zh: "甘肃省博物馆收藏的东汉铜奔马",
      en: "Eastern Han Bronze Galloping Horse in the Gansu Provincial Museum",
    },
    zh: {
      title: "铜奔马：把一瞬间留给两千年",
      lead: "一件文物，先以身体记住速度。",
      paragraphs: [
        "甘肃武威出土的东汉铜奔马，常被公众称作“马踏飞燕”。它一足踏鸟、三足腾空，把奔跑铸成了一个至今仍在发生的瞬间。",
      ],
      note: "图片：Gary Todd，Wikimedia Commons，CC0；页面保留为历史参考图。",
    },
    en: {
      title: "The Bronze Galloping Horse: one instant, two thousand years",
      lead: "An artifact remembers speed through the body first.",
      paragraphs: [
        "The Eastern Han bronze horse unearthed in Wuwei, Gansu, is widely known as “Horse Treading on a Flying Swallow.” One hoof meets a bird while three legs lift clear of the ground, turning a run into an instant that still feels alive.",
      ],
      note: "Photo: Gary Todd, Wikimedia Commons, CC0; retained here as a historical reference image.",
    },
  },
  {
    id: "bronze-horse-origin",
    kind: "visual",
    section: "01 / 文物与道路",
    image: `${HORSE_VISUAL_ROOT}horse/bronze-galloping-horse-side-cc0.webp`,
    alt: {
      zh: "甘肃省博物馆收藏的东汉铜奔马侧面实拍",
      en: "Side-view photograph of the Eastern Han Bronze Galloping Horse",
    },
    zh: {
      title: "它为什么会从武威出发？",
      lead: "铜奔马不是孤立的造型，而是河西走廊文明记忆的一部分。",
      paragraphs: [
        "1969年，铜奔马出土于甘肃武威雷台汉墓。它和墓中的车马仪仗一起，让我们看见东汉时代对马匹、远行、边地与秩序的想象。",
        "1983年，铜奔马被确定为中国旅游标志；它也因此从一件出土文物，走进了更广阔的公共记忆。",
      ],
      note: "图片：Gary Todd，Wikimedia Commons，CC0；此页使用实物侧面照片。",
    },
    en: {
      title: "Why does it begin in Wuwei?",
      lead: "The Bronze Galloping Horse is part of the Hexi Corridor’s cultural memory, not an isolated shape.",
      paragraphs: [
        "Unearthed in 1969 at the Leitai Han tomb in Wuwei, Gansu, the horse and its bronze ceremonial convoy reveal how the Eastern Han imagined horses, travel, frontiers, and order.",
        "In 1983, it was selected as China’s tourism symbol. An excavated artifact entered a much wider public memory.",
      ],
      note: "Photo: Gary Todd, Wikimedia Commons, CC0; this page uses a side-view photograph of the artifact.",
    },
  },
  {
    id: "bronze-horse-juan-yun",
    kind: "visual",
    section: "02 / 从文物到角色",
    image: `${HORSE_FILM_ROOT}film-core-visual-04-juan-yun.webp`,
    alt: {
      zh: "卷云角色概念图",
      en: "Juan Yun character concept art",
    },
    zh: {
      title: "从铜奔马到卷云",
      lead: "我们没有复刻一件文物，而是追问完成这一跃的生命。",
      paragraphs: [
        "铜奔马留下的是速度的姿态，《卷云传》想补上的，是姿态背后的害怕、犹豫、信任与选择。",
        "卷云因此不是一个完美的英雄。它顺拐、胆小、会逃，却在失去之后重新决定向前。",
      ],
    },
    en: {
      title: "From the Bronze Horse to Juan Yun",
      lead: "We do not replicate an artifact; we ask about the life that completed the leap.",
      paragraphs: [
        "The Bronze Galloping Horse leaves us the gesture of speed. Legend of Juan Yun adds what may exist behind that gesture: fear, hesitation, trust, and choice.",
        "Juan Yun is therefore not a perfect hero. He missteps, gets frightened, and runs away—then chooses to move forward again after loss.",
      ],
    },
  },
  {
    id: "horse-fear",
    kind: "visual",
    section: "03 / 角色选择",
    image: `${HORSE_VISUAL_ROOT}horse/juan-yun-fear-forward.webp`,
    alt: {
      zh: "卷云在丝路关隘前犹豫后准备向前的概念图",
      en: "Juan Yun hesitating before a Silk Road pass, then choosing to move forward",
    },
    zh: {
      title: "害怕，也可以向前",
      lead: "英雄不是从未害怕，而是带着恐惧仍然行动。",
      paragraphs: [
        "卷云总觉得自己跑得不够好。它的成长不是变得无所畏惧，而是在知道代价之后，仍然愿意为同行者承担一次选择。",
      ],
      note: "概念图：卷云在恐惧与前进之间做出选择。",
    },
    en: {
      title: "Fear can still move forward",
      lead: "A hero is not free from fear, but acts with fear beside them.",
      paragraphs: [
        "Juan Yun never feels fast enough. His growth is not becoming fearless, but choosing to carry responsibility for a companion after seeing the cost.",
      ],
      note: "Concept art: Juan Yun chooses between fear and moving forward.",
    },
  },
  {
    id: "horse-second-leap",
    kind: "visual",
    section: "04 / 二段跳",
    image: `${HORSE_GENERATED_ROOT}film-scale-key-art.webp`,
    alt: {
      zh: "三匹马共同奔向丝路的概念图",
      en: "Concept art of three horses running together across the Silk Road",
    },
    zh: {
      title: "二段跳：从姿态到选择",
      lead: "“马踏飞燕”不再只是被凝固的姿态。",
      paragraphs: [
        "它成为两个不完美的生命共同完成的一次二段跳：一匹马选择向前，一只燕子选择相信。卷云最终完成的，不只是技术上的跃起，而是“我愿意为了谁做到”。",
      ],
    },
    en: {
      title: "The second leap: from gesture to choice",
      lead: "“Horse Treading on a Flying Swallow” becomes more than a frozen pose.",
      paragraphs: [
        "It becomes a second leap completed by two imperfect lives: a horse chooses to move forward, and a swallow chooses to trust. Juan Yun’s final leap asks not only “can I do it?” but “who am I willing to do it for?”",
      ],
    },
  },
]);
