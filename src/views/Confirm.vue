<template>
  <div class="layui-container flex">
    <div class="layui-row font">确定修改账号为{{ username }}吗</div>
    <div class="layui-row mt3">
      <button
        class="layui-btn"
        @click="submit()"
        :class="{ 'layui-btn-disabled': isSend }"
      >
        确定更新
      </button>
      <router-link class="layui-btn layui-btn-primary" to="/"
        >返回首页</router-link
      >
    </div>
  </div>
</template>

<script>
import { updateUsername } from '@/api/user.js'
let obj = {}
export default {
  name: 'confirm',
  data () {
    return {
      username: '',
      isSend: false
    }
  },
  mounted () {
    // 获取url后key后面的值
    let queryStr = window.location.href.replace(/.*\?/, '')
    // 将值转为key: value的形式，fromEntries方法兼容性不太好，谨慎使用
    obj = Object.fromEntries(
      queryStr.split('&').map((val) => val.split('='))
    )
    this.username = decodeURIComponent(obj.username)
  },
  methods: {
    submit () {
      obj.username = this.username
      updateUsername(obj).then((res) => {
        if (res.code === 200) {
          this.isSend = true
          this.$alert(res.msg)
          setTimeout(() => {
            this.$router.push('/')
          }, 1000)
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.flex {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  min-height: 260px;
}
.font {
  font-size: 16px;
  color: #333;
}
</style>
