<template>
  <div id="">
    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md8">
          <home-top></home-top>
          <home-list></home-list>
        </div>
        <div class="layui-col-md4">
          <home-tips></home-tips>
          <home-sign></home-sign>
          <hot-list></hot-list>
          <home-ads></home-ads>
          <home-links></home-links>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeTop from '@/components/contents/Top.vue'
import HomeList from '@/components/contents/List.vue'

import HomeAds from '@/components/sidebar/Ads.vue'
import HotList from '@/components/sidebar/HotList.vue'
import HomeLinks from '@/components/sidebar/Links.vue'
import HomeSign from '@/components/sidebar/Sign.vue'
import HomeTips from '@/components/sidebar/Tips.vue'
export default {
  name: 'index',
  components: {
    HomeAds,
    HotList,
    HomeLinks,
    HomeSign,
    HomeTips,
    HomeList,
    HomeTop
  }
}
</script>

<style lang='scss' scoped>
</style>
