<template>
  <!-- 可重用的幾何外框：角落線框 + 斜向極淡線 -->
  <div class="relative frame-corners rounded-2xl border border-white/30 dark:border-white/10 overflow-hidden">
    <!-- 低調斜線帶（只在內容外圍，設計感） -->
    <div class="pointer-events-none absolute inset-0 bg-stripes opacity-40 dark:opacity-30" />

    <!-- 內層玻璃卡片（放實際內容） -->
    <div class="relative bg-white/65 dark:bg-black/40 backdrop-blur-md">
      <slot />
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
</style>
