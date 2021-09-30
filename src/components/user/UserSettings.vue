<template>
  <div class="fly-panel fly-panel-user" pad20>
    <div class="layui-tab layui-tab-brief" lay-filter="user">
      <ul class="layui-tab-title" id="LAY_mine">
        <router-link
          v-for="(item, index) in lists"
          :key="'settings' + index"
          lay-id="info"
          :to="{ name: item.path }"
          tag="li"
          ><a href>{{ item.name }}</a></router-link
        >
      </ul>
      <div class="layui-tab-content" style="padding: 20px 0">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userSettings',
  components: {
  },
  data () {
    return {
      lists: [
        {
          name: '我的资料',
          path: 'myInfo'
        },
        {
          name: '头像',
          path: 'picUpload'
        },
        {
          name: '修改密码',
          path: 'changePassword'
        },
        {
          name: '账号绑定',
          path: 'accounts'
        }
      ]
    }
  }
}
</script>

<style lang='scss' scoped>
ul {
  li {
    display: inline-block;
    a {
      padding: 0 20px;
    }
  }
}
</style>
