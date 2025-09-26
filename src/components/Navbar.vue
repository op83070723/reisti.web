<template>
  <header
    class="sticky top-0 z-40 w-full bg-white/80 backdrop-blur transition-shadow dark:bg-gray-900/80"
    :class="{'shadow': scrolled || isOpen}"
  >
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-3">
        <img src="/logo.png" class="h-8 w-auto sm:h-10" alt="REISTI ロゴ" />
        <span class="text-base x:-50 sm:text-lg font-semibold tracking-wide">REISTI</span>
      </RouterLink>

      <!-- 桌面版導覽 -->
      <nav class="hidden md:flex items-center gap-6">
        <RouterLink :class="linkClass('/')" to="/">ホーム</RouterLink>
        <RouterLink :class="linkClass('/products')" to="/products">製品</RouterLink>
        <RouterLink :class="linkClass('/about')" to="/about">会社概要</RouterLink>
        <RouterLink :class="linkClass('/contact')" to="/contact">お問い合わせ</RouterLink>
        <RouterLink to="/contact" class="btn-primary text-sm">お見積もり</RouterLink>

        <!-- 暗色模式切換 -->
        <button class="btn-ghost text-sm" @click="toggleTheme" :aria-label="theme === 'dark' ? 'ライトモード' : 'ダークモード'">
          <span v-if="theme==='dark'">🌞</span>
          <span v-else>🌙</span>
        </button>
      </nav>

      <!-- 手機版：見積もり + 漢堡 + 暗色切換 -->
      <div class="flex items-center gap-2 md:hidden">
        <button class="btn-ghost text-sm" @click="toggleTheme" :aria-label="theme === 'dark' ? 'ライトモード' : 'ダークモード'">
          <span v-if="theme==='dark'">🌞</span>
          <span v-else>🌙</span>
        </button>
        <RouterLink to="/contact" class="btn-primary text-xs px-3 py-2">お見積もり</RouterLink>
        <button
          class="inline-flex items-center justify-center rounded-xl p-2 border border-gray-300 dark:border-gray-600"
          :aria-expanded="isOpen ? 'true' : 'false'"
          aria-controls="mobile-menu"
          aria-label="メニューを開く"
          @click="toggleMenu"
        >
          <span v-if="!isOpen">☰</span>
          <span v-else>✕</span>
        </button>
      </div>
    </div>

    <!-- 手機遮罩 -->
    <Transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-30 bg-black/30 md:hidden" @click="closeMenu" />
    </Transition>

    <!-- 手機展開選單 -->
    <Transition name="slide">
      <div
        v-if="isOpen"
        id="mobile-menu"
        class="fixed inset-x-0 top-16 z-40 md:hidden border-t bg-white dark:bg-gray-900 rounded-b-2xl"
      >
        <nav class="mx-auto max-w-7xl px-4 sm:px-6 py-3 space-y-1">
          <RouterLink :class="mobileLinkClass('/')" to="/" @click="closeMenu">ホーム</RouterLink>
          <RouterLink :class="mobileLinkClass('/products')" to="/products" @click="closeMenu">製品</RouterLink>
          <RouterLink :class="mobileLinkClass('/about')" to="/about" @click="closeMenu">会社概要</RouterLink>
          <RouterLink :class="mobileLinkClass('/contact')" to="/contact" @click="closeMenu">お問い合わせ</RouterLink>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const scrolled = ref(false)
const isOpen = ref(false)
const theme = ref('light')

const linkClass = (path) => [
  'hover:text-brand transition',
  route.path === path ? 'text-brand font-medium' : 'text-gray-700 dark:text-gray-200'
]
const mobileLinkClass = (path) => [
  'block rounded-xl px-3 py-2 transition',
  route.path === path ? 'bg-brand/10 text-brand' : 'hover:bg-gray-100 dark:hover:bg-white/10'
]

const onScroll = () => (scrolled.value = window.scrollY > 4)
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
  // 初始化主題（跟隨系統或讀取 localStorage）
  const saved = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  theme.value = saved ?? (prefersDark ? 'dark' : 'light')
  applyTheme()
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

function toggleMenu() {
  isOpen.value = !isOpen.value
  lockScroll(isOpen.value)
}
function closeMenu() {
  isOpen.value = false
  lockScroll(false)
}
function lockScroll(locked) {
  if (locked) {
    const y = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${y}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'
  } else {
    const top = document.body.style.top
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.left = ''
    document.body.style.right = ''
    document.body.style.width = ''
    if (top) window.scrollTo(0, parseInt(top || '0') * -1)
  }
}

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  localStorage.setItem('theme', theme.value)
  applyTheme()
}
function applyTheme() {
  const root = document.documentElement
  if (theme.value === 'dark') root.classList.add('dark')
  else root.classList.remove('dark')
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .15s ease }
.fade-enter-from, .fade-leave-to { opacity: 0 }
.slide-enter-active, .slide-leave-active { transition: transform .15s ease, opacity .15s ease }
.slide-enter-from, .slide-leave-to { transform: translateY(-8px); opacity: 0 }
</style>



