<template>
  <div class="layui-container flex">
    <img src="../assets/svg/404.svg" />
    <p>找不到页面了 ~ T_T</p>
    <router-link class="layui-btn" to="/">返回首页</router-link>
  </div>
</template>

<script>
export default {
  name: 'notfound'
}
</script>

<style lang='scss' scoped>
.flex {
  width: 100%;
  min-height: 400px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
img {
  width: 500px;
  height: 500px;
}
p {
  padding-bottom: 15px;
  padding-top: 10px;
  font-size: 20px;
  color: #999;
}
</style>
