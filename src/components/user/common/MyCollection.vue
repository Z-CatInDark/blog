<template>
  <div>
    <div class="overflow">
      <table class="layui-table post-table" border="0" cellspacing="0">
        <thead>
          <tr>
            <th class="title">
              <div class="layui-table-cell pl0"><span>帖子标题</span></div>
            </th>
            <th>
              <div class="layui-table-cell text-center">
                <span>收藏时间</span>
              </div>
            </th>
            <th>
              <div class="layui-table-cell text-center"><span>操作</span></div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-center" v-for="(item, index) in lists" :key="'myPost' + index">
            <td class="text-left link">{{item.title}}</td>
            <td class="text-center">{{item.created | moment}}</td>
            <td>
              <div class="layui-btn lay-btn-xs layui-btn-danger" @click="_deleteCollect(item)">删除</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <collect-page
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
    ></collect-page>
  </div>
</template>

<script>
import CollectPage from '@/components/modules/page/Pagination.vue'
import { getCollect, deleteCollect } from '@/api/user'
export default {
  name: 'myCollection',
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
    CollectPage
  },
  mounted () {
    this._getCollect()
  },
  methods: {
    handleChange (val) {
      this.current = val
      this._getCollect()
    },
    _getCollect () {
      getCollect({
        page: this.current,
        limit: this.limit
      }).then((res) => {
        if (res.code === 200) {
          this.lists = res.data
          this.total = res.total
        }
      })
    },
    _deleteCollect (item) {
      this.$confirm('确定删除吗', () => {
        deleteCollect({ tid: item._id }).then((res) => {
          if (res.code === 200) {
            this.$pop('', '删除成功')
            this.lists.splice(this.lists.indexOf(item), 1)
            this.total -= 1
          } else {
            this.$pop('', res.msg)
          }
        })
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.title {
  width: 60%;
}
</style>
