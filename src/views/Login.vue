<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">登入</li>
          <li><router-link :to="{ name: 'reg' }">注册</router-link></li>
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
                  <validation-provider v-slot="{ errors }" ref="userField">
                    <div class="layui-form-mid">
                      <span style="color: #c00">{{ errors[0] }}</span>
                    </div>
                  </validation-provider>

                  <div class="layui-form-item">
                    <label for="L_email" class="layui-form-label">用户名</label>
                    <validation-provider v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input
                          v-model="username"
                          type="text"
                          name="username"
                          placeholder="请输入用户名"
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
                    <label for="L_pass" class="layui-form-label">密码</label>
                    <validation-provider
                      name="password"
                      rules="required|min:6"
                      v-slot="{ errors }"
                    >
                      <div class="layui-input-inline">
                        <input
                          v-model="password"
                          type="password"
                          name="password"
                          placeholder="请输入密码"
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
                      type="button"
                      @click="validate().then(submit)"
                    >
                      立即登录
                    </button>
                    <span style="padding-left: 20px">
                      <router-link :to="{ name: 'forget' }"
                        >忘记密码？</router-link
                      >
                    </span>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者使用社交账号登入</span>
                    <router-link
                      :to="{ name: '404' }"
                      class="iconfont icon-qq"
                      title="QQ登入"
                    ></router-link>
                    <router-link
                      :to="{ name: '404' }"
                      class="iconfont icon-weibo"
                      title="微博登入"
                    ></router-link>
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
import { login } from '@/api/login'
import CodeMix from '@/mixin/vercode'
export default {
  name: 'login',
  mixins: [CodeMix],
  data () {
    return {
      username: '',
      password: '',
      vercode: ''
    }
  },
  mounted () {
    this.$store.commit('_reload')
  },
  watch: {
    username (newval, oldval) {
      requestAnimationFrame(() => {
        this.$refs.observer.reset()
      })
    },
    password (newval, oldval) {
      requestAnimationFrame(() => {
        this.$refs.observer.reset()
      })
    }
  },
  methods: {
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      login({
        username: this.username,
        password: this.password,
        vercode: this.vercode,
        sid: this.sid
      })
        .then((res) => {
          this.getVerCode()
          if (res.code === 200) {
            // 存储用户登录名
            res.data.username = this.username
            this.$store.commit('setUserInfo', res.data)
            this.$store.commit('setIsLogin', true)
            this.$store.commit('setToken', res.token)
            this.username = ''
            this.password = ''
            this.vercode = ''
            requestAnimationFrame(() => {
              this.$refs.observer.reset()
            })
            this.$router.push({ name: 'index' })
          } else if (res.code === 401) {
            this.$refs.vercodeField.setErrors([res.msg])
          } else if (res.code === 404) {
            this.$refs.userField.setErrors([res.msg])
          }
        })
        .catch((err) => {
          const data = err.response.data
          if (data.code === 500) {
            this.$alert('用户名或密码错误，请检查!')
          } else {
            this.$alert('服务器错误')
          }
        })
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
