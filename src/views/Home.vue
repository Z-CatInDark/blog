<template>
  <div>
    <home-panel></home-panel>
    <router-view></router-view>
  </div>
</template>

<script>
import HomePanel from '@/components/Panel.vue'
export default {
  name: 'home',
  components: {
    HomePanel
  }
}
</script>

<style lang='scss' scoped>

</style>
