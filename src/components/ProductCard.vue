<template>
  <div class="group card">
    <a :href="link" class="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-xl">
      <img :alt="title" :src="image" loading="lazy" decoding="async"
           class="aspect-video w-full rounded-lg object-cover transition group-hover:opacity-95" />
      <h3 class="mt-4 text-base sm:text-lg font-semibold group-hover:text-brand">{{ title }}</h3>
      <p class="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{{ description }}</p>
      <div class="mt-4 flex items-center justify-between">
        <span class="text-xs sm:text-sm text-gray-500">{{ spec }}</span>
        <span class="inline-flex items-center text-sm text-brand group-hover:translate-x-0.5 transition">
          詳細 →
        </span>
      </div>
    </a>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  spec: String,
  image: String,
  link: String,
})
</script>

