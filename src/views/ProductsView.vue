<template>
  <main class="mx-auto max-w-7xl px-4 sm:px-6 py-10">
    <header class="mb-8">
      <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">製品情報</h1>
      <p class="mt-2 text-zinc-600">いま人気です。最新製品を今すぐチェック。</p>
    </header>

    <!-- 蘋果風滑動區（可左右滑＋兩側箭頭） -->
    <ProductScroller
      heading="注目の製品"
      :items="featured"
      :step="1"
      class="mb-10"
    />

    <ProductScroller
      heading="コンクリートドリル"
      :items="concrete"
      :step="1"
      class="mb-10"
    />

    <ProductScroller
      heading="ホールソー"
      :items="holesaw"
      :step="1"
      class="mb-10"
    />

    <ProductScroller
      heading="ステップドリル"
      :items="stepdrill"
      :step="1"
    />
  </main>
</template>

<script setup>
import ProductScroller from '../components/ProductScroller.vue'

/* 圖片放 public/products/ 下即可，例如 /products/sdsplus-2cut.jpg */
const featured = [
  { badge:'今すぐ見積もり', title:'SDS-Plus 2枚刃', subtitle:'直進性と耐久性のベストバラ⁠ンス。', price:'¥1,170 から', img:'/products/sdsplus-2cut.png', to:'/products/concrete-drill/sds-plus-2cut',
    artW: 250,    
    artX: -50,       
    artY: -40,        
    rotate: -42     , dark:true },
  { badge:'今すぐ見積もり', title:'六角軸(6.35mm)', subtitle:'小型充電工具にワンタッチ装着。', price:'¥980 から', img:'/products/hex-635.png', to:'/products/concrete-drill/hex' ,
    artW: 300,    
    artX: 0,       
    artY: 30,        
    rotate: 0     },
  { badge:'今すぐ見積もり', title:'SDS-Plus 4枚刃', subtitle:'鉄筋でも、欠けにくい。', price:'¥1,420 から', img:'/products/sdsplus-4cut.png', to:'/products/concrete-drill/sds-plus-2cut',
    artW: 250,    
    artX: -50,       
    artY: -40,        
    rotate: -42     , dark:true },
  { badge:'今すぐ見積もり', title:'バイメタルホールソー', subtitle:'金属や木材に。', price:'¥1,580 から', img:'/products/holesaw-bi.png', to:'/products/hole-saw/bi' ,
    artW: 250,    
    artX: -30,       
    artY: 50,        
    rotate: 0 },
  
]

const concrete = [
  { title:'SDS-Plus 2枚刃', subtitle:'直進性と耐久性のベストバラ⁠ンス。', price:'¥1,170 から', img:'/products/sdsplus-2cut.png', to:'/products/concrete-drill/sds-plus-2cut',
    artW: 250,    
    artX: -50,       
    artY: -40,        
    rotate: -42 },
  { title:'SDS-Plus 3枚刃', subtitle:'鉄筋でも噛み込みにくい。', price:'¥1,580 から', img:'/products/sdsplus-3cut.png', to:'/products/concrete-drill/sds-plus-3cut', 
    artW: 320,    
    artX: 0,       
    artY: 10,        
    rotate: 0 },
  { title:'SDS-Plus 4枚刃', subtitle:'外径磨耗を低減。', price:'¥1,880 から', img:'/products/sdsplus-4cut.jpg', to:'/products/concrete-drill/sds-plus-4cut' },
  { title:'六角軸(6.35mm)', subtitle:'充電工具にワンタッチ装着。', price:'¥980 から', img:'/products/hex-635.png', to:'/products/concrete-drill/hex', 
    artW: 300,    
    artX: 0,       
    artY: 30,        
    rotate: 0 },
  { title:'六角軸鉄工ドリル(M35)', subtitle:'卓上ボール盤などに。', price:'¥780 から', img:'/products/M35.png', to:'/products/concrete-drill/M35' },
]

const holesaw = [
  { title:'バイメタルホールソー', subtitle:'金属や木材に。', price:'¥1,580 から', img:'/products/holesaw-bi.png', to:'/products/hole-saw/bi', 
    artW: 250,    
    artX: -50,       
    artY: 20,        
    rotate: 0 },
  { title:'超硬ホールソー(TCT)', subtitle:'硬い材にも。', price:'¥2,980 から', img:'/products/holesaw-tct.png', to:'/products/hole-saw/tct', 
    artW: 270,    
    artX: -30,       
    artY: 15,        
    rotate: 0 },
]

const stepdrill = [
  { title:'ステップドリル', subtitle:'標準タイプ', price:'¥1,980 から', img:'/products/step.jpg', to:'/products/step-drill/std' },
  { title:'ステップドリル TiAlN', subtitle:'耐熱・長寿命コーティング', price:'¥2,980 から', img:'/products/step-tialn.jpg', to:'/products/step-drill/tialn' },
]
</script>

<style scoped>
/* 背景淡灰，和卡片有層次 */
main{
  background: linear-gradient(180deg, #fafafa 0%, #fbfbfb 100%);
  border-radius: 24px;
}
</style>












