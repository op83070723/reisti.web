<template>
  <section class="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
    <!-- 上半：左側純文字（無卡片）＋ 右側大圖（卡片內） -->
    <div class="grid gap-6 md:grid-cols-12 md:items-start">
      <!-- 左側：說明縮小一點，直接置於背景上 -->
      <div class="md:col-span-5">
        <h1 class="text-2xl sm:text-3xl font-bold">SDS-Plus コンクリートドリル</h1>
        <p class="mt-2 text-zinc-600 dark:text-zinc-300 text-sm sm:text-base">
          クロス刃採用で直進性と真円性に優れ、アンカー下穴もスムーズ。軽量ハンマードリルに最適。
          対象材：コンクリート／ブロック／レンガ／モルタル／石材。
        </p>
        <div class="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span class="rounded-full border px-2.5 py-1">適合：軽量ハンマードリル（打撃/回転）</span>
          <span class="rounded-full border px-2.5 py-1">対象材：コンクリート／ブロック／レンガ／モルタル／石材</span>
        </div>
      </div>

      <!-- 右側：產品圖更大，只讓圖在卡片裡 -->
      <div class="md:col-span-7">
        <ProductGallery :images="gallery" ratio="4/3" :interval="4200" />
      </div>
    </div>

    <!-- 材質適合度 -->
    <div class="mt-10">
      <SuitabilityMatrix :items="suitSDS" />
    </div>

    <!-- 特長 -->
    <div class="mt-8 grid gap-4 md:grid-cols-3">
      <div class="card"><h3 class="font-semibold">真円に近い穴あけ</h3><p class="mt-2 text-sm text-zinc-600 dark:text-zinc-300">交差角度最適化のクロス刃でアンカー挿入がスムーズ。</p></div>
      <div class="card"><h3 class="font-semibold">安定した穿孔</h3><p class="mt-2 text-sm text-zinc-600 dark:text-zinc-300">鉄筋に当たっても噛み込みにくく、外径磨耗を低減。</p></div>
      <div class="card"><h3 class="font-semibold">幅広いサイズ</h3><p class="mt-2 text-sm text-zinc-600 dark:text-zinc-300">小径〜大径・ロングタイプまでラインアップ。</p></div>
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
  { src: '/images/sds-plus/main-1.jpg',   alt: 'SDS-Plus メイン' },
  { src: '/images/sds-plus/detail-1.jpg', alt: '刃先ディテール' },
  { src: '/images/sds-plus/detail-2.jpg', alt: '使用イメージ' },
  { src: '/images/sds-plus/detail-3.jpg',  alt: '寸法図' },
]

const suitSDS = [
  { name: 'コンクリート', level: 3 },
  { name: 'ブロック',     level: 3 },
  { name: 'レンガ',       level: 2 },
  { name: 'モルタル',     level: 2 },
  { name: '石材',         level: 2 },
  { name: 'ALC',          level: 1 },
  { name: 'スレート',     level: 1 },
]

const POPULAR = new Set(['3.4','4.3','5.0','6.0','6.5','8.0','10.0'])
const BASE = [
  { size: '3.4', overall: 110, effective: 50,  priceJPY: null },
  { size: '4.3', overall: 110, effective: 50,  priceJPY: null },
  { size: '5.0', overall: 110, effective: 50,  priceJPY: null },
  { size: '6.0', overall: 110, effective: 50,  priceJPY: null },
  { size: '6.5', overall: 160, effective: 100, priceJPY: null },
  { size: '8.0', overall: 160, effective: 100, priceJPY: null },
  { size: '10.0',overall: 160, effective: 100, priceJPY: null },
  { size: '12.0',overall: 210, effective: 150, priceJPY: null },
  { size: '14.0',overall: 210, effective: 150, priceJPY: null },
  { size: '16.0',overall: 260, effective: 200, priceJPY: null },
]
const specRows = computed(() => BASE.map(r => ({ ...r, popular: POPULAR.has(r.size) })))
</script>







