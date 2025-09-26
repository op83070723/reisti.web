// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import FamilyDetail from '../views/FamilyDetail.vue'
import About from '../views/AboutView.vue'
import Contact from '../views/ContactView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/products', name: 'products', component: ProductsView },
  // 家族共用詳頁（變體也用這個）
  { path: '/products/:category/:slug', name: 'family', component: FamilyDetail },
  { path: '/about', name: 'about', component: About },
  { path: '/contact', name: 'contact', component: Contact },

  // 舊網址（有需要再保留）
  { path: '/products/sds-plus', redirect: '/products/concrete-drill/sds-plus-2cut' },
  { path: '/products/hex-shank', redirect: '/products/concrete-drill/hex' },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { return { top: 0 } }
})



