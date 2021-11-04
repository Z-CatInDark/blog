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
                    rules="required"
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
import { forget } from '@/api/login'
export default {
  name: 'forget',
  mixins: [CodeMix],
  data () {
    return {
      username: '',
      vercode: ''
    }
  },
  methods: {
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      forget({
        username: this.username,
        vercode: this.vercode,
        sid: this.sid
      }).then((res) => {
        this.getVerCode()
        if (res.code === 200) {
          this.username = ''
          this.vercode = ''
          requestAnimationFrame(() => {
            this.$refs.observer.reset()
          })
        } else if (res.code === 401) {
          this.$refs.vercodeField.setErrors([res.msg])
        } else if (res.code === 500) {
          this.$alert('用户名不存在，请检查！')
        } else {
          this.$alert(res.data)
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.fly-panel {
  height: 296px;
}
.mtop {
  margin-top: -20px;
}
</style>
