<template>
  <div class="layui-container fly-marginTop fly-user-main">
    <ul class="layui-nav layui-nav-tree" lay-filter="test">
      <!-- 侧边导航: <ul class="layui-nav layui-nav-tree layui-nav-side"> -->
      <li class="layui-nav-item layui-nav-itemed" v-for="(item, index) in lists" :key="'center' + index">
        <router-link :to="{name: item.link}" :active-class="item.activeClass">
          <i class="iconfontOther" :class="item.icon"></i> {{item.name}}
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
          icon: 'icon-shouye',
          link: 'user'
        },
        {
          name: '用户中心',
          icon: 'icon-yonghu',
          link: 'userCenter'
        },
        {
          name: '基本设置',
          icon: 'icon-shezhi',
          link: 'myInfo',
          activeClass: 'layui-this'
        },
        {
          name: '我的帖子',
          icon: 'icon-a-20_tiezipindao_fatiezi1x',
          link: 'myPosts',
          activeClass: 'layui-this'
        },
        {
          name: '我的消息',
          icon: 'icon-a-zu2297',
          link: 'userMessage'
        },
        {
          name: '其他',
          icon: 'icon-zichan-quanbushebei',
          link: 'userOthers'
        }
      ]
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../assets/custom/iconfont.css'
</style>
