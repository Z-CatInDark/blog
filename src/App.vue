<template>
  <div id="app">
    <home-header></home-header>
    <router-view></router-view>
    <home-footer></home-footer>
  </div>
</template>

<script>
import HomeFooter from '@/components/HomeFooter.vue'
import HomeHeader from '@/components/HomeHeader.vue'
export default {
  name: 'app',
  components: {
    HomeHeader,
    HomeFooter
  }
}
</script>

<style lang="scss">
@import "assets/css/global.css";
@import "assets/css/layui-layer/layer.css";
@for $i from 0 to 5 {
  .pd#{$i} {
    padding: $i * 10 + px !important;
  }
  .pl#{$i} {
    padding-left: $i * 10 + px !important;
  }
  .pr#{$i} {
    padding-right: $i * 10 + px !important;
  }
  .pt#{$i} {
    padding-top: $i * 10 + px !important;
  }
  .mr#{$i} {
    margin-right: $i * 10 + px !important;
  }
  .ml#{$i} {
    margin-left: $i * 10 + px !important;
  }
  .mt#{$i} {
    margin-top: $i * 10 + px !important;
  }
}
.svg {
  position: relative;
  top: -4px;
}
.text-center {
  text-align: center;
}
.pl0 {
  padding-left: 0;
}
.pr0 {
  padding-right: 0;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
.pull-right {
  float: right !important;
}
.orangered {
  color: orangered;
}
.gray {
  color: #999;
}
.d-flex {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  &.flex-center {
    justify-content: center;
  }
  &.flex-start {
    justify-content: flex-start;
  }
  &.flex-end {
    justify-content: flex-end;
  }
}
.moup {
  cursor: pointer !important;
}
.disabled {
  color: #d2d2d2;
  &:hover {
    color: #d2d2d2;
  }
}
.link {
  color: #01AAED;
  &:hover {
    color: #5FB878;
  }
}
</style>
