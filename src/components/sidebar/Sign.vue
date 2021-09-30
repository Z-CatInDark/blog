<template>
  <div class="fly-panel fly-signin">
    <div class="fly-panel-title">
      签到
      <i class="fly-mid"></i>
      <a
        href="javascript:;"
        class="fly-link"
        id="LAY_signinHelp"
        @click="showInfo()"
        >说明</a
      >
      <i class="fly-mid"></i>
      <a
        href="javascript:;"
        class="fly-link"
        id="LAY_signinTop"
        @click="showLists()"
      >
        活跃榜
        <span class="layui-badge-dot"></span>
      </a>
      <span class="fly-signin-days" v-show="isLogin">
        已连续签到
        <cite>{{ count }}</cite
        >天
      </span>
    </div>
    <div class="fly-panel-main fly-signin-main">
      <template v-if="!isSign">
        <button class="layui-btn layui-btn-danger" id="LAY_signin" @click="sign()">
          今日签到
        </button>
        <span>
          可获得
          <cite>{{ favs }}</cite
          >积分
        </span>
      </template>

      <!-- 已签到状态 -->
      <template v-else>
        <button class="layui-btn layui-btn-disabled">今日已签到</button>
        <span>获得了<cite>{{ favs }}</cite>飞吻</span>
      </template>
    </div>
    <sin-info :isShow="isShow" @closeModal="close()"></sin-info>
    <sin-lists
      :isShow="listsShow"
      :lists="lists"
      @closeModal="close()"
    ></sin-lists>
  </div>
</template>

<script>
import moment from 'dayjs'
import SinInfo from './SinInfo.vue'
import SinLists from './SinLists.vue'
import { userSign } from '@/api/user.js'
export default {
  name: 'sign',
  data () {
    return {
      isShow: false,
      listsShow: false,
      isSign: this.$store.state.userInfo.isSign ? this.$store.state.userInfo.isSign : false,
      lists: [
        {
          name: '大娃',
          count: 5,
          created: '2021-9-1'
        },
        {
          name: '二娃',
          count: 6,
          created: '2021-9-2'
        },
        {
          name: '三娃',
          count: 7,
          created: '2021-9-3'
        }
      ]
    }
  },
  watch: {
    isLogin (newval, oldval) {
      // 去兼听current标签是否有变化，如果有变化，则需要重新进行查询
      this.isSign = false
    }
  },
  computed: {
    favs () {
      let count = parseInt(this.count)
      let result = 0
      if (count < 5) {
        result = 5
      } else if (count >= 5 && count < 15) {
        result = 10
      } else if (count >= 15 && count < 30) {
        result = 15
      } else if (count >= 30 && count < 100) {
        result = 20
      } else if (count >= 100 && count < 365) {
        result = 30
      } else if (count >= 365) {
        result = 50
      }
      return result
    },
    count () {
      if (this.$store.state.userInfo !== {}) {
        if (typeof this.$store.state.userInfo.count !== 'undefined') {
          return this.$store.state.userInfo.count
        } else {
          return 0
        }
      } else {
        return 0
      }
    },
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  mounted () {
    const isSign = this.$store.state.userInfo.isSign
    const lastSign = this.$store.state.userInfo.lastSign
    const nowDate = moment().format('YYYY-MM-DD')
    const lastDate = moment(lastSign).format('YYYY-MM-DD')
    const diff = moment(nowDate).diff(moment(lastDate), 'day')
    if (diff > 0 && isSign) {
      this.isSign = false
    } else {
      this.isSign = isSign
    }
  },
  components: {
    SinInfo,
    SinLists
  },
  methods: {
    showInfo () {
      this.isShow = true
    },
    showLists () {
      this.listsShow = true
    },
    close () {
      this.isShow = false
      this.listsShow = false
    },
    sign () {
      if (!this.isLogin) {
        this.$pop('shake', '请先登录')
        return
      }
      userSign().then((res) => {
        let user = this.$store.state.userInfo
        if (res.code === 200) {
          this.isSign = true
          user.favs = res.favs
          user.count = res.count
          this.$pop('', '签到成功！')
        } else {
          this.$pop('', '您已经签到！')
        }
        user.isSign = true
        user.lastSign = res.lastSign
        this.$store.commit('setUserInfo', user)
      })
    }
  }
}
</script>

<style lang="scss">
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.mask {
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 3000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.layui-layer {
  position: fixed;
  width: 300px;
  height: 480px;
  top: 50%;
  left: 50%;
  margin-top: -240px;
  margin-left: -150px;
  background-color: #fff;
  z-index: 3100;
  &.active {
    animation-fill-mode: both;
    animation-duration: 0.2s;
    animation-name: bounceIn;
  }
  .layui-layer-title {
    height: 42px;
    line-height: 42px;
    padding: 0 10px;
    color: #333;
    background-color: #f8f8f8;
    i {
      &:hover {
        color: orangered;
      }
    }
  }
  .layui-layer-content {
    padding: 10px;
  }
}
.layui-tab-item {
  height: 45px;
  line-height: 45px;
  li {
    border-bottom: 1px dotted #dcdcdc;
    &:last-child {
      border-bottom: none;
    }
  }
  img {
    width: 30px;
    height: 30px;
    border-radius: 2px;
  }
}
.layui-tab-content {
  padding: 0 10px;
}
</style>
