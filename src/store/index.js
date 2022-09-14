import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedSate from 'vuex-persistedstate'
Vue.use(Vuex)

// 也可以用 localStorage.setItem('HEIMA_TOUTIAO',
export default new Vuex.Store({
  plugins: [
    createPersistedSate({
      key: 'HEIMA_TOUTIAO',
      reducer: ({ tokenObj, myChannels }) => {
        return { tokenObj, myChannels }
      }
    })
  ],
  // 属性
  state: {
    tokenObj: {},
    myChannels: []
  },
  // 计算属性
  getters: {
    isLogin(state) {
      return !!state.tokenObj.token
    }
  },
  // 方法
  mutations: {
    SET_TOKEN(state, token) {
      state.tokenObj = token
    },
    SET_MY_CHANNELS(state, channels) {
      state.myChannels = channels
    }
  },
  actions: {},
  modules: {}
})
