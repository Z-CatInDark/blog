import axios from '@/utils/request'

// 获取用户签到信息
const userSign = () => axios.get('/user/fav')

// 更新用户基本资料
const updateUserInfo = (data) => axios.post('/user/basic', data)

export {
  userSign,
  updateUserInfo
}
