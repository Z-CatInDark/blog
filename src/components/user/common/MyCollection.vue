<template>
  <div id="">
    <table class="layui-table post-table" border="0" cellspacing="0">
      <thead>
        <tr>
          <th class="title">
            <div class="layui-table-cell pl0"><span>帖子标题</span></div>
          </th>
          <th>
            <div class="layui-table-cell text-center"><span>收藏时间</span></div>
          </th>
          <th>
            <div class="layui-table-cell text-center"><span>操作</span></div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center">
          <td class="text-left">测试标题1</td>
          <td class="text-center">2019-01-01</td>
          <td>
            <div class="layui-btn lay-btn-xs">编辑</div>
            <div class="layui-btn  lay-btn-xs layui-btn-danger">删除</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'myCollection'
}
</script>

<style lang='scss' scoped>
.title {
  width: 60%;
}
</style>
