import axios from '@/utils/request'

/*
  获取验证码接口
  @params{*} sid 唯一标识
*/
const getCode = (sid) => {
  return axios.get('/public/getCaptcha', {
    params: {
      sid: sid
    }
  })
}
/*
  找回密码接口
  @params{*} option 用户信息(邮箱, 验证码)
*/
const forget = async (option) => {
  let result = ''
  try {
    result = await axios.post('/login/forget', {
      ...option
    })
    if (result.status === 200) {
      return result.data
    }
  } catch (e) {
    console.log(e)
  }
  return result
}
/*
  登录接口
  @params{*} loginInfo 用户信息(邮箱, 验证码)
*/
const login = (loginInfo) => {
  return axios.post('/login/login', {
    ...loginInfo
  })
}

/**
 * 注册接口
 * @param {*} regInfo 用户注册信息
 */
const reg = (regInfo) => {
  return axios.post('/login/reg', {
    ...regInfo
  })
}
export { getCode, forget, login, reg }
