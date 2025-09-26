<template>
  <section class="relative overflow-hidden
                  bg-gradient-to-b from-zinc-50 via-white to-zinc-100
                  dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-900">
    <!-- 背景：黑灰 mesh + 超淡網格 -->
    <svg class="absolute inset-0 -z-20 h-full w-full" viewBox="0 0 1600 900" aria-hidden="true">
      <defs>
        <radialGradient id="m1" cx="0" cy="0" r="1">
          <stop offset="0%"  stop-color="#000000" stop-opacity="0.20"/>
          <stop offset="70%" stop-color="#000000" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="m2" cx="0" cy="0" r="1">
          <stop offset="0%"  stop-color="#3f3f46" stop-opacity="0.16"/>
          <stop offset="70%" stop-color="#3f3f46" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="m3" cx="0" cy="0" r="1">
          <stop offset="0%"  stop-color="#18181b" stop-opacity="0.14"/>
          <stop offset="70%" stop-color="#18181b" stop-opacity="0"/>
        </radialGradient>
        <filter id="blur-90"><feGaussianBlur stdDeviation="90" /></filter>
      </defs>
      <g filter="url(#blur-90)" class="opacity-90">
        <g class="float-slow"><circle cx="320"  cy="280" r="460" fill="url(#m1)" /></g>
        <g class="float-mid"><circle  cx="760"  cy="160" r="360" fill="url(#m2)" /></g>
        <g class="float-fast"><circle cx="1280" cy="520" r="440" fill="url(#m3)" /></g>
      </g>
    </svg>
    <svg class="absolute inset-0 -z-10 h-full w-full opacity-18 mix-blend-multiply text-zinc-300 dark:text-zinc-600" aria-hidden="true">
      <defs>
        <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0V28" fill="none" stroke="currentColor" stroke-width="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
    <div class="pointer-events-none absolute inset-0 -z-10 bg-noise"></div>

    <!-- 內容：上方輪播、下方標語 -->
    <div class="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
      <!-- 輪播區：外框 + 條紋帶（橫幅不變，高度薄） -->
      <div class="relative mx-auto w-full max-w-4xl">
        <!-- 外框幾何線條 -->
        <div class="pointer-events-none absolute -inset-3 rounded-3xl ring-1 ring-zinc-300/60 dark:ring-white/15"></div>
        <div class="pointer-events-none absolute -inset-6 rounded-[2.25rem] rotate-1 ring-1 ring-zinc-200/50 dark:ring-white/10"></div>
        <div class="pointer-events-none absolute inset-0 rounded-3xl bg-stripes opacity-35 dark:opacity-25"></div>

        <HeroCarousel :images="heroImages" :interval="4500" ratio="16/6.5" />
      </div>

      <!-- 標語卡片：加角落線框（可重用） -->
      <div class="mx-auto mt-8 max-w-4xl">
        <AccentFrame>
          <div class="p-5 sm:p-6">
            <h1 class="font-black leading-tight text-zinc-950 dark:text-white">
              日本市場で選ばれる<br class="hidden sm:block" />プロ仕様ドリルビット・REISTI
            </h1>
            <p class="mt-3 sm:mt-4 text-zinc-800 dark:text-zinc-200 text-sm sm:text-base">
              台湾で25年以上のものづくり。<span class="whitespace-nowrap">SDS-Plus</span> と
              <span class="whitespace-nowrap">六角軸（6.35mm）</span> を中心に、施工現場のニーズに合わせた
              高精度・高耐久のラインアップ。
            </p>
            <div class="mt-6 flex flex-col sm:flex-row gap-3">
              <RouterLink to="/products/sds-plus" class="btn-primary text-sm sm:text-base">SDS-Plus を見る</RouterLink>
              <RouterLink to="/products/hex-shank" class="btn-outline text-sm sm:text-base">六角軸を見る</RouterLink>
            </div>
            <div class="mt-3">
              <RouterLink to="/contact" class="inline-block text-sm text-zinc-800 dark:text-zinc-300 underline">
                OEM/大量発注のご相談はこちら
              </RouterLink>
            </div>
          </div>
        </AccentFrame>
      </div>
    </div>
  </section>
</template>

<script setup>
import HeroCarousel from './HeroCarousel.vue'
import AccentFrame from './AccentFrame.vue'

const heroImages = [
  { src: 'https://images.unsplash.com/photo-1569931728440-c16e83a9a67a?q=80&w=1920&auto=format&fit=crop', alt: 'ドリルビット イメージ 1' },
  { src: 'https://images.unsplash.com/photo-1581094485813-6011347168e4?q=80&w=1920&auto=format&fit=crop', alt: 'ドリルビット イメージ 2' },
  { src: 'https://images.unsplash.com/photo-1581091014534-8987c1d2b1be?q=80&w=1920&auto=format&fit=crop', alt: '施工イメージ' },
]
</script>

<style scoped>
@keyframes floatA { from { transform: translate(0,0); } to { transform: translate(7px,-6px); } }
@keyframes floatB { from { transform: translate(0,0); } to { transform: translate(-6px,5px); } }
@keyframes floatC { from { transform: translate(0,0); } to { transform: translate(5px,4px); } }
.float-slow { animation: floatA 14s ease-in-out infinite alternate; }
.float-mid  { animation: floatB 18s ease-in-out infinite alternate; }
.float-fast { animation: floatC 22s ease-in-out infinite alternate; }
</style>
















