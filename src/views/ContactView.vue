<template>
  <section class="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
    <AccentFrame>
      <div class="p-5 sm:p-6">
        <h1 class="text-2xl sm:text-3xl font-bold">お問い合わせ</h1>
        <form class="mt-6 sm:mt-8 grid gap-3 sm:gap-4" @submit.prevent="onSubmit" novalidate>
          <div>
            <label for="name" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">お名前／会社名 *</label>
            <input id="name" v-model.trim="form.name" @blur="touch('name')" :aria-invalid="!!errors.name" class="mt-1 rounded-2xl border p-3 sm:p-4 w-full" placeholder="例）山田太郎／株式会社REISTI" />
            <p v-if="errors.name" class="mt-1 text-xs text-red-600">{{ errors.name }}</p>
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">メールアドレス *</label>
            <input id="email" v-model.trim="form.email" @blur="touch('email')" :aria-invalid="!!errors.email" class="mt-1 rounded-2xl border p-3 sm:p-4 w-full" placeholder="contact@example.com" />
            <p v-if="errors.email" class="mt-1 text-xs text-red-600">{{ errors.email }}</p>
          </div>
          <div>
            <label for="phone" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">電話番号（任意）</label>
            <input id="phone" v-model.trim="form.phone" @blur="touch('phone')" :aria-invalid="!!errors.phone" class="mt-1 rounded-2xl border p-3 sm:p-4 w-full" placeholder="090-1234-5678" />
            <p v-if="errors.phone" class="mt-1 text-xs text-red-600">{{ errors.phone }}</p>
          </div>
          <div>
            <label for="message" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">ご用件・ご要望 *</label>
            <textarea id="message" v-model.trim="form.message" @blur="touch('message')" :aria-invalid="!!errors.message" rows="5" class="mt-1 rounded-2xl border p-3 sm:p-4 w-full" placeholder="用途、数量、希望納期など"></textarea>
            <div class="mt-1 flex items-center justify-between">
              <p v-if="errors.message" class="text-xs text-red-600">{{ errors.message }}</p>
              <p class="text-xs text-zinc-500">{{ messageLength }}/{{ MESSAGE_MAX }} 文字</p>
            </div>
          </div>
          <div class="pt-2">
            <button class="btn-primary w-full text-sm sm:text-base disabled:opacity-60 disabled:cursor-not-allowed" :disabled="submitting">
              <svg v-if="submitting" class="mr-2 inline h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" opacity=".25" stroke-width="4"/>
                <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
              </svg>
              <span>{{ submitting ? '送信中…' : '送信' }}</span>
            </button>
            <p class="mt-2 text-xs text-zinc-500">送信するとメールアプリが開きます。本文はクリップボードにも保存されます。</p>
          </div>
        </form>
      </div>
    </AccentFrame>

    <Toast ref="toast" />
  </section>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import Toast from '../components/Toast.vue'
import AccentFrame from '../components/AccentFrame.vue'

const toast = ref(null)
const MESSAGE_MAX = 1000
const form = reactive({ name: '', email: '', phone: '', message: '' })
const touched = reactive({ name: false, email: false, phone: false, message: false })
const errors = reactive({ name: '', email: '', phone: '', message: '' })
const submitting = ref(false)
const messageLength = computed(() => form.message.length)

function touch(field){ touched[field]=true; validateField(field) }
function validateField(field){
  switch(field){
    case 'name': errors.name = form.name ? '' : 'お名前（会社名）は必須です。'; break
    case 'email': { const ok=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email); errors.email=form.email?(ok?'':'メール形式が正しくありません。'):'メールは必須です。'; break }
    case 'phone': { if(!form.phone){errors.phone='';break} const ok=/^[0-9\-+\s()]{6,}$/.test(form.phone); errors.phone=ok?'':'数字・ハイフンのみでご入力ください。'; break }
    case 'message': errors.message = form.message ? (form.message.length<=MESSAGE_MAX?'':`最大 ${MESSAGE_MAX} 文字までです。`) : 'ご用件は必須です。'
  }
}
function validateAll(){ Object.keys(touched).forEach(k=>touched[k]=true); Object.keys(errors).forEach(validateField); return !errors.name && !errors.email && !errors.phone && !errors.message }
function focusFirstError(){ const id=['name','email','phone','message'].find(k=>errors[k]); if(id){ const el=document.getElementById(id); if(el) el.focus() } }

async function onSubmit(){
  if(!validateAll()){ toast.value?.show('未入力の必須項目があります。ご確認ください。','error'); focusFirstError(); return }
  submitting.value=true
  try{
    const plain=[`お名前／会社名: ${form.name}`,`メール: ${form.email}`,`電話: ${form.phone||'-'}`,'内容:',form.message].join('\n')
    try{ await navigator.clipboard.writeText(plain); toast.value?.show('内容をクリップボードにコピーしました。') }catch(e){}
    const subject=encodeURIComponent('REISTI お問い合わせ'), body=encodeURIComponent(plain)
    window.location.href=`mailto:chenytbiz@reisti.org?subject=${subject}&body=${body}`
    toast.value?.show('メールアプリを開きます。送信前に内容をご確認ください。')
  }finally{ setTimeout(()=>submitting.value=false, 800) }
}
</script>




