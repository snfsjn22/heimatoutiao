import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    // 一个对象，存储在当前登录用户信息（token等数据）
    // user: null
    user: getItem(TOKEN_KEY)
  },
  getters: {},
  mutations: {
    SET_USER (state, data) {
      state.user = data
      // 防止刷新丢失数据，把数据被分到本地存储
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {},
  modules: {}
})
