<template>
  <header class="sticky top-0 z-50 w-full border-b bg-white/90 supports-[backdrop-filter]:backdrop-blur">
    <div class="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-4 sm:px-6">

      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-3">
  <img src="/logo.png" class="h-10 md:h-12 lg:h-14 w-auto" alt="REISTI ロゴ" />
  <span class="text-lg md:text-xl font-semibold tracking-wide">REISTI</span>
</RouterLink>


      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-2">
        <RouterLink class="nav-link" to="/">ホーム</RouterLink>

        <!-- 製品情報：滑入即開、滑出即關（0ms） -->
        <div class="relative"
             @pointerenter="openDesk(true)" @pointerleave="openDesk(false)"
             @mouseenter="openDesk(true)"   @mouseleave="openDesk(false)"
             @focusin="openDesk(true)"      @focusout="openDesk(false)">
          <RouterLink to="/products" class="nav-link" :class="deskOpen?'bg-zinc-800 text-white':''">製品情報</RouterLink>

          <!-- Mega panel -->
          <div v-show="deskOpen" class="absolute left-1/2 -translate-x-1/2 top-full w-screen max-w-6xl px-4 pt-0 z-50">
            <div class="absolute -top-2 left-0 right-0 h-2"></div>
            <div class="rounded-2xl border bg-white/95 dark:bg-zinc-900/95 shadow-xl ring-1 ring-black/5 p-6">
              <div class="grid gap-6 md:grid-cols-3">
                <!-- 每個大類一欄 -->
                <section v-for="cat in categories" :key="cat.slug" class="col-card">
                  <h4 class="col-title">
                    <component :is="iconFor(cat.slug)" class="h-4 w-4 mr-2" />
                    {{ cat.name }}
                  </h4>

                  <ul class="mt-3 space-y-3">
                    <!-- 家族 -->
                    <li v-for="f in familiesByCategory(cat.slug)" :key="f.family" class="menu-item">
                      <RouterLink
                        class="item-title"
                        :to="linkTo(cat.slug, firstVariantSlug(f))">
                        <span class="badge">{{ badgeForFamily(f.family) }}</span>
                        {{ familyDisplayName(f) }}
                      </RouterLink>

                      <!-- 變體 chips（若只有1個就省略） -->
                      <div v-if="(f.variants?.length || 0) > 1" class="chips">
                        <RouterLink
                          v-for="v in f.variants" :key="v.slug"
                          class="chip"
                          :to="linkTo(cat.slug, v.slug)">
                          {{ v.label }}
                        </RouterLink>
                      </div>
                    </li>
                  </ul>

                  <!-- 右欄支援連結：只在最後一欄顯示 -->
                  <template v-if="cat.slug === categories[categories.length-1].slug">
                    <h4 class="col-title mt-6">サポート</h4>
                    <ul class="mt-3 space-y-2 text-sm">
                      <li><RouterLink class="sub-link" to="/products">製品一覧</RouterLink></li>
                      <li><RouterLink class="sub-link" to="/about">会社概要</RouterLink></li>
                      <li><RouterLink class="sub-link" to="/contact">お問い合わせ</RouterLink></li>
                    </ul>
                  </template>
                </section>
              </div>
            </div>
          </div>
        </div>

        <RouterLink class="nav-link" to="/about">会社概要</RouterLink>
        <RouterLink class="nav-link" to="/contact">お問い合わせ</RouterLink>
      </nav>

      <!-- CTA (desktop) -->
      <RouterLink to="/contact" class="hidden md:inline-flex btn-primary text-sm">お見積もり</RouterLink>

      <!-- Mobile burger -->
      <button
        class="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border"
        @click="open = !open" :aria-expanded="open" aria-controls="mnav">
        <span v-if="!open" aria-hidden="true">☰</span>
        <span v-else aria-hidden="true">✕</span>
        <span class="sr-only">メニュー</span>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div id="mnav" class="md:hidden" v-show="open">
      <div class="border-t bg-white/95 dark:bg-zinc-900/95">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 py-4 space-y-1">
          <RouterLink class="m-link" to="/" @click="closeAll">ホーム</RouterLink>

          <!-- 產品（手風琴） -->
          <div class="rounded-xl border overflow-hidden">
            <button class="w-full flex items-center justify-between px-4 py-3" @click="mProducts = !mProducts" :aria-expanded="mProducts">
              <span class="font-medium">製品情報</span>
              <span class="text-xl leading-none">{{ mProducts ? '−' : '+' }}</span>
            </button>

            <div v-show="mProducts" class="border-t divide-y">
              <!-- 每個大類一段 -->
              <div v-for="cat in categories" :key="cat.slug">
                <button class="w-full flex items-center justify-between px-4 py-3 text-sm" @click="toggleCat(cat.slug)">
                  <span class="flex items-center gap-2">
                    <component :is="iconFor(cat.slug)" class="h-4 w-4" />
                    {{ cat.name }}
                  </span>
                  <span class="text-lg leading-none">{{ mOpen[cat.slug] ? '−' : '+' }}</span>
                </button>

                <div v-show="mOpen[cat.slug]" class="px-3 pb-3 space-y-3 text-sm">
                  <!-- 家族與變體 -->
                  <div v-for="f in familiesByCategory(cat.slug)" :key="f.family" class="ml-1">
                    <div class="mb-1 font-medium flex items-center gap-2">
                      <span class="badge">{{ badgeForFamily(f.family) }}</span>
                      <RouterLink class="hover:underline" :to="linkTo(cat.slug, firstVariantSlug(f))" @click="closeAll">
                        {{ familyDisplayName(f) }}
                      </RouterLink>
                    </div>
                    <div v-if="(f.variants?.length || 0) > 1" class="flex flex-wrap gap-2">
                      <RouterLink
                        v-for="v in f.variants" :key="v.slug"
                        class="sub-m-chip"
                        :to="linkTo(cat.slug, v.slug)"
                        @click="closeAll">
                        {{ v.label }}
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <RouterLink class="m-link" to="/about" @click="closeAll">会社概要</RouterLink>
          <RouterLink class="m-link" to="/contact" @click="closeAll">お問い合わせ</RouterLink>
          <RouterLink to="/contact" class="btn-primary w-full mt-2" @click="closeAll">お見積もり</RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { CATEGORIES, FAMILIES } from '../data/products'

/* ---- 狀態 ---- */
const open = ref(false)
const deskOpen = ref(false)
const mProducts = ref(false)
const mOpen = reactive({}) // 每個大類在手機上的開闔

const categories = CATEGORIES
const familiesByCategory = (slug) => FAMILIES.filter(f => f.category === slug)

/* ---- 行為 ---- */
const openDesk = (val) => { deskOpen.value = val }
function closeAll(){
  open.value = false
  mProducts.value = false
  Object.keys(mOpen).forEach(k => mOpen[k] = false)
  deskOpen.value = false
}
function toggleCat(slug){ mOpen[slug] = !mOpen[slug] }

/* ---- Link & 顯示文字 ---- */
const linkTo = (category, slugOrFamily) => `/products/${category}/${slugOrFamily}`
const firstVariantSlug = (f) => (f.variants && f.variants[0]?.slug) || f.family

// 家族顯示名（資料裡已是日文）
const familyDisplayName = (f) => f.name

// 家族徽章
function badgeForFamily(key){
  switch (key) {
    case 'sds-plus': return 'SDS'
    case 'sds-max': return 'MAX'
    case 'hex-shank': return 'HEX'
    case 'straight-shank': return '丸軸'
    case 'bi-metal': return 'BI'
    case 'tct': return 'TCT'
    case 'standard': return 'STD'
    case 'tialn': return 'TiAlN'
    default: return '製品'
  }
}

/* ---- 分類圖示（SVG元件） ---- */
const IconDrill = {
  name: 'IconDrill',
  render(){
    return h('svg', { viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':'1.5', class:'h-4 w-4' }, [
      h('path', { d:'M3 12h7l4-3v6l-4-3H3z' }),
      h('path', { d:'M14 9l4-2v10l-4-2' })
    ])
  }
}
const IconHole = {
  name: 'IconHole',
  render(){
    return h('svg', { viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':'1.5', class:'h-4 w-4' }, [
      h('circle', { cx:'12', cy:'12', r:'6' }),
      h('path', { d:'M8 12h8' })
    ])
  }
}
const IconStep = {
  name: 'IconStep',
  render(){
    return h('svg', { viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':'1.5', class:'h-4 w-4' }, [
      h('path', { d:'M5 18h4v-3H5v3Z' }),
      h('path', { d:'M10 18h4v-6h-4v6Z' }),
      h('path', { d:'M15 18h4V6h-4v12Z' })
    ])
  }
}
import { h } from 'vue'
function iconFor(slug){
  if (slug === 'concrete-drill') return IconDrill
  if (slug === 'hole-saw') return IconHole
  if (slug === 'step-drill') return IconStep
  return IconDrill
}
</script>

<style scoped>
/* 通用樣式 */
.nav-link { @apply px-3 py-2 rounded-xl text-sm font-medium text-zinc-800 dark:text-zinc-100; }
.nav-link:hover { @apply bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-900; }

/* Mega menu 欄卡片 */
.col-card { @apply rounded-xl border p-4 bg-gradient-to-b from-zinc-50 to-transparent dark:from-zinc-800/40; }
.col-title { @apply flex items-center text-sm font-semibold text-zinc-800 dark:text-zinc-100; }
.col-title::after { content:""; display:block; @apply ml-auto h-px w-10 bg-zinc-300 dark:bg-zinc-700; }

.menu-item { @apply text-sm; }
.item-title { @apply inline-flex items-center gap-2 font-medium hover:underline; }

.badge { @apply inline-flex items-center rounded-md border px-1.5 py-0.5 text-[11px] font-medium
                bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100; }

.chips { @apply mt-1.5 flex flex-wrap gap-1.5; }
.chip { @apply rounded-full border px-2 py-0.5 text-xs hover:bg-zinc-100 dark:hover:bg-white/10; }

.sub-link { @apply hover:underline; }

/* Mobile */
.m-link      { @apply block rounded-xl px-4 py-3 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-white/10; }
.sub-m-chip  { @apply rounded-full border px-2 py-0.5 text-xs; }
</style>






