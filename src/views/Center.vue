<template>
  <div class="layui-container fly-marginTop fly-user-main">
    <ul class="layui-nav layui-nav-tree" lay-filter="test">
      <!-- 侧边导航: <ul class="layui-nav layui-nav-tree layui-nav-side"> -->
      <li class="layui-nav-item layui-nav-itemed" v-for="(item, index) in lists" :key="'center' + index">
        <router-link :to="{name: item.link, params: {uid: uid}}" :active-class="item.activeClass">
          <i class="iconfont1" :class="item.icon"></i> {{item.name}}
        </router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'center',
  data () {
    return {
      lists: [
        {
          name: '我的主页',
          icon: 'icon1-shouye',
          link: 'user'
        },
        {
          name: '用户中心',
          icon: 'icon1-yonghu',
          link: 'userCenter'
        },
        {
          name: '基本设置',
          icon: 'icon1-shezhi',
          link: 'myInfo',
          activeClass: 'layui-this'
        },
        {
          name: '我的帖子',
          icon: 'icon1-a-20_tiezipindao_fatiezi1x',
          link: 'myPosts',
          activeClass: 'layui-this'
        },
        {
          name: '我的消息',
          icon: 'icon1-a-zu2297',
          link: 'userMessage'
        },
        {
          name: '其他',
          icon: 'icon1-zichan-quanbushebei',
          link: 'userOthers'
        }
      ]
    }
  },
  computed: {
    uid () {
      return this.$store.state.userInfo._id
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../assets/custom/iconfont.css'
</style>
