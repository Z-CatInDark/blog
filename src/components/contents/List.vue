<template>
  <div class="fly-panel" style="margin-bottom: 0">
    <div class="fly-panel-title fly-filter">
      <a
        class="moup"
        :class="{ 'layui-this': postEnd === '' && tags === '' }"
        @click.prevent="search()"
        >综合</a
      >
      <a
        class="moup layui-hide-xs"
        :class="{ 'layui-this': postEnd === '0' }"
        @click.prevent="search(0)"
        >未结</a
      >
      <a
        class="moup"
        :class="{ 'layui-this': postEnd === '1' }"
        @click.prevent="search(1)"
        >已结</a
      >
      <a
        class="moup"
        :class="{ 'layui-this': postEnd === '' && tags === '精华' }"
        @click.prevent="search(2)"
        >精华</a
      >
      <span class="fly-filter-right layui-hide-xs">
        <a
          class="moup"
          :class="{ 'layui-this': sort === 'created' }"
          @click.prevent="search(3)"
          >按最新</a
        >
        <a
          class="moup"
          :class="{ 'layui-this': sort === 'answer' }"
          @click.prevent="search(4)"
          >按热议</a
        >
      </span>
    </div>
    <list-item :isEnd="isEnd" :lists="lists" @nextpage="nextPage()"></list-item>
  </div>
</template>

<script>
import { getLists } from '@/api/content'
import ListItem from './ListItem'
export default {
  name: 'list',
  data () {
    return {
      postEnd: '',
      tags: '',
      sort: 'created',
      page: 0,
      limit: 10,
      catalog: '',
      isEnd: false,
      isRepeat: false,
      current: '',
      lists: []
    }
  },
  components: {
    ListItem
  },
  watch: {
    current (newval, oldval) {
      // 去兼听current标签是否有变化，如果有变化，则需要重新进行查询
      this.init()
    },
    $route (newval, oldval) {
      let catalog = this.$route.params['catalog']
      if (typeof catalog !== 'undefined' && catalog !== '') {
        this.catalog = catalog
      }
      this.init()
    }
  },
  mounted () {
    let catalog = this.$route.params['catalog']
    if (typeof catalog !== 'undefined' && catalog !== '') {
      this.catalog = catalog
    }
    this._getLists()
  },
  methods: {
    search (val) {
      if (val === this.current) {
        return
      } else if (typeof val === 'undefined' && this.current === '') {
        return
      }
      this.current = val
      switch (val) {
        case 0:
          this.postEnd = '0'
          this.tags = ''
          break
        case 1:
          this.postEnd = '1'
          this.tags = ''
          break
        case 2:
          this.postEnd = ''
          this.tags = '精华'
          break
        case 3:
          this.sort = 'created'
          break
        case 4:
          this.sort = 'answer'
          break
        default:
          this.postEnd = ''
          this.tags = ''
          this.current = ''
      }
    },
    _getLists () {
      if (this.isEnd) return
      let options = {
        catalog: this.catalog,
        isTop: '0',
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        tags: this.tags,
        isEnd: this.postEnd
      }
      getLists(options)
        .then((res) => {
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
        })
        .catch((err) => {
          if (err) {
            this.$alert(err.message)
          }
        })
    },
    nextPage () {
      this.page++
      this._getLists()
    },
    init () {
      this.page = 0
      this.isEnd = false
      this.lists = []
      this._getLists()
    }
  }
}
</script>

<style lang="scss" scoped>
.fly-panel-title {
  a {
    &:hover {
      color: #5fb878;
    }
  }
}
</style>
