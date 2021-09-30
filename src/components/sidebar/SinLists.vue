<template>
  <div class="modal" v-show="isShow">
    <div class="mask" @click="close()"></div>
    <div class="layui-layer layui-layer-page" :class="{ active: isShow }">
      <div class="layui-layer-title">
        <span>签到活跃榜 - TOP20</span>
        <i class="layui-icon layui-icon-close pull-right" @click="close()"></i>
      </div>
      <div class="layui-layer-content pd0">
        <div class="layui-tab layui-tab-brief">
          <ul class="layui-tab-title layui-show">
            <li :class="{ 'layui-this': current === 0 }" @click="choose(0)">
              最新签到
            </li>
            <li :class="{ 'layui-this': current === 1 }" @click="choose(1)">
              今日最快
            </li>
            <li :class="{ 'layui-this': current === 2 }" @click="choose(2)">
              总签到榜
            </li>
          </ul>
          <div class="layui-layer-content">
            <ul class="layui-tab-item layui-show">
              <li v-for="(item, index) in items" :key="'signLists' + index">
                <img src="@/assets/img/kingCat.png" alt="pic" class="mr1" />
                <cite class="fly-link">{{ item.name }}</cite>
                <span class="fly-grey" v-if="current !== 2"
                  >签到于{{ item.created }}</span
                >
                <span class="fly-grey" v-else
                  >已经连续签到<i class="orangered">{{ item.count }}</i
                  >天</span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sinLists',
  props: {
    isShow: {
      default: false,
      type: Boolean
    },
    lists: {
      default: () => [],
      type: Array
    }
  },
  computed: {
    items () {
      return this.lists
    }
  },
  data () {
    return {
      current: 0
    }
  },
  methods: {
    choose (val) {
      this.current = val
    },
    close () {
      this.$emit('closeModal')
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
