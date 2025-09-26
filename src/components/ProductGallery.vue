<template>
  <div class="grid gap-3 md:grid-cols-[1fr_96px]">
    <!-- Main -->
    <div
      class="relative rounded-2xl border bg-white/70 dark:bg-black/40 overflow-hidden select-none"
      :style="{ aspectRatio: ratio }"
      @mouseenter="pause" @mouseleave="resume"
      @touchstart.passive="onTouchStart" @touchmove.passive="onTouchMove" @touchend.passive="onTouchEnd"
    >
      <img
        v-if="imgs.length"
        :src="imgs[i].src"
        :alt="imgs[i].alt || '製品画像'"
        class="h-full w-full object-cover"
      />

      <!-- arrows -->
      <button v-if="imgs.length>1" class="nav-btn left-3" @click="prev" aria-label="前へ">‹</button>
      <button v-if="imgs.length>1" class="nav-btn right-3" @click="next" aria-label="次へ">›</button>

      <!-- dots -->
      <div v-if="imgs.length>1" class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        <button
          v-for="(s,idx) in imgs" :key="idx"
          class="h-1.5 w-5 rounded-full"
          :class="idx===i ? 'bg-zinc-900/80 dark:bg-white/80' : 'bg-white/40 dark:bg-white/20'"
          @click="go(idx)" :aria-label="`スライド ${idx+1}`" />
      </div>
    </div>

    <!-- Thumbs -->
    <div class="flex md:flex-col gap-2 overflow-auto">
      <button
        v-for="(img,idx) in imgs" :key="idx"
        class="relative rounded-lg ring-1 ring-zinc-200 dark:ring-zinc-700 overflow-hidden"
        :class="idx===i ? 'outline outline-2 outline-zinc-900 dark:outline-white' : 'hover:ring-zinc-400'"
        @click="go(idx)"
        :aria-label="`サムネイル ${idx+1}`">
        <img :src="img.src" :alt="img.alt || 'thumb'" class="h-20 w-28 md:h-24 md:w-24 object-cover" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  images: { type: Array, default: () => [] },
  ratio: { type: String, default: '4/3' },
  interval: { type: Number, default: 4000 },
})

const i = ref(0)
let timer = null

// 正規化（避免空陣列出錯）
const imgs = computed(() =>
  (Array.isArray(props.images) ? props.images : []).filter(Boolean)
)

// 自動播放控制
function start(){ stop(); if (imgs.value.length > 1 && props.interval > 0) timer = setInterval(next, props.interval) }
function stop(){ if (timer) { clearInterval(timer); timer = null } }
function pause(){ stop() }
function resume(){ start() }

function next(){ i.value = (i.value + 1) % imgs.value.length }
function prev(){ i.value = (i.value + imgs.value.length - 1) % imgs.value.length }
function go(n){ i.value = n }

// 觸控滑動
let sx=0, dx=0
function onTouchStart(e){ stop(); sx = e.touches[0].clientX; dx = 0 }
function onTouchMove(e){ dx = e.touches[0].clientX - sx }
function onTouchEnd(){ const th = 40; if (dx > th) prev(); else if (dx < -th) next(); start() }

onMounted(start)
onBeforeUnmount(stop)

// ！！關鍵：當父層把 images 換掉時，重置索引並重啟播放
watch(() => props.images, () => { i.value = 0; start() }, { deep: true })

// interval 改變也重啟
watch(() => props.interval, () => { start() })
</script>

<style scoped>
.nav-btn{
  @apply absolute top-1/2 -translate-y-1/2 grid place-items-center h-9 w-9 rounded-full bg-white/90 dark:bg-black/60 border text-xl;
}
</style>


