<template>
  <section class="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14" v-if="fam && variant">
    <!-- パンくず -->
    <nav class="text-sm text-zinc-500">
      <RouterLink to="/products" class="hover:underline">製品情報</RouterLink> / {{ fam.name }}
    </nav>

    <!-- 見出し ＋ 変体切替 -->
    <div class="mt-2 flex flex-wrap items-center gap-2">
      <h1 class="text-2xl sm:text-3xl font-bold mr-2">{{ fam.name }}</h1>
      <div class="flex flex-wrap gap-1">
        <button
          v-for="v in fam.variants" :key="v.slug"
          class="rounded-full border px-3 py-1 text-sm"
          :class="v.slug===variant.slug ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'hover:bg-zinc-100 dark:hover:bg-white/10'"
          @click="goVariant(v.slug)">
          {{ v.label }}
        </button>
      </div>
    </div>
    <p class="mt-2 text-zinc-600 dark:text-zinc-300 text-sm sm:text-base">{{ fam.intro }}</p>

    <!-- 上：左＝商品説明 / 右＝ギャラリー -->
    <div class="mt-6 grid gap-6 md:grid-cols-12 md:items-start">
      <!-- 左：詳細説明（改行保持） -->
      <div class="md:col-span-5">
        <div class="mt-1 text-sm leading-7 text-zinc-700 dark:text-zinc-300 whitespace-pre-line">
          {{ variant.detail || fam.intro }}
        </div>
      </div>

      <!-- 右：ギャラリー（keyで切替時に再生成） -->
      <div class="md:col-span-7">
        <div class="rounded-2xl border bg-white/70 dark:bg-black/40 backdrop-blur-md p-3">
          <ProductGallery :key="variant.slug" :images="gallery" ratio="4/3" :interval="4200" />
        </div>
      </div>
    </div>

    <!-- 適合度マトリクス -->
    <div class="mt-10">
      <SuitabilityMatrix :items="variant.suitability || []" />
      <p class="mt-2 text-xs text-zinc-500">※ 適合度は目安です。下地や工具により結果が異なることがあります。</p>
    </div>

    <!-- 仕様表 -->
    <div class="mt-10">
      <div class="flex items-center gap-2">
        <h2 class="text-xl font-bold">サイズ・価格</h2>
        <span class="text-xs text-zinc-500">⭐＝日本で人気のサイズ</span>
        <RouterLink to="/contact" class="ml-auto btn-outline text-sm">お見積もり</RouterLink>
      </div>

      <div class="quote-frame mt-3 rounded-2xl border overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300">
            <tr>
              <th class="px-4 py-2 text-left sticky left-0 bg-inherit">刃先径</th>
              <th class="px-4 py-2 text-left">全長</th>
              <th class="px-4 py-2 text-left">有効長</th>
              <th class="px-4 py-2 text-left">価格</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.size" class="border-t">
              <td class="px-4 py-2 whitespace-nowrap sticky left-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur">
                Ø{{ row.size }}mm <span v-if="row.popular">⭐</span>
              </td>
              <td class="px-4 py-2">{{ row.overall ?? '—' }}</td>
              <td class="px-4 py-2">{{ row.effective ?? '—' }}</td>
              <td class="px-4 py-2">
                <span v-if="row.priceJPY == null" class="text-zinc-500" title="数量・仕様により変動">—</span>
                <span v-else>¥{{ row.priceJPY.toLocaleString() }}</span>
              </td>
            </tr>
            <tr v-if="!rows.length">
              <td class="px-4 py-6 text-zinc-500" colspan="4">仕様準備中です。お問い合わせください。</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, watch, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { findFamily } from '../data/products';
import ProductGallery from '../components/ProductGallery.vue';
import SuitabilityMatrix from '../components/SuitabilityMatrix.vue';

const route = useRoute();
const router = useRouter();
const fam = ref(null);
const variant = ref(null);

function load() {
  const { category, slug } = route.params;
  const match = findFamily(category, slug);
  fam.value = match?.family || null;
  variant.value = match?.variant || null;
}
watch(() => route.fullPath, load, { immediate: true });

function goVariant(vslug) {
  router.replace({ name: 'family', params: { category: fam.value.category, slug: vslug } });
}

const gallery = computed(() =>
  (variant.value?.gallery || []).map(src => ({ src, alt: fam.value?.name || '製品' }))
);
const rows = computed(() => {
  const pop = new Set(variant.value?.popularSizes || []);
  return (variant.value?.specs || []).map(r => ({ ...r, popular: pop.has(String(r.size)) }));
});
</script>


