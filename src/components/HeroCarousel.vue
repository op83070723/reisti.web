<template>
  <div
    class="relative rounded-2xl overflow-hidden ring-1 ring-zinc-200 dark:ring-zinc-700"
    role="region"
    aria-label="製品イメージスライダー"
    tabindex="0"
    @mouseenter="stop"
    @mouseleave="start"
    @touchstart.passive="onTouchStart"
    @touchmove.passive="onTouchMove"
    @touchend.passive="onTouchEnd"
    @keydown.left.prevent="prev"
    @keydown.right.prevent="next"
  >
    <!-- viewport 以 aspect-ratio 控制高度，但寬度交給外層 -->
    <div class="w-full" :style="{ aspectRatio: ratio }">
      <!-- Slides -->
      <div
        class="track flex h-full transition-transform duration-500 ease-out"
        :style="{ transform: `translateX(-${index * 100}%)` }"
      >
        <div
          v-for="(img, i) in slides"
          :key="i"
          class="relative min-w-full h-full"
        >
          <img
            :src="img.src"
            :alt="img.alt || '製品イメージ'"
            class="w-full h-full object-cover"
            :loading="i === 0 ? 'eager' : 'lazy'"
            decoding="async"
          />
          <!-- 輕微遮罩，讓畫面更沉穩 -->
          <div class="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
        </div>
      </div>
    </div>

    <!-- Controls (桌機顯示) -->
    <button
      class="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-white/80 text-zinc-900 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-brand"
      @click="prev"
      aria-label="前へ"
    >‹</button>
    <button
      class="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-white/80 text-zinc-900 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-brand"
      @click="next"
      aria-label="次へ"
    >›</button>

    <!-- Indicators -->
    <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
      <button
        v-for="(img, i) in slides"
        :key="'dot-'+i"
        class="h-1.5 w-5 rounded-full transition"
        :class="i === index
          ? 'bg-zinc-900/80 dark:bg-white/80'
          : 'bg-white/40 dark:bg-white/20 hover:bg-white/60'"
        @click="goTo(i)"
        :aria-label="`スライド ${i+1} へ`"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watchEffect } from 'vue'

const props = defineProps({
  images:   { type: Array,  default: () => [] }, // [{src, alt}]
  interval: { type: Number, default: 4000 },     // 自動切換
  ratio:    { type: String, default: '16/9' },   // ✅ 自訂寬高比（例：'16/3'）
})

const slides = props.images.length
  ? props.images
  : [
      { src: 'https://images.unsplash.com/photo-1569931728440-c16e83a9a67a?q=80&w=1920&auto=format&fit=crop', alt: 'ドリルビット イメージ 1' },
      { src: 'https://images.unsplash.com/photo-1581094485813-6011347168e4?q=80&w=1920&auto=format&fit=crop', alt: 'ドリルビット イメージ 2' },
      { src: 'https://images.unsplash.com/photo-1581091014534-8987c1d2b1be?q=80&w=1920&auto=format&fit=crop', alt: '施工イメージ' },
    ]

const index = ref(0)
let timer = null

const goTo = (n) => { index.value = (n + slides.length) % slides.length }
const next = () => goTo(index.value + 1)
const prev = () => goTo(index.value - 1)

const start = () => { stop(); timer = setInterval(next, props.interval) }
const stop  = () => { if (timer) clearInterval(timer) }

onMounted(start)
onBeforeUnmount(stop)

// Touch swipe
let startX = 0, deltaX = 0
const onTouchStart = (e) => { stop(); startX = e.touches[0].clientX; deltaX = 0 }
const onTouchMove  = (e) => { deltaX = e.touches[0].clientX - startX }
const onTouchEnd   = () => {
  const threshold = 40
  if (deltaX > threshold) prev()
  else if (deltaX < -threshold) next()
  start()
}

// 若只有 1 張圖，自動播放關閉
watchEffect(() => { if (slides.length <= 1) stop() })
</script>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  .track { transition-duration: 0ms !important; }
}
</style>

