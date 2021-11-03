import axios from '@/utils/request'
import qs from 'qs'
import store from '@/store'

// 获取评论列表
const getComments = (params) => {
  const token = store.state.token
  let headers = {}
  if (token !== '') {
    headers = {
      headers: {
        'Authorization': 'Bearer ' + store.state.token
      }
    }
  }
  return axios.get('/public/comments?' + qs.stringify(params), headers)
}
// 更新评论
const addComment = (data) => axios.post('/comments/reply', { ...data })
// 添加评论
const updateComment = (data) => axios.post('/comments/update-post', { ...data })
// 采纳最佳答案
const setCommentBest = (params) => axios.get('/comments/accept?' + qs.stringify(params))
// 设置点赞
const setHands = (params) => axios.get('/comments/hands?' + qs.stringify(params))
export {
  getComments,
  addComment,
  updateComment,
  setCommentBest,
  setHands
}
