const SILK_ROAD_VISUAL_ROOT =
  "./Assets/Texture/optimized/silk-road/";

// Local WebP derivatives of Wikimedia Commons material selected for this
// educational sequence. Source pages and licence notes are kept in each
// page's small note so the content remains self-contained at runtime.
export const SILK_ROAD_CONTENT_PAGES = Object.freeze([
  {
    id: "overview",
    kind: "visual",
    section: "00 / 什么是丝绸之路",
    image: `${SILK_ROAD_VISUAL_ROOT}silk-road-hexi-map.webp`,
    alt: {
      zh: "公元1世纪丝绸之路与河西走廊路线图",
      en: "Silk Road and Hexi Corridor routes in the 1st century CE",
    },
    zh: {
      title: "丝绸之路是什么？",
      statement: "它不是一条被画死的线，而是一张不断改道、不断相遇的交流网络。",
      paragraphs: [
        "“丝绸之路”是19世纪才出现的称呼，用来概括欧亚大陆上长期存在的陆路与海路网络。它从东亚出发，经过河西走廊、中亚与西亚，连接地中海世界，也通过印度洋航线抵达更远的港口。",
        "它没有唯一的起点、终点或固定路线。沙漠、山口、河谷、草原、绿洲和港口共同组成许多可以替换的通道；季节、水源、战争、政权与商队的判断，会让同一批人每一次都走出不同的路。",
        "丝绸只是这张网络最有名的名字来源。马匹、香料、玻璃、金属、纸张、药材、宝石和粮食在路上交换；宗教、造纸、冶金、织造、绘画和音乐，也随人流一起移动。",
        "公元前2世纪，张骞出使西域打开了汉帝国与中亚世界持续往来的新通道；后来，敦煌、楼兰、龟兹、撒马尔罕等绿洲与城市成为补给、翻译和再分配的节点。",
        "所以，丝绸之路首先是一套人与人保持联系的方法：货物在这里换手，语言在这里相遇，记忆也在这里留下。",
        "《卷云传》从河西走廊进入这张路网，让“道路”不只通向一个终点，也通向那些被马匹承载、被选择改变的人。",
      ],
      items: [
        {
          value: "01 / 定义",
          title: "一张欧亚交流网络",
          text: "不是单一道路，而是陆路、海路和许多地方性支线在不同年代交织出的网络。",
        },
        {
          value: "02 / 路线",
          title: "河西走廊是其中一段关键通道",
          text: "它把中原与敦煌、中亚连接起来，绿洲、关隘和驿站让长途行旅得以继续。",
        },
        {
          value: "03 / 交换",
          title: "移动的不只是货物",
          text: "商品、技术、宗教、语言、艺术和生活习惯，都在一次次相遇中被带到新的地方。",
        },
      ],
      note: "一座关，连接两个世界；一条路，承载许多选择。｜路线图：Babbage / Wikimedia Commons《Silk road with Hexi Corridor labelled, 1st century CE》，CC BY-SA 4.0。",
    },
    en: {
      title: "What was the Silk Road?",
      statement: "It was not a line drawn once and for all, but a changing network where people kept meeting.",
      paragraphs: [
        "“Silk Road” is a modern nineteenth-century name for much older land and maritime networks across Eurasia. From East Asia, routes passed through the Hexi Corridor, Central Asia, and West Asia toward the Mediterranean, while maritime passages connected them to ports across the Indian Ocean.",
        "There was no single beginning, ending, or fixed itinerary. Deserts, passes, river valleys, grasslands, oases, and ports formed replaceable channels; seasons, water, war, political power, and a caravan’s judgment changed the road from one journey to the next.",
        "Silk gave the network its most famous name, but horses, spices, glass, metals, paper, medicines, gems, and grain also moved along it. Religions, papermaking, metallurgy, weaving, painting, and music travelled with people as well.",
        "In the 2nd century BCE, Zhang Qian’s missions opened a sustained new channel between the Han empire and Central Asia. Later, oasis cities such as Dunhuang, Loulan, Kucha, and Samarkand became places to resupply, translate, and redistribute what had travelled.",
        "The Silk Road was therefore a way for people to remain connected: goods changed hands, languages met, and memories were left behind.",
        "Legend of Juan Yun enters this network through the Hexi Corridor, where a road leads not only to a destination, but to lives carried by horses and changed by choice.",
      ],
      items: [
        {
          value: "01 / DEFINITION",
          title: "A Eurasian network of exchange",
          text: "Not one road, but land routes, sea lanes, and local branches interwoven across changing centuries.",
        },
        {
          value: "02 / ROUTE",
          title: "The Hexi Corridor as a vital passage",
          text: "It connected the Chinese heartland with Dunhuang and Central Asia, sustained by oases, passes, and relay stations.",
        },
        {
          value: "03 / EXCHANGE",
          title: "More than goods moved",
          text: "Technologies, religions, languages, art, and everyday practices travelled through each encounter.",
        },
      ],
      note: "One pass connects two worlds; one road carries many choices. | Map: Babbage / Wikimedia Commons, “Silk road with Hexi Corridor labelled, 1st century CE”, CC BY-SA 4.0.",
    },
  },
  {
    id: "route-network",
    kind: "visual",
    section: "01 / 路线不是一条线",
    image: `${SILK_ROAD_VISUAL_ROOT}silk-road-central-asia.webp`,
    alt: {
      zh: "中亚丝绸之路路线地图",
      en: "Silk Road routes across Central Asia",
    },
    zh: {
      title: "一条路，许多分岔",
      paragraphs: [
        "“丝绸之路”不是一条固定道路，而是由草原、绿洲、山口、河谷与海上航线组成的交通网络。",
        "商队会根据季节、水源、政权和安全状况改变路径。不同路线在绿洲城市相遇，又继续向不同方向延伸。",
      ],
      note: "地图：Wikimedia Commons，公有领域。",
    },
    en: {
      title: "One road, many branches",
      paragraphs: [
        "The Silk Road was not one fixed highway. It was a network of grasslands, oases, mountain passes, river valleys, and sea routes.",
        "Caravans changed course with the seasons, water, political power, and safety. Routes met in oasis cities before extending in new directions.",
      ],
      note: "Map: Wikimedia Commons, public domain.",
    },
  },
  {
    id: "exchange",
    kind: "visual",
    section: "02 / 路上交换什么",
    image: `${SILK_ROAD_VISUAL_ROOT}dunhuang-tang-mural.webp`,
    alt: {
      zh: "丝绸之路相关的唐代壁画",
      en: "A Tang-era mural connected with the Silk Road",
    },
    zh: {
      title: "交换的不只是丝绸",
      paragraphs: [
        "丝绸只是这条路最有名的名字。马匹、香料、金属、玻璃、纸张、宗教、音乐、图像与技艺，也在路上流动。",
        "当使者、商人、工匠与僧侣抵达新的城市，他们带来的不只是货物，也带来新的词语、审美与生活方式。",
      ],
      note: "壁画：Wikimedia Commons，公有领域。",
    },
    en: {
      title: "More than silk was exchanged",
      paragraphs: [
        "Silk is only the best-known part of the name. Horses, spices, metals, glass, paper, religions, music, images, and techniques also moved along the routes.",
        "Envoys, merchants, craftspeople, and monks carried more than goods into new cities. They carried words, aesthetics, and ways of living.",
      ],
      note: "Mural: Wikimedia Commons, public domain.",
    },
  },
  {
    id: "hexi-silk-road-gateway",
    kind: "visual",
    section: "03 / 河西走廊与丝绸之路",
    image: `${SILK_ROAD_VISUAL_ROOT}silk-road-hexi-gateway.webp`,
    alt: {
      zh: "汉代河西走廊关隘与绿洲，商队沿祁连山北麓向敦煌和西域行进",
      en: "A Han-era pass and oasis in the Hexi Corridor, with a caravan moving west toward Dunhuang and the Western Regions",
    },
    zh: {
      title: "河西走廊，丝绸之路的东方门廊",
      statement: "它不是丝绸之路之外的一段地方，而是把中原、敦煌与中亚接在一起的关键通道。",
      paragraphs: [
        "在广义的丝绸之路网络中，河西走廊是从中原向西出发时最重要的陆路走廊之一。它夹在祁连山与北方荒漠之间，形成一条相对连续的绿洲与关隘带。",
        "从武威、张掖、酒泉到敦煌，驿站与城镇沿水源分布，让商队、使者和军队能够补给、换马、翻译，继续进入玉门关以西的中亚通道。",
        "因此，河西走廊不是一条与丝绸之路并列的路线；它是丝绸之路东段的关键组成部分，是中原文明与西域世界发生持续交换的门廊。",
        "《卷云传》把故事放在这条门廊上：马匹承载人的行程，也把不同的语言、物产和记忆带到下一座城。",
      ],
      items: [
        {
          value: "位置",
          title: "从中原向西的入口",
          text: "河西走廊把关中与河西绿洲串联起来，是陆路进入敦煌和西域的重要东段。",
        },
        {
          value: "功能",
          title: "绿洲、关隘与驿站",
          text: "水源、城镇和边塞设施让远距离行旅可以补给、换马、翻译，并继续向西。",
        },
        {
          value: "连接",
          title: "通往敦煌与中亚",
          text: "敦煌不是终点，而是继续通向塔里木盆地、中亚与更广阔交流网络的节点。",
        },
      ],
      note: "画面为基于历史地理关系的艺术化再现；河西走廊是丝绸之路东段的重要组成部分。",
    },
    en: {
      title: "The Hexi Corridor, the Silk Road’s eastern gateway",
      statement: "It is not a place outside the Silk Road, but the vital passage linking the Chinese heartland with Dunhuang and Central Asia.",
      paragraphs: [
        "Within the broad network of the Silk Road, the Hexi Corridor was one of the most important overland passages west from the Chinese heartland. Between the Qilian Mountains and the northern deserts, it formed a relatively continuous belt of oases and fortified passes.",
        "From Wuwei and Zhangye through Jiuquan to Dunhuang, stations and towns followed water sources. They allowed caravans, envoys, and armies to resupply, change horses, translate, and continue into the Central Asian routes beyond the Jade Gate.",
        "The Hexi Corridor was therefore not a route parallel to the Silk Road. It was a key eastern component of it: a gateway through which the Chinese heartland and the Western Regions could remain in sustained exchange.",
        "Legend of Juan Yun places its story in this gateway. Horses carry people along the road, while languages, goods, and memories move toward the next city.",
      ],
      items: [
        {
          value: "POSITION",
          title: "The western entrance from the heartland",
          text: "The corridor links the Guanzhong heartland with the Hexi oases, forming the eastern overland approach to Dunhuang and the Western Regions.",
        },
        {
          value: "FUNCTION",
          title: "Oases, passes, and relay stations",
          text: "Water, towns, and frontier infrastructure let long-distance travellers resupply, change horses, translate, and keep moving west.",
        },
        {
          value: "CONNECTION",
          title: "A route onward to Dunhuang and Central Asia",
          text: "Dunhuang was not an endpoint, but a node leading toward the Tarim Basin, Central Asia, and a wider network of exchange.",
        },
      ],
      note: "An artistic reconstruction grounded in the historical geography of the Silk Road; the Hexi Corridor was a key eastern component of that network.",
    },
  },
  {
    id: "who-travels-this-road",
    kind: "visual",
    section: "04 / 谁在这条路上",
    image: `${SILK_ROAD_VISUAL_ROOT}silk-road-who-travels-cinematic.webp`,
    alt: {
      zh: "晨曦中的河西走廊，卷云、张骞与匈奴公主带着马队同行",
      en: "At dawn in the Hexi Corridor, Juan Yun, Zhang Qian, and a Xiongnu princess travel with their horses",
    },
    zh: {
      title: "谁在这条路上？",
      statement: "历史常常记住骑手、将军和使者，我们想从承载他们的生命出发，重新看见历史。",
      paragraphs: [
        "《卷云传》不是一个完美英雄改变世界的故事。",
        "它讲的是一匹害怕的马、一位逐渐理解责任的使者、一位不被历史抹去的匈奴公主，以及一只总在旁边吐槽、最后却托住朋友的燕子。",
        "当这些生命走上同一条路，丝绸之路不再只是地图上的路线，也成为他们共同承担选择、建立信任、理解彼此的地方。",
      ],
      note: "人物与关系属于《卷云传》的艺术虚构；丝绸之路的历史背景来自真实的河西走廊与东西方交流记忆。",
    },
    en: {
      title: "Who travels this road?",
      statement: "History often remembers riders, generals, and envoys. We begin with the lives that carried them, and look at history again.",
      paragraphs: [
        "Legend of Juan Yun is not a story about a perfect hero changing the world.",
        "It follows a frightened horse, an envoy learning what responsibility means, a Xiongnu princess history refuses to erase, and a swallow who keeps commenting from the side—until it finally catches a friend.",
        "When these lives share one road, the Silk Road becomes more than a route on a map: it becomes a place where they carry choices, build trust, and learn to understand one another.",
      ],
      note: "The characters and relationships are artistic fiction; the historical setting draws on the Hexi Corridor and the memory of exchange between East and West.",
    },
  },
]);
