<template>
  <div class="layui-container">
    <detail-Panel></detail-Panel>
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8 content detail">
        <div class="fly-panel detail-box">
          <h1>{{ page.title }}</h1>
          <div class="fly-detail-info">
            <!-- <span class="layui-badge">审核中</span> -->
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-if="page.catalog === 'logs'"
              >动态</span
            >
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-if="page.catalog === 'ask'"
              >提问</span
            >
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-if="page.catalog === 'advise'"
              >建议</span
            >
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-if="page.catalog === 'discuss'"
              >交流</span
            >
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-if="page.catalog === 'share'"
              >分享</span
            >
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-if="page.catalog === 'notice'"
              >公告</span
            >
            <span
              class="layui-badge"
              style="background-color: #999"
              v-if="page.isEnd === '0'"
              >未结</span
            >
            <span class="layui-badge" style="background-color: #5fb878" v-else
              >已结</span
            >

            <span class="layui-badge layui-bg-black" v-show="page.isTop === '1'"
              >置顶</span
            >
            <span
              class="layui-badge"
              :class="tag.class"
              v-for="(tag, index) in page.tags"
              :key="'tags' + index"
              >{{ tag.name }}</span
            >

            <div class="fly-admin-box" data-id="123">
              <span class="layui-btn layui-btn-xs jie-admin" type="del"
                >删除</span
              >

              <!-- <span
                class="layui-btn layui-btn-xs jie-admin"
                type="set"
                field="stick"
                rank="1"
                >置顶</span
              > -->
              <!-- <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="0" style="background-color:#ccc;">取消置顶</span> -->

              <!-- <span
                class="layui-btn layui-btn-xs jie-admin"
                type="set"
                field="status"
                rank="1"
                >加精</span
              > -->
              <!-- <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="0" style="background-color:#ccc;">取消加精</span> -->
            </div>
            <span class="fly-list-nums">
              <a href="#comment"
                ><i class="iconfont" title="回答">&#xe60c;</i>
                {{ page.answer }}</a
              >
              <i class="iconfont" title="人气">&#xe60b;</i> {{ page.reads }}
            </span>
          </div>
          <!-- 收藏及作者信息 -->
          <div class="detail-about">
            <a class="fly-avatar" href="/">
              <img :src="page.uid ? page.uid.pic : ''" />
            </a>
            <div class="fly-detail-user">
              <a href="../user/home.html" class="fly-link">
                <cite>{{ page.uid ? page.uid.name : "CatInDark" }}</cite>
                <!-- <i class="iconfont icon-renzheng" title="认证信息"></i> -->
                <i class="layui-badge fly-badge-vip" v-if="page.uid"
                  >VIP{{ page.uid.isVip }}</i
                >
              </a>
              <span>{{ page.created | moment }}</span>
            </div>
            <div class="detail-hits" id="LAY_jieAdmin" data-id="123">
              <span style="padding-right: 10px; color: #ff7200"
                >悬赏：{{ page.fav }}积分</span
              >
            </div>
          </div>
          <div class="layui-btn-container fly-detail-admin pt1">
            <router-link
              class="layui-btn layui-btn-sm jie-admin"
              :to="{ name: 'updateDetail', params: { tid: tid, page: page } }"
              v-show="page.isEnd === '0' && page.uid._id === user._id"
              >编辑</router-link
            >
            <a
              class="layui-btn layui-btn-sm jie-admin"
              :class="{ 'layui-btn-primary': page.isFav }"
              @click.prevent="setCollect()"
              >{{ page.isFav ? "取消收藏" : "收藏" }}</a
            >
          </div>
          <div class="detail-body photos" v-html="content"></div>
        </div>

        <div class="fly-panel detail-box" id="flyReply">
          <fieldset
            class="layui-elem-field layui-field-title"
            style="text-align: center"
          >
            <legend>回帖</legend>
          </fieldset>

          <ul class="jieda" id="jieda">
            <li
              data-id="111"
              class="jieda-daan"
              v-for="(item, index) in comments"
              :key="'comments' + index"
            >
              <div class="detail-about detail-about-reply">
                <a class="fly-avatar">
                  <img :src="item.cuid ? item.cuid.pic : ''" />
                </a>
                <div class="fly-detail-user">
                  <router-link class="fly-link" :to="{name: 'user', params: {uid: item.cuid._id}}">
                    <cite>{{ item.cuid ? item.cuid.name : "CatInDark" }}</cite>
                    <i
                      class="layui-badge fly-badge-vip"
                      v-if="
                        item.cuid && item.cuid.isVip !== '0'
                          ? item.cuid.isVip
                          : false
                      "
                      >VIP{{ item.cuid.isVip }}</i
                    >
                  </router-link>

                  <span v-if="index === 0">(楼主)</span>
                </div>
                <div class="detail-hits">
                  <span>{{ item.created | moment }}</span>
                </div>

                <i
                  class="iconfont icon-caina"
                  title="最佳答案"
                  v-show="item.isBest === '1'"
                ></i>
              </div>
              <div
                class="detail-body jieda-body photos"
                v-rechtext="item.content"
              ></div>
              <div class="jieda-reply">
                <span
                  class="jieda-zan"
                  :class="{ zanok: item.handed }"
                  @click="hands(item)"
                >
                  <i class="iconfont icon-zan"></i>
                  {{ item.hands }}
                </span>
                <span type="reply" @click="reply(item)">
                  <i class="iconfont icon-svgmoban53"></i>
                  回复
                </span>
                <div class="jieda-admin">
                  <span
                    type="edit"
                    @click="editComment(item)"
                    v-show="page.isEnd === '0' && item.cuid._id === user._id"
                    >编辑</span
                  >
                  <!-- <span type="del">删除</span> -->
                  <span
                    class="jieda-accept"
                    type="accept"
                    @click="setBest(item, index)"
                    v-show="page.isEnd === '0' && item.cuid._id === user._id"
                    >采纳</span
                  >
                </div>
              </div>
            </li>

            <!-- 无数据时 -->
            <li class="fly-none" v-if="comments.length === 0">消灭零回复</li>
          </ul>
          <detail-page
            v-show="comments.length > 0"
            :align="'center'"
            :showType="'text'"
            :showEnd="true"
            :showTatal="false"
            :showSelect="true"
            :theme="'layui-bg-green'"
            :total="total"
            :current="current"
            :size="size"
            @changeCurrent="handleChange"
            @changeLimit="handeLimit"
          ></detail-page>
          <div class="layui-form layui-form-pane">
            <form>
              <validation-observer ref="observer" v-slot="{ validate }">
                <editor
                  @changeContent="addContent"
                  :initContent="editInfo.content"
                ></editor>
                <validation-provider
                  name="vercode"
                  rules="required|length:4"
                  v-slot="{ errors }"
                >
                  <div class="layui-row">
                    <div class="layui-form-item">
                      <label for="L_vercode" class="layui-form-label"
                        >验证码</label
                      >
                      <div class="layui-input-inline">
                        <input
                          v-model="vercode"
                          type="text"
                          name="vercode"
                          placeholder="请输入验证码"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <div>
                        <span
                          class="svg"
                          style="color: #c00"
                          v-html="svg"
                          @click="getVerCode()"
                        ></span>
                      </div>
                      <span style="color: #c00">{{ errors[0] }}</span>
                    </div>
                  </div>
                </validation-provider>
                <div class="layui-form-item">
                  <input type="hidden" name="jid" value="123" />
                  <button class="layui-btn" type="button" @click="submit()">
                    提交回复
                  </button>
                </div>
              </validation-observer>
            </form>
          </div>
        </div>
      </div>
      <div class="layui-col-md4">
        <hot-list></hot-list>
        <detail-ads></detail-ads>
        <detail-links></detail-links>
      </div>
    </div>
  </div>
</template>

<script>
import DetailPanel from '@/components/Panel.vue'
import DetailAds from '@/components/sidebar/Ads.vue'
import HotList from '@/components/sidebar/HotList.vue'
import DetailLinks from '@/components/sidebar/Links.vue'
import Editor from '@/components/modules/editor/Editor.vue'
import DetailPage from '@/components/modules/page/Pagination.vue'
import CodeMix from '@/mixin/vercode'
import { escapeHtml } from '@/utils/escape'
import { scrollToElem } from '@/utils/common'

import { getDetail } from '@/api/content'
import { addCollect } from '@/api/user'
import {
  getComments,
  addComment,
  updateComment,
  setCommentBest,
  setHands
} from '@/api/comment'
export default {
  name: 'detail',
  mixins: [CodeMix],
  props: ['tid'],
  components: {
    DetailAds,
    HotList,
    DetailLinks,
    DetailPanel,
    Editor,
    DetailPage
  },
  data () {
    return {
      vercode: '',
      total: 0,
      current: 0,
      size: 10,
      page: {},
      comments: [],
      editInfo: {
        tid: '',
        content: '',
        code: '',
        sid: ''
      }
    }
  },
  watch: {
    tid (newval, oldwal) {
      this.getPostDetail()
      this.getCommentsList()
    }
  },
  computed: {
    content () {
      if (typeof this.page.content === 'undefined') {
        return ''
      }
      if (this.page.content.trim() === '') {
        return ''
      }
      // 文章转译
      return escapeHtml(this.page.content)
    },
    user () {
      return this.$store.state.userInfo
    }
  },
  mounted () {
    this.getPostDetail()
    this.getCommentsList()
  },
  methods: {
    // 跳转页数
    handleChange (val) {
      this.current = val
      this.getCommentsList()
    },
    // 修改每页评论条数
    handeLimit (val) {
      this.size = val
      this.getCommentsList()
    },
    // 获取文章内容
    getPostDetail () {
      getDetail({ tid: this.tid }).then((res) => {
        if (res.code === 200) {
          this.page = res.data
        }
      })
    },
    // 获取评论列表
    getCommentsList () {
      getComments({
        tid: this.tid,
        page: this.current,
        limit: this.size
      }).then((res) => {
        if (res.code === 200) {
          this.comments = res.data
          this.total = res.total
        }
      })
    },
    addContent (val) {
      this.editInfo.content = val
    },
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      const isLogin = this.$store.state.isLogin
      if (!isLogin) {
        this.$pop('shake', '登录后即可发表评论~')
        return
      }
      // 判断用户是否被禁言
      const user = this.$store.state.userInfo
      if (user.status !== '0') {
        this.$pop('shake', '您已被禁言，请联系管理员')
        return
      }
      this.editInfo.vercode = this.vercode
      this.editInfo.sid = this.$store.state.sid
      this.editInfo.tid = this.tid
      if (
        typeof this.editInfo.cid !== 'undefined' &&
        this.editInfo.cid !== ''
      ) {
        const obj = { ...this.editInfo }
        delete obj['item']
        // 更新评论
        updateComment(obj).then((res) => {
          if (res.code === 200) {
            const temp = this.editInfo.item
            temp.content = this.editInfo.content
            this.$pop('', '更新评论成功')
            this.vercode = ''
            this.editInfo.content = ''
            this.comments.splice(
              this.comments.indexOf(this.editInfo.item),
              1,
              temp
            )
          }
        })
        return
      }
      // 发表评论
      addComment(this.editInfo).then((res) => {
        if (res.code === 200) {
          this.$pop('', '发表评论成功')
          this.vercode = ''
          this.editInfo.content = ''
          this.page.answer += 1
          this.comments.push(res.data)
          const user = this.$store.state.userInfo
          const cuid = {
            _id: user._id,
            pic: user.pic,
            name: user.name,
            isVip: user.isVip
          }
          res.data.cuid = cuid
          requestAnimationFrame(() => {
            this.$refs.observer && this.$refs.observer.reset()
          })
          this.getVerCode()
        }
      })
    },
    editComment (item) {
      this.editInfo.content = item.content
      // 滚动至输入框
      scrollToElem('.layui-input-block', 500, -65)
      document.getElementById('edit').focus()
      this.editInfo.cid = item._id
      this.editInfo.item = item
    },
    setBest (item) {
      this.$confirm(
        '确定采纳为最佳答案吗？',
        () => {
          setCommentBest({
            cid: item._id,
            tid: this.tid
          }).then((res) => {
            if (res.code === 200) {
              this.$pop('', '采纳答案成功！')
              item.isBest = '1'
              this.page.isEnd = '1'
            }
          })
        },
        () => ''
      )
    },
    hands (item) {
      setHands({
        cid: item._id,
        handed: item.handed ? 1 : 0
      }).then((res) => {
        if (res.code === 200) {
          item.handed = !item.handed
          item.hands += 1
        } else if (res.code === 205) {
          item.handed = !item.handed
          item.hands -= 1
        }
      })
    },
    // 回复评论
    reply (item) {
      const reg = /^@[\S]+/g
      if (this.editInfo.content) {
        if (reg.test(this.editInfo.content)) {
          this.editInfo.content = this.editInfo.content.replace(
            reg,
            '@' + item.cuid.name
          )
        } else {
          if (this.editInfo.content !== '') {
            this.editInfo.content = `@${item.cuid.name} ${this.editInfo.content}`
          }
        }
      } else {
        this.editInfo.content = '@' + item.cuid.name + ' '
      }
      // 滚动至输入框
      scrollToElem('.layui-input-block', 500, -65)
      document.getElementById('edit').focus()
    },
    setCollect () {
      const isLogin = this.$store.state.isLogin
      if (isLogin) {
        const collect = {
          tid: this.tid,
          title: this.page.title,
          isFav: this.page.isFav ? 1 : 0
        }
        addCollect(collect).then((res) => {
          if (res.code === 200) {
            this.isFav = !this.page.isFav
            this.page.isFav = !this.page.isFav
            this.$pop('', this.page.isFav === 1 ? '收藏成功' : '取消收藏')
          }
        })
      } else {
        this.$pop('shake', '请先登录')
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.fly-detail-admin {
  text-align: right;
  border-top: 1px dotted #eaeaea;
  background-color: #f8f8f8;
}
.fly-detail-info {
  span {
    margin-right: 5px;
  }
}
</style>
