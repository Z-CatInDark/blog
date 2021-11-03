<template>
  <div id="">
    <div class="fly-home fly-panel" style="background-image: url()">
      <img
        :src="
          userInfo.pic ? userInfo.pic : require('../assets/img/kingCat.png')
        "
      />
      <h1>
        {{ userInfo.name }}
        <i class="iconfont icon-nan"></i>
        <i class="layui-badge fly-badge-vip">{{
          userInfo.isVip === "0" ? "普通会员" : "VIP" + userInfo.isVip
        }}</i>
      </h1>
      <p class="fly-home-info">
        <i class="iconfont icon-kiss" title="积分"></i
        ><span style="color: #ff7200">{{ userInfo.favs }}积分</span>
        <i class="iconfont icon-shijian"></i
        ><span>{{ userInfo.created | moment }} 加入</span>
        <i class="iconfont icon-chengshi"></i
        ><span>{{ userInfo.location }}</span>
      </p>

      <p class="fly-home-sign">{{ userInfo.regmark }}</p>

      <div class="fly-sns" data-user="">
        <a
          href="javascript:;"
          class="layui-btn layui-btn-primary fly-imActive"
          data-type="addFriend"
          >加为好友</a
        >
        <a
          href="javascript:;"
          class="layui-btn layui-btn-normal fly-imActive"
          data-type="chat"
          >发起会话</a
        >
      </div>
    </div>

    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md6 fly-home-jie">
          <div class="fly-panel">
            <h3 class="fly-panel-title">{{ userInfo.name }} 最近的发帖</h3>
            <ul class="jie-row">
              <li v-for="(item, index) in postList" :key="'postList' + index">
                <div
                  class="fly-list-badge"
                  v-show="item.tags.length > 0 && item.tags[0].name !== ''"
                >
                  <span
                    class="layui-badge"
                    v-for="(tag, index) in item.tags"
                    :key="'tag' + index"
                    :class="tag.class"
                    >{{ tag.name }}</span
                  >
                </div>
                <router-link
                  :to="{ name: 'detail', params: { tid: item._id } }"
                  class="jie-title link"
                  >{{ item.title }}</router-link
                >
                <i>{{ item.created | moment }}</i>
                <em> 阅读{{ item.reads }} /回答{{ item.answer }} </em>
              </li>
              <div
                v-show="postList.length === 0"
                class="fly-none"
                style="min-height: 50px; padding: 30px 0; height: auto"
              >
                <i style="font-size: 14px">没有发表任何求解</i>
              </div>
            </ul>
          </div>
        </div>

        <div class="layui-col-md6 fly-home-da">
          <div class="fly-panel">
            <h3 class="fly-panel-title">{{ userInfo.name }} 最近的回答</h3>
            <ul class="home-jieda">
              <li
                v-for="(item, index) in commentList"
                :key="'commentList' + index"
              >
                <p>
                  <i>{{ item.created | moment }}</i>
                  在<router-link
                    :to="
                      item.tid
                        ? { name: 'detail', params: { tid: item.tid._id } }
                        : { name: '404' }
                    "
                    >{{ item.tid ? item.tid.title : "该贴已被作者删除" }}</router-link
                  >中回答：
                </p>
                <div class="home-dacontent" v-rechtext="item.content"></div>
              </li>
              <div
                v-show="commentList.length === 0"
                class="fly-none"
                style="min-height: 50px; padding: 30px 0; height: auto"
              >
                <span>没有回答任何问题</span>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo, getCommentPublic, getPostPublic } from '@/api/user'
export default {
  name: 'user',
  props: ['uid'],
  data () {
    return {
      userInfo: {},
      commentList: [],
      postList: []
    }
  },
  mounted () {
    this._getUserInfo()
    this._getCommentPublic()
    this._getPostPublic()
  },
  methods: {
    _getUserInfo () {
      getUserInfo({ uid: this.uid }).then((res) => {
        if (res.code === 200) {
          this.userInfo = res.data
        }
      })
    },
    _getCommentPublic () {
      getCommentPublic({
        uid: this.uid,
        page: 0,
        limit: 20
      }).then((res) => {
        if (res.code === 200) {
          this.commentList = res.data
        }
      })
    },
    _getPostPublic () {
      getPostPublic({
        uid: this.uid,
        page: 0,
        limit: 20
      }).then((res) => {
        if (res.code === 200) {
          this.postList = res.data
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
