import VueRouter from 'vue-router'
import Login from '@/views/login'

import Vue from 'vue'
Vue.use(VueRouter)

// 初始化
const router = new VueRouter({
  routes: [
    { path: '/login', component: Login }
  ]
})

export default router
