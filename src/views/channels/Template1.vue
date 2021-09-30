<template>
  <div id="">
    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md8">
          <home-list></home-list>
        </div>
        <div class="layui-col-md4">
          <hot-list></hot-list>
          <home-ads></home-ads>
          <home-links></home-links>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeAds from '@/components/sidebar/Ads.vue'
import HotList from '@/components/sidebar/HotList.vue'
import HomeLinks from '@/components/sidebar/Links.vue'
import HomeList from '@/components/contents/List.vue'
export default {
  name: 'template1',
  components: {
    HomeAds,
    HotList,
    HomeLinks,
    HomeList
  }
}
</script>

<style lang='scss' scoped>
</style>
