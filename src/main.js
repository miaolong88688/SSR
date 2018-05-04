
import Vue from 'vue'
import vueRouter from 'vue-router'
import App from '@/App.vue'
import store from '@/vuex'
import {fastclick} from '@/config/base'
import { http } from '@/http'
import utils from './utils'
import router from '@/router'
import '@/lib/rem'

import { Mcx } from 'mcx-ui'
Vue.use(Mcx)

Vue.use(http)
Vue.use(utils)
Vue.use(vueRouter)
fastclick()

let vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

Vue.use({
  vm
})
