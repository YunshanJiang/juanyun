const FILM_VISUAL_ROOT = "./Assets/Texture/optimized/film/";
const FILM_GENERATED_ROOT = `${FILM_VISUAL_ROOT}generated/`;

export const FILM_CONTENT_PAGES = Object.freeze([
  {
    id: "core-visual-01",
    kind: "visual",
    section: "00 / 核心视觉",
    image: `${FILM_VISUAL_ROOT}film-core-visual-02-zhangqian-scene.webp`,
    alt: {
      zh: "张骞角色氛围概念图",
      en: "Zhang Qian atmosphere concept art",
    },
    zh: {
      title: "丝路宽银幕世界",
      lead: "为银幕而生的丝路传奇。",
      paragraphs: ["河西走廊、草原与边塞，共同构成电影的东方景观。"],
    },
    en: {
      title: "A widescreen Silk Road world",
      lead: "A Silk Road legend born for the screen.",
      paragraphs: ["The Hexi Corridor, grasslands, and frontier passes shape the film’s Eastern landscape."],
    },
  },
  {
    id: "core-visual-02",
    kind: "visual",
    section: "00 / 核心视觉",
    image: `${FILM_VISUAL_ROOT}film-core-visual-04-juan-yun.webp`,
    alt: {
      zh: "卷云角色概念图",
      en: "Juan Yun character concept art",
    },
    zh: {
      title: "卷云角色主视觉",
      lead: "从铜奔马出发的原创动物角色。",
      paragraphs: ["一匹会犹豫、会逃跑，也会重新选择向前的马。"],
    },
    en: {
      title: "Juan Yun character visual",
      lead: "An original animal character inspired by the Bronze Galloping Horse.",
      paragraphs: ["A horse who hesitates, runs away, and chooses to move forward again."],
    },
  },
  {
    id: "core-visual-03",
    kind: "visual",
    section: "00 / 核心视觉",
    image: `${FILM_VISUAL_ROOT}film-core-visual-05-zhangqian.webp`,
    alt: {
      zh: "张骞角色概念图",
      en: "Zhang Qian character concept art",
    },
    zh: {
      title: "张骞角色主视觉",
      lead: "用人物选择讲述宏大历史。",
      paragraphs: ["动物承担戏剧，张骞在西行与囚禁中理解责任。"],
    },
    en: {
      title: "Zhang Qian character visual",
      lead: "Tell a vast history through personal choices.",
      paragraphs: ["The animals carry the drama; Zhang Qian learns responsibility through his journey and captivity."],
    },
  },
  {
    id: "core-visual-04",
    kind: "visual",
    section: "00 / 核心视觉",
    image: `${FILM_VISUAL_ROOT}film-core-visual-03-xiongnu.webp`,
    alt: {
      zh: "匈奴角色概念图",
      en: "Xiongnu character concept art",
    },
    zh: {
      title: "边界另一侧的视觉",
      lead: "汉、匈奴与西域共享一条丝路，但各有文化与选择。",
      paragraphs: ["以铜奔马、边塞与草原建立统一的汉代东方美学。"],
    },
    en: {
      title: "A visual language beyond the frontier",
      lead: "Han, Xiongnu, and the Western Regions share a Silk Road, yet keep their own cultures and choices.",
      paragraphs: ["The Bronze Galloping Horse, frontier passes, and grasslands shape a unified Han-era Eastern aesthetic."],
    },
  },
  {
    id: "core-visual-05",
    kind: "visual",
    section: "00 / 核心视觉",
    image: `${FILM_VISUAL_ROOT}film-core-visual-01-zhangqian-views.webp`,
    alt: {
      zh: "张骞角色三视图设定",
      en: "Zhang Qian character turnaround",
    },
    zh: {
      title: "角色先于技术",
      lead: "角色先于技术。",
      paragraphs: ["先确认人物如何行动，再让技术把世界长出来。"],
    },
    en: {
      title: "Character before technology",
      lead: "Character before technology.",
      paragraphs: ["First define how a character moves; then let technology grow the world around them."],
    },
  },
  {
    id: "core-visual-poster-01",
    kind: "visual",
    section: "00 / 核心视觉",
    image: `${FILM_VISUAL_ROOT}film-poster-01.webp`,
    alt: {
      zh: "《卷云传：铜奔马的故事》电影海报",
      en: "Legend of Juan Yun: The Story of the Bronze Galloping Horse film poster",
    },
    zh: {
      title: "电影海报 01",
      lead: "这是电影海报。",
      paragraphs: ["《卷云传：铜奔马的故事》"],
    },
    en: {
      title: "Film poster 01",
      lead: "This is a film poster.",
      paragraphs: ["Legend of Juan Yun: The Story of the Bronze Galloping Horse"],
    },
  },
  {
    id: "core-visual-poster-02",
    kind: "visual",
    section: "00 / 核心视觉",
    image: `${FILM_VISUAL_ROOT}film-poster-02.webp`,
    alt: {
      zh: "《卷云传》电影海报",
      en: "Legend of Juan Yun film poster",
    },
    zh: {
      title: "电影海报 02",
      lead: "这是电影海报。",
      paragraphs: ["《卷云传》"],
    },
    en: {
      title: "Film poster 02",
      lead: "This is a film poster.",
      paragraphs: ["Legend of Juan Yun"],
    },
  },
  {
    id: "scale",
    kind: "text",
    image: `${FILM_GENERATED_ROOT}film-scale-key-art.webp`,
    alt: {
      zh: "三匹马、三个时代与河西走廊的电影规模概念图",
      en: "Film scale concept art with three horses, three eras, and the Hexi Corridor",
    },
    section: "01 / 预计规模",
    zh: {
      title: "一条路，三部电影。",
      lead: "每部独立完整，共同构成丝路三部曲。",
      note: "以上为现阶段规划估算，不代表最终预算、承诺销量或已签署合同。",
      items: [
        { value: "3", title: "动画电影", text: "每部独立完整，共同构成丝路三部曲" },
        { value: "约一千万元", title: "三部曲规划投资", text: "现阶段整体规划，随正式预算更新" },
        { value: "70—90", title: "分钟 / 部", text: "长片目标区间" },
      ],
    },
    en: {
      title: "One road, three films.",
      lead: "Each film stands complete while forming a Silk Road trilogy.",
      note: "These are current planning estimates and do not represent a final budget, guaranteed sales, or signed contracts.",
      items: [
        { value: "3", title: "Animated films", text: "Each film stands complete while forming a Silk Road trilogy" },
        { value: "About ¥10m", title: "Trilogy investment plan", text: "A current overall plan, subject to the formal budget" },
        { value: "70–90", title: "Minutes / film", text: "Target range for each feature" },
      ],
    },
  },
  {
    id: "creator-wang-yutang",
    kind: "text",
    image: `${FILM_GENERATED_ROOT}film-creator-wang-yutang.webp`,
    alt: {
      zh: "王语堂的动画电影人物形象概念图",
      en: "Animated feature character concept portrait of Wang Yutang",
    },
    section: "02 / 核心主创与制作架构",
    zh: {
      title: "王语堂",
      lead: "兰州未来新影文化科技集团有限责任公司董事长｜核心共创者",
      paragraphs: [
        "王语堂是兰州未来新影文化科技集团董事长。公司成立于2011年，位于兰州新区，注册资本6479.62万元。",
        "公司以电影科技研发为核心，形成 FFM 视效技术体系，并参与《猎梦特工》《重金属猎人》等项目。王语堂为《卷云传》带来制作与技术落地能力。",
      ],
    },
    en: {
      title: "Wang Yutang",
      lead: "Chairman of Lanzhou Future Xinying Culture Technology Group｜Core co-creator",
      paragraphs: [
        "Wang Yutang is chairman of Lanzhou Future Xinying Culture Technology Group, founded in 2011 and based in Lanzhou New Area, Gansu. Its registered capital is RMB 64.7962 million.",
        "The company focuses on film technology and developed the FFM visual-effects system. Its project experience includes 《猎梦特工》 and Heavy Metal Hunter; Wang Yutang brings production and technical delivery to Legend of Juan Yun.",
      ],
    },
  },
  {
    id: "creator-wang-zhangle",
    kind: "text",
    image: `${FILM_GENERATED_ROOT}film-creator-wang-zhangle.webp`,
    alt: {
      zh: "王章乐的动画电影人物形象概念图",
      en: "Animated feature character concept portrait of Wang Zhangle",
    },
    section: "02 / 核心主创与制作架构",
    zh: {
      title: "王章乐",
      lead: "David Wang｜原创作者、编剧、导演及 IP 主理人",
      paragraphs: [
        "王章乐（David Wang）来自兰州，祖籍甘肃武威，是《卷云传》原创作者、编剧、导演及 IP 主理人，毕业于新加坡国立大学，并获新加坡管理大学管理学硕士学位。",
        "2019年，他与15位同学重走河西走廊，开始构思《卷云传》。故事以卷云、卷风、卷雪三匹马连接张骞、霍去病与王昭君，从动物视角讲述远行、牺牲与文明交流。",
        "目前，他正推动 IP 向电影、游戏、图书和互动体验拓展，并探索 AI 原生制作与传统文化叙事的结合。",
      ],
    },
    en: {
      title: "Wang Zhangle",
      lead: "David Wang｜Original creator, writer, director, and IP lead",
      paragraphs: [
        "Wang Zhangle, also known as David Wang, is from Lanzhou and traces his ancestral home to Wuwei, Gansu. He is the original creator, writer, director, and IP lead of Legend of Juan Yun, and holds degrees from the National University of Singapore and Singapore Management University.",
        "In 2019, he retraced the Hexi Corridor with fifteen classmates and began conceiving the IP. Three horses—Juan Yun, Juan Feng, and Juan Xue—connect the journeys of Zhang Qian, Huo Qubing, and Wang Zhaojun through an animal perspective.",
        "He is developing the IP across film, games, books, and interactive experiences while exploring AI-native production and traditional cultural storytelling.",
      ],
    },
  },
  {
    id: "creator-gin-kai-chan",
    kind: "text",
    image: `${FILM_GENERATED_ROOT}film-creator-gin-kai-chan-v3.webp`,
    alt: {
      zh: "Gin Kai Chan的动画电影人物形象概念图",
      en: "Animated feature character concept portrait of Gin Kai Chan",
    },
    section: "02 / 核心主创与制作架构",
    zh: {
      title: "Gin Kai Chan",
      lead: "监制与跨地域动画合作者",
      paragraphs: [
        "Gin Kai Chan参与香港动画长片《世外》的监制工作，影片于2025年在中国香港上映。",
        "他关注动画的情感表达与跨地域协作，为《卷云传》电影板块提供监制经验与创作交流支持。",
      ],
    },
    en: {
      title: "Gin Kai Chan",
      lead: "Producer｜Cross-regional animation collaborator",
      paragraphs: [
        "Gin Kai Chan worked as a producer on the Hong Kong animated feature 《世外》, released in Hong Kong in 2025.",
        "He focuses on animation, emotional storytelling, and cross-regional collaboration, bringing producing experience and creative exchange to Legend of Juan Yun.",
      ],
    },
  },
  {
    id: "creator-shi-runyu",
    kind: "text",
    image: `${FILM_GENERATED_ROOT}film-creator-shi-runyu.webp`,
    alt: {
      zh: "施润宇的动画电影人物形象概念图",
      en: "Animated feature character concept portrait of Shi Runyu",
    },
    section: "02 / 核心主创与制作架构",
    zh: {
      title: "施润宇",
      lead: "RUNYU SHI｜前沿 AIGC 视效导演、跨界视觉叙事艺术家",
      paragraphs: [
        "施润宇是 AIGC 视效导演，擅长使用生成模型，将 AI 技术与传统影视叙事结合。",
        "他相信“影像是流动的空间”，在科幻、动作与喜剧等题材中探索科技与人文共生的视觉表达。",
      ],
    },
    en: {
      title: "Shi Runyu",
      lead: "RUNYU SHI｜AIGC visual-effects director and cross-disciplinary visual artist",
      paragraphs: [
        "Shi Runyu is an AIGC visual-effects director who connects generative models with traditional cinematic storytelling.",
        "He works across science fiction, action, and comedy, believing that “影像是流动的空间”—image is flowing space—and seeking a visual language where technology and the humanities grow together.",
      ],
    },
  },
  {
    id: "creator-ding-libo",
    kind: "text",
    image: `${FILM_GENERATED_ROOT}film-creator-ding-libo.webp`,
    alt: {
      zh: "丁黎博的动画电影人物形象概念图",
      en: "Animated feature character concept portrait of Ding Libo",
    },
    section: "02 / 核心主创与制作架构",
    zh: {
      title: "丁黎博",
      lead: "香港电影金像奖最佳视效｜视效导演",
      paragraphs: [
        "丁黎博是一位视效导演，具备香港电影金像奖最佳视效方向的专业经验。作为核心共创者，他负责把复杂的视觉想象转化为可执行的电影视效语言，为《卷云传》的东方奇观、动作场面与世界构建提供视效支持。",
      ],
    },
    en: {
      title: "Ding Libo",
      lead: "Visual-effects director｜Hong Kong Film Award for Best Visual Effects",
      paragraphs: [
        "Ding Libo is a visual-effects director with professional experience in the Hong Kong Film Award for Best Visual Effects direction. As a core co-creator, he translates complex visual ideas into executable cinematic effects for the Eastern spectacle, action, and world-building of Legend of Juan Yun.",
      ],
    },
  },
  {
    id: "creator-fan-xingyu",
    kind: "text",
    image: `${FILM_GENERATED_ROOT}film-creator-fan-xingyu.webp`,
    alt: {
      zh: "樊星宇的动画电影人物形象概念图",
      en: "Animated feature character concept portrait of Fan Xingyu",
    },
    section: "02 / 核心主创与制作架构",
    zh: {
      title: "樊星宇",
      lead: "兰州籍制片人｜核心共创者",
      paragraphs: [
        "樊星宇是来自兰州的制片人，负责把创意、制作资源与项目推进连接起来，为《卷云传》电影板块的生产协同与落地执行提供支持。",
      ],
    },
    en: {
      title: "Fan Xingyu",
      lead: "Lanzhou producer｜Core co-creator",
      paragraphs: [
        "Fan Xingyu is a producer from Lanzhou who connects creative ideas, production resources, and project advancement, supporting coordination and practical delivery for the Legend of Juan Yun film project.",
      ],
    },
  },
  {
    id: "creator-lin-ziye",
    kind: "text",
    image: `${FILM_GENERATED_ROOT}film-creator-lin-ziye-v3.webp`,
    alt: {
      zh: "林子业的动画电影人物形象概念图",
      en: "Animated feature character concept portrait of Lin Ziye",
    },
    section: "02 / 核心主创与制作架构",
    zh: {
      title: "林子业",
      lead: "AIGC 助理导演、剪辑师｜核心共创者",
      paragraphs: [
        "林子业负责 AIGC 影像制作中的助理导演、剪辑与后期节奏工作，协助把生成素材组织成清晰、可观看的叙事。",
        "他连接视觉生成、镜头判断与剪辑结构，让前沿工具服务于角色、情绪和电影表达。",
      ],
    },
    en: {
      title: "Lin Ziye",
      lead: "AIGC assistant director and editor｜Core co-creator",
      paragraphs: [
        "Lin Ziye works across assistant direction, editing, and post-production rhythm for AIGC image-making, helping organize generated material into a clear and watchable narrative.",
        "He connects visual generation, shot judgment, and editorial structure so that emerging tools serve character, emotion, and cinematic expression.",
      ],
    },
  },
  {
    id: "creator-oliver-guse",
    kind: "text",
    image: `${FILM_GENERATED_ROOT}film-creator-oliver-guse.webp`,
    alt: {
      zh: "Oliver Guse 的动画电影人物形象概念图",
      en: "Animated feature character concept portrait of Oliver Guse",
    },
    section: "02 / 核心主创与制作架构",
    zh: {
      title: "Oliver Guse",
      lead: "动画导演、设计师与制片人｜Tycoon Animation",
      paragraphs: [
        "Oliver Guse 出生于加拿大安大略省伦敦，在 Sheridan College 学习艺术与电影。他在动画行业工作超过20年，担任过动画师、设计师、分镜师、导演和制片人，也是《瑞克和莫蒂》第一季的核心主创之一。",
        "他参与过60多部动画与影视项目，覆盖 2D、3D、剪辑及真人影视制作。目前他在菲律宾运营 Tycoon Animation，专注原创内容，并将长期动画经验带入《卷云传》的国际化共创。",
      ],
    },
    en: {
      title: "Oliver Guse",
      lead: "Animator, designer, director, and producer｜Tycoon Animation",
      paragraphs: [
        "Born in London, Ontario, Oliver Guse studied fine arts and film at Sheridan College. He has worked in animation for more than twenty years as an animator, designer, storyboard artist, director, and producer, and is described as a core creator of season one of Rick and Morty.",
        "His experience covers more than sixty animation and screen projects, 2D and 3D production, editing, and live action. He now runs Tycoon Animation in the Philippines and brings that experience to the international co-creation of Legend of Juan Yun.",
      ],
    },
  },
  {
    id: "partners",
    kind: "text",
    image: `${FILM_GENERATED_ROOT}film-partners-key-art.webp`,
    visualHref: "https://filmfreeway.com/projects/4346038",
    visualLinkLabel: {
      zh: "在 FilmFreeway 播放电影 trailer",
      en: "Play the film trailer on FilmFreeway",
    },
    alt: {
      zh: "电影团队围绕分镜、灯光与角色模型协作的概念图",
      en: "Concept art of film teams collaborating on storyboards, lighting, and character models",
    },
    section: "03 / 合作伙伴",
    zh: {
      title: "让故事走向更大的银幕。",
      lead: "从制作、融资到发行，合作伙伴让丝路进入更广阔的观看现场。",
      items: [
        { value: "已确定", title: "Silver Media Group", text: "制作、融资及国际合作协同" },
        {
          value: "已发布",
          title: "FilmFreeway",
          text: "电影节项目展示与国际节展入口",
          href: "https://filmfreeway.com/projects/4346038",
        },
        {
          value: "项目支持",
          title: "Kickstarter",
          text: "电影项目众筹与支持入口",
          href: "https://www.kickstarter.com/projects/jianyun/legend-of-juan-yuan?ref=user_menu",
        },
        { value: "重点目标", title: "中国及海外院线", text: "长片发行与特别放映" },
        { value: "潜在", title: "Netflix及区域OTT", text: "全球与区域流媒体发行" },
      ],
    },
    en: {
      title: "Take the story to a larger screen.",
      lead: "From production and financing to distribution, partners bring the Silk Road to a wider audience.",
      items: [
        { value: "Confirmed", title: "Silver Media Group", text: "Production, financing, and international collaboration" },
        {
          value: "Published",
          title: "FilmFreeway",
          text: "Film-festival project presentation and international festival access",
          href: "https://filmfreeway.com/projects/4346038",
        },
        {
          value: "Project support",
          title: "Kickstarter",
          text: "Film project crowdfunding and support",
          href: "https://www.kickstarter.com/projects/jianyun/legend-of-juan-yuan?ref=user_menu",
        },
        { value: "Priority target", title: "Chinese and overseas cinemas", text: "Feature distribution and special screenings" },
        { value: "Potential", title: "Netflix and regional OTT", text: "Global and regional streaming distribution" },
      ],
    },
  },
  {
    id: "timeline",
    kind: "text",
    image: `${FILM_GENERATED_ROOT}film-timeline-key-art.webp`,
    alt: {
      zh: "从草图、角色设计到动画银幕的电影制作过程概念图",
      en: "Concept art of the film process from sketches and character design to animation on screen",
    },
    section: "04 / 时间轴进度",
    zh: {
      title: "从验证一匹马，到展开三部曲。",
      lead: "一条持续推进的制作时间轴。",
      items: [
        { value: "2026上半年", title: "✓ 短片与视觉验证", text: "完成核心角色与关键动作测试，建立国际电影项目与众筹公开页面。" },
        { value: "2026下半年", title: "● 第一部前期开发", text: "推进剧本、项目备案、融资材料、关键视觉与制作方案。", tag: "CURRENT" },
        { value: "2027年", title: "第一部正式制作", text: "进入角色、场景、动画、声音与后期制作阶段。" },
        { value: "2028—2031年", title: "发行与三部曲拓展", text: "推动首部电影发行，并依次发展卷风与卷雪篇章。" },
      ],
    },
    en: {
      title: "From validating one horse to unfolding a trilogy.",
      lead: "A production timeline that keeps moving forward.",
      items: [
        { value: "H1 2026", title: "✓ Short film and visual validation", text: "Complete core-character and key-action tests; establish public pages for the international film project and crowdfunding." },
        { value: "H2 2026", title: "● Development of film one", text: "Advance the screenplay, project filing, financing materials, key visuals, and production plan.", tag: "CURRENT" },
        { value: "2027", title: "Production of film one", text: "Enter character, environment, animation, sound, and post-production." },
        { value: "2028–2031", title: "Release and trilogy expansion", text: "Release the first film, then develop the Juan Feng and Juan Xue chapters." },
      ],
    },
  },
  {
    id: "highlights",
    kind: "text",
    image: `${FILM_GENERATED_ROOT}film-highlights-key-art.webp`,
    alt: {
      zh: "铜奔马在夕阳丝路上获得新生命的概念图",
      en: "Concept art of the Bronze Galloping Horse coming alive on the Silk Road at sunset",
    },
    section: "05 / 公开亮点",
    zh: {
      title: "让国宝获得新生命。",
      lead: "四个面向观众、也面向世界的公开亮点。",
      items: [
        { value: "01", title: "国宝获得新生命", text: "从铜奔马出发，创造一组面向当代观众的原创动物角色。" },
        { value: "02", title: "动物看见历史", text: "让马成为真正的叙事主体，以它们的感受连接宏大时代与个人选择。" },
        { value: "03", title: "丝路成为银幕", text: "河西走廊、草原、山口与城邦共同构成宽银幕东方景观。" },
        { value: "04", title: "三部曲共同成长", text: "三匹马、三个时代、三种生命选择，共同组成完整的丝路传奇。" },
      ],
    },
    en: {
      title: "Give a national treasure a new life.",
      lead: "Four public-facing highlights for audiences at home and around the world.",
      items: [
        { value: "01", title: "A national treasure finds new life", text: "Starting from the Bronze Galloping Horse, create original animal characters for contemporary audiences." },
        { value: "02", title: "Animals see history", text: "Make horses true narrative subjects, connecting a vast era and personal choices through their feelings." },
        { value: "03", title: "The Silk Road becomes a screen", text: "The Hexi Corridor, grasslands, mountain passes, and city-states form a widescreen Eastern landscape." },
        { value: "04", title: "A trilogy grows together", text: "Three horses, three eras, and three life choices form one complete Silk Road legend." },
      ],
    },
  },
  {
    id: "experience",
    kind: "text",
    image: `${FILM_GENERATED_ROOT}film-experience-key-art.webp`,
    alt: {
      zh: "观众从动物视角沉浸式看见丝路的概念图",
      en: "Concept art of audiences experiencing the Silk Road from an animal point of view",
    },
    section: "06 / 体验设计",
    zh: {
      title: "让观众从新的角度看见丝路。",
      lead: "技术退后一步，角色、身体和情感走到前面。",
      items: [
        { value: "◆", title: "角色先于技术", text: "每一处造型、动作与表情都服务于角色可信度和观众情感。" },
        { value: "◆", title: "动物第一主角", text: "马的身体、性格与选择承担戏剧，让历史从新的视角被看见。" },
        { value: "◆", title: "汉代东方美学", text: "以铜奔马、河西走廊、汉节、边塞与草原建立统一视觉体系。" },
        { value: "◆", title: "面向全球的中国故事", text: "以清晰、真挚的角色关系跨越语言，让丝路精神被更多观众理解。" },
      ],
    },
    en: {
      title: "Let audiences see the Silk Road anew.",
      lead: "Technology steps back so character, body, and emotion can move forward.",
      items: [
        { value: "◆", title: "Character before technology", text: "Every shape, movement, and expression serves character credibility and audience emotion." },
        { value: "◆", title: "Animals as the first protagonists", text: "The horse’s body, personality, and choices carry the drama, letting history be seen from a new perspective." },
        { value: "◆", title: "Han-era Eastern aesthetics", text: "The Bronze Galloping Horse, the Hexi Corridor, Han envoys, frontier passes, and grasslands establish a unified visual system." },
        { value: "◆", title: "A Chinese story for the world", text: "Clear, sincere character relationships cross language so more audiences can understand the spirit of the Silk Road." },
      ],
    },
  },
]);
