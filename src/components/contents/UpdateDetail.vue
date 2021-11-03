<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel back-height" pad20>
      <div class="layui-form layui-form-pane">
        <div class="layui-tab layui-tab-brief" lay-filter="user">
          <ul class="layui-tab-title">
            <li class="layui-this">编辑帖子</li>
          </ul>
          <div
            class="layui-form layui-tab-content"
            id="LAY_ucm"
            style="padding: 20px 0"
          >
            <div class="layui-tab-item layui-show">
              <form>
                <validation-observer ref="observer" v-slot="{ validate }">
                  <div class="layui-row layui-col-space15 layui-form-item">
                    <div class="layui-col-md3">
                      <div class="layui-row">
                        <label class="layui-form-label">所在专栏</label>
                        <div class="layui-input-block">
                          <div class="layui-unselect layui-form-select">
                            <div class="layui-select-title">
                              <input
                                type="text"
                                placeholder="请选择"
                                readonly
                                v-model="catalogs[cataIndex].text"
                                class="
                                  layui-input layui-unselect layui-disabled
                                "
                              />
                              <i class="layui-edge"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="layui-col-md9">
                      <div class="layui-row">
                        <label for="L_title" class="layui-form-label"
                          >标题</label
                        >
                        <div class="layui-input-block">
                          <input
                            type="text"
                            class="layui-input"
                            v-model="title"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <editor @changeContent="addValue" :recoveryContent="content"> </editor>
                  <div class="layui-form-item">
                    <div class="layui-inline">
                      <label class="layui-form-label">悬赏积分</label>
                      <div class="layui-input-block">
                        <div class="layui-unselect layui-form-select">
                          <div class="layui-select-title">
                            <input
                              type="text"
                              placeholder="请选择"
                              readonly
                              v-model="favList[favIndex]"
                              class="layui-input layui-unselect layui-disabled"
                            />
                            <i class="layui-edge"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                    <button
                      class="layui-btn"
                      lay-filter="*"
                      lay-submit
                      @click.prevent="submit()"
                    >
                      立即发布
                    </button>
                  </div>
                </validation-observer>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from '@/components/modules/editor/Editor.vue'
import CodeMix from '@/mixin/vercode'
import { updatePost } from '@/api/content'
export default {
  name: 'updateDetail',
  mixins: [CodeMix],
  props: ['tid', 'page'],
  data () {
    return {
      cataIndex: 0,
      favIndex: 0,
      vercode: '',
      content: '',
      title: '',
      catalogs: [
        {
          text: '请选择',
          value: ''
        },
        {
          text: '提问',
          value: 'ask'
        },
        {
          text: '分享',
          value: 'share'
        },
        {
          text: '讨论',
          value: 'discuss'
        },
        {
          text: '建议',
          value: 'advise'
        }
      ],
      favList: [20, 30, 50, 60, 80]
    }
  },
  components: {
    Editor
  },
  mounted () {
    if (this.page) {
      this.content = this.page.content
      this.title = this.page.title
      this.favIndex = this.favList.indexOf(parseInt(this.page.fav))
      this.cataIndex = this.catalogs.indexOf(this.catalogs.filter(item => item.value === this.page.catalog)[0])
      localStorage.setItem('updateData', JSON.stringify(this.page))
    } else {
      const saveData = localStorage.getItem('updateData')
      if (saveData && saveData !== '') {
        this.$confirm('是否加载未编辑完的内容', () => {
          const obj = JSON.parse(saveData)
          this.content = obj.content
          this.title = obj.title
          this.cataIndex = obj.cataIndex
          this.favIndex = obj.favIndex
        }, () => {
          localStorage.setItem('updateData', '')
        })
      }
    }
  },
  methods: {
    addValue (val) {
      this.content = val
      const saveData = {
        title: this.title,
        cataIndex: this.cataIndex,
        content: this.content,
        favIndex: this.favIndex
      }
      if (this.title.trim() !== '' && this.content.trim() !== '') {
        const editData = localStorage.getItem('updateData')
        let newObj = { }
        if (editData && editData !== '') {
          newObj = { ...saveData, ...JSON.parse(editData) }
        }
        localStorage.setItem('updateData', JSON.stringify(newObj))
      }
    },
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      if (this.content.trim() === '') {
        this.$alert('文章内容不得为空')
        return
      }
      // 添加新的文章
      updatePost({
        tid: this.tid,
        title: this.title,
        content: this.content,
        vercode: this.vercode,
        sid: this.$store.state.sid
      }).then((res) => {
        if (res.code === 200) {
          localStorage.setItem('updateData', '')
          this.$pop('', '更新成功')
          setTimeout(() => {
            this.$router.push({ name: 'detail', params: { tid: this.tid } })
          }, 1000)
        } else {
          this.$alert(res.msg)
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
  .back-height {
    height: 664px;
    padding-top: 5px
  }
</style>
