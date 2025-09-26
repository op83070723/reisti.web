<template>
  <section class="py-10 md:py-12 no-frame-corners">
    <AccentFrame>
      <div class="p-5 sm:p-6">
        <h1 class="text-2xl sm:text-3xl font-bold">会社概要</h1>
        <p class="mt-4 text-zinc-700 dark:text-zinc-200 leading-relaxed">
          REISTI は台湾発のドリルビットブランド。25年以上の製造・品質管理のノウハウをもとに、日本市場向けの
          <span class="whitespace-nowrap">SDS-Plus</span> と <span class="whitespace-nowrap">六角軸（6.35mm）</span> を展開。
          現場要件に合わせた設計、安定供給、OEM/共同開発に対応します。
        </p>
      </div>
    </AccentFrame>

    <div class="mt-8 grid gap-6 md:grid-cols-3">
      <div class="card notch-card frame-corners">
        <h3 class="font-semibold">ミッション</h3>
        <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-300">「現場にとってちょうど良い機能と価格」を提供。</p>
      </div>
      <div class="card notch-card frame-corners">
        <h3 class="font-semibold">品質管理</h3>
        <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-300">材料ロット管理、外径・振れ測定、耐久テストなどを実施。</p>
      </div>
      <div class="card notch-card frame-corners">
        <h3 class="font-semibold">サステナビリティ</h3>
        <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-300">過剰包装の抑制や耐久性向上による廃材削減。</p>
      </div>
    </div>

    <div class="mt-8">
      <AccentFrame>
        <div class="p-5 sm:p-6">
          <h2 class="text-lg font-semibold">沿革（ハイライト）</h2>
          <ul class="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
            <li>— 台湾でドリルビット製造を開始</li>
            <li>— 日本向け規格の最適化（アンカー下穴対応 ほか）</li>
            <li>— OEM/共同開発の実績拡大</li>
          </ul>
        </div>
      </AccentFrame>
    </div>

    <div class="mt-8 frame-corners rounded-2xl border p-6 sm:p-8 bg-white dark:bg-gray-900 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h3 class="text-lg sm:text-xl font-semibold">お取引・OEM のご相談</h3>
        <p class="mt-1 text-sm text-zinc-600 dark:text-zinc-300">仕様・数量・納期など、まずはお気軽にご相談ください。</p>
      </div>
      <RouterLink to="/contact" class="btn-primary">お問い合わせ</RouterLink>
    </div>
  </section>
</template>

<script setup>
import AccentFrame from '../components/AccentFrame.vue'
</script>



