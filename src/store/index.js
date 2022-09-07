import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 属性
  state: {
    tokenObj: {}
  },
  // 计算属性
  getters: {},
  // 方法
  mutations: {
    SET_TOKEN(state, token) {
      state.tokenObj = token
    }
  },
  actions: {},
  modules: {}
})
