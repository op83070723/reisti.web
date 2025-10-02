<template>
  <main>
    <!-- ================= HERO：滿版 ================= -->
    <section class="relative full-bleed w-screen min-h-[72vh] md:min-h-[80vh] lg:min-h-[88vh] overflow-hidden">
      <!-- 背景輪播 -->
      <div class="absolute inset-0">
        <img
          v-for="(s,i) in slides" :key="'hero'+i"
          :src="s.src" :alt="s.alt"
          class="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          :class="current===i ? 'opacity-100' : 'opacity-0'"
        />
        <!-- 漸層疊層，讓前景文字更清楚 -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent"></div>
      </div>

      <!-- 前景文案 -->
      <div class="relative z-10 mx-auto max-w-7xl px-6 pt-12 md:pt-16 lg:pt-20">
        <p class="text-sm md:text-base text-white/85">日本市場で選ばれる</p>
        <h1 class="mt-2 text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
          プロ仕様ドリルビット・REISTI
        </h1>
        <p class="mt-3 max-w-3xl text-white/90 md:text-lg">
          台湾で25年以上のものづくり。SDS-Plus / SDS-Max / 六角軸 / ホールソー、ステップドリルまで。
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <RouterLink to="/products" class="btn-primary">製品を見る</RouterLink>
          <RouterLink to="/contact"  class="btn-outline-white">お問い合わせ</RouterLink>
        </div>
      </div>

      <!-- 指示點/箭頭 -->
      <div class="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        <button v-for="(s,i) in slides" :key="'dot'+i"
                class="pointer-events-auto h-1.5 w-6 rounded-full bg-white/40 hover:bg-white/70 transition"
                :class="current===i?'bg-white':''" @click="go(i)" />
      </div>
      <button v-if="slides.length>1" class="nav-arrow left-3"  @click="prev">‹</button>
      <button v-if="slides.length>1" class="nav-arrow right-3" @click="next">›</button>
    </section>

    <!-- =============== 製品情報：白色六角舞台 + 去背圖（蜂巢排列） =============== -->
    <section class="py-12 sm:py-16 hex-section-bg">
      <div class="mx-auto max-w-7xl px-4 sm:px-6">
        <div class="text-center mb-8">
          <p class="text-sm font-semibold tracking-widest text-red-600 [text-shadow:0_1px_2px_rgba(0,0,0,0.35),0_0_10px_rgba(0,0,0,0.18)]">Product</p>
          <h2 class="mt-1 text-3xl sm:text-4xl font-extrabold text-zinc-700 [text-shadow:0_1px_2px_rgba(0,0,0,0.35),0_0_10px_rgba(0,0,0,0.18)]">製品情報</h2>
        </div>

        <div class="grid-hex" role="list">
          <div
            v-for="(row, ri) in rows"
            :key="'row'+ri"
            class="grid-hex-row"
            :class="{ 'grid-hex-row--offset': ri % 2 === 1, 'grid-hex-row--tight': ri > 0 }"
          >
            <!-- ✅ 點擊區域 = 六角本體（clip-path） -->
            <RouterLink
              v-for="card in row"
              :key="card.to"
              :to="card.to"
              role="listitem"
              class="hex hex-white relative"
              :aria-label="card.title"
            >
              <!-- 去背 PNG：置中、等比 -->
              <img
                :src="card.img"
                :alt="card.title"
                class="hex-img-center z-0"
                @error="e => (e.target.style.opacity = 0.001)"
              />
              <!-- 新增：可見標題（覆蓋在圖片上） -->
             
            <span class="pointer-events-none absolute text-sm left-1/2 -translate-x-1/2 bottom-[8%] z-10
         px-2 py-1 font-bold text-zinc-700
         [text-shadow:0_1px_2px_rgba(0,0,0,0.35),0_0_10px_rgba(0,0,0,0.18)]"
         >
         {{ card.title }}
         </span>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

/* ========== HERO ========== */
/* 你的滿版圖請放 public/hero/ 下 */
const slides = [
  { src: '/hero/01.jpg', alt: '建設現場 1' },
  { src: '/hero/02.jpg', alt: '建設現場 2' },
  { src: '/hero/03.jpg', alt: '工具' },
]
const current = ref(0)
let timer
function start(){ stop(); if (slides.length>1) timer=setInterval(()=>next(), 6000) }
function stop(){ if (timer){ clearInterval(timer); timer=null } }
function next(){ current.value=(current.value+1)%slides.length }
function prev(){ current.value=(current.value+slides.length-1)%slides.length }
function go(i){ current.value=i }
onMounted(start); onBeforeUnmount(stop)

/* ========== 六角卡片資料（PNG 去背） ========== */
/* 你的去背圖請放 public/cards/ 下，建議 PNG 透明底 */
const cards = [
  { title:'SDS-Plus', img:'/products/sdsplus-3cut.png',  to:'/products/concrete-drill/sds-plus-2cut' },
  { title:'六角軸(6.35)',   img:'/products/hex-635.png',      to:'/products/concrete-drill/hex' },
  { title:'バイメタル', img:'/products/holesaw-bi.png', to:'/products/hole-saw/bi' },
  { title:'六角軸鉄工ドリル',  img:'/products/M35.png',   to:'/products/concrete-drill/M35' },
  { title:'超硬(TCT)', img:'/products/holesaw-tct.png',     to:'/products/step-drill/std' },
  { title:'SDS-Max',      img:'/cards/straight.png', to:'/products/concrete-drill/sds-max-2cut' },
]
const rows = computed(()=>{
  const out=[]; for(let i=0;i<cards.length;i+=3) out.push(cards.slice(i,i+3)); return out
})
</script>

<style scoped>
/* ========== Full-bleed（Hero） ========== */
.full-bleed{ position:relative; left:50%; right:50%; margin-left:-50vw; margin-right:-50vw; width:100vw; }

/* Buttons / Arrows (Tailwind 在專案內可用 @apply) */
.btn-primary{
  @apply inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2.5 text-white hover:bg-zinc-800;
}
.btn-outline-white{
  @apply inline-flex items-center justify-center rounded-xl px-4 py-2.5 border border-white/70 text-white hover:bg-white/10;
}
.nav-arrow{
  @apply absolute top-1/2 -translate-y-1/2 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/40 text-white hover:bg-black/60 border border-white/20;
}

/* ================== 蜂巢六角（尖頂） + Apple 風格白卡 ================== */

/* 區塊底（非常淡的光感，讓白卡與背景分離） */
.hex-section-bg{
  background:
    radial-gradient(1200px 420px at 50% -260px, rgba(0,0,0,.05), transparent 65%),
    radial-gradient(900px 360px at 82% 120%, rgba(0,0,0,.03), transparent 60%),
    #f8fafc;
}

/* 幾何尺寸與列對齊參數 */
.grid-hex{
  --hexW : clamp(210px, 19vw, 340px);   /* 六角寬度（調這個可整體放大/縮小） */
  --hexH : calc(var(--hexW) * 1.1547);  /* 尖頂六角的高度 */
  --hGap : 18px;                        /* 水平間距 */
  --vTight: 2px;                        /* 上下貼合預留 */
  --rowsNudge: -140px;                  /* 全部列共同水平位移（負=往左；正=往右） */

  display:flex; flex-direction:column; align-items:center;
}
.grid-hex-row{
  display:flex; align-items:center; column-gap: var(--hGap);
  margin-left: var(--rowsNudge); /* 所有列先吃共同位移 */
}
/* 第二列開始用負 margin 疊 0.2H，讓上下列的邊對邊 */
.grid-hex-row--tight{ margin-top: calc(var(--hexH) * -0.20 + var(--vTight)); }
/* 偶數列位移 “一整顆 + 間距”（再疊共同位移值） */
.grid-hex-row--offset{ margin-left: calc(var(--hexW) + var(--hGap) + var(--rowsNudge)); }

/* 六角本體：clip-path 保持點擊區域就是六角 */
.hex{
  position:relative; width: var(--hexW); height: var(--hexH); flex: 0 0 auto; display:block;
  -webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  -webkit-tap-highlight-color: transparent;
}

/* ✅ 白色舞台 + Apple 風格陰影（用 drop-shadow 才能在 clip-path 外投影） */
.hex-white{
  background: linear-gradient(180deg, #fff 0%, #fdfdfd 100%);      /* 非必要：微亮→微暗的層次 */
  /* hairline 邊：非常淡，讓輪廓與白背景分開 */
  box-shadow: inset 0 0 0 1px rgba(17, 24, 39, .06);
  /* 陰影：兩層 drop-shadow 更柔軟自然 */
  filter:
    drop-shadow(0 10px 22px rgba(0,0,0,.10))
    drop-shadow(0 2px 4px rgba(0,0,0,.05));
  transition: transform .35s ease, filter .35s ease, box-shadow .35s ease;
}
.hex-white:hover{
  transform: translateY(-2px) scale(1.012);
  filter:
    drop-shadow(0 18px 36px rgba(0,0,0,.18))
    drop-shadow(0 4px 8px rgba(0,0,0,.06));
  box-shadow: inset 0 0 0 1px rgba(17, 24, 39, .08);
}
.hex-white:focus-visible{
  outline: none;
  filter:
    drop-shadow(0 0 0 4px rgba(99, 102, 241, .18))
    drop-shadow(0 12px 28px rgba(0,0,0,.14));
}

/* 去背圖置中（等比，六角內最大 78%） */
.hex-img-center{
  position:absolute; top:50%; left:50%; transform: translate(-50%, -50%);
  width: 78%; height: 78%; object-fit: contain;
  z-index: 0; /* 確保圖片在底層，標題可覆蓋在上 */
}

/* 手機：單欄直排，取消位移與負 margin 疊合 */
@media (max-width: 639px){
  .grid-hex-row{ flex-direction:column; row-gap: var(--hGap); margin-left: 0; }
  .grid-hex-row--tight{ margin-top: var(--hGap); }
  .grid-hex-row--offset{ margin-left: 0; }
}
</style>












