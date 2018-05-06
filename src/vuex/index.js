import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations/index'
import actions from './actions/index'
Vue.use(Vuex)

/**
 * @state: 共享数据
 * @getters: 共享数据计算属性
 * @mutations: 同步提交
 * @actions: 异步提交
*/
// 创建 store 实例
const Store = new Vuex.Store({
  state: {
    isShowLoading: false,
    isShowToast: false,
    toastText: '',
    resultData: [],
    count: 1
  },
  getters: {
    calcNumber: (state) => {
      let val = state.count + 10
      return val
    }
  },
  mutations: mutations(),
  actions: actions()
})

export default Store
