<template>
  <section class="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
    <!-- 上半：左文字（無卡片）＋ 右大圖（卡片） -->
    <div class="grid gap-6 md:grid-cols-12 md:items-start">
      <div class="md:col-span-5">
        <h1 class="text-2xl sm:text-3xl font-bold">六角軸（6.35mm）コンクリートドリル</h1>
        <p class="mt-2 text-zinc-600 dark:text-zinc-300 text-sm sm:text-base">
          充電工具にワンタッチ装着。回転＋インパクトに対応し、軽作業の穿孔に最適。
          対象材：ブロック／レンガ／モルタル／薄物コンクリート／スレート。
        </p>
        <div class="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span class="rounded-full border px-2.5 py-1">適合：充電ドリル／インパクト（回転/インパクト）</span>
          <span class="rounded-full border px-2.5 py-1">対象材：ブロック／レンガ／モルタル／薄物コンクリート／スレート</span>
        </div>
      </div>

      <div class="md:col-span-7">
        <ProductGallery :images="gallery" ratio="4/3" :interval="4200" />
      </div>
    </div>

    <!-- 材質適合度 -->
    <div class="mt-10">
      <SuitabilityMatrix :items="suitHEX" />
    </div>

    <!-- 特長 -->
    <div class="mt-8 grid gap-4 md:grid-cols-3">
      <div class="card"><h3 class="font-semibold">ワンタッチ装着</h3><p class="mt-2 text-sm text-zinc-600 dark:text-zinc-300">6.35mm 六角軸で充電工具に素早く確実に装着。</p></div>
      <div class="card"><h3 class="font-semibold">軽快な穿孔</h3><p class="mt-2 text-sm text-zinc-600 dark:text-zinc-300">インパクト対応で初動が速く、軽作業に最適。</p></div>
      <div class="card"><h3 class="font-semibold">定番サイズを網羅</h3><p class="mt-2 text-sm text-zinc-600 dark:text-zinc-300">下穴定番の 3.4 / 4.3 / 5.0 / 6.0 / 6.4 ほか。</p></div>
    </div>

    <!-- 仕様・価格 -->
    <div class="mt-10">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold">サイズ・価格</h2>
        <RouterLink to="/contact" class="btn-outline text-sm">お見積もり</RouterLink>
      </div>

      <div class="quote-frame mt-3 rounded-2xl border overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300">
            <tr>
              <th class="px-4 py-2 text-left">刃先径</th>
              <th class="px-4 py-2 text-left">全長</th>
              <th class="px-4 py-2 text-left">有効長</th>
              <th class="px-4 py-2 text-left">価格</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in specRows" :key="row.size" class="border-t">
              <td class="px-4 py-2 whitespace-nowrap">Ø{{ row.size }}mm <span v-if="row.popular">⭐</span></td>
              <td class="px-4 py-2">{{ row.overall }}mm</td>
              <td class="px-4 py-2">{{ row.effective }}mm</td>
              <td class="px-4 py-2">
                <span v-if="row.priceJPY === null" class="text-zinc-500">お問い合わせ</span>
                <span v-else>¥{{ row.priceJPY.toLocaleString() }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="mt-3 text-xs text-zinc-500">※ 実際の価格は数量・仕様により変動します。詳細はお問い合わせください。</p>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import ProductGallery from '../components/ProductGallery.vue'
import SuitabilityMatrix from '../components/SuitabilityMatrix.vue'

const gallery = [
  { src: '/images/hex/main-1.jpg',   alt: '六角軸 メイン' },
  { src: '/images/hex/detail-1.jpg', alt: '刃先ディテール' },
  { src: '/images/hex/detail-2.jpg', alt: '使用イメージ' },
  { src: '/images/hex/detail-3.jpg',  alt: '寸法図' },
]

const suitHEX = [
  { name: 'ブロック',     level: 3 },
  { name: 'レンガ',       level: 3 },
  { name: 'モルタル',     level: 3 },
  { name: '薄物コンクリート', level: 1 },
  { name: 'ALC',          level: 2 },
  { name: 'スレート',     level: 2 },
  { name: '石材',         level: 1 },
]

const POPULAR = new Set(['3.4','4.3','5.0','6.0','6.4'])
const BASE = [
  { size: '3.4', overall: 90,  effective: 45, priceJPY: null },
  { size: '4.3', overall: 95,  effective: 50, priceJPY: null },
  { size: '5.0', overall: 95,  effective: 50, priceJPY: null },
  { size: '6.0', overall: 100, effective: 55, priceJPY: null },
  { size: '6.4', overall: 100, effective: 55, priceJPY: null },
  { size: '6.5', overall: 100, effective: 55, priceJPY: null },
  { size: '7.0', overall: 115, effective: 65, priceJPY: null },
  { size: '8.0', overall: 115, effective: 65, priceJPY: null },
  { size: '9.0', overall: 115, effective: 65, priceJPY: null },
  { size: '10.0',overall: 135, effective: 85, priceJPY: null },
]
const specRows = computed(() => BASE.map(r => ({ ...r, popular: POPULAR.has(r.size) })))
</script>




