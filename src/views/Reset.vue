<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">重置密码</li>
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
                    <label for="L_email" class="layui-form-label">新密码</label>
                    <validation-provider
                      name="password"
                      rules="required|min:6|max:16"
                      v-slot="{ errors }"
                      vid="confirmation"
                    >
                      <div class="layui-input-inline">
                        <input
                          v-model="password"
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
                  <div class="layui-form-item">
                    <label for="L_email" class="layui-form-label"
                      >确认密码</label
                    >
                    <validation-provider
                      name="repassword"
                      v-slot="{ errors }"
                      rules="confirmed:confirmation"
                    >
                      <div class="layui-input-inline">
                        <input
                          v-model="repassword"
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
                    ref="vercodeField"
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
import CodeMix from '@/mixin/vercode'
import { resetPassword, validateToken } from '@/api/user'
let obj = {}
export default {
  name: 'reset',
  mixins: [CodeMix],
  data () {
    return {
      username: '',
      password: '',
      repassword: '',
      vercode: ''
    }
  },
  mounted () {
    // let queryStr = window.location.href.replace(/.*\?/, '')
    // obj = Object.fromEntries(queryStr.split('&').map((val) => val.split('=')))
    // this.username = decodeURIComponent(obj.username)
    // this.$store.commit('setToken', obj.key)
    this._validateToken()
  },
  methods: {
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      resetPassword({
        username: this.username,
        vercode: this.vercode,
        password: this.password,
        sid: this.sid
      }).then((res) => {
        this.getVerCode()
        if (res.code === 200) {
          this.username = ''
          this.password = ''
          this.repassword = ''
          this.vercode = ''
          requestAnimationFrame(() => {
            this.$refs.observer.reset()
          })
          this.$alert('重置密码成功', () => {
            this.$store.commit('setValidateToken', '')
            this.$router.push('/login')
          })
        } else if (res.code === 401) {
          this.$refs.vercodeField.setErrors([res.msg])
        } else {
          this.$alert(res.data)
        }
      })
    },
    _validateToken () {
      let queryStr = window.location.href.replace(/.*\?/, '')
      obj = Object.fromEntries(
        queryStr.split('&').map((val) => val.split('='))
      )
      validateToken({
        username: decodeURIComponent(obj.username),
        key: obj.key
      }).then((res) => {
        if (res.code === 200) {
          this.username = decodeURIComponent(obj.username)
          this.$store.commit('setValidateToken', obj.key)
        } else {
          this.$alert(res.msg, () => {
            this.$router.push('/', () => {})
          })
        }
      })
    }
  }
}
</script>

<style lang='sass' scoped>
</style>
