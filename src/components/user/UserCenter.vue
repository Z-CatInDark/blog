<template>
  <div class="panel pd20 main">
    <div class="msg">Hi,墨心，你已经是我们的正式会员了</div>
    <div class="layui-row layui-col-space20">
      <div class="layui-col-md6">
        <div class="panel border">
          <div class="title">我的会员信息</div>
          <div class="content">
            <p>积分: <span class="corlor-orange">{{userInfo.favs}}</span></p>
            <p>您当前为: <span class="corlor-orange">{{ userInfo.isVip === '0' ? '普通会员' : 'VIP' + userInfo.isVip}}</span></p>
          </div>
        </div>
      </div>
      <div class="layui-col-md6">
        <center-sigh class="border"></center-sigh>
      </div>
      <div class="layui-col-md12 mt20">
        <div>
          <div class="title">快捷方式</div>
          <div class="content" style="height: auto">
            <ul class="layui-row layui-col-space10">
              <router-link
                tag="li"
                v-for="(item, index) in lists"
                :key="'userCenter' + index"
                class="layui-col-sm3 layui-col-xs4"
                :to="{ name: item.path }"
              >
                <a href>
                  <div
                    class="layui-icon shortcut"
                    :class="item.class"
                  ></div>
                  <span>{{ item.name }}</span>
                </a>
              </router-link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CenterSigh from '@/components/sidebar/Sign.vue'
import { getUserInfo } from '@/api/user.js'
export default {
  name: 'userCenter',
  data () {
    return {
      lists: [
        {
          name: '修改个人信息',
          path: 'myInfo',
          class: 'layui-icon-user'
        },
        {
          name: '修改头像',
          path: 'picUpload',
          class: 'layui-icon-face-smile-b'
        },
        {
          name: '修改密码',
          path: 'changePassword',
          class: 'layui-icon-password'
        },
        {
          name: '账号绑定',
          path: 'accounts',
          class: 'layui-icon-note'
        },
        {
          name: '发表新贴',
          path: 'add',
          class: 'layui-icon-add-circle-fine'
        },
        {
          name: '查看分享',
          path: '',
          class: 'layui-icon-share'
        },
        {
          name: '我的帖子',
          path: 'myPosts',
          class: 'layui-icon-file-b'
        },
        {
          name: '我的收藏',
          path: 'myCollection',
          class: 'layui-icon-star-fill'
        },
        {
          name: '其他资料',
          path: '',
          class: 'layui-icon-form'
        },
        {
          name: '关注公众号',
          path: '',
          class: 'layui-icon-login-wechat'
        },
        {
          name: '文档',
          path: '',
          class: 'layui-icon-read'
        },
        {
          name: '后台管理',
          path: '',
          class: 'layui-icon-app'
        }
      ]
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  components: {
    CenterSigh
  },
  mounted () {
    this._getUserInfo()
  },
  methods: {
    _getUserInfo () {
      getUserInfo({ uid: this.userInfo._id }).then((res) => {
        if (res.code === 200) {
          this.$store.commit('setUserInfo', res.data)
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@media screen and (max-width: 768px) {
  .panel {
    &.main {
      margin: 0 !important;
    }
  }
}
.panel {
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  color: #333;
  // 使用屏幕时，添加弹性动画
  transition: all 0.2s;
  &.main {
    margin: 0 0 10px 225px;
  }
}
.msg {
  background-color: #f8f8f8;
  color: #666;
  padding: 10px 15px;
  margin-bottom: 20px;
}
.border {
  border: 1px solid #e6e6e6;
}
.pd20 {
  padding: 20px;
}
.mt20 {
  margin-top: -20px;
}
.title {
  padding: 0 15px;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px dotted #e9e9e9;
  font-size: 14px;
  color: #333;
}
.content {
  padding: 18px 15px;
  height: 50px;
  line-height: 26px;
  font-size: 14px;
  color: #666;
}
.shortcut {
  background-color: #2f9688;
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  border-radius: 2px;
  font-size: 30px;
}
li {
  text-align: center;
  padding: 5px;
}
.corlor-orange {
  color: #FF5722;
  margin-left: 5px;
}
</style>
