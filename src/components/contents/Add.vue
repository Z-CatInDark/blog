<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel" pad20 style="padding-top: 5px">
      <div class="layui-form layui-form-pane">
        <div class="layui-tab layui-tab-brief" lay-filter="user">
          <ul class="layui-tab-title">
            <li class="layui-this">发表新帖</li>
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
                      <validation-provider
                        name="catalog"
                        rules="is_not:请选择"
                        v-slot="{ errors }"
                      >
                        <div class="layui-row">
                          <label class="layui-form-label">所在专栏</label>
                          <div
                            class="layui-input-block"
                            @click="changeSelect()"
                          >
                            <div
                              class="layui-unselect layui-form-select"
                              :class="{ 'layui-form-selected': isSelect }"
                            >
                              <div class="layui-select-title">
                                <input
                                  type="text"
                                  placeholder="请选择"
                                  readonly
                                  v-model="catalogs[cataIndex].text"
                                  class="layui-input layui-unselect"
                                />
                                <i class="layui-edge"></i>
                              </div>
                              <dl class="layui-anim layui-anim-down">
                                <dd
                                  v-for="(item, index) in catalogs"
                                  :key="'addCatalog' + index"
                                  :class="{ 'layui-this': index === cataIndex }"
                                  @click="chooseCatalog(item, index)"
                                >
                                  {{ item.text }}
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                        <div class="layui-row">
                          <span style="color: #c00">{{ errors[0] }}</span>
                        </div>
                      </validation-provider>
                    </div>
                    <div class="layui-col-md9">
                      <validation-provider
                        name="title"
                        rules="required"
                        v-slot="{ errors }"
                      >
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
                        <div class="layui-row">
                          <span style="color: #c00">{{ errors[0] }}</span>
                        </div>
                      </validation-provider>
                    </div>
                  </div>
                  <editor @changeContent="addValue" :recoveryContent="content">
                  </editor>
                  <div class="layui-form-item">
                    <div class="layui-inline">
                      <label class="layui-form-label">悬赏积分</label>
                      <div
                        class="layui-input-block"
                        @click="changeSelect_fav()"
                      >
                        <div
                          class="layui-unselect layui-form-select"
                          :class="{ 'layui-form-selected': isSelect_fav }"
                        >
                          <div class="layui-select-title">
                            <input
                              type="text"
                              placeholder="请选择"
                              readonly
                              v-model="favList[favIndex]"
                              class="layui-input layui-unselect"
                            />
                            <i class="layui-edge"></i>
                          </div>
                          <dl class="layui-anim layui-anim-down">
                            <dd
                              v-for="(item, index) in favList"
                              :key="'favList' + index"
                              :class="{ 'layui-this': index === favIndex }"
                              @click="chooseFav(item, index)"
                            >
                              {{ item }}
                            </dd>
                          </dl>
                        </div>
                      </div>

                      <div class="layui-form-mid layui-word-aux">
                        发表后无法更改积分
                      </div>
                    </div>
                  </div>
                  <validation-provider
                    name="vercode"
                    rules="required"
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
                        <div class="layui-form-mid">
                          <span style="color: #c00">{{ errors[0] }}</span>
                        </div>
                      </div>
                      <div class="layui-form-mid mtop">
                        <span
                          class="svg"
                          style="color: #c00"
                          v-html="svg"
                          @click="getVerCode()"
                        ></span>
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
import { addPost } from '@/api/content'
export default {
  name: 'add',
  mixins: [CodeMix],
  data () {
    return {
      isSelect: false,
      isSelect_fav: false,
      isReload: false,
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
    // this.$store.commit('_reload')
    const saveData = localStorage.getItem('addData')
    if (saveData && saveData !== '') {
      this.$confirm(
        '是否加载未编辑完的内容',
        () => {
          const obj = JSON.parse(saveData)
          this.content = obj.content
          this.title = obj.title
          this.cataIndex = obj.cataIndex
          this.favIndex = obj.favIndex
        },
        () => {
          localStorage.setItem('addData', '')
        }
      )
    }
  },
  methods: {
    changeSelect () {
      this.isSelect = !this.isSelect
    },
    changeSelect_fav () {
      this.isSelect_fav = !this.isSelect_fav
    },
    chooseCatalog (item, index) {
      this.cataIndex = index
    },
    chooseFav (item, index) {
      this.favIndex = index
    },
    addValue (val) {
      this.content = val
      const saveData = {
        title: this.title,
        cataIndex: this.cataIndex,
        content: this.content,
        favIndex: this.favIndex
      }
      if (this.title.trim() !== '' && this.content.trim() !== '') {
        localStorage.setItem('addData', JSON.stringify(saveData))
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
      addPost({
        title: this.title,
        catalog: this.catalogs[this.cataIndex].value,
        content: this.content,
        fav: this.favList[this.favIndex],
        vercode: this.vercode,
        sid: this.$store.state.sid
      }).then((res) => {
        if (res.code === 200) {
          localStorage.setItem('addData', '')
          this.$pop('', '发帖成功')
          setTimeout(() => {
            this.$router.push({
              name: 'detail',
              params: { tid: res.data._id }
            })
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
.fly-panel {
  height: 675px;
}
.mtop {
  margin-top: -20px;
}
</style>
