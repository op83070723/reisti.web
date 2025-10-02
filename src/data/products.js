// src/data/products.js

// 3大類（ProductsView 用）
export const CATEGORIES = [
  { slug: 'concrete-drill', name: 'コンクリートドリル', lead: 'SDS-Plus / SDS-Max / 六角軸 / M35' },
  { slug: 'hole-saw',       name: 'ホールソー',       lead: 'バイメタル / 超硬（TCT）' },
  { slug: 'step-drill',     name: 'ステップドリル',   lead: '標準 / TiAlN コーティング' },
];

/* ========= 適合度プリセット（3=最適 / 2=適 / 1=可） ========= */
/* --- コンクリート系 共通 --- */
const SUIT_CONCRETE_BASE = [
  { name: 'コンクリート', level: 3 },
  { name: 'ブロック',     level: 3 },
  { name: 'レンガ',       level: 2 },
  { name: 'モルタル',     level: 2 },
  { name: '石材',         level: 2 },
];

/* SDS-Plus：刃枚数別 */
const SUIT_SDS_PLUS_2CUT = [
  { name: 'コンクリート', level: 2 },
  { name: 'ブロック',     level: 3 },
  { name: 'レンガ',       level: 3 },
  { name: 'モルタル',     level: 3 },
  { name: '石材',         level: 2 },
];
const SUIT_SDS_PLUS_3CUT = [
  { name: 'コンクリート', level: 3 },
  { name: 'ブロック',     level: 3 },
  { name: 'レンガ',       level: 2 },
  { name: 'モルタル',     level: 3 },
  { name: '石材',         level: 2 },
];
const SUIT_SDS_PLUS_4CUT = [
  { name: 'コンクリート', level: 3 },
  { name: 'ブロック',     level: 3 },
  { name: 'レンガ',       level: 2 },
  { name: 'モルタル',     level: 2 },
  { name: '石材',         level: 2 },
];

/* SDS-Max：大径・高負荷向け（四枚刃が最も仕上がり重視） */
const SUIT_SDS_MAX_2CUT = [
  { name: 'コンクリート', level: 3 },
  { name: 'ブロック',     level: 3 },
  { name: 'レンガ',       level: 2 },
  { name: 'モルタル',     level: 2 },
  { name: '石材',         level: 3 },
];
const SUIT_SDS_MAX_3CUT = [
  { name: 'コンクリート', level: 3 },
  { name: 'ブロック',     level: 3 },
  { name: 'レンガ',       level: 2 },
  { name: 'モルタル',     level: 3 },
  { name: '石材',         level: 3 },
];
const SUIT_SDS_MAX_4CUT = [
  { name: 'コンクリート', level: 3 },
  { name: 'ブロック',     level: 3 },
  { name: 'レンガ',       level: 2 },
  { name: 'モルタル',     level: 3 },
  { name: '石材',         level: 3 },
];

/* 六角軸（6.35mm） */
const SUIT_HEX = [
  { name: 'ブロック',         level: 3 },
  { name: 'レンガ',           level: 3 },
  { name: 'モルタル',         level: 3 },
  { name: '薄物コンクリート', level: 1 },
  { name: 'ALC',              level: 2 },
  { name: 'スレート',         level: 2 },
];

/* 直軸（丸軸） */
const SUIT_STRAIGHT = [
  { name: 'コンクリート', level: 2 },
  { name: 'ブロック',     level: 3 },
  { name: 'レンガ',       level: 2 },
  { name: 'モルタル',     level: 2 },
  { name: '石材',         level: 1 },
];

/* --- ホールソー系 --- */
const SUIT_HOLE_BIMETAL = [
  { name: '薄板鉄',     level: 2 },
  { name: 'ステンレス', level: 2 },
  { name: '非鉄金属',   level: 3 }, // アルミ・銅・真鍮など
  { name: '木材',       level: 2 },
  { name: '樹脂',       level: 3 },
  { name: '石膏ボード', level: 3 },
  { name: 'サイディング', level: 3 },
];
const SUIT_HOLE_TCT = [
  { name: 'ALC',         level: 3 },
  { name: '窯業系サイディング', level: 3 },
  { name: '合板・木質ボード',   level: 2 },
  { name: 'FRP',         level: 2 },
  { name: '薄物コンクリート', level: 1 },
];

/* --- ステップドリル --- */
const SUIT_STEP_STD = [
  { name: '薄板鉄',     level: 3 },
  { name: 'アルミ',     level: 3 },
  { name: '樹脂',       level: 3 },
  { name: 'ステンレス', level: 2 },
  { name: '銅・真鍮',   level: 3 },
];
const SUIT_STEP_TIALN = [
  { name: '薄板鉄',     level: 3 },
  { name: 'アルミ',     level: 3 },
  { name: '樹脂',       level: 3 },
  { name: 'ステンレス', level: 3 }, // 高温・耐摩耗
  { name: '銅・真鍮',   level: 3 },
];

/* ========= ここから製品データ ========= */
export const FAMILIES = [
  /* ===== コンクリートドリル ===== */
  {
    category: 'concrete-drill',
    family: 'sds-plus',
    name: 'SDS-Plus コンクリートドリル',
    intro: '軽量ハンマードリルに最適。クロス刃で直進性と真円性を両立。',
    variants: [
      {
        slug: 'sds-plus-2cut',
        label: '二枚刃',
        hero: '/images/sds-plus/sdsplus-2cut.png',
        gallery: [
          '/images/sds-plus/sdsplus-2cut.png',
          '/images/sds-plus/detail-1.jpg',
          '/images/sds-plus/detail-2.jpg',
          '/images/sds-plus/drawing.jpg',
        ],
        detail:
`最も軽快な切れ味。切り粉排出に優れ、ブロック・レンガ・モルタルなどの
軽〜中負荷で量産穿孔に活躍。アンカー下穴のスピード重視に。
適合電動機：軽量ハンマードリル（回転＋打撃）／振動ドリル（回転モード）
有効長・価格：下表の仕様一覧を参照`,
        suitability: SUIT_SDS_PLUS_2CUT,
        popularSizes: ['6.0', '6.5', '8.0', '10.0'],
        specs: [
          { size: '3.4',  overall: 110, effective: 50,  priceJPY: null },
          { size: '6.0',  overall: 160, effective: 100, priceJPY: null },
          { size: '6.5',  overall: 160, effective: 100, priceJPY: null },
          { size: '8.0',  overall: 210, effective: 150, priceJPY: null },
          { size: '10.0', overall: 260, effective: 200, priceJPY: null },
        ],
      },
      {
        slug: 'sds-plus-3cut',
        label: '三枚刃',
        hero: '/images/sds-plus3/main.jpg',
        gallery: ['/images/sds-plus3/main.jpg'],
        detail:
`芯振れを抑えた安定した食いつき。二枚刃より真円性と直進性が向上し、
コンクリートの仕上がりが良好。薄い鉄筋に接触しても噛み込みにくい設計。
適合電動機：軽量ハンマードリル（回転＋打撃）
有効長・価格：下表の仕様一覧を参照`,
        suitability: SUIT_SDS_PLUS_3CUT,
        popularSizes: ['6.0', '8.0'],
        specs: [],
      },
      {
        slug: 'sds-plus-4cut',
        label: '四枚刃',
        hero: '/images/sds-plus4/main.jpg',
        gallery: ['/images/sds-plus4/main.jpg'],
        detail:
`クロス刃で真円度が高く、壁面の欠けを抑制。精度が求められるアンカー下穴に最適。
鉄筋接触時のチッピング耐性も高く、仕上がり重視の現場向け。
適合電動機：軽量ハンマードリル（回転＋打撃）
有効長・価格：下表の仕様一覧を参照`,
        suitability: SUIT_SDS_PLUS_4CUT,
        popularSizes: ['10.0', '12.0'],
        specs: [],
      },
    ],
  },

  {
    category: 'concrete-drill',
    family: 'sds-max',
    name: 'SDS-Max コンクリートドリル',
    intro: '大型ハンマードリル向け。大径でも安定した穿孔。',
    variants: [
      {
        slug: 'sds-max-2cut',
        label: '二枚刃',
        hero: '/images/sds-max2/main.jpg',
        gallery: ['/images/sds-max2/main.jpg'],
        detail:
`大径でも切り屑排出が良く、穿孔速度を重視する重作業向け。
高強度コンクリートや石材にも対応。
適合電動機：SDS-Max ハンマードリル（回転＋打撃）`,
        suitability: SUIT_SDS_MAX_2CUT,
        popularSizes: ['16.0', '24.0'],
        specs: [],
      },
      {
        slug: 'sds-max-3cut',
        label: '三枚刃',
        hero: '/images/sds-max3/main.jpg',
        gallery: ['/images/sds-max3/main.jpg'],
        detail:
`安定した直進性とバランスの良い切削。貫通穴や深穴での真円性が向上。
適合電動機：SDS-Max ハンマードリル（回転＋打撃）`,
        suitability: SUIT_SDS_MAX_3CUT,
        popularSizes: ['20.0'],
        specs: [],
      },
      {
        slug: 'sds-max-4cut',
        label: '四枚刃',
        hero: '/images/sds-max4/main.jpg',
        gallery: ['/images/sds-max4/main.jpg'],
        detail:
`鉄筋接触時の衝撃を分散し、欠けを抑えるクロス刃。仕上がり・精度重視の穿孔に。
適合電動機：SDS-Max ハンマードリル（回転＋打撃）`,
        suitability: SUIT_SDS_MAX_4CUT,
        popularSizes: ['24.0'],
        specs: [],
      },
    ],
  },

  {
    category: 'concrete-drill',
    family: 'hex-shank',
    name: '六角軸（6.35mm）コンクリートドリル',
    intro: '充電工具にワンタッチ装着。回転＋インパクト対応で軽作業に最適。',
    variants: [
      {
        slug: 'hex',
        label: '標準',
        hero: '/images/hex/main-1.jpg',
        gallery: [
          '/images/hex/main-1.jpg',
          '/images/hex/detail-1.jpg',
          '/images/hex/detail-2.jpg',
        ],
        detail:
`充電インパクトドライバーで手軽にコンクリート系下地へ。
ブロック・レンガ・モルタル、薄物コンクリート、ALCやスレートにも。
適合電動機：インパクトドライバー／ドリルドライバー（回転＋インパクト）`,
        suitability: SUIT_HEX,
        popularSizes: ['3.4', '4.3', '5.0', '6.0', '6.4'],
        specs: [],
      },
    ],
  },

  {
    category: 'concrete-drill',
    family: 'M35',
    name: '六角軸鉄工ドリル(M35)',
    intro: 'ドリルドライバー・振動ドリル向けの汎用シャンク。',
    variants: [
      {
        slug: 'straight',
        label: '標準',
        hero: '/images/straight/main.jpg',
        gallery: ['/images/straight/main.jpg'],
        detail:
`汎用チャックに対応する丸軸タイプ。DIY〜軽作業の下穴あけに。
適合電動機：電気ドリル／振動ドリル（回転モード）`,
        suitability: SUIT_STRAIGHT,
        popularSizes: ['6.0', '8.0'],
        specs: [],
      },
    ],
  },

  /* ===== ホールソー ===== */
  {
    category: 'hole-saw',
    family: 'bi-metal',
    name: 'バイメタル ホールソー',
    intro: '幅広い素材に対応。汎用性の高い双金属刃。',
    variants: [
      {
        slug: 'bi',
        label: '標準',
        hero: '/images/bi-metal/main.jpg',
        gallery: ['/images/bi-metal/main.jpg'],
        detail:
`サイディング、石膏ボード、FRP、ベニヤ板、塩ビ板、複合材などの穴あけにマルチに活躍。
切り屑の排出効率を考慮したポケット形状で、厚板・深穴もスムーズ。
適合電動機：電気ドリル／振動ドリル（回転モード）
有効長・価格：下表の仕様一覧を参照`,
        suitability: SUIT_HOLE_BIMETAL,
        popularSizes: ['25', '35', '50'],
        specs: [],
      },
    ],
  },

  {
    category: 'hole-saw',
    family: 'tct',
    name: '超硬（TCT）ホールソー',
    intro: '硬質材に強い超硬チップ刃。',
    variants: [
      {
        slug: 'tct',
        label: '標準',
        hero: '/images/tct/main.jpg',
        gallery: ['/images/tct/main.jpg'],
        detail:
`ALC・窯業系サイディング・繊維強化ボードなど硬質下地に。
高耐久の超硬チップで欠けを抑え、スピーディに穿孔。
適合電動機：電気ドリル／振動ドリル（回転モード）`,
        suitability: SUIT_HOLE_TCT,
        popularSizes: ['32', '45', '65'],
        specs: [],
      },
    ],
  },

  /* ===== ステップドリル ===== */
  {
    category: 'step-drill',
    family: 'standard',
    name: 'ステップドリル',
    intro: '薄板のバリ少ない拡孔に。',
    variants: [
      {
        slug: 'std',
        label: '標準',
        hero: '/images/step/main.jpg',
        gallery: ['/images/step/main.jpg'],
        detail:
`段付き刃でセンタードリル不要。薄板鉄・アルミ・樹脂の拡孔や面取りに。
二枚刃切刃でスムーズに切削、バリを抑制。
適合電動機：電気ドリル（低速推奨）`,
        suitability: SUIT_STEP_STD,
        popularSizes: ['4-12', '4-20'],
        specs: [],
      },
    ],
  },

  {
    category: 'step-drill',
    family: 'tialn',
    name: 'TiAlN コーティング ステップドリル',
    intro: '耐熱性・耐摩耗性に優れたコーティング。',
    variants: [
      {
        slug: 'tialn',
        label: 'TiAlN',
        hero: '/images/step-tialn/main.jpg',
        gallery: ['/images/step-tialn/main.jpg'],
        detail:
`TiAlN コーティングにより高温下でも耐摩耗性を発揮。
ステンレスなど難削材でも安定した切削が可能。
適合電動機：電気ドリル（低速推奨）`,
        suitability: SUIT_STEP_TIALN,
        popularSizes: ['4-22', '6-30'],
        specs: [],
      },
    ],
  },
];

/* ===== ヘルパー：ルートから family / variant を引く ===== */
export function findFamily(categorySlug, familySlugOrVariant) {
  const fams = FAMILIES.filter(f => f.category === categorySlug);
  for (const f of fams) {
    if (f.family === familySlugOrVariant) return { family: f, variant: f.variants[0] };
    const v = f.variants.find(v => v.slug === familySlugOrVariant);
    if (v) return { family: f, variant: v };
  }
  return null;
}

