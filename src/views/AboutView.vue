<template>
  <!-- 会社情報 -->
<section class="py-10">
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <h3 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 mb-6">
      会社情報
    </h3>

    <div class="rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-zinc-900/5">
      <dl class="divide-y divide-zinc-100 text-[15px]">
        <!-- 社名 -->
        <div class="grid grid-cols-12 gap-4 px-6 py-4 items-start">
          <dt class="col-span-12 sm:col-span-3 text-zinc-500 font-medium">社名</dt>
          <dd class="col-span-12 sm:col-span-9">
            瑞士釘株式会社 REISTI（レイスティ）
          </dd>
        </div>

        <!-- 所在地 -->
        <div class="grid grid-cols-12 gap-4 px-6 py-4 items-start">
          <dt class="col-span-12 sm:col-span-3 text-zinc-500 font-medium">所在地</dt>
          <dd class="col-span-12 sm:col-span-9">
            神奈川県川崎市中原区上新城 2-4-15
          </dd>
        </div>

        <!-- 設立 -->
        <div class="grid grid-cols-12 gap-4 px-6 py-4 items-start">
          <dt class="col-span-12 sm:col-span-3 text-zinc-500 font-medium">設立</dt>
          <dd class="col-span-12 sm:col-span-9">
            2025年8月1日
          </dd>
        </div>

        <!-- 代表者 -->
        <div class="grid grid-cols-12 gap-4 px-6 py-4 items-start">
          <dt class="col-span-12 sm:col-span-3 text-zinc-500 font-medium">代表者</dt>
          <dd class="col-span-12 sm:col-span-9">
            代表取締役社長　陳 兪岑
          </dd>
        </div>

        <!-- 資本金 -->
        <div class="grid grid-cols-12 gap-4 px-6 py-4 items-start">
          <dt class="col-span-12 sm:col-span-3 text-zinc-500 font-medium">資本金</dt>
          <dd class="col-span-12 sm:col-span-9">
            500万円
          </dd>
        </div>

        <!-- 事業内容 -->
        <div class="grid grid-cols-12 gap-4 px-6 py-4 items-start">
          <dt class="col-span-12 sm:col-span-3 text-zinc-500 font-medium">事業内容</dt>
          <dd class="col-span-12 sm:col-span-9">
            金物・工具・各種電動先端工具の製造販売
          </dd>
        </div>
      </dl>
    </div>
  </div>
</section>

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



