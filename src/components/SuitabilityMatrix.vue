<template>
  <div class="rounded-2xl border bg-white/65 dark:bg-black/40 backdrop-blur-md p-4 sm:p-5">
    <div class="sr-only">対応素材の適合度（■=最適、◩=適、□=可）</div>

    <!-- 列表：手機單欄，md+ 雙欄 -->
    <ul class="grid gap-3 sm:gap-4 md:grid-cols-2">
      <li v-for="(it, i) in items" :key="i"
          class="flex items-center justify-between rounded-xl bg-zinc-50 dark:bg-zinc-800/50 px-3 py-2">
        <span class="text-sm sm:text-base font-medium">{{ it.name }}</span>

        <!-- 3 格適合度（3=最適, 2=適, 1=可, 0=非推奨） -->
        <div class="flex items-center gap-1.5" :aria-label="`${it.name} の適合度 ${it.level}/3`">
          <span v-for="n in 3" :key="n"
                class="inline-block h-4 w-6 sm:h-5 sm:w-7 rounded-md"
                :class="n <= it.level
                  ? 'bg-zinc-800 dark:bg-white'
                  : 'bg-transparent ring-1 ring-zinc-300 dark:ring-zinc-600'"
                :title="n <= it.level ? (it.level===3 ? '最適' : it.level===2 ? '適' : '可') : '—'">
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  // [{ name: 'コンクリート', level: 3 }, ...]  level: 0~3
  items: { type: Array, default: () => [] },
})
</script>
