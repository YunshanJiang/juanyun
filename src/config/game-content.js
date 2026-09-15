const GAME_VISUAL_ROOT = "./Assets/Texture/optimized/game/";
const GAME_VIDEO_ROOT = "./Assets/Texture/optimized/game/";

export const GAME_CONTENT_PAGES = Object.freeze([
  {
    id: "core-visual-reference",
    kind: "visual",
    section: "00 / 核心视觉",
    image: `${GAME_VISUAL_ROOT}game-00-reference.webp`,
    alt: {
      zh: "参考图：骑马与砍杀 II",
      en: "Reference image: Mount & Blade II",
    },
    zh: {
      title: "参考图",
      paragraphs: [
        "《骑马与砍杀》是本项目的玩法参考：骑乘、近身战斗与战场操作共同构成玩家的行动基础。我们借鉴它对第三人称空间、冲锋与武器反馈的处理，把这份灵感转化为三匹马穿越丝路的叙事冒险。",
      ],
      items: [
        { value: "灵感来源", title: "骑乘与战斗", text: "以速度、冲锋、挥击和地形反馈建立有重量的行动感。" },
        { value: "操作方向", title: "视角与探索", text: "让第一、第三人称视角服务于战斗、移动与发现故事。" },
      ],
    },
    en: {
      title: "Reference image",
      paragraphs: [
        "Mount & Blade is a gameplay reference for this project: riding, close combat, and battlefield control form the player’s action foundation. We take its sense of third-person space, charges, and weapon feedback as inspiration, then turn it toward a narrative adventure across the Silk Road with three horses.",
      ],
      items: [
        { value: "INSPIRATION", title: "Riding and combat", text: "Build physical action through speed, charges, strikes, and terrain feedback." },
        { value: "DIRECTION", title: "View and exploration", text: "Let first- and third-person views serve combat, movement, and discovery." },
      ],
    },
  },
  {
    id: "playable-world-entry",
    kind: "visual",
    section: "01 / 进入马的世界",
    image: `${GAME_VISUAL_ROOT}game-18-playable-world-entry.webp`,
    visualHref: "./Assets/interactive/juan-yun-playable-demo-6.html",
    visualLinkLabel: {
      zh: "打开卷云传可玩演示",
      en: "Open the Legend of Juan Yun playable demo",
    },
    alt: {
      zh: "卷云传游戏入口：一匹马跃入由马家窑纹样构成的世界",
      en: "Legend of Juan Yun game entry: a horse leaping into a world shaped by Majiayao motifs",
    },
    zh: {
      title: "进入马的世界",
      lead: "可玩演示入口｜点击画面打开网页",
      paragraphs: [
        "这张画面是《卷云传》游戏体验的入口：从真实的马与丝路地貌出发，穿过马家窑纹样构成的边界，进入只有马能够抵达的世界。",
        "点击画面中央的跳转按钮，在独立网页中体验奔跑、进入踏界，以及马的世界三条原则。原有的完整设定与嵌入式演示保留在下一页。",
      ],
      items: [
        {
          value: "入口",
          title: "打开可玩演示",
          text: "跳转到独立网页，体验从真实地貌进入马的世界。",
        },
        {
          value: "保留",
          title: "完整设定仍在下一页",
          text: "原有的可玩演示页与“马的世界三条原则”完整保留。",
        },
      ],
    },
    en: {
      title: "Enter the horse world",
      lead: "Playable demo entry｜Click the image to open the webpage",
      paragraphs: [
        "This image is the entry point to the Legend of Juan Yun game experience: begin with a real horse and Silk Road terrain, cross a boundary made from Majiayao motifs, and enter a world only horses can reach.",
        "Click the button at the centre of the image to open the standalone webpage and experience running, entering Ta Jie, and the three principles of the horse world. The original full setting and embedded demo remain on the next page.",
      ],
      items: [
        {
          value: "ENTRY",
          title: "Open the playable demo",
          text: "Jump to the standalone webpage and travel from the physical landscape into the horse world.",
        },
        {
          value: "KEPT",
          title: "The full setting remains next",
          text: "The original playable-demo page and the three principles of the horse world remain intact.",
        },
      ],
    },
  },
  {
    id: "skill-bod-yunjian",
    kind: "visual",
    section: "02 / 技能系统",
    image: `${GAME_VISUAL_ROOT}game-09-skill-bod-yunjian.webp`,
    alt: {
      zh: "拨云见日技能概念图：卷云与张骞共同施展增益技能",
      en: "Bod Yunjian skill concept art: Juan Yun and Zhang Qian cast a team buff",
    },
    zh: {
      title: "拨云见日",
      lead: "人马组合技｜卷云 × 张骞",
      paragraphs: [
        "张骞举杖起势，光芒穿过云层；卷云把这股意志带入冲锋，让一次同行变成全队都能感知的力量。",
      ],
      items: [
        { value: "触发", title: "人马协同", text: "在张骞与卷云同时进入战斗节奏后开启组合技。" },
        { value: "效果", title: "拨开迷雾", text: "短时间提升队伍的攻击、防御与移动意志，帮助队伍突破混乱战局。" },
        { value: "体验", title: "让方向重新出现", text: "技能不是单纯的数值爆发，而是把伙伴关系转化为清晰的行动窗口。" },
      ],
    },
    en: {
      title: "Bod Yunjian",
      lead: "Human–horse combo｜Juan Yun × Zhang Qian",
      paragraphs: [
        "Zhang Qian raises his staff and light cuts through the clouds. Juan Yun carries that resolve into the charge, turning companionship into strength the whole party can feel.",
      ],
      items: [
        { value: "TRIGGER", title: "Human–horse synergy", text: "Activate when Zhang Qian and Juan Yun enter the same combat rhythm." },
        { value: "EFFECT", title: "Clear the way", text: "Temporarily reinforces the party’s attack, defense, and movement momentum to break through a confused battle." },
        { value: "FEEL", title: "Make direction visible again", text: "The skill turns a relationship into a clear window for action instead of a simple numerical burst." },
      ],
    },
  },
  {
    id: "skill-leifengxing",
    kind: "visual",
    section: "03 / 技能系统",
    video: `${GAME_VIDEO_ROOT}game-16-page4-video.webm`,
    alt: {
      zh: "雷厉风行概念视频：卷风与霍去病在战场上发动组合攻击",
      en: "Leifengxing concept video: Juan Feng and Huo Qubing launch a battlefield combo",
    },
    zh: {
      title: "雷厉风行",
      lead: "人马组合技｜卷风 × 霍去病",
      paragraphs: [
        "卷风以疾速撕开战线，霍去病的锋芒紧随其后。两种速度叠在同一条战斗路径上，形成一次短促而猛烈的穿透。",
      ],
      items: [
        { value: "触发", title: "追击窗口", text: "在卷风完成加速、霍去病锁定目标后衔接释放。" },
        { value: "效果", title: "雷霆突进", text: "沿直线快速切入敌阵，对路径上的目标造成连续冲击并打乱阵形。" },
        { value: "体验", title: "快到来不及解释", text: "把霍去病时代的进攻性转化为玩家可以掌握的瞬间决断。" },
      ],
    },
    en: {
      title: "Leifengxing",
      lead: "Human–horse combo｜Juan Feng × Huo Qubing",
      paragraphs: [
        "Juan Feng tears open the battle line at speed, with Huo Qubing’s edge following close behind. Two kinds of momentum overlap on one path, creating a brief, forceful breach.",
      ],
      items: [
        { value: "TRIGGER", title: "Pursuit window", text: "Chain it after Juan Feng accelerates and Huo Qubing locks onto a target." },
        { value: "EFFECT", title: "Thunderous advance", text: "Cut through the enemy line in a fast straight charge, disrupting every target in the path." },
        { value: "FEEL", title: "Too fast to explain", text: "Turn Huo Qubing’s aggressive historical image into an instant decision the player can control." },
      ],
    },
  },
  {
    id: "silk-road-game-map",
    kind: "visual",
    section: "04 / 西域地图",
    image: `${GAME_VISUAL_ROOT}game-11-silk-road-map.webp`,
    alt: {
      zh: "卷云传西域地图：三匹马沿河西走廊进入西域",
      en: "Legend of Juan Yun Silk Road map: three horses travel from the Hexi Corridor into the Western Regions",
    },
    zh: {
      title: "西域地图",
      lead: "从长安出发，沿河西走廊向更远处展开。",
      paragraphs: [
        "地图把故事的行进方向变成可探索的空间：关隘、绿洲、古城和未解锁的远方共同组成三匹马的记忆路径。",
      ],
      items: [
        { value: "路线", title: "河西四郡", text: "长安、张掖、酒泉、敦煌成为进入西域前的连续地标。" },
        { value: "角色", title: "三马行迹", text: "卷云、卷风与卷雪分别留下属于自己的路线、速度和时代回声。" },
        { value: "解锁", title: "记忆时代", text: "随着探索推进，地图从被遮蔽的碎片逐步恢复为可阅读的历史关系。" },
      ],
    },
    en: {
      title: "The Western Regions map",
      lead: "Leave Chang’an and follow the Hexi Corridor toward a farther horizon.",
      paragraphs: [
        "The map turns the story’s direction of travel into an explorable space. Passes, oases, old cities, and locked horizons form the memory route of three horses.",
      ],
      items: [
        { value: "ROUTE", title: "Four Hexi commanderies", text: "Chang’an, Zhangye, Jiuquan, and Dunhuang become consecutive landmarks before the Western Regions." },
        { value: "CHARACTERS", title: "Three horse trails", text: "Juan Yun, Juan Feng, and Juan Xue each leave a route, a rhythm, and an echo of an era." },
        { value: "UNLOCK", title: "Memory eras", text: "As exploration advances, covered fragments resolve into readable historical relationships." },
      ],
    },
  },
  {
    id: "skill-system",
    kind: "text",
    section: "05 / 技能谱系",
    image: `${GAME_VISUAL_ROOT}game-15-skill-lineage.webp`,
    alt: {
      zh: "游戏技能谱系概念图",
      en: "Game skill-system concept art",
    },
    zh: {
      title: "技能谱系",
      lead: "每一种绝技都来自马匹、人物与时代关系的叠合。",
      items: [
        { value: "单体技", title: "壮志凌云｜卷云", text: "卷云以蓄力跃起突破地形，把害怕转化为一次向上的决心。" },
        { value: "人马组合技", title: "拨云见日｜卷云 × 张骞", text: "以张骞的远行意志为引，为队伍打开一段清晰的冲锋窗口。" },
        { value: "单体技", title: "朔风凛冽｜卷风", text: "卷风借疾风切入，快速改变位置并撕开敌方阵形。" },
        { value: "人马组合技", title: "雷厉风行｜卷风 × 霍去病", text: "速度与锋芒叠加成一次直线突进，连续冲击沿途目标。" },
        { value: "单体技", title: "雪舞长空｜卷雪", text: "卷雪以雪地步态牵引寒气，制造短暂的空域与视线优势。" },
        { value: "人马组合技", title: "踏雪寻梅｜卷雪 × 王昭君", text: "在冰雪环境中留下可追踪的路径，让防守与寻找重新连成一线。" },
        { value: "双马组合技", title: "风起云涌｜卷云 × 卷风", text: "一马引路、一马加速，把风压和冲锋合成范围性的推进。" },
        { value: "双马组合技", title: "云起雪飞｜卷云 × 卷雪", text: "以腾跃接续冰雪回旋，改变战场高度并制造连续移动窗口。" },
        { value: "三马终极技", title: "风雪卷云｜卷云 × 卷风 × 卷雪", text: "三匹马同步进入同一节奏，让风、雪与云的身体记忆汇成终极突破。" },
      ],
    },
    en: {
      title: "Skill lineage",
      lead: "Every technique grows from the overlap of horses, people, and their era.",
      items: [
        { value: "SOLO", title: "Aspiration Above the Clouds｜Juan Yun", text: "Juan Yun gathers momentum and leaps across terrain, turning fear into an upward decision." },
        { value: "COMBO", title: "Bod Yunjian｜Juan Yun × Zhang Qian", text: "Zhang Qian’s long-road resolve opens a clear window for the party to charge." },
        { value: "SOLO", title: "Biting North Wind｜Juan Feng", text: "Juan Feng cuts in on a hard wind, changing position and tearing open the enemy formation." },
        { value: "COMBO", title: "Leifengxing｜Juan Feng × Huo Qubing", text: "Speed and edge become a straight-line assault that strikes every target along its path." },
        { value: "SOLO", title: "Snow Dance Across the Sky｜Juan Xue", text: "Juan Xue draws cold through a snow-trained gait, creating a brief advantage in space and sight." },
        { value: "COMBO", title: "Seeking Plum in Snow｜Juan Xue × Wang Zhaojun", text: "A traceable route through the snow reconnects defense with the act of finding someone." },
        { value: "DUO", title: "Wind Rises, Clouds Surge｜Juan Yun × Juan Feng", text: "One horse leads and one accelerates, turning wind pressure and charge into area momentum." },
        { value: "DUO", title: "Cloud Rises, Snow Flies｜Juan Yun × Juan Xue", text: "A leap connects to a snowbound turn, changing battlefield height and opening movement windows." },
        { value: "ULTIMATE", title: "Wind, Snow, and Juan Yun｜Juan Yun × Juan Feng × Juan Xue", text: "Three horses enter one rhythm, gathering the bodily memory of wind, snow, and cloud into a final breakthrough." },
      ],
    },
  },
  {
    id: "video-ta-jie-entry",
    kind: "visual",
    section: "06 / 概念视频",
    video: `${GAME_VIDEO_ROOT}game-12-ta-jie-entry.webm`,
    alt: {
      zh: "概念视频：骑乘穿越沙漠并进入踏界",
      en: "Concept video: riding across the desert and entering Ta Jie",
    },
    zh: {
      title: "踏界：进入马的世界",
      lead: "概念视频｜骑乘探索演示",
      paragraphs: [
        "马的世界不再借用敦煌壁画作为背景，而是以马家窑彩陶的赭红、黑色旋纹、鸟形图腾与波带构成视觉语法。玩家从真实地貌冲入一片由远古纹样唤醒的踏界。",
      ],
      items: [
        { value: "操作", title: "加速与进入", text: "Shift 保持奔跑节奏，Enter 触发跨入踏界的关键动作。" },
        { value: "感受", title: "从真实到神话", text: "用一段连续的骑乘把现实沙漠和敦煌壁画般的世界接在一起。" },
      ],
    },
    en: {
      title: "Ta Jie: entering the horse world",
      lead: "Concept video｜Riding exploration demo",
      paragraphs: [
        "From a rear riding view across the desert, pressing Shift and Enter together moves the player from the physical landscape into Ta Jie, a world only horses can enter.",
      ],
      items: [
        { value: "CONTROL", title: "Accelerate and enter", text: "Shift holds the running rhythm; Enter triggers the decisive crossing into Ta Jie." },
        { value: "FEEL", title: "From real to mythic", text: "A continuous ride connects the physical desert to a world shaped like a living Dunhuang mural." },
      ],
    },
  },
  {
    id: "video-leifengxing-battle",
    kind: "visual",
    section: "07 / 概念视频",
    video: `${GAME_VIDEO_ROOT}game-13-leifengxing-battle.webm`,
    alt: {
      zh: "概念视频：卷风视角的骑乘战斗与攻击操作",
      en: "Concept video: mounted combat and attack controls from Juan Feng’s view",
    },
    zh: {
      title: "雷厉风行：战斗玩法",
      lead: "概念视频｜卷风视角",
      paragraphs: [
        "视线贴近卷风的鬃毛与冲锋路径，玩家在开阔战场中锁定目标、调整方向，并用攻击动作把速度变成伤害。",
      ],
      items: [
        { value: "战斗", title: "骑乘中的攻击", text: "在奔跑、转向与敌阵之间寻找出手角度，让马匹速度直接参与战斗。" },
        { value: "组合", title: "卷风 × 霍去病", text: "为雷厉风行预留追击节奏，在冲入阵线的瞬间释放组合技。" },
      ],
    },
    en: {
      title: "Leifengxing: combat play",
      lead: "Concept video｜Juan Feng’s point of view",
      paragraphs: [
        "The camera stays close to Juan Feng’s mane and charge path. The player locks onto a target, adjusts direction, and turns speed into damage through the attack action.",
      ],
      items: [
        { value: "COMBAT", title: "Attack from the saddle", text: "Find an angle between running, turning, and the enemy line so the horse’s speed becomes part of the strike." },
        { value: "COMBO", title: "Juan Feng × Huo Qubing", text: "Reserve a pursuit rhythm for Leifengxing and release the combo as the line is breached." },
      ],
    },
  },
  {
    id: "video-ta-xue-memory",
    kind: "visual",
    section: "08 / 概念视频",
    video: `${GAME_VIDEO_ROOT}game-14-ta-xue-memory.webm`,
    alt: {
      zh: "概念视频：卷雪战斗后的记忆碎片与通关评价",
      en: "Concept video: Juan Xue’s post-battle memory fragment and clear rating",
    },
    zh: {
      title: "踏雪寻梅：记忆碎片",
      lead: "概念视频｜卷雪章节反馈",
      paragraphs: [
        "战斗结束后，雪地被重新读成一块记忆碎片。通关评价、角色对白与奖励共同提示：玩家完成的不只是一次战斗，也是一次关系的保存。",
      ],
      items: [
        { value: "反馈", title: "通关评价", text: "时间、剩余生命与精力消耗组成可读的章节反馈。" },
        { value: "记忆", title: "把同行留下来", text: "奖励和碎片把王昭君与卷雪共同经历的片段带回下一次探索。" },
      ],
    },
    en: {
      title: "Seeking Plum in Snow: a memory fragment",
      lead: "Concept video｜Juan Xue chapter feedback",
      paragraphs: [
        "After the battle, the snow is reread as a memory fragment. The clear rating, character dialogue, and rewards suggest that the player preserved more than a victory: they preserved a relationship.",
      ],
      items: [
        { value: "FEEDBACK", title: "Clear rating", text: "Time, remaining health, and stamina use make the chapter’s outcome readable." },
        { value: "MEMORY", title: "Carry companionship forward", text: "Rewards and fragments carry the shared moment of Wang Zhaojun and Juan Xue into the next exploration." },
      ],
    },
  },
  {
    id: "shared-memory",
    kind: "visual",
    section: "09 / 共享记忆",
    image: `${GAME_VISUAL_ROOT}game-17-shared-memory.webp`,
    alt: {
      zh: "共享记忆游戏概念图：卷云、卷风与卷雪的记忆网络连接成风雪卷云",
      en: "Shared Memory game concept art: Juan Yun, Juan Feng, and Juan Xue connect through a shared memory network",
    },
    zh: {
      title: "共享记忆",
      lead: "记忆即技能｜卷云 × 卷风 × 卷雪",
      paragraphs: [
        "三匹马的记忆不是收藏在界面里的碎片，而是会彼此连接、共同改变战斗方式的身体经验。",
        "当卷云、卷风与卷雪的记忆网络完整连线，终极组合技“风雪卷云”被唤醒：三段历史、三个生命，在同一场奔跑中汇成一个决定。",
      ],
      items: [
        { value: "记忆网络", title: "三马同心", text: "每匹马带着自己的时代经验进入世界，记忆节点会随着探索逐步解锁。" },
        { value: "记忆即技能", title: "从经历到行动", text: "记忆不是背景资料，而是会改变感知、路线与战斗节奏的能力。" },
        { value: "终极组合", title: "风雪卷云", text: "当三条记忆路径完全连接，风、雪与云汇成三马终极技。" },
      ],
    },
    en: {
      title: "Shared Memory",
      lead: "Memory becomes skill｜Juan Yun × Juan Feng × Juan Xue",
      paragraphs: [
        "The three horses’ memories are not collectible fragments in a menu. They connect with one another as bodily experience and change how the player moves through combat.",
        "When Juan Yun, Juan Feng, and Juan Xue complete their memory network, the ultimate combo Wind, Snow, and Juan Yun awakens: three eras and three lives gather into one decision in motion.",
      ],
      items: [
        { value: "MEMORY NETWORK", title: "Three horses, one rhythm", text: "Each horse carries an era of experience; memory nodes unlock as exploration advances." },
        { value: "MEMORY AS SKILL", title: "From experience to action", text: "Memory is not background lore. It changes perception, routes, and combat timing." },
        { value: "ULTIMATE COMBO", title: "Wind, Snow, and Juan Yun", text: "When all three paths connect, wind, snow, and cloud become a final three-horse technique." },
      ],
    },
  },
  {
    id: "creators",
    kind: "text",
    section: "10 / 核心主创与制作架构",
    image: `${GAME_VISUAL_ROOT}game-02-concept.webp`,
    alt: {
      zh: "游戏概念图 02：角色协同与组合技能",
      en: "Game concept image 02: character synergy and combo skills",
    },
    zh: {
      title: "核心主创与制作架构",
      lead: "让角色旅程转化为可探索、可体验的章节。",
      items: [
        { value: "01", title: "王章乐", text: "创意总监、世界观与叙事设计｜核心主创" },
        { value: "02", title: "游戏编剧 / 关卡设计", text: "把角色旅程转化为可探索、可体验的章节｜组建中" },
        { value: "03", title: "技术美术 / 程序团队", text: "马匹动画、场景交互、资产与性能实现｜待匹配" },
        { value: "04", title: "历史顾问", text: "地图、地貌与汉匈时代生活考据｜待扩充" },
      ],
    },
    en: {
      title: "Core creators and production structure",
      lead: "Turn the characters’ journey into chapters players can explore and experience.",
      items: [
        { value: "01", title: "Wang Zhangle", text: "Creative director, worldbuilding and narrative design · Core team" },
        { value: "02", title: "Game writer / level designer", text: "Turn the characters’ journey into explorable chapters · Building" },
        { value: "03", title: "Technical art / programming team", text: "Horse animation, scene interaction, assets, and performance · To be matched" },
        { value: "04", title: "Historical advisor", text: "Maps, landscapes, and daily life in the Han–Xiongnu era · Expanding" },
      ],
    },
  },
  {
    id: "partners",
    kind: "text",
    section: "11 / 合作伙伴",
    image: `${GAME_VISUAL_ROOT}game-03-concept.webp`,
    alt: {
      zh: "游戏概念图 03：雪地遭遇与战斗关系",
      en: "Game concept image 03: a snowy encounter and combat relationships",
    },
    zh: {
      title: "等待共同进入世界的伙伴。",
      lead: "从联合开发、发行到研究协作，建立游戏的制作与发行网络。",
      items: [
        { value: "潜在", title: "腾讯游戏", text: "联合开发、发行或 IP 合作候选" },
        { value: "重点目标", title: "独立游戏发行商", text: "全球 PC 与主机发行" },
        { value: "潜在", title: "Steam / Epic Games Store", text: "数字发行渠道" },
        { value: "潜在", title: "高校游戏实验室", text: "原型、用户测试与技术协作" },
      ],
    },
    en: {
      title: "Partners waiting to enter the world together.",
      lead: "Build the game’s development and publishing network through co-development, publishing, and research collaboration.",
      items: [
        { value: "Potential", title: "Tencent Games", text: "Candidate for co-development, publishing, or IP collaboration" },
        { value: "Priority target", title: "Independent game publishers", text: "Global PC and console publishing" },
        { value: "Potential", title: "Steam / Epic Games Store", text: "Digital distribution channels" },
        { value: "Potential", title: "University game labs", text: "Prototyping, user testing, and technical collaboration" },
      ],
    },
  },
  {
    id: "timeline",
    kind: "text",
    section: "12 / 时间轴进度",
    image: `${GAME_VISUAL_ROOT}game-04-concept.webp`,
    alt: {
      zh: "游戏概念图 04：战斗场面与技能反馈",
      en: "Game concept image 04: combat staging and skill feedback",
    },
    zh: {
      title: "让一段旅程逐步变得可玩。",
      lead: "从设计文档到可玩样片，再到正式开发。",
      items: [
        { value: "2026下半年", title: "游戏设计文档", text: "锁定三匹马结构、核心区域、移动体验与玩家探索节奏。" },
        { value: "2027上半年", title: "可玩样片", text: "完成代表性地貌、马匹移动与一段完整探索流程。" },
        { value: "2027下半年—2028年", title: "正式开发", text: "拓展三个时代的地貌、角色互动与章节内容。" },
        { value: "待锁定", title: "平台与发行方案", text: "在样片验证及发行伙伴确认后决定平台、时长与商业模式。" },
      ],
    },
    en: {
      title: "Make a journey gradually playable.",
      lead: "From the design document to a playable demo, then into full production.",
      items: [
        { value: "H2 2026", title: "Game design document", text: "Lock the three-horse structure, core regions, movement feel, and exploration rhythm." },
        { value: "H1 2027", title: "Playable demo", text: "Complete representative landscapes, horse movement, and one full exploration sequence." },
        { value: "H2 2027–2028", title: "Full development", text: "Expand the landscapes, character interactions, and chapters across three eras." },
        { value: "To be locked", title: "Platform and publishing plan", text: "Decide platform, length, and business model after demo validation and partner confirmation." },
      ],
    },
  },
  {
    id: "highlights",
    kind: "text",
    section: "13 / 公开亮点",
    video: `${GAME_VIDEO_ROOT}game-05-gameplay-battlefield.webm`,
    alt: {
      zh: "游戏概念视频 01：战场视角与骑乘操作",
      en: "Game concept video 01: battlefield views and riding controls",
    },
    zh: {
      title: "让玩家从马的身体进入历史。",
      lead: "速度、关系与探索共同构成游戏体验。",
      items: [
        { value: "01", title: "以马的身体奔跑", text: "速度、重心、地形和情绪共同影响移动体验。" },
        { value: "02", title: "穿越三种时代风景", text: "河道、山口、草原与聚落在不同年代呈现新的面貌。" },
        { value: "03", title: "同行关系会被感知", text: "角色距离、声音与动作让陪伴成为游戏体验的一部分。" },
        { value: "04", title: "故事由探索打开", text: "重要信息藏在环境、路线与互动中，等待玩家亲自发现。" },
      ],
    },
    en: {
      title: "Enter history through the body of a horse.",
      lead: "Movement, relationships, and exploration become one game experience.",
      items: [
        { value: "01", title: "Run through a horse’s body", text: "Speed, balance, terrain, and emotion shape the feeling of movement." },
        { value: "02", title: "Cross three eras of landscape", text: "Rivers, passes, grasslands, and settlements change across time." },
        { value: "03", title: "Feel the relationships beside you", text: "Distance, sound, and movement make companionship part of play." },
        { value: "04", title: "Open the story through exploration", text: "Important information waits in environments, routes, and interactions." },
      ],
    },
  },
  {
    id: "experience",
    kind: "text",
    section: "14 / 体验设计",
    video: `${GAME_VIDEO_ROOT}game-06-gameplay-snow.webm`,
    alt: {
      zh: "游戏概念视频 02：雪地战斗与组合技能",
      en: "Game concept video 02: snowy combat and combo skills",
    },
    zh: {
      title: "让探索本身成为叙事。",
      lead: "用动物的感知、行动与关系重新组织玩家的方向感。",
      items: [
        { value: "◆", title: "马匹移动", text: "用步态、转向、跳跃与地形反馈塑造有重量的动物操控。" },
        { value: "◆", title: "动物视角", text: "减少传统地图依赖，让风、声音、气味和地标承担方向感。" },
        { value: "◆", title: "情感化操控", text: "通过动画、声音与关系距离呈现角色状态，而不是堆叠数值。" },
        { value: "◆", title: "章节式半开放区域", text: "每个区域都可自由探索，同时保留清晰的叙事节奏与地标识别。" },
      ],
    },
    en: {
      title: "Make exploration itself the narrative.",
      lead: "Rebuild the player’s sense of direction through animal perception, action, and relationships.",
      items: [
        { value: "◆", title: "Horse movement", text: "Use gait, turning, jumping, and terrain feedback to create weighty animal control." },
        { value: "◆", title: "An animal’s point of view", text: "Reduce reliance on conventional maps; let wind, sound, scent, and landmarks guide the player." },
        { value: "◆", title: "Emotional control", text: "Show character states through animation, sound, and relationship distance instead of stacked stats." },
        { value: "◆", title: "Chapter-based semi-open regions", text: "Let each region be freely explored while keeping a clear narrative rhythm and readable landmarks." },
      ],
    },
  },
]);
