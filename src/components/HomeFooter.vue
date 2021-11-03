<template>
  <div class="fly-footer">
    <p>
      <a href="/">启猿社区</a> {{ new Date().getFullYear() }} &copy;
      <a href="/">layui.com</a>
    </p>
    <p>
      <a href="/jie/3147/" target="_blank">Vue</a>
      <a href="/jie/8157/" target="_blank">GitHub</a>
      <a href="/jie/2461/" target="_blank">微信公众号</a>
    </p>
    <p class="fly-union">
      <!-- <a href="https://www.upyun.com?from=layui" target="_blank" rel="nofollow" upyun><img src="{{d.res}}/images/other/upyun.png?t=1"></a> -->
      <a
        href="https://www.upyun.com?from=layui"
        target="_blank"
        rel="nofollow"
        upyun
      ></a>
      <span>提供 CDN 赞助</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'homeFooter'
}
</script>

<style lang='scss' scoped>
</style>
