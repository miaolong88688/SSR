import Vue from 'vue'
import Router from 'vue-router'
import routes from '@/router/routes'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next() // 可接受参数重定向
})

router.afterEach((to, from) => {})

export default router
