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
    setValidateToken (state, value) {
      if (value === '') return
      state.token = value
    },
    setUserInfo (state, value) {
      if (value === '') return
      state.userInfo = value
      localStorage.setItem('userInfo', JSON.stringify(value))
    },
    setIsLogin (state, value) {
      state.isLogin = value
    },
    _reload () {
      if (location.href.indexOf('#reloaded') === -1) {
        location.href = location.href + '#reloaded'
        location.reload()
      }
    }
  },
  actions: {

  }
})
