import axios from 'axios'
import store from '@/vuex'
import * as mutationTypes from '@/vuex/mutations/types'
const axiosConfig = require('@/http/common/axiosConfig')

const _axios = axios.create(axiosConfig.default)
const http = {}

// 请求拦截
_axios.interceptors.request.use(config => {
  // 显示loading
  store.commit(mutationTypes.IS_SHOW_LOADING, true)
  return config
}, () => {
  // 隐藏loading
  store.commit(mutationTypes.IS_SHOW_LOADING, false)
})

// // 响应拦截
_axios.interceptors.response.use(data => {
  // 隐藏loading
  store.commit(mutationTypes.IS_SHOW_LOADING, false)
  return data
}, () => {
  // 隐藏loading
  store.commit(mutationTypes.IS_SHOW_LOADING, false)
})

const fetchConfig = (url, opt) => {
  if (opt.type === 'POST') {
    return {
      url: url,
      method: opt.type || 'POST',
      data: opt.params || {} // post请求时 设置为data可以自定义 Content-Type
    }
  } else {
    return {
      url: url,
      method: opt.type || 'GET',
      params: opt.params || {} // 默认GIT
    }
  }
}

const fetch = (url, options) => {
  return new Promise((resolve, reject) => {
    let opt = options || {}

    _axios(fetchConfig(url, opt))
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        // reject({ 'code': '-100', 'message': '网络异常或参数错误！' });
        reject(err)
      })
  })
}

http.install = function (vue) {
  vue.prototype.$http = function (url, options) {
    return fetch(url, options)
  }
}

export {
  http,
  fetch
}
