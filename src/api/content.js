import axios from '@/utils/request'
import qs from 'qs'

/*
  读取文章列表
  @params{options} options 读取文章列表接口参数
*/
const getLists = (options) => {
  return axios.get('/public/lists?' + qs.stringify(options))
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

export {
  getLists,
  getTips,
  getLinks,
  getTopWeek
}
