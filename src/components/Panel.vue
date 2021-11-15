<template>
  <div class="fly-panel fly-column">
    <div class="layui-container">
      <ul class="layui-clear">
        <router-link tag="li" class="layui-hide-xs" to="/">
          <a>首页</a>
        </router-link>
        <router-link
          v-for="(item, index) in lists"
          :key="'panel' + index"
          tag="li"
          :to="item.path"
        >
          <a>{{ item.name }}</a>
          <!-- <span class="layui-badge-dot" v-if="item.isNew"></span> -->
        </router-link>
        <!-- 用户登入后显示 -->
        <template v-if="isLogin">
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
            <router-link :to="{name: 'myPosts'}">我发表的贴</router-link>
          </li>
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
            <router-link :to="{name: 'myCollection'}">我收藏的贴</router-link>
          </li>
        </template>
      </ul>
      <div class="right layui-hide-xs">
        <span class="layui-icon layui-icon-search"></span>
        <router-link class="layui-btn" :to="{name: 'add'}">发表新贴</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'panel',
  data () {
    return {
      lists: [
        {
          name: '提问',
          path: '/index/ask',
          isNew: false
        },
        {
          name: '分享',
          path: '/index/share',
          isNew: false
        },
        {
          name: '讨论',
          path: '/index/discuss',
          isNew: false
        },
        {
          name: '建议',
          path: '/index/advise',
          isNew: false
        },
        {
          name: '公告',
          path: '/index/notice',
          isNew: false
        },
        {
          name: '动态',
          path: '/index/logs',
          isNew: false
        }
      ],
      isLogin: this.$store.state.isLogin
    }
  },
  methods: {
  }
}
</script>

<style lang='scss' scoped>
@media (max-width: 768px) {
  .panel {
    height: auto !important;
  }
  ul {
    li {
      width: 16%;
    }
  }
}
.panel {
  position: relative;
  height: 50px;
  line-height: 50px;
  margin-bottom: 15px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
ul {
  li {
    display: inline-block;
    a {
      padding: 0 20px;
    }
  }
}
.line {
  display: inline-block;
  height: 20px;
  width: 1px;
  background: #e2e2e2;
  vertical-align: middle;
  margin: 0 20px;
}
.right {
  position: absolute;
  right: 0;
  top: 0;
  .layui-icon-search {
    margin-right: 10px;
    font-size: 20px;
    &:hover {
      color: #5fb878;
      cursor: pointer;
    }
  }
}
.layui-this {
  color: #5fb878;
}
</style>
