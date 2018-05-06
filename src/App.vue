<template>
  <div id="app">
    <div class="wrap">
      <transition>
        <router-view class="conter"></router-view>
      </transition>
    </div>


    <!-- 全局组件 start -->
    <mc-loading
      :isShow="isShowLoading"
    ></mc-loading>
    <mc-toast
      :isShow="isShowToast"
      :isText="toastText"
    ></mc-toast>
    <!-- 全局组件 end -->
  </div>
</template>

<script>
import * as mutationTypes from '@/vuex/mutations/types'
import * as actionTypes from '@/vuex/actions/types'
// import * as connectURL from '@/http/common/connectURL'
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'

export default {
  name: 'app',

  data () {
    return {
      msg: '欢迎来到Vue'
    }
  },

  computed: {
    ...mapState([
      'count',
      'isShowLoading',
      'isShowToast',
      'toastText'
    ]),
    ...mapGetters([
      'calcNumber'
    ])
  },

  mounted () {},

  methods: {
    ...mapMutations({
      triggerMutation: mutationTypes.SET_MUTATION_DEFAULT
    }),
    ...mapActions({
      triggerAction: actionTypes.SET_ACTION_DEFAULT
    })
  },

  watch: {}
}
</script>

<style lang="less">
@import "./less/core.less";

#app, .wrap, .conter {
  width: 100%;
  height: 100%;
}

.left-enter {
  transform: translateX(100%);
}

.left-enter-to {
  transform: translateX(0%);
}

.left-leave {
  transform: translateX(0%);
}

.left-leave-to {
  transform: translateX(-100%);
}

.left-enter-active, .left-leave-active {
  transition: .2s;
}

.right-enter {
  transform: translateX(-100%);
}

.right-enter-to {
  transform: translateX(0%);
}

.right-leave {
  transform: translateX(0%);
}

.right-leave-to {
  transform: translateX(100%);
}

.right-enter-active, .right-leave-active {
  transition: .2s;
}

</style>
