<form class="space-y-4" @submit.prevent="submit" novalidate autocomplete="off">
  <input
    v-model="name"
    type="text"
    placeholder="お名前 / 会社名"
    class="input"
  />

  <!-- email 這裡特別注意：不要用 type="email"！ -->
  <input
    v-model="email"
    type="text"
    placeholder="メールアドレス（例：taro@gmail.com）"
    class="input"
  />

  <!-- phone -->
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

  <button class="btn" :disabled="loading" formnovalidate>
    {{ loading ? '送信中…' : '送信' }}
  </button>
</form>



