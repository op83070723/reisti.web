<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const phone = ref('')
const message = ref('')
const hp = ref('') // 蜜罐：要保持空字串
const loading = ref(false)
const done = ref(false)
const errorMsg = ref('')

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
        hp: hp.value, // 應該為空；若填了，後端會靜默當成功
      }),
    })
    const data = await r.json()
    if (!r.ok || !data.ok) throw new Error(data.error || '送信に失敗しました')
    done.value = true
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
  <!-- 全面關閉瀏覽器驗證 -->
  <form class="space-y-4" @submit.prevent="submit" novalidate>
    <input
      v-model="name"
      placeholder="お名前 / 会社名"
      class="input"
    />

    <!-- 用 text 避免瀏覽器強制驗證 email 格式 -->
    <input
      v-model="email"
      type="text"
      placeholder="メールアドレス（自由入力）"
      class="input"
    />

    <input
      v-model="phone"
      type="text"
      placeholder="電話番号（任意）"
      class="input"
    />

    <textarea
      v-model="message"
      placeholder="ご用件・ご要望"
      rows="6"
      class="input"
    ></textarea>

    <!-- 蜜罐（隱藏），真人看不到，bot 會誤填 -->
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

    <!-- 再加一層保險：就算表單沒加 novalidate，按鈕也不做驗證 -->
    <button class="btn" :disabled="loading" formnovalidate>
      {{ loading ? '送信中…' : '送信' }}
    </button>
  </form>
</template>

<style scoped>
.input { @apply w-full rounded-xl border px-4 py-3; }
.btn { @apply w-full rounded-xl bg-black text-white py-3 font-semibold disabled:opacity-50; }
</style>


