import * as mutationTypes from './types'

// Mutation
const mutations = function (state) {
  return {
    // 显示隐藏 loading
    [mutationTypes.IS_SHOW_LOADING] (state, isShow) {
      state.isShowLoading = isShow
    },
    // 显示隐藏 toast
    [mutationTypes.SYNC_IS_SHOW_TOAST] (state, infoObj) {
      state.isShowToast = infoObj.isShow
      state.toastText = infoObj.isText
    },
    [mutationTypes.SET_MUTATION_DEFAULT] (state) {
      state.count++
    },
    [mutationTypes.SET_MUTATION_RANDOM] (state, options) {
      state.resultData = options
    }
  }
}
export default mutations
