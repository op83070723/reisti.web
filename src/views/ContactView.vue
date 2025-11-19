<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const phone = ref('')
const message = ref('')
const hp = ref('')           // 蜜罐：保持空字串
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
        hp: hp.value, // 若被機器人填了，後端會靜默返回
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
  <main class="max-w-2xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold mb-6">お問い合わせ</h1>
    <p class="text-gray-600 mb-8">
      下記フォームにご記入のうえ送信してください。担当者より折り返しご連絡いたします。
    </p>

    <!-- ✅ 完全關閉瀏覽器驗證，避免 “The string did not match the expected pattern.” -->
    <form class="space-y-4" @submit.prevent="submit" novalidate autocomplete="off">
      <input
        v-model="name"
        type="text"
        placeholder="お名前 / 会社名"
        class="input"
      />

      <!-- email 改用 text，避免瀏覽器強制 email 格式驗證 -->
      <input
        v-model="email"
        type="text"
        placeholder="メールアドレス（例：taro@gmail.com）"
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

      <!-- 再加一層保險：按鈕層級也禁用瀏覽器驗證 -->
      <button class="btn" :disabled="loading" formnovalidate>
        {{ loading ? '送信中…' : '送信' }}
      </button>
    </form>
  </main>
</template>

<style scoped>
.input { @apply w-full rounded-xl border px-4 py-3; }
.btn { @apply w-full rounded-xl bg-black text-white py-3 font-semibold disabled:opacity-50; }
</style>




