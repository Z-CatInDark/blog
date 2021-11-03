<template>
  <div>
    <div class="overflow">
      <table class="layui-table post-table" border="0" cellspacing="0">
        <thead>
          <tr class="layui-table-header">
            <th>
              <div class="layui-table-cell pl0"><span>帖子标题</span></div>
            </th>
            <th>
              <div class="layui-table-cell"><span>回复状态</span></div>
            </th>
            <th>
              <div class="layui-table-cell"><span>结贴</span></div>
            </th>
            <th>
              <div class="layui-table-cell">
                <span>发表时间</span>
              </div>
            </th>
            <th>
              <div class="layui-table-cell"><span>数据</span></div>
            </th>
            <th class="min-cell">
              <div class="layui-table-cell"><span>操作</span></div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-center" v-for="(item, index) in lists" :key="'myPost' + index">
            <td class="text-left"><router-link class="link" :to="{name: 'detail',params:{tid: item._id}}">
              {{item.title}}
              </router-link></td>
            <td>{{item.status === '0' ? '打开' : '关闭'}}</td>
            <td :class="{'succes': item.isEnd === '1', 'orangered': item.isEnd === '0'}">{{item.isEnd === '0' ? '未结' : '已结贴'}}</td>
            <td>{{item.created | moment}}</td>
            <td>阅读<span class="succes">{{item.reads}}</span>/回答<span class="orangered">{{item.answer}}</span></td>
            <td>
              <div class="layui-btn lay-btn-xs" :class="{'layui-btn-disabled moup': item.isEnd === '1'}" @click="postEdit(item)">编辑</div>
              <div class="layui-btn lay-btn-xs layui-btn-danger" @click="_deletePost(item)">删除</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <post-page
      v-if="total > 0"
      :align="'center'"
      :showType="'text'"
      :showEnd="true"
      :showTatal="false"
      :showSelect="true"
      :theme="'layui-bg-green'"
      :total="total"
      :current="current"
      @changeCurrent="handleChange"
    ></post-page>
  </div>
</template>

<script>
import PostPage from '@/components/modules/page/Pagination.vue'
import { getPostList, deletePost } from '@/api/user'
export default {
  name: 'myPosts',
  data () {
    return {
      lists: [],
      page: 0,
      total: 0,
      limit: 10,
      current: 0
    }
  },
  components: {
    PostPage
  },
  mounted () {
    this._getPostList()
  },
  methods: {
    handleChange (val) {
      this.current = val
      this._getPostList()
    },
    _getPostList () {
      getPostList({
        page: this.current,
        limit: this.limit
      }).then((res) => {
        if (res.code === 200) {
          this.lists = res.data
          this.total = res.total
        }
      })
    },
    _deletePost (item) {
      this.$confirm('确定删除吗', () => {
        if (item.isEnd !== '0') {
          this.$pop('shake', '帖子已结贴， 无法删除')
          return
        }
        deletePost({ tid: item._id }).then((res) => {
          if (res.code === 200) {
            this.$pop('', '删除成功')
            this.lists.splice(this.lists.indexOf(item), 1)
            this.total -= 1
          } else {
            this.$pop('', res.msg)
          }
        })
      })
    },
    postEdit (item) {
      if (item.isEnd === '1') {
        this.$pop('shake', '帖子已结贴，无法编辑')
      } else {
        this.$router.push({
          name: 'updateDetail',
          params: { tid: item._id, page: item }
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.layui-table-header {
  th {
    text-align: center;
    &:first-child {
      text-align: left;
    }
  }
}
.overflow {
  overflow-y: auto;
}

.min-cell {
  min-width: 80px;
}

.succes {
  color: #5FB878
}

</style>
