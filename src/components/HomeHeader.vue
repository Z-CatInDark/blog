<template>
  <div class="fly-header layui-bg-black">
    <div class="layui-container">
      <!-- 暂无logo -->
      <a class="fly-logo" href="/"></a>
      <ul class="layui-nav fly-nav layui-hide-xs">
        <li class="layui-nav-item layui-this">
          <router-link :to="{ name: 'index' }"
            ><i class="iconfont icon-jiaoliu"></i>论坛</router-link
          >
        </li>
        <li class="layui-nav-item">
          <a href="case/case.html"
            ><i class="iconfont icon-iconmingxinganli"></i>项目分享</a
          >
        </li>
        <!-- <li class="layui-nav-item">
          <router-link to="case/case.html"><i class="layui-icon layui-icon-app"></i>框架</router-link>
        </li> -->
      </ul>

      <ul class="layui-nav fly-nav-user">
        <!-- 未登入的状态 -->
        <template v-if="!isLoginShow">
          <li class="layui-nav-item">
            <router-link
              class="iconfont icon-touxiang layui-hide-xs"
              :to="'/404'"
            ></router-link>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{ name: 'login' }">登录</router-link>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{ name: 'reg' }">注册</router-link>
          </li>
        </template>
        <!-- 登入后的状态 -->
        <template v-else>
          <li
            class="layui-nav-item"
            @mouseover="menuShow()"
            @mouseleave="menuHide()"
          >
            <router-link
              class="fly-nav-avatar"
              :to="{ name: 'userCenter' }"
            >
              <cite class="layui-hide-xs">{{ userInfo.name }}</cite>
              <i
                class="layui-badge fly-badge-vip layui-hide-xs"
                v-show="userInfo.isVip !== '0'"
                >VIP{{ userInfo.isVip }}</i
              >
              <img :src="userInfo.pic" />
            </router-link>
            <dl
              class="layui-nav-child layui-anim layui-anim-downbit"
              :class="{ 'layui-show': isHover }"
            >
              <dd>
                <router-link :to="{ name: 'userCenter' }"
                  ><i class="layui-icon">&#xe620;</i>个人中心</router-link
                >
              </dd>
              <dd>
                <router-link :to="{ name: 'userMessage' }"
                  ><i class="iconfont icon-tongzhi" style="top: 4px"></i
                  >我的消息</router-link
                >
              </dd>
              <dd>
                <router-link
                  :to="{ name: 'user', params: { uid: userInfo._id } }"
                  ><i
                    class="layui-icon"
                    style="margin-left: 2px; font-size: 22px"
                    >&#xe68e;</i
                  >我的主页</router-link
                >
              </dd>
              <hr style="margin: 5px 0" />
              <dd>
                <a
                  href="javascript: void(0)"
                  style="text-align: center"
                  @click="logout()"
                  >退出</a
                >
              </dd>
            </dl>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homeHeader',
  data () {
    return {
      isHover: false,
      hoverCtrl: {}
    }
  },
  computed: {
    isLoginShow () {
      return this.$store.state.isLogin
    },
    userInfo () {
      return (
        this.$store.state.userInfo || {
          name: '',
          pic: '',
          isVip: 0
        }
      )
    }
  },
  methods: {
    menuShow () {
      clearTimeout(this.hoverCtrl)
      this.hoverCtrl = setTimeout(() => {
        this.isHover = true
      }, 200)
    },
    menuHide () {
      clearTimeout(this.hoverCtrl)
      this.hoverCtrl = setTimeout(() => {
        this.isHover = false
      }, 500)
    },
    logout () {
      this.$confirm('是否退出登录？', () => {
        localStorage.clear()
        this.$store.commit('setToken', '')
        this.$store.commit('setUserInfo', '')
        this.$store.commit('setIsLogin', false)
        this.$router.push('/', () => {})
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.fly-logo {
  top: -10px;
  left: -15px;
  margin-left: 15px;
}
</style>
