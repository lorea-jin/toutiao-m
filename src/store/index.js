import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken, removeToken } from '@/utils/storage.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户登陆后的个人信息
    user: getToken('toutiao-m')
  },
  mutations: {
    setUser(state, token) {
      state.user = token
      setToken('toutiao-m', token)
    },

    removeUser(state) {
      state.user = null
      removeToken('toutiao-m')
    }
  },
  actions: {},
  modules: {}
})
