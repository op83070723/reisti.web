<script setup>
import { ref } from 'vue'

// 表單的資料欄位
const name = ref('')
const email = ref('')
const phone = ref('')
const message = ref('')
const hp = ref('') // honeypot：隱藏欄位（防機器人）
const loading = ref(false)
const done = ref(false)
const errorMsg = ref('')

// 送出表單
async function submit() {
  loading.value = true
  errorMsg.value = ''
  done.value = false
  try {
    const r = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        message: message.value.trim(),
        hp: hp.value, // 應該是空字串（防機器人）
      }),
    })
    const data = await r.json()
    if (!r.ok || !data.ok) throw new Error(data.error || '送信に失敗しました')
    done.value = true
    // 清空欄位
    name.value = ''
    email.value = ''
    phone.value = ''
    message.value = ''
  } catch (e) {
    errorMsg.value = e.message || '送信に失敗しました'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <!-- 加上 novalidate 關閉瀏覽器驗證 -->
  <form class="space-y-4" @submit.prevent="submit" novalidate>
    <input
      v-model="name"
      required
      placeholder="お名前 / 会社名"
      class="input"
    />

    <input
      v-model="email"
      type="email"
      required
      placeholder="メールアドレス"
      class="input"
    />

    <input
      v-model="phone"
      type="tel"
      placeholder="電話番号（任意）"
      class="input"
    />

    <textarea
      v-model="message"
      required
      placeholder="ご用件・ご要望"
      rows="6"
      class="input"
    ></textarea>

    <!-- honeypot：用 CSS 隱藏 -->
    <input
      v-model="hp"
      tabindex="-1"
      autocomplete="off"
      style="position:absolute;left:-9999px"
    />

    <p v-if="errorMsg" class="text-red-600 text-sm">{{ errorMsg }}</p>
    <p v-if="done" class="text-emerald-600 text-sm">
      送信しました。担当者よりご連絡いたします。
    </p>

    <button class="btn" :disabled="loading">
      {{ loading ? '送信中…' : '送信' }}
    </button>
  </form>
</template>

<style scoped>
.input {
  @apply w-full rounded-xl border px-4 py-3;
}
.btn {
  @apply w-full rounded-xl bg-black text-white py-3 font-semibold disabled:opacity-50;
}
</style>
