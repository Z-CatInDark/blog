import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: '',
    isLogin: false,
    token: '',
    userInfo: {
    }
  },
  mutations: {
    // 共用sid用于校验验证码
    setSid (state, value) {
      if (value === '') return
      state.sid = value
    },
    setToken (state, value) {
      if (value === '') return
      state.token = value
      localStorage.setItem('token', value)
    },
    setUserInfo (state, value) {
      if (value === '') return
      state.userInfo = value
      // 保持用户登录状态 localStorage需手动清除 sessionStorage关闭会话时清除数据
      localStorage.setItem('userInfo', JSON.stringify(value))
    },
    setIsLogin (state, value) {
      state.isLogin = value
    }
  },
  actions: {

  }
})
