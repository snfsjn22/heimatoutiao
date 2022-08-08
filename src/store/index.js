import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    // 一个对象，存储在当前登录用户信息（token等数据）
    // user: null
    user: window.localStorage.getItem(TOKEN_KEY)
  },
  getters: {},
  mutations: {
    setUser (state, data) {
      state.user = data
      // 防止刷新丢失数据，把数据被分到本地存储
      window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
    }
  },
  actions: {},
  modules: {}
})
