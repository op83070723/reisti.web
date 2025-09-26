<template>
  <footer class="mt-16 bg-black text-zinc-200" role="contentinfo">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
      <!-- 上層：分類連結 -->
      <div class="grid gap-8 sm:grid-cols-2 md:grid-cols-5">
        <!-- ニュース -->
        <section>
          <h3 class="footer-title">ニュース</h3>
          <ul class="mt-3 space-y-2 text-sm">
            <li><RouterLink class="footer-link" to="/">お知らせ</RouterLink></li>
            <li><a class="footer-link" href="#" aria-disabled="true">プレスリリース</a></li>
            <li><a class="footer-link" href="#" aria-disabled="true">イベント</a></li>
          </ul>
        </section>

        <!-- 製品情報 -->
        <section>
          <h3 class="footer-title">製品情報</h3>
          <ul class="mt-3 space-y-2 text-sm">
            <li><RouterLink class="footer-link" to="/products/sds-plus">SDS-Plus コンクリートドリル</RouterLink></li>
            <li><RouterLink class="footer-link" to="/products/hex-shank">六角軸（6.35mm）コンクリートドリル</RouterLink></li>
            <li><RouterLink class="footer-link" to="/products">製品一覧</RouterLink></li>
          </ul>
        </section>

        <!-- サポート情報 -->
        <section>
          <h3 class="footer-title">サポート情報</h3>
          <ul class="mt-3 space-y-2 text-sm">
            <li><RouterLink class="footer-link" to="/contact">お問い合わせ</RouterLink></li>
            <li><a class="footer-link" href="#" aria-disabled="true">カタログダウンロード</a></li>
            <li><a class="footer-link" href="#" aria-disabled="true">技術資料</a></li>
          </ul>
        </section>

        <!-- 企業情報 -->
        <section>
          <h3 class="footer-title">企業情報</h3>
          <ul class="mt-3 space-y-2 text-sm">
            <li><RouterLink class="footer-link" to="/about">会社概要</RouterLink></li>
            <li><a class="footer-link" href="#" aria-disabled="true">沿革</a></li>
            <li><a class="footer-link" href="#" aria-disabled="true">事業内容</a></li>
          </ul>
        </section>

        <!-- 採用情報 / お問い合わせ -->
        <section>
          <h3 class="footer-title">採用情報</h3>
          <ul class="mt-3 space-y-2 text-sm">
            <li><a class="footer-link" href="#" aria-disabled="true">募集要項</a></li>
            <li><a class="footer-link" href="#" aria-disabled="true">エントリー</a></li>
          </ul>

          <h3 class="footer-title mt-6">お問い合わせ</h3>
          <ul class="mt-3 space-y-2 text-sm">
            <li><RouterLink class="footer-link" to="/contact">製品に関するお問い合わせ</RouterLink></li>
          </ul>
        </section>
      </div>

      <!-- 下層：規約等 + コピーライト -->
      <div class="mt-10 border-t border-zinc-800 pt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <nav class="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-400">
          <a href="#" class="policy-link">プライバシーポリシー</a>
          <a href="#" class="policy-link">サイトのご利用にあたって</a>
          <a href="#" class="policy-link">コミュニティ・ガイドライン</a>
        </nav>
        <p class="text-xs text-zinc-500">Copyright © REISTI Co., Ltd. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
/* 無邏輯 */
</script>

<style scoped>
.footer-title {
  @apply text-base font-semibold;
}
.footer-title::after{
  content:"";
  display:block;
  @apply mt-1 h-0.5 w-16 bg-zinc-700;
}
.footer-link {
  @apply text-zinc-300 hover:text-white transition-colors;
}
.policy-link {
  @apply hover:text-zinc-300 transition-colors;
}
</style>
