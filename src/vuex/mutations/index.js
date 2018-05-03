import * as mutationTypes from './types';

// Mutation
const mutations = function ( state ) {
    return {
        [mutationTypes.SET_MUTATION_DEFAULT]: function( state ) {
            state.count ++
        },
        [mutationTypes.SET_MUTATION_RANDOM]: function ( state, options ) {
            state.resultData = options;
        },
        // 显示隐藏 loading
        [mutationTypes.IS_SHOW_LOADING]: function( state, isShow ) {
            state.isShowLoading = isShow;

        },
        // 显示隐藏 toast
        [mutationTypes.SYNC_IS_SHOW_TOAST]: function( state, infoObj ) {
            state.isShowToast = infoObj.isShow;
            state.toastText = infoObj.isText;
        }
    }
}
export default mutations