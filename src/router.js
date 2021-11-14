import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import store from '@/store'
import jwt from 'jsonwebtoken'
import moment from 'dayjs'
const Login = () => import(/* webpackChunkName: 'login' */ './views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'reg' */ './views/Reg.vue')
const Forget = () => import(/* webpackChunkName: 'forget' */ './views/Forget.vue')
const Index = () => import(/* webpackChunkName: 'index' */ './views/channels/Index.vue')
const Template1 = () => import(/* webpackChunkName: 'template1' */ './views/channels/Template1.vue')
const Center = () => import(/* webpackChunkName: 'Center' */ './views/Center.vue')
const User = () => import(/* webpackChunkName: 'User' */ './views/User.vue')
const Confirm = () => import(/* webpackChunkName: 'Confirm' */ './views/Confirm.vue')
const Reset = () => import(/* webpackChunkName: 'Reset' */ './views/Reset.vue')
const NotFound = () => import(/* webpackChunkName: 'NotFound' */ './views/NotFound.vue')
const UserCenter = () => import(/* webpackChunkName: 'UserCenter' */ './components/user/UserCenter.vue')
const UserMessage = () => import(/* webpackChunkName: 'UserMessage' */ './components/user/UserMessage.vue')
const UserPosts = () => import(/* webpackChunkName: 'UserPosts' */ './components/user/UserPosts.vue')
const UserOthers = () => import(/* webpackChunkName: 'UserOthers' */ './components/user/UserOthers.vue')
const UserSettings = () => import(/* webpackChunkName: 'UserSettings' */ './components/user/UserSettings.vue')
const MyInfo = () => import(/* webpackChunkName: 'MyInfo' */ './components/user/common/MyInfo.vue')
const ChangePassword = () => import(/* webpackChunkName: 'ChangePassword' */ './components/user/common/ChangePassword.vue')
const PicUpload = () => import(/* webpackChunkName: 'PicUpload' */ './components/user/common/PicUpload.vue')
const Accounts = () => import(/* webpackChunkName: 'Accounts' */ './components/user/common/Accounts.vue')
const MyPosts = () => import(/* webpackChunkName: 'MyPosts' */ './components/user/common/MyPosts.vue')
const MyCollection = () => import(/* webpackChunkName: 'MyCollection' */ './components/user/common/MyCollection.vue')
const Add = () => import(/* webpackChunkName: 'UpdateDetail' */ './components/contents/Add.vue')
const UpdateDetail = () => import(/* webpackChunkName: 'UpdateAdd' */ './components/contents/UpdateDetail.vue')
const Detail = () => import(/* webpackChunkName: 'Detail' */ './components/contents/Detail.vue')
Vue.use(Router)

const router = new Router({
  linkExactActiveClass: 'layui-this',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'index',
          component: Index
        },
        {
          path: 'index/:catalog',
          name: 'catalog',
          component: Template1
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/reg',
      name: 'reg',
      component: Reg
    },
    {
      path: '/forget',
      name: 'forget',
      component: Forget
    },
    {
      path: '/reset',
      name: 'reset',
      component: Reset,
      beforeEnter (to, from, next) {
        let queryStr = window.location.href.replace(/.*\?/, '')
        let obj = Object.fromEntries(
          queryStr.split('&').map((val) => val.split('='))
        )
        if (obj.key && obj.username) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/add',
      name: 'add',
      meta: { requiresAuth: true },
      component: Add
    },
    {
      path: '/updateDetail/:tid',
      props: true,
      name: 'updateDetail',
      meta: { requiresAuth: true },
      beforeEnter (to, from, next) {
        if (['detail', 'myPosts'].indexOf(from.name) !== -1 && to.params.page && to.params.page.isEnd === '0') {
          next()
        } else {
          const updateData = localStorage.getItem('updateData')
          if (updateData && updateData !== '') {
            const updateObj = JSON.parse(updateData)
            if (updateObj.isEnd === '0') {
              next()
            } else {
              next('/')
            }
          } else {
            next('/')
          }
        }
      },
      component: UpdateDetail
    },
    {
      path: '/detail/:tid',
      props: true,
      name: 'detail',
      component: Detail
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: Confirm
    },
    {
      path: '/user/:uid',
      name: 'user',
      props: true,
      component: User
    },
    {
      path: '/center',
      meta: { requiresAuth: true },
      component: Center,
      linkExactActiveClass: 'layui-this',
      children: [
        {
          path: '',
          name: 'userCenter',
          component: UserCenter
        },
        {
          path: 'userMessage',
          name: 'userMessage',
          component: UserMessage
        },
        {
          path: 'userPosts',
          component: UserPosts,
          children: [
            {
              path: '',
              name: 'myPosts',
              component: MyPosts
            },
            {
              path: 'myCollection',
              name: 'myCollection',
              component: MyCollection
            }
          ]
        },
        {
          path: 'userOthers',
          name: 'userOthers',
          component: UserOthers
        },
        {
          path: 'userSettings',
          component: UserSettings,
          children: [
            {
              path: '',
              name: 'myInfo',
              component: MyInfo
            }, {
              path: 'changePassword',
              name: 'changePassword',
              component: ChangePassword
            }, {
              path: 'picUpload',
              name: 'picUpload',
              component: PicUpload
            }, {
              path: 'accounts',
              name: 'accounts',
              component: Accounts
            }
          ]
        }
      ]
    },
    {
      path: '/404',
      name: '404',
      component: NotFound
    },
    {
      path: '*',
      redirect: '/404'
    }
  ],
  mode: 'history'
})
// 保持用户登录状态
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (token !== '' && token !== 'undefined' && token !== null) {
    const payload = jwt.decode(token)
    // token过期后清空localStorage, 过期时间一天
    if (moment().isBefore(moment(payload.exp * 1000))) {
      store.commit('setToken', token)
      store.commit('setUserInfo', userInfo)
      store.commit('setIsLogin', true)
    } else {
      localStorage.clear()
    }
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isLogin = store.state.isLogin
    // 需要用户登录的页面进行区别
    if (isLogin) {
      next()
    } else {
      next('/login')
    }
  } else {
    // 公共页面
    next()
  }
})

export default router
