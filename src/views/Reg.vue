<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{ name: 'login' }">登入</router-link>
          </li>
          <li class="layui-this">注册</li>
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
                    <validation-provider
                      name="username"
                      rules="required|email"
                      v-slot="{ errors }"
                    >
                      <div class="layui-row">
                        <label for="username" class="layui-form-label"
                          >用户名</label
                        >
                        <div class="layui-input-inline">
                          <input
                            type="text"
                            name="username"
                            v-model="username"
                            placeholder="将会成为您唯一的登入名"
                            autocomplete="off"
                            class="layui-input"
                          />
                        </div>
                        <div class="layui-form-mid">
                          <span style="color: #c00">{{ errors[0] }}</span>
                        </div>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <label for="name" class="layui-form-label">昵称</label>
                    <validation-provider
                      name="name"
                      rules="required|min:1|name"
                      v-slot="{ errors }"
                    >
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          name="name"
                          v-model="name"
                          placeholder="请输入昵称"
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
                    <validation-provider
                      name="password"
                      rules="required|min:6|max:16"
                      v-slot="{ errors }"
                      vid="confirmation"
                    >
                      <div class="layui-row">
                        <label for="L_pass" class="layui-form-label"
                          >密码</label
                        >
                        <div class="layui-input-inline">
                          <input
                            type="password"
                            name="password"
                            v-model="password"
                            placeholder="6到16个字符"
                            autocomplete="off"
                            class="layui-input"
                          />
                        </div>
                        <div class="layui-form-mid">
                          <span style="color: #c00">{{ errors[0] }}</span>
                        </div>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider
                      name="repassword"
                      v-slot="{ errors }"
                      rules="confirmed:confirmation"
                    >
                      <div class="layui-row">
                        <label for="L_repass" class="layui-form-label"
                          >确认密码</label
                        >
                        <div class="layui-input-inline">
                          <input
                            type="password"
                            name="repassword"
                            v-model="repassword"
                            placeholder="请再次输入密码"
                            autocomplete="off"
                            class="layui-input"
                          />
                        </div>
                        <div class="layui-form-mid">
                          <span style="color: #c00">{{ errors[0] }}</span>
                        </div>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider
                      name="vercode"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <div class="layui-row">
                        <label for="L_vercode" class="layui-form-label"
                          >验证码</label
                        >
                        <div class="layui-input-inline">
                          <input
                            type="text"
                            name="code"
                            v-model="vercode"
                            placeholder="请输入验证码"
                            autocomplete="off"
                            class="layui-input"
                          />
                        </div>
                         <div class="layui-form-mid">
                          <span style="color: #c00">{{ errors[0] }}</span>
                        </div>
                      </div>
                       <div  class="layui-form-mid">
                          <span
                            class="svg"
                            style="color: #c00"
                            @click="getVerCode()"
                            v-html="svg"
                          ></span>
                        </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item mtop16">
                    <button
                      class="layui-btn"
                      type="button"
                      @click="validate().then(submit)"
                    >
                      立即注册
                    </button>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者直接使用社交账号快捷注册</span>
                    <router-link
                      onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-qq"
                      title="qq登入"
                      :to="{name: '404'}"
                    ></router-link>
                    <router-link
                      onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-weibo"
                      title="微博登入"
                      :to="{name: '404'}"
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
import { reg } from '@/api/login'
import CodeMix from '@/mixin/vercode'
export default {
  name: 'reg',
  mixins: [CodeMix],
  data () {
    return {
      username: '',
      name: '',
      password: '',
      repassword: '',
      vercode: ''
    }
  },
  mounted () {
    // this.$store.commit('_reload')
  },
  methods: {
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      reg({
        username: this.username,
        password: this.password,
        name: this.name,
        vercode: this.vercode,
        sid: this.$store.state.sid
      }).then((res) => {
        this.getVerCode()
        if (res.code === 200) {
          this.username = ''
          this.password = ''
          this.repassword = ''
          this.name = ''
          this.vercode = ''
          requestAnimationFrame(() => {
            this.$refs.observer.reset()
          })
          // 跳转到登录界面，让用户登录
          this.$alert('注册成功')
          setTimeout(() => {
            this.$router.push('/login')
          }, 1000)
        } else {
          this.$refs.observer.setErrors(res.msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.fly-panel {
  height: 524px;
}
.mtop16 {
  margin-top: -16px;
}
</style>
