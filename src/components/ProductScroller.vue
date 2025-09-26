<!-- src/components/ProductScroller.vue -->
<template>
  <!-- no-frame：關掉任何角落裝飾（引號等）；用 CSS 變數帶進卡片固定尺寸 -->
  <section class="relative no-frame" :style="cardVars">
    <div v-if="heading" class="mb-4 flex items-end justify-between px-2 sm:px-0">
      <h2 class="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-900">
        {{ heading }}
      </h2>
    </div>

    <div class="relative">
      <!-- 邊緣漸層（提示可滑動） -->
      <div class="fade fade-left" aria-hidden="true"></div>
      <div class="fade fade-right" aria-hidden="true"></div>

      <!-- 滾動軌 -->
      <div
        ref="track"
        class="scroll-track hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 sm:px-0"
        @wheel.passive="onWheel"
        @scroll.passive="updateState"
        tabindex="0"
      >
        <!-- 卡片：固定像素大小；窄螢幕時以裁切呈現 -->
        <RouterLink
          v-for="(p, i) in items"
          :key="i"
          :to="p.to || '#'"
          class="card snap-start"
        >
          <div class="relative h-full w-full">
            <!-- 文案層（浮在圖片上） -->
            <div class="copy px-2 sm:px-4 pt-3 sm:pt-4">
              <p v-if="p.badge" class="text-[12px] font-semibold tracking-wide text-zinc-500">
                {{ p.badge }}
              </p>
              <h3 class="mt-1 text-2xl font-extrabold whitespace-nowrap leading-tight text-zinc-900">
                {{ p.title }}
              </h3>
              <p v-if="p.subtitle" class="mt-1 text-[clamp(12px,1.6vw,14px)] whitespace-nowrap text-zinc-600">
                {{ p.subtitle }}
              </p>
              <p v-if="p.price" class="mt-2 text-[13px] font-medium text-zinc-500">
                {{ p.price }}
              </p>
            </div>

            <!-- 去背圖：固定像素寬度；位置可微調；頁面變窄直接裁切 -->
            <img
              :src="p.img"
              :alt="p.title"
              class="art"
              :style="{
                '--artW': (p.artW ?? 360) + 'px',
                '--artX': (p.artX ?? 0) + 'px',
                '--artY': (p.artY ?? 0) + 'px',
                '--artR': (p.rotate ?? 0) + 'deg'
              }"
              @error="e => e.target && (e.target.style.opacity = 0.001)"
            />
          </div>
        </RouterLink>
      </div>

      <!-- 兩側箭頭 -->
      <div class="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between">
        <button
          class="ctrl pointer-events-auto"
          :class="{ 'is-disabled': !canLeft }"
          aria-label="前へ"
          @click="scrollBy(-1)"
        >‹</button>
        <button
          class="ctrl pointer-events-auto"
          :class="{ 'is-disabled': !canRight }"
          aria-label="次へ"
          @click="scrollBy(1)"
        >›</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'

/**
 * 用法：
 * <ProductScroller
 *   heading="注目の製品"
 *   :card-w="420" :card-h="520"
 *   :items="[
 *     { title:'六角軸（6.35mm）', subtitle:'小型充電工具にワンタッチ装着。', price:'¥980 から', img:'/products/hex.webp', to:'/products/hex', artW:420, artX:0,  artY:0  },
 *     { title:'SDS-Plus 2枚刃',   subtitle:'直進性と耐久性のベストバランス。',    price:'¥1,280 から', img:'/products/sdsplus.webp', to:'/products/sdsplus', artW:520, artX:30, artY:-10 }
 *   ]"
 * />
 */
const props = defineProps({
  heading: { type: String, default: '' },
  items:   { type: Array,  default: () => [] },

  // ✅ 固定像素尺寸（不要跟隨視窗縮放）
  cardW:   { type: Number, default: 420 },
  cardH:   { type: Number, default: 520 },

  step:    { type: Number, default: 1 }, // 一次滑動幾張卡
})

// 把固定尺寸丟給 CSS 變數
const cardVars = computed(() => ({
  '--cardW': props.cardW + 'px',
  '--cardH': props.cardH + 'px',
}))

const track    = ref(null)
const canLeft  = ref(false)
const canRight = ref(false)

function updateState () {
  const el = track.value
  if (!el) return
  const max = el.scrollWidth - el.clientWidth
  canLeft.value  = el.scrollLeft > 2
  canRight.value = el.scrollLeft < max - 2
}

/** @param {WheelEvent} e */
function onWheel (e) {
  const el = track.value
  if (!el) return

  // 只在「真正的橫向手勢」或按住 Shift 時才水平捲動
  const horizontalIntent = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey
  if (!horizontalIntent) return

  el.scrollBy({ left: e.deltaX, behavior: 'auto' })
}


function scrollBy (dir = 1) {
  const el = track.value
  if (!el) return
  const card = el.querySelector('.card')
  const style = getComputedStyle(el)
  const gap = parseFloat(style.columnGap || style.gap || 16)
  const stepWidth = card ? card.getBoundingClientRect().width + gap : el.clientWidth * 0.8
  el.scrollBy({ left: stepWidth * props.step * dir, behavior: 'smooth' })
  requestAnimationFrame(() => setTimeout(updateState, 120))
}

function onKey (e) {
  if (e.key === 'ArrowLeft')  scrollBy(-1)
  if (e.key === 'ArrowRight') scrollBy(1)
}

onMounted(() => {
  updateState()
  const el = track.value
  if (el) el.addEventListener('keydown', onKey)
  window.addEventListener('resize', updateState)
})
onBeforeUnmount(() => {
  const el = track.value
  if (el) el.removeEventListener('keydown', onKey)
  window.removeEventListener('resize', updateState)
})

watch(() => props.items, () => requestAnimationFrame(updateState))
</script>

<style scoped>
/* ====== 卡片尺寸改為固定像素，不再使用 vw/clamp ====== */
.card{
  position: relative;
  overflow: hidden;                         /* 視窗變窄→裁切，而不是縮圖 */
  width: var(--cardW, 420px);
  min-width: var(--cardW, 420px);
  height: var(--cardH, 520px);
  border-radius: 28px;
  background: #fff;
  box-shadow: 0 6px 22px rgba(0,0,0,.08);
}

/* 文字層在上，可調整 max-width 避免吃到圖 */
.copy{
  position: relative;
  z-index: 3;
  max-width: min(56%, 560px);
}

/* 去背圖：固定像素寬度；靠右下；縮小頁面就裁切 */
.art{
  position: absolute;
  right: 24px;
  bottom: 12px;
  width: var(--artW, 360px);                /* 固定 px，不跟容器縮放 */
  height: auto;
  transform:
    translate(var(--artX, 0), var(--artY, 0))
    rotate(var(--artR, 0));
  z-index: 1;                               /* 在文字下 */
  pointer-events: none;
}

/* 箭頭 */
.ctrl{
  display:grid; place-items:center;
  width:44px; height:44px; border-radius:9999px;
  background: rgba(24,24,27,.65);
  color:#fff; font-size:22px; line-height:1;
  border:1px solid rgba(255,255,255,.25);
  backdrop-filter: saturate(160%) blur(8px);
  transition: transform .15s ease, opacity .15s ease, background .15s ease;
  margin: 0 8px;
}
.ctrl:hover{ transform: scale(1.06); background: rgba(24,24,27,.78); }
.ctrl.is-disabled{ opacity:.35; pointer-events:none; }

/* 邊緣漸層（依你的頁面底色可調） */
.fade{
  position:absolute; top:0; bottom:0; width:44px; z-index:4; pointer-events:none;
}
.fade-left{  left:0;  background: linear-gradient(90deg, rgba(250,250,250,1), rgba(250,250,250,0)); }
.fade-right{ right:0; background: linear-gradient(-90deg, rgba(250,250,250,1), rgba(250,250,250,0)); }

/* 隱藏捲軸 */
.hide-scrollbar{ scrollbar-width:none; }
.hide-scrollbar::-webkit-scrollbar{ display:none; }

/* 關掉全站角落裝飾（引號） */
.no-frame::before,
.no-frame::after,
.no-frame .card::before,
.no-frame .card::after,
.no-frame [class*="corner"]::before,
.no-frame [class*="corner"]::after{
  display:none !important;
  content:none !important;
}
/* 放在 ProductScroller.vue 的 <style scoped> 末尾即可 */
.scroll-track{
  overscroll-behavior-inline: contain; /* 阻止橫向 overscroll 傳遞 */
}

</style>






