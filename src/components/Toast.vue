<template>
  <div class="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
    <TransitionGroup name="toast" tag="div" class="space-y-2 w-full max-w-md">
      <div
        v-for="t in toasts"
        :key="t.id"
        class="pointer-events-auto rounded-2xl border p-4 shadow-soft bg-white dark:bg-gray-900 flex items-start gap-3"
        :class="t.type === 'error' ? 'border-red-300 dark:border-red-700' : 'border-brand/40 dark:border-brand/40'"
        role="status"
        aria-live="polite"
      >
        <span v-if="t.type==='error'">⚠️</span>
        <span v-else>✅</span>
        <p class="text-sm text-gray-800 dark:text-gray-200">{{ t.message }}</p>
        <button class="ml-auto text-sm text-gray-500 hover:text-gray-700" @click="remove(t.id)">✕</button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const toasts = ref([])
let id = 0

function show(message, type = 'success', timeout = 2600) {
  const item = { id: ++id, message, type }
  toasts.value.push(item)
  if (timeout) {
    setTimeout(() => remove(item.id), timeout)
  }
}
function remove(x) {
  toasts.value = toasts.value.filter(t => t.id !== x)
}

defineExpose({ show })
</script>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all .18s ease }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(6px) scale(.98) }
</style>
