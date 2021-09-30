<template>
  <div class="fly-panel" style="margin-bottom: 0">
    <div class="fly-panel-title fly-filter">
      <a
        :class="{ 'layui-this': status === '' && tag === '' }"
        @click.prevent="search()"
        >综合</a
      >
      <span class="fly-mid"></span>
      <a :class="{ 'layui-this': status === '0' }" @click.prevent="search(0)"
        >未结</a
      >
      <span class="fly-mid"></span>
      <a :class="{ 'layui-this': status === '1' }" @click.prevent="search(1)"
        >已结</a
      >
      <span class="fly-mid"></span>
      <a
        :class="{ 'layui-this': status === '' && tag === '精华' }"
        @click.prevent="search(2)"
        >精华</a
      >
      <span class="fly-filter-right layui-hide-xs">
        <a
          :class="{ 'layui-this': sort === 'created' }"
          @click.prevent="search(3)"
          >按最新</a
        >
        <span class="fly-mid"></span>
        <a
          :class="{ 'layui-this': sort === 'answer' }"
          @click.prevent="search(4)"
          >按热议</a
        >
      </span>
    </div>
    <list-item :lists="lists" @nextpage="nextPage()"></list-item>
  </div>
</template>

<script>
import { getLists } from '@/api/content'
import ListItem from './ListItem'
export default {
  name: 'list',
  data () {
    return {
      status: '',
      tag: '',
      sort: 'created',
      page: 0,
      limit: 20,
      catalog: '',
      isEnd: false,
      isRepeat: false,
      current: '',
      lists: [
        {
          uid: {
            name: '打工王',
            isVip: 1
          },
          title: '五块钱如何花三天',
          content: '',
          created: '2021-9-22 01:00:00',
          catalog: 'share',
          fav: 40,
          isEnd: 0,
          reads: 10,
          answer: 0,
          status: 0,
          isTop: 1,
          tags: [
            {
              name: '精华',
              class: 'layui-bg-blue'
            },
            {
              name: '热门',
              class: 'layui-bg-red'
            }
          ]
        },
        {
          uid: {
            name: '炒股王',
            isVip: 1
          },
          title: '如何精准抄底白酒',
          content: '',
          created: '2021-9-22 01:00:00',
          catalog: 'share',
          fav: 40,
          isEnd: 0,
          reads: 10,
          answer: 0,
          status: 0,
          isTop: 1,
          tags: [
            {
              name: '精华',
              class: 'layui-bg-blue'
            },
            {
              name: '热门',
              class: 'layui-bg-red'
            }
          ]
        },
        {
          uid: {
            name: '不想努力',
            isVip: 1
          },
          title: '如何讨60岁女孩开心',
          content: '',
          created: '2021-9-22 01:00:00',
          catalog: 'share',
          fav: 40,
          isEnd: 0,
          reads: 10,
          answer: 0,
          status: 0,
          isTop: 1,
          tags: [
            {
              name: '精华',
              class: 'layui-bg-blue'
            },
            {
              name: '热门',
              class: 'layui-bg-red'
            }
          ]
        },
        {
          uid: {
            name: '养猪王',
            isVip: 1
          },
          title: '母猪的产后护理',
          content: '',
          created: '2021-9-22 01:00:00',
          catalog: 'share',
          fav: 40,
          isEnd: 0,
          reads: 10,
          answer: 0,
          status: 0,
          isTop: 1,
          tags: [
            {
              name: '精华',
              class: 'layui-bg-blue'
            },
            {
              name: '热门',
              class: 'layui-bg-red'
            }
          ]
        }
      ]
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
    '$route' (newval, oldval) {
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
          this.status = '0'
          this.tag = ''
          break
        case 1:
          this.status = '1'
          this.tag = ''
          break
        case 2:
          this.status = ''
          this.tag = '精华'
          break
        case 3:
          this.sort = 'created'
          break
        case 4:
          this.sort = 'answer'
          break
        default:
          this.status = ''
          this.tag = ''
          this.current = ''
      }
    },
    _getLists () {
      if (this.isEnd) return
      let options = {
        catalog: this.catalog,
        isTop: 0,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        tags: this.tags,
        status: this.status
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
      this._getLists()
      this.isEnd = false
      this.lists = []
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
