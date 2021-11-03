import axios from '@/utils/request'
import qs from 'qs'
import store from '@/store'

/*
  读取文章列表
  @params{options} options 读取文章列表接口参数
*/
const getLists = (options) => {
  return axios.get('/public/lists?' + qs.stringify(options))
}
const getTop = (options) => {
  return axios.get('/public/top?' + qs.stringify(options))
}
// 温馨提醒
const getTips = (options) => {
  return axios.get('/public/tips')
}
// 友情链接
const getLinks = (options) => {
  return axios.get('/public/links')
}
// 本周热议
const getTopWeek = (options) => {
  return axios.get('/public/topWeek')
}
// 上传头像
const uploadImg = (formData) => axios.post('/content/upload', formData)

// 上传文章
const addPost = (data) => axios.post('/content/add', { ...data })

// 更新文章
const updatePost = (data) => axios.post('/content/update-post', { ...data })

// 获取文章详情
const getDetail = (params) => {
  const token = store.state.token
  let headers = {}
  if (token !== '') {
    headers = {
      headers: {
        'Authorization': 'Bearer ' + store.state.token
      }
    }
  }
  return axios.get('/public/content/detail?' + qs.stringify(params), headers)
}
export {
  getLists,
  getTop,
  getTips,
  getLinks,
  getTopWeek,
  uploadImg,
  addPost,
  getDetail,
  updatePost
}
