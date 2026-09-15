const TRAVEL_VISUAL_ROOT = "./Assets/Texture/optimized/travel/";

export const TRAVEL_CONTENT_PAGES = Object.freeze([
  {
    id: "core-visual-asiya",
    kind: "visual",
    section: "00 / 核心视觉",
    image: `${TRAVEL_VISUAL_ROOT}travel-01-asiya.webp`,
    alt: {
      zh: "匈奴公主阿西娅",
      en: "Princess Asiya",
    },
    zh: {
      title: "阿西娅：味道从边界开始",
      lead: "以匈奴公主阿西娅和甘肃味道为入口。",
      paragraphs: ["把边界另一侧的文化判断，转化为一张可以共享的餐桌。"],
    },
    en: {
      title: "Princess Asiya",
      lead: "This is a key visual.",
    },
  },
  {
    id: "core-visual-screen-to-silk-road",
    kind: "visual",
    section: "00 / 核心视觉",
    image: `${TRAVEL_VISUAL_ROOT}travel-02-silk-road.webp`,
    alt: {
      zh: "从银幕走向真实丝路",
      en: "From screen to the real Silk Road",
    },
    zh: {
      title: "从银幕走向真实丝路",
      lead: "让电影中的人物进入真实的餐桌、街巷与旅途。",
      paragraphs: ["从一次联名菜单或快闪开始，逐步长成可以停留的主题空间。"],
    },
    en: {
      title: "From screen to the real Silk Road",
      lead: "Bring the film’s characters to real tables, streets and journeys.",
      paragraphs: ["Start with a limited menu or pop-up, then grow into a themed place people can stay in."],
    },
  },
  {
    id: "core-visual-route",
    kind: "visual",
    section: "00 / 核心视觉",
    image: `${TRAVEL_VISUAL_ROOT}travel-03-route.webp`,
    alt: {
      zh: "兰州—武威—敦煌路线",
      en: "Lanzhou–Wuwei–Dunhuang route",
    },
    zh: {
      title: "兰州—武威—敦煌，走一条内容路线",
      lead: "把地点变成章节，把旅行变成叙事。",
      paragraphs: ["兰州是入口，武威连接铜奔马与卷云，敦煌把丝路的时间感推向更远。"],
    },
    en: {
      title: "Lanzhou–Wuwei–Dunhuang: a story route",
      lead: "Turn places into chapters and travel into narrative.",
      paragraphs: ["Lanzhou is the entry point, Wuwei connects the Bronze Horse to Juan Yun, and Dunhuang carries the Silk Road further through time."],
    },
  },
  {
    id: "scale",
    kind: "text",
    section: "01 / 预计规模",
    image: `${TRAVEL_VISUAL_ROOT}generated/travel-scale.webp`,
    alt: {
      zh: "卷云传餐饮联名菜单与主题空间概念图",
      en: "Legend of Juan Yun dining collaborations and themed space concept art",
    },
    zh: {
      title: "从一张餐桌开始",
      lead: "先用轻量合作验证，再向主题空间与目的地体验展开。",
      paragraphs: ["以阿西娅主题菜单与放哈限定饮品作为首批入口，连接角色、甘肃味道与年轻客群。"],
      items: [
        { value: "2", title: "首批合作入口", text: "阿西娅主题餐饮 / 放哈限定饮品" },
        { value: "1–2", title: "首年快闪试点", text: "先验证菜单、客群与IP转化" },
        { value: "200–400㎡", title: "主题空间设想", text: "咖啡、酒吧或复合文化空间" },
      ],
      note: "以上为现阶段规划估算，不代表最终预算、承诺销量或已签署合同。",
    },
    en: {
      title: "Start at one table",
      lead: "Validate lightly first, then grow into themed spaces and destinations.",
      paragraphs: ["Princess Asiya menus and Fangha limited drinks create the first bridge between character, Gansu flavour and younger audiences."],
      items: [
        { value: "2", title: "First entry points", text: "Princess Asiya dining / Fangha limited drinks" },
        { value: "1–2", title: "First-year pop-ups", text: "Test menus, audiences and IP conversion" },
        { value: "200–400㎡", title: "Destination concept", text: "Café, bar or mixed cultural space" },
      ],
      note: "Planning estimates only; not final budgets, sales commitments, or signed contracts.",
    },
  },
  {
    id: "creators",
    kind: "text",
    section: "02 / 核心主创与制作架构",
    image: `${TRAVEL_VISUAL_ROOT}generated/travel-creators.webp`,
    alt: {
      zh: "卷云传餐饮、空间与文旅团队协作概念图",
      en: "Legend of Juan Yun food, space and travel team collaboration concept art",
    },
    zh: {
      title: "把故事做成一次体验",
      lead: "让味道、空间与路线共同完成一次从角色到土地的叙事。",
      paragraphs: ["餐饮团队负责入口，空间团队负责沉浸感，文旅团队负责把一次消费延伸成可以被记住的旅程。"],
      items: [
        { value: "01", title: "David Wang 王章乐", text: "IP策划、故事体验与品牌统筹", tag: "核心主创" },
        { value: "02", title: "餐饮产品团队", text: "菜单、供应链、门店运营与联名执行", tag: "待合作" },
        { value: "03", title: "空间与展陈设计", text: "丝路场景、互动装置与零售动线", tag: "待匹配" },
        { value: "04", title: "文旅运营团队", text: "路线、住宿、研学与目的地资源", tag: "待匹配" },
      ],
    },
    en: {
      title: "Turn the story into an experience",
      lead: "Let flavour, space and route carry the story from character to landscape.",
      paragraphs: ["Food creates the entry point, space creates immersion, and travel operations turn a visit into a memorable journey."],
      items: [
        { value: "01", title: "David Wang", text: "IP experience and brand direction", tag: "Core creator" },
        { value: "02", title: "Food product team", text: "Menu, supply chain, operations and collaborations", tag: "Seeking partners" },
        { value: "03", title: "Space & exhibition design", text: "Silk Road atmosphere, interaction and retail flow", tag: "Seeking partners" },
        { value: "04", title: "Travel & hospitality team", text: "Routes, stays, learning journeys and destinations", tag: "Seeking partners" },
      ],
    },
  },
  {
    id: "partners",
    kind: "text",
    section: "03 / 合作伙伴",
    image: `${TRAVEL_VISUAL_ROOT}generated/travel-partners.webp`,
    alt: {
      zh: "卷云传餐饮、酒店与文旅合作伙伴概念图",
      en: "Legend of Juan Yun restaurant, hotel and travel partnership concept art",
    },
    zh: {
      title: "共同把丝路带到餐桌与目的地",
      lead: "从联名菜单到主题住宿，建立可以持续运营的文旅体验网络。",
      paragraphs: ["我们寻找能够共同打磨产品、空间与路线的伙伴，让卷云传不只被观看，也被品尝、被走过。"],
      items: [
        { value: "重点目标", title: "甘肃阿西娅餐饮集团", text: "阿西娅主题餐饮与品牌联动" },
        { value: "重点目标", title: "甘肃放哈餐饮集团", text: "丝路奶茶与年轻消费场景联名" },
        { value: "潜在", title: "甘肃文旅机构", text: "线路、目的地与宣传资源" },
        { value: "潜在", title: "精品酒店 / 民宿运营方", text: "主题住宿与长期空间运营" },
      ],
    },
    en: {
      title: "Bring the Silk Road to the table and the destination",
      lead: "Build a durable hospitality network from limited menus to themed stays.",
      paragraphs: ["We are looking for partners to shape products, spaces and routes so Legend of Juan Yun can be tasted and walked, not only watched."],
      items: [
        { value: "Priority target", title: "Gansu Asiya Restaurant Group", text: "Princess Asiya menus and brand collaboration" },
        { value: "Priority target", title: "Gansu Fangha", text: "Silk Road tea drinks and youth-market collaboration" },
        { value: "Potential", title: "Gansu tourism partners", text: "Routes, destinations and promotion" },
        { value: "Potential", title: "Boutique hotel operators", text: "Themed stays and long-term operations" },
      ],
    },
  },
  {
    id: "timeline",
    kind: "text",
    section: "04 / 时间轴进度",
    image: `${TRAVEL_VISUAL_ROOT}generated/travel-timeline.webp`,
    alt: {
      zh: "卷云传从菜单试点到丝路旅程的概念图",
      en: "Legend of Juan Yun menu-pilot to Silk Road journey concept art",
    },
    zh: {
      title: "从菜单试点到丝路旅程",
      lead: "先用轻量试点验证，再逐步进入长期空间与路线。",
      items: [
        { value: "2026下半年", title: "合作概念与菜单", text: "完成阿西娅主题餐、放哈限定饮品和空间叙事提案。" },
        { value: "2027年", title: "快闪与城市试点", text: "以1–2次活动验证消费、传播和文创联动。" },
        { value: "2028年", title: "丝路主题空间", text: "评估咖啡厅、酒吧或复合空间的长期落地。" },
        { value: "2029+", title: "住宿与路线", text: "开发主题民宿、小酒店、研学及兰州—武威—敦煌路线。" },
      ],
    },
    en: {
      title: "From menu pilots to a Silk Road journey",
      lead: "Validate lightly first, then grow into long-term spaces and routes.",
      items: [
        { value: "2026 H2", title: "Menu & partnership concepts", text: "Princess Asiya menu, Fangha limited drink and space narratives." },
        { value: "2027", title: "Pop-up pilots", text: "One or two events to test demand and cross-selling." },
        { value: "2028", title: "Silk Road space", text: "Evaluate a long-term café, bar or mixed cultural venue." },
        { value: "2029+", title: "Stays & routes", text: "Themed lodging, learning journeys and Lanzhou–Wuwei–Dunhuang routes." },
      ],
    },
  },
  {
    id: "highlights",
    kind: "text",
    section: "05 / 公开亮点",
    image: `${TRAVEL_VISUAL_ROOT}generated/travel-highlights.webp`,
    alt: {
      zh: "卷云传主题菜单、限定饮品与丝路之夜概念图",
      en: "Legend of Juan Yun themed menu, limited drinks and Silk Road night concept art",
    },
    zh: {
      title: "让故事在真实生活里被感知。",
      lead: "四个从角色、味道到地点展开的体验入口。",
      items: [
        { value: "01", title: "阿西娅主题菜单", text: "让角色故事通过食物、器皿与桌面叙事被感知。" },
        { value: "02", title: "放哈限定饮品", text: "用西北奶茶连接年轻客群与社交传播。" },
        { value: "03", title: "丝路之夜", text: "融合电影片段、音乐、酒饮、文创与主创分享。" },
        { value: "04", title: "重走丝路", text: "把真实地点、历史节点与三部曲内容组成可行走路线。" },
      ],
    },
    en: {
      title: "Let the story be felt in real life.",
      lead: "Four experience entrances shaped by character, taste and place.",
      items: [
        { value: "01", title: "Princess Asiya menu", text: "Character and culture expressed through food, tableware and storytelling." },
        { value: "02", title: "Fangha limited drink", text: "A young, social entry point into the Silk Road world." },
        { value: "03", title: "Silk Road night", text: "Film, music, drinks, products and creator conversations." },
        { value: "04", title: "Walk the Silk Road", text: "Real locations and historical context become a journey people can take." },
      ],
    },
  },
  {
    id: "experience",
    kind: "text",
    section: "06 / 体验设计",
    image: `${TRAVEL_VISUAL_ROOT}generated/travel-experience.webp`,
    alt: {
      zh: "卷云传角色驱动餐饮与丝路旅行体验概念图",
      en: "Legend of Juan Yun character-led dining and Silk Road travel experience concept art",
    },
    zh: {
      title: "让每一站都成为故事的一章。",
      lead: "把角色、地点与消费动线组织成可以参与的旅程。",
      items: [
        { value: "◆", title: "角色驱动餐饮", text: "不是简单贴Logo，而是从阿西娅的身份、语言和“另一种家”设计体验。" },
        { value: "◆", title: "一店一段路", text: "空间对应丝路的某一站，让多个地点最终构成完整旅程。" },
        { value: "◆", title: "内容与零售共生", text: "菜单、展陈、图书与文创必须形成同一条消费与叙事动线。" },
        { value: "◆", title: "先快闪后重资产", text: "用可逆的小规模试点验证，再进入长期租约、酒店或线路投资。" },
      ],
    },
    en: {
      title: "Let every stop become a chapter.",
      lead: "Turn character, place and visitor flow into a journey people can join.",
      items: [
        { value: "◆", title: "Character-led hospitality", text: "Experience grows from Princess Asiya’s role as a bridge between cultures." },
        { value: "◆", title: "One place, one chapter", text: "Each venue represents one stop; together they form a journey." },
        { value: "◆", title: "Content meets retail", text: "Menu, exhibition, books and products follow one visitor path." },
        { value: "◆", title: "Pop-up before capex", text: "Reversible pilots validate demand before long leases or hotel investment." },
      ],
    },
  },
]);
