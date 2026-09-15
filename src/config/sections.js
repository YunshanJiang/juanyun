import {
  SECTION_BACKGROUND_SOURCES,
  SECTION_ICON_SOURCES,
} from "./constants.js";

const sectionIdFromSource = (source) =>
  source
    .split("/")
    .pop()
    .split("?")[0]
    .replace(/\.webp$/i, "");

const sectionSlugs = Object.freeze({
  A01: "juan-shou",
  A02: "yuan-qi",
  A11: "ip-rights",
  A12: "contact",
  "A09-1-festivals": "film-festivals",
});

const copyBlocks = Object.freeze({
  "juan-shou": {
    zh: {
      title: "一匹马，带着一条路重新被看见。",
      quote: "一件文物，重新拥有生命；一条古路，重新连接今天。",
      core: "《卷云传》从甘肃武威出土的东汉铜奔马出发，将一件两千年前的文物，重新写成一段关于勇气、忠诚与文明相遇的故事。\n\n历史留下了一种姿态，我们想知道，是什么让它完成了这一跃。",
      short: "历史留下了一种姿态，我们想知道，是什么让它完成了这一跃。",
    },
    en: {
      title: "A horse carries a road back into view.",
      quote: "An artifact finds life again; a road reconnects with today.",
      core: "Legend of Juan Yun begins with the Eastern Han bronze galloping horse unearthed in Wuwei, Gansu, reimagining a two-thousand-year-old artifact as a story of courage, loyalty, and the meeting of civilizations.\n\nHistory left behind a single gesture. We want to know what made it take this leap.",
      short: "History left behind a single gesture. We want to know what made it take this leap.",
    },
  },
  "yuan-qi": {
    zh: {
      title: "为什么是一匹马？",
      quote: "英雄不是从未害怕，而是带着恐惧仍然行动。",
      core: "铜奔马被记住的是一瞬间的速度。我们想追问的是：完成这一跃的生命，曾经经历过什么？\n\n卷云不是天生的英雄。它顺拐、胆小、会逃，也总觉得自己跑得不够好。直到最后一刻，它依然害怕，却选择向前奔跑。\n\n“马踏飞燕”因此不再只是一个被凝固的姿态，而是两个不完美的生命共同完成的一次二段跳。",
      short: "一匹害怕的马，也可以完成一次伟大的跳跃。",
    },
    en: {
      title: "Why a horse?",
      quote: "A hero is not free from fear, but acts with fear beside them.",
      core: "The bronze horse is remembered for a single instant of speed. We ask instead: what had the life completing that leap already endured?\n\nJuan Yun is not born a hero. He missteps, gets frightened, runs away, and feels he is never fast enough. Even at the final moment, he is afraid—yet chooses to run forward.\n\n“Horse Treading on a Flying Swallow” becomes more than a frozen pose: it is a second leap completed by two imperfect lives together.",
      short: "Even a frightened horse can make a great leap.",
    },
  },
  "silk-road": {
    zh: {
      title: "为什么是一条古老的路？",
      quote: "丝路的意义，不是冲突消失，而是人们仍愿意跨过冲突去理解彼此。",
      core: "丝绸之路从来不只是一条路线图。它由战争、迁徙、交易、翻译、婚姻、食物和共同生活组成。\n\n它连接的不只是城市，也连接不同的人、不同的信念，以及无法轻易消失的边界。\n\n《卷云传》从金城出发，让汉、匈奴与西域不再只是历史中的对立符号，而成为有名字、有日常、有选择的人。",
      short: "一座关，连接两个世界；一条路，承载许多选择。",
    },
    en: {
      title: "Why an ancient road?",
      quote: "The Silk Road matters not because conflict disappeared, but because people still crossed it to understand one another.",
      core: "The Silk Road was never only a route on a map. It was made of war, migration, trade, translation, marriage, food, and shared daily life.\n\nIt connected more than cities. It connected people, beliefs, and boundaries that could not easily disappear.\n\nFrom Jincheng, Legend of Juan Yun turns Han, Xiongnu, and the Western Regions from opposing symbols into people with names, routines, and choices.",
      short: "One pass connects two worlds; one road carries many choices.",
    },
  },
  method: {
    zh: {
      title: "为什么让机器参与一段古老的故事？",
      quote: "人决定故事的方向，AI 帮助世界不断长出来。",
      core: "我们使用 AIGC，不是为了让机器替人讲故事，而是为了让一个古老的世界拥有持续生长的能力。\n\n人负责历史判断、主题、角色弧线和最终审美；AIGC 参与气氛、材质、构图探索与视觉资产迭代。\n\n它让创作从一次性的制作，变成一个可以持续试错、持续扩展、持续共创的过程。",
      short: "人负责方向，AI 帮助世界生长。",
    },
    en: {
      title: "Why let a machine enter an ancient story?",
      quote: "People set the story’s direction; AI helps the world keep growing.",
      core: "We use AIGC not to let machines tell the story for us, but to give an ancient world the ability to keep growing.\n\nPeople make the historical judgments, define the theme and character arcs, and hold the final aesthetic decision. AIGC joins the exploration of mood, material, composition, and visual asset iteration.\n\nCreation becomes an ongoing process of testing, expanding, and co-creating rather than a one-time production.",
      short: "People set the direction; AI helps the world grow.",
    },
  },
  world: {
    zh: {
      title: "谁在这条路上？",
      quote: "历史常常记住骑手、将军和使者，我们想从承载他们的生命出发，重新看见历史。",
      core: "《卷云传》不是一个完美英雄改变世界的故事。它讲的是一匹害怕的马、一位逐渐理解责任的使者、一位不被历史抹去的匈奴公主，以及一只总在旁边吐槽、最后却托住朋友的燕子。",
      short: "这不是一个完美英雄的故事，而是一群不完美的人共同打开一条路。",
    },
    en: {
      title: "Who travels this road?",
      quote: "History often remembers riders, generals, and envoys. We begin with the lives that carried them, and look at history again.",
      core: "Legend of Juan Yun is not a story about a perfect hero changing the world. It follows a frightened horse, an envoy learning what responsibility means, a Xiongnu princess history refuses to erase, and a swallow who keeps commenting from the side—until it finally catches a friend.",
      short: "Not a perfect hero, but imperfect people opening a road together.",
    },
  },
  "world-road": {
    zh: {
      title: "谁在这条路上？",
      quote:
        "一条古老的路不只连接城市，也承载骑手、使者与那些被历史带着向前走的生命。",
      core:
        "丝绸之路从来不只是一条路线图。它由战争、迁徙、交易、翻译、婚姻、食物和共同生活组成。\n\n它连接的不只是城市，也连接不同的人、不同的信念，以及无法轻易消失的边界。\n\n《卷云传》从金城出发，让汉、匈奴与西域不再只是历史中的对立符号，而成为有名字、有日常、有选择的人。\n\n《卷云传》不是一个完美英雄改变世界的故事。它讲的是一匹害怕的马、一位逐渐理解责任的使者、一位不被历史抹去的匈奴公主，以及一只总在旁边吐槽、最后却托住朋友的燕子。",
      short:
        "一座关，连接两个世界；一群不完美的人与生命，共同把路走下去。",
    },
    en: {
      title: "Who travels this road?",
      quote:
        "An ancient road connects more than cities; it carries riders, envoys, and the lives history moves forward.",
      core:
        "The Silk Road was never only a route on a map. It was made of war, migration, trade, translation, marriage, food, and shared daily life.\n\nIt connected more than cities. It connected people, beliefs, and boundaries that could not easily disappear.\n\nFrom Jincheng, Legend of Juan Yun turns Han, Xiongnu, and the Western Regions from opposing symbols into people with names, routines, and choices.\n\nLegend of Juan Yun is not a story about a perfect hero changing the world. It follows a frightened horse, an envoy learning what responsibility means, a Xiongnu princess history refuses to erase, and a swallow who keeps commenting from the side—until it finally catches a friend.",
      short:
        "One pass connects two worlds; imperfect lives carry the road forward together.",
    },
  },
  visual: {
    zh: {
      title: "让中国绘画在空间里呼吸。",
      quote: "我们不复制古代风格，而是让古代的观看方式进入今天。",
      core: "我们选择 2.5D，不是让二维画面模仿现实电影，而是让线条、留白、壁画式构图和层叠景深共同建立一种属于中国的电影空间。\n\n青铜、土黄、墨黑、沙金和暗红构成视觉基调；剪影负责动作，留白负责情绪，材质负责时间。\n\n画面既像一幅展开的古代长卷，也像一个正在发生的世界。",
      short: "画面像一幅长卷，也像一个正在发生的世界。",
    },
    en: {
      title: "Let Chinese painting breathe in space.",
      quote: "We do not copy an ancient style; we bring an ancient way of seeing into today.",
      core: "We choose 2.5D not to make a two-dimensional image imitate live-action cinema, but to let line, empty space, mural-like composition, and layered depth build a cinematic space of its own.\n\nBronze, earth yellow, ink black, sand gold, and dark red set the visual tone. Silhouettes carry movement, empty space carries emotion, and material carries time.\n\nThe image is both an unfolded ancient scroll and a world still taking place.",
      short: "The image is an ancient scroll—and a world still unfolding.",
    },
  },
  archive: {
    zh: {
      title: "从史实出发，在想象中抵达。",
      quote: "历史提供方向，想象让那些没有被记录的人重新拥有声音。",
      core: "《卷云传》以东汉铜奔马、张骞出使西域，以及汉匈边境的历史记忆为底稿。\n\n卷云、阿西娅以及“与燕子共同完成二段跳”的设定，是进入历史核心问题的想象入口。\n\n我们不把虚构伪装成史实，也不让史实失去人的温度。",
      short: "真实负责站稳，想象负责抵达。",
    },
    en: {
      title: "Begin with history; arrive through imagination.",
      quote: "History gives direction; imagination gives unrecorded lives a voice again.",
      core: "Legend of Juan Yun begins with the Eastern Han bronze horse, Zhang Qian’s journey west, and the historical memory of the Han–Xiongnu frontier.\n\nJuan Yun, Asiya, and the “second leap” completed with the swallow are imaginative entrances into the questions at history’s heart.\n\nWe do not disguise fiction as fact, nor strip history of its human warmth.",
      short: "Truth gives us ground; imagination carries us onward.",
    },
  },
  values: {
    zh: {
      title: "一次跳跃，回答三个问题。",
      quote: "忠诚不是口号，而是经受复杂性之后仍然愿意承担。",
      core: "勇气不是没有恐惧，而是带着恐惧仍然行动。\n\n忠诚不是盲目服从，而是在知道代价之后，仍然承担自己的选择。\n\n文明交流不是冲突从未发生，而是冲突发生之后，人们仍愿意尝试理解彼此。\n\n卷云最终完成的不是一次技术上的跳跃，而是一次精神上的选择：它从“我能不能做到”，走向“我愿意为了谁做到”。",
      short: "卷云仍然害怕，但它还是跳了。就在这个选择里，道路被打开。",
    },
    en: {
      title: "One leap answers three questions.",
      quote: "Loyalty is not a slogan, but the will to carry responsibility through complexity.",
      core: "Courage is not the absence of fear, but acting with fear beside you.\n\nLoyalty is not blind obedience, but accepting your choice after seeing its cost.\n\nCultural exchange is not the absence of conflict, but the willingness to understand one another after conflict occurs.\n\nJuan Yun’s final leap is not a technical feat, but a spiritual choice: from “can I do it?” to “who am I willing to do it for?”",
      short: "Juan Yun is still afraid, but jumps anyway. In that choice, the road opens.",
    },
  },
  media: {
    zh: {
      title: "不是四个项目，而是同一个世界的四种入口。",
      quote: "所有入口都可以不同，但最终都要回到同一个世界。",
      core: "《卷云传》不把自己拆成电影、游戏、文创和文旅四个孤立项目。它们共同服务于同一个 IP 世界。\n\n电影建立共同记忆；游戏把选择交给观众；文创让故事中的符号进入日常；文旅让人真正走到故事发生的土地。\n\n媒介可以变化，但卷云的选择、丝路的精神和人物之间的关系不会变化。",
      short: "被观看、被游玩、被携带、被抵达。",
    },
    en: {
      title: "Not four projects, but four entrances into one world.",
      quote: "Every entrance can be different, but each returns to the same world.",
      core: "Legend of Juan Yun is not split into four isolated projects—film, game, cultural products, and cultural tourism. They all serve the same IP world.\n\nFilm builds shared memory; games give choices to the audience; cultural products carry story symbols into daily life; cultural tourism lets people reach the land where the story happens.\n\nThe medium can change, but Juan Yun’s choices, the spirit of the Silk Road, and the relationships between its people remain.",
      short: "To be watched, played, carried, and reached.",
    },
  },
  coBuild: {
    zh: {
      title: "让这条路继续打开。",
      quote: "电影帮助世界看见丝路，IP 让丝路继续存在于世界。",
      core: "《卷云传》希望与内容创作者、技术团队、文化机构、教育机构和全球合作伙伴共同完成这条路。\n\n我们寻找的不是一次性的项目合作，而是让一个中国文化 IP 持续生长、持续被看见、持续进入当代生活的长期伙伴。",
      short: "一起把这条路继续打开。",
    },
    en: {
      title: "Keep this road open.",
      quote: "Film helps the world see the Silk Road; an IP keeps it alive in the world.",
      core: "Legend of Juan Yun hopes to complete this road with content creators, technology teams, cultural institutions, educators, and partners around the world.\n\nWe are not looking for one-off project collaborations, but long-term partners who can help a Chinese cultural IP keep growing, keep being seen, and keep entering contemporary life.",
      short: "Together, let this road keep opening.",
    },
  },
  certification: {
    zh: {
      title: "IP版权认证",
      quote: "一段故事被创作，也被正式确认。",
      core: "这里收录《卷云传——铜奔马的故事》的版权认证文件。\n\n点击按钮后，可以在三个子页面中逐页查看 WGAW 版权登记证书、作品著作权受理通知书与作品著作权登记证书。",
      short: "三份文件，确认一段故事的版权根基。",
    },
    en: {
      title: "IP rights & certification",
      quote: "A story is created—and formally recognised.",
      core: "This section collects the copyright certification documents for Legend of Juan Yun: The Story of the Bronze Galloping Horse.\n\nOpen the button to view the WGAW registration certificate, copyright acceptance notice, and copyright registration certificate as three secondary pages.",
      short: "Three documents that establish the story’s rights foundation.",
    },
  },
  contact: {
    qr: {
      whatsapp:
        "./Assets/Texture/optimized/contact/whatsapp-qr.webp?v=20260910-1",
      wechat:
        "./Assets/Texture/optimized/contact/wechat-qr.webp?v=20260910-1",
    },
    zh: {
      title: "Contact us",
      quote: "让下一段路，从一次联系开始。",
      core: "如果你希望参与《卷云传》的电影、游戏、出版、文创、XR沉浸展馆或文化旅游合作，欢迎联系我们。",
      short: "欢迎来信，共同打开下一段路。",
      email: "david.legendofjuanyun@gmail.com",
    },
    en: {
      title: "Contact us",
      quote: "Let the next part of the journey begin with a conversation.",
      core: "For film, game, publishing, cultural products, XR immersive exhibition, or cultural tourism collaborations around Legend of Juan Yun, please get in touch.",
      short: "Write to us and help open the next part of the road.",
      email: "david.legendofjuanyun@gmail.com",
    },
  },
  festivals: {
    zh: {
      title: "电影节",
      quote:
        "从入选、入围到与观众相遇，卷云的故事正在走向更大的银幕。",
      core: "《卷云传》目前已获得多个国际电影节的官方入选与入围。每一个电影节，都是一次新的观看现场：让以铜奔马和丝绸之路为灵感的东方故事，被更多创作者、评审与观众看见。",
      short: "记录目前确认的电影节节点，也记录一部电影走向世界的脚步。",
    },
    en: {
      title: "Film Festivals",
      quote:
        "From official selections and finalist recognition to new audiences, Juan Yun is finding a larger screen.",
      core: "Legend of Juan Yun has received official selections and finalist recognition from international film festivals. Each festival creates a new viewing context, allowing this Eastern story inspired by the Bronze Galloping Horse and the Silk Road to meet filmmakers, juries, and audiences around the world.",
      short: "A record of confirmed festival milestones—and a film moving outward into the world.",
    },
  },
});

const sectionContentMap = Object.freeze({
  A01: "juan-shou",
  A02: "yuan-qi",
  A03: "world-road",
  A04: "method",
  "A05-1": "world",
  "A05-2": "world",
  "A05-3": "world",
  "A05-4": "world",
  A06: "visual",
  A07: "archive",
  A08: "values",
  "A09-0": "media",
  "A09-1": "media",
  "A09-1-festivals": "festivals",
  "A09-2": "media",
  "A09-3": "media",
  "A09-4": "media",
  A10: "coBuild",
  A11: "certification",
  A12: "contact",
});

const sectionCopyOverrides = Object.freeze({
  "A05-1": {
    zh: {
      title: "卷云",
      quote: "顺拐、胆小、会逃的年轻马。在信任与失去之后，它从求生走向主动承担。",
      core: "卷云",
      short: "以甘肃武威出土的东汉铜奔马为文化原型；卷云的经历与牺牲属于艺术虚构。",
    },
    en: {
      title: "Juan Yun",
      quote:
        "A young horse who missteps, gets frightened, and runs away. After trust and loss, he moves from survival toward taking responsibility.",
      core: "Juan Yun",
      short:
        "Inspired by the Eastern Han bronze galloping horse unearthed in Wuwei, Gansu; Juan Yun’s experiences and sacrifice are artistic fiction.",
    },
  },
  "A05-2": {
    zh: {
      title: "张骞",
      quote: "聪明、自信、相信临场应变的使者，在西行与囚禁中学会承担选择的代价。",
      core: "张骞",
      short: "以西汉张骞出使西域、被匈奴拘留后归汉的经历为底稿；具体关系与情节属于艺术虚构。",
    },
    en: {
      title: "Zhang Qian",
      quote:
        "A clever, confident envoy who trusts his ability to adapt in the moment. Through his journey west and captivity, he learns to bear the cost of his choices.",
      core: "Zhang Qian",
      short:
        "Based on Zhang Qian’s mission to the Western Regions in the Western Han and his detention by the Xiongnu before returning to Han; the specific relationships and events are artistic fiction.",
    },
  },
  "A05-3": {
    zh: {
      title: "阿西娅",
      quote: "来自边界另一侧的匈奴公主，拥有政治判断、文化根基和独立意志，不是爱情的奖赏。",
      core: "阿西娅",
      short: "基于汉匈边境与草原社会的历史想象；阿西娅本人及其与张骞的关系属于虚构。",
    },
    en: {
      title: "Asiya",
      quote:
        "A Xiongnu princess from the other side of the frontier, with political judgment, cultural roots, and an independent will—not a reward for romance.",
      core: "Asiya",
      short:
        "Based on a historical imagining of the Han–Xiongnu frontier and steppe society; Asiya herself and her relationship with Zhang Qian are fictional.",
    },
  },
  "A05-4": {
    zh: {
      title: "燕子",
      quote: "轻快、嘴碎的旁观者，也是侦察者、信使与旁白，最终最先读懂卷云的决定。",
      core: "燕子",
      short: "借用‘马踏飞燕’的飞燕意象；燕子的角色身份与‘二段跳’属于艺术虚构。",
    },
    en: {
      title: "Swallow",
      quote:
        "A lighthearted, talkative observer—and a scout, messenger, and narrator—who is ultimately the first to understand Juan Yun’s decision.",
      core: "Swallow",
      short:
        "Draws on the swallow imagery of ‘Horse Treading on a Flying Swallow’; the swallow’s role and the ‘second leap’ are artistic fiction.",
    },
  },
  "A09-1": {
    zh: {
      title: "电影",
      quote:
        "以铜奔马为灵感的动画电影三部曲，从动物的目光重新走入汉代丝路，讲述勇气、同行与文明相遇。",
    },
    en: {
      title: "Film",
      quote:
        "An animated film trilogy inspired by the Bronze Galloping Horse, re-entering the Han-era Silk Road through the eyes of animals to tell a story of courage, companionship, and the meeting of civilizations.",
    },
  },
  "A09-2": {
    zh: {
      title: "游戏",
      quote:
        "一款以三匹马和三个时代为核心的单人第三人称叙事冒险。玩家将在丝路地貌中奔跑、探索、建立关系，并逐步发现一段横跨时代的故事。",
    },
    en: {
      title: "Game",
      quote:
        "A single-player third-person narrative adventure centered on three horses and three eras. Players will run through Silk Road landscapes, explore, build relationships, and gradually uncover a story spanning the ages.",
    },
  },
  "A09-3": {
    zh: {
      title: "文创与出版",
      quote:
        "出版建立故事入口，文创让角色进入现实生活。Amazon KDP英文电子书与按需印刷版本已经发布，下一步是中文出版与馆店产品体系。",
    },
    en: {
      title: "Cultural Products & Publishing",
      quote:
        "Publishing creates an entry into the story, while cultural products bring its characters into everyday life. The English e-book and print-on-demand editions are already available on Amazon KDP; the next step is Chinese publishing and a museum-and-bookstore product system.",
    },
  },
  "A09-4": {
    zh: {
      title: "餐饮与文旅",
      quote:
        "以匈奴公主阿西娅和甘肃味道为入口，从联名菜单与快闪开始，逐步发展丝路主题空间、民宿与兰州—武威—敦煌内容路线。",
    },
    en: {
      title: "Food & Cultural Tourism",
      quote:
        "Beginning with the Xiongnu princess Asiya and the flavors of Gansu, the journey starts with collaborative menus and pop-ups, then grows into Silk Road-themed spaces, homestays, and a content route from Lanzhou to Wuwei and Dunhuang.",
    },
  },
});

export const SECTIONS = Object.freeze(
  SECTION_BACKGROUND_SOURCES.map((background, order) => {
    const id = sectionIdFromSource(background);
    const blockId = sectionContentMap[id] || "juan-shou";
    const baseCopy = copyBlocks[blockId];
    const copyOverride = sectionCopyOverrides[id];
    const copy = copyOverride
      ? {
          ...baseCopy,
          zh: { ...baseCopy.zh, ...copyOverride.zh },
          en: { ...baseCopy.en, ...copyOverride.en },
        }
      : baseCopy;

    return {
      id,
      order,
      slug: sectionSlugs[id] || `section-${order + 1}`,
      aspect: 16 / 9,
      background,
      blockId,
      icon: SECTION_ICON_SOURCES[id] || SECTION_ICON_SOURCES.A01,
      copy,
      hasOriginButton: order === 0,
    };
  })
);
