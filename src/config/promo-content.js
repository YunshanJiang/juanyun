const PROMO_VIDEO_ROOT = "./Assets/Texture/optimized/promo/";

export const PROMO_CONTENT_PAGES = Object.freeze([
  {
    id: "juan-yun-promo",
    kind: "visual",
    section: "00 / 卷首",
    video: `${PROMO_VIDEO_ROOT}juanyun-promo.webm`,
    loop: false,
    controls: true,
    alt: {
      zh: "《卷云传》首章影像",
      en: "Opening chapter film for Legend of Juan Yun",
    },
    zh: {
      title: "一匹马，带着一条路重新被看见。",
      statement: "一件文物，重新拥有生命；一条古路，重新连接今天。",
      paragraphs: [
        "《卷云传》从甘肃武威出土的东汉铜奔马出发，将一件两千年前的文物，重新写成一段关于勇气、忠诚与文明相遇的故事。",
        "历史留下了一种姿态，我们想知道，是什么让它完成了这一跃。",
      ],
    },
    en: {
      title: "A horse carries a road back into view.",
      statement: "An artifact finds life again; a road reconnects with today.",
      paragraphs: [
        "Legend of Juan Yun begins with the Eastern Han bronze galloping horse unearthed in Wuwei, Gansu, reimagining a two-thousand-year-old artifact as a story of courage, loyalty, and the meeting of civilizations.",
        "History left behind a single gesture. We want to know what made it take this leap.",
      ],
    },
  },
]);
