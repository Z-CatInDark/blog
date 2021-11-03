<template>
  <div class="fly-panel" v-show="lists.length > 0">
    <div class="fly-panel-title fly-filter">
      <a>置顶</a>
      <a
        href="#signin"
        class="layui-hide-sm layui-show-xs-block fly-right"
        id="LAY_goSignin"
        style="color: #FF5722;"
      >去签到</a>
    </div>
    <list-item :lists="lists" :isShow="!isEnd"></list-item>
  </div>
</template>

<script>
import ListItem from './ListItem'
import { getTop } from '@/api/content'

export default {
  name: 'top',
  data () {
    return {
      page: 0,
      limit: 20,
      sort: 'created',
      isEnd: false,
      lists: []
    }
  },
  components: {
    ListItem
  },
  mounted () {
    this._getTop()
  },
  methods: {
    _getTop () {
      if (this.isEnd) return
      let options = {
        isTop: '1',
        sort: this.sort,
        page: this.page,
        limit: this.limit
      }
      getTop(options).then((res) => {
        if (res.code === 200) {
          if (res.data.length < this.limit) {
            this.isEnd = true
          }
          if (this.lists.length === 0) {
            this.lists = res.data
          } else {
            this.lists = this.lists.concat(res.data)
          }
        }
      }).catch((err) => {
        if (err) {
          this.$alert(err.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
