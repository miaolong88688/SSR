<template>
    <div class="home" v-text="currentComputed"></div>
</template>
<script>

import * as connectURL from '@/http/common/connectURL'
import * as mutationTypes from '@/vuex/mutations/types'
import * as actionTypes from '@/vuex/actions/types'
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      isShow: false,
      msg: 'Hello Words'
    }
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['calcNumber']),
    currentComputed () {
      return this.msg
    }
  },
  mounted () {
    this.$http(connectURL.DEMO)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        this.$toast.show(err.message)
      })
  },
  methods: {
    ...mapMutations({
      triggerMutation: mutationTypes.SET_MUTATION_DEFAULT
    }),
    ...mapActions({
      triggerAction: actionTypes.SET_ACTION_DEFAULT
    }),
    show () {
      this.isShow = true
    }
  }
}
</script>

<style lang="less" src="./index.less"> </style>
