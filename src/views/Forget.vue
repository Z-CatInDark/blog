<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li><router-link :to="{ name: 'login' }">登入</router-link></li>
          <li class="layui-this">找回密码</li>
        </ul>
        <div
          class="layui-form layui-tab-content"
          id="LAY_ucm"
          style="padding: 20px 0"
        >
          <validation-observer ref="observer" v-slot="{ validate }">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form method="post">
                  <div class="layui-form-item">
                    <label for="L_email" class="layui-form-label">邮箱</label>
                    <validation-provider
                      name="username"
                      rules="required|email"
                      v-slot="{ errors }"
                    >
                      <div class="layui-input-inline">
                        <input
                          v-model="username"
                          type="text"
                          name="username"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <validation-provider
                    name="vercode"
                    rules="required|length:4"
                    v-slot="{ errors }"
                  >
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
                  </validation-provider>
                  <div class="layui-form-item">
                    <button
                      type="button"
                      class="layui-btn"
                      @click="validate().then(submit)"
                    >
                      提交
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </validation-observer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCode, forget } from '@/api/login'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import uuid from 'uuid/v4'
export default {
  name: 'forget',
  data () {
    return {
      username: '',
      vercode: '',
      svg: '',
      sid: ''
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  mounted () {
    this.getVerCode()
  },
  methods: {
    getVerCode () {
      localStorage.clear()
      this.getSid()
      getCode(this.sid).then((res) => {
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    },
    // 获取uuid用于校验验证码
    getSid () {
      if (localStorage.getItem('sid')) {
        this.sid = localStorage.getItem('sid')
      } else {
        localStorage.setItem('sid', this.sid)
        this.sid = uuid()
      }
      this.$store.commit('setSid', this.sid)
    },
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      forget({
        username: this.username,
        vercode: this.vercode,
        sid: this.sid
      })
        .then((res) => {
          if (res.code === 200) {
            this.username = ''
            this.vercode = ''
            requestAnimationFrame(() => {
              this.$refs.observer.reset()
            })
          } else if (res.code === 401) {
            this.$refs.vercodeField.setErrors([res.msg])
          }
        })
        .catch((err) => {
          const data = err.response.data
          if (data.code === 500) {
            this.$alert('用户名不存在，请检查！')
          } else {
            this.$alert('服务器错误')
          }
        })
    }
  }
}
</script>

<style lang='sass' scoped>
</style>
