import axios from '@/utils/request'
import qs from 'qs'

// 获取用户签到信息
const userSign = () => axios.get('/user/fav')

// 更新用户基本资料
const updateUserInfo = (data) => axios.post('/user/basic', data)

// 确认更新账号
const updateUsername = (data) => axios.get('/public/reset-email?' + qs.stringify(data))

// 重置密码
const resetPassword = (data) => axios.post('/public/reset-password', {
  ...data
})

// 更改密码
const changePassword = (data) => axios.post('/user/change-password', {
  ...data
})

// 收藏帖子
const addCollect = (data) => axios.get('/user/add-collect?' + qs.stringify(data))

// 获取收藏列表
const getCollect = (data) => axios.get('/user/get-collect?' + qs.stringify(data))

// 取消收藏
const deleteCollect = (data) => axios.get('/user/delete-collect?' + qs.stringify(data))

// 获取发表的文章列表
const getPostList = (data) => axios.get('/user/get-post?' + qs.stringify(data))

// 删除帖子
const deletePost = (data) => axios.get('/user/delete-post?' + qs.stringify(data))

// 获取用户基本资料
const getUserInfo = (params) => axios.get('/public/info?' + qs.stringify(params))

// 获取评论列表
const getCommentList = (params) => axios.get('/public/comment-list?' + qs.stringify(params))

// 获取最近的发帖纪录
const getPostPublic = (params) => axios.get('/public/latest-post?' + qs.stringify(params))

// 获取最近的评论纪录
const getCommentPublic = (params) => axios.get('/public/latest-comments?' + qs.stringify(params))

export {
  userSign,
  updateUserInfo,
  updateUsername,
  changePassword,
  addCollect,
  getCollect,
  getPostList,
  deletePost,
  deleteCollect,
  getUserInfo,
  resetPassword,
  getCommentList,
  getPostPublic,
  getCommentPublic
}
