<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <validation-observer ref="observer" v-slot="{ validate }">
      <form action="/user/repass" method="post">
        <div class="layui-form-item">
          <label for="L_nowpass" class="layui-form-label">当前密码</label>
          <div class="layui-input-inline">
            <input
              type="password"
              autocomplete="off"
              class="layui-input"
              v-model="nowpassword"
            />
          </div>
        </div>
        <validation-provider
          name="password"
          rules="required|min:6|max:16"
          v-slot="{ errors }"
          vid="confirmation"
        >
          <div class="layui-form-item">
            <label for="password" class="layui-form-label">新密码</label>
            <div class="layui-input-inline">
              <input
                type="password"
                name="password"
                autocomplete="off"
                class="layui-input"
                v-model="password"
              />
            </div>
            <span style="color: #c00">{{ errors[0] }}</span>
          </div>
          <div class="layui-form-mid layui-word-aux mt-20">6到16个字符</div>
        </validation-provider>
        <validation-provider
          name="repassword"
          v-slot="{ errors }"
          rules="confirmed:confirmation"
        >
          <div class="layui-form-item">
            <label for="L_repass" class="layui-form-label">确认密码</label>
            <div class="layui-input-inline">
              <input
                type="password"
                name="repassword"
                autocomplete="off"
                class="layui-input"
                v-model="repassword"
              />
            </div>
            <span style="color: #c00">{{ errors[0] }}</span>
          </div>
        </validation-provider>
        <div class="layui-form-item">
          <button
            class="layui-btn"
            key="set-mine"
            @click.prevent="validate().then(submit)"
          >
            确认修改
          </button>
        </div>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { changePassword } from '@/api/user'
export default {
  name: 'changePassword',
  data () {
    return {
      password: '',
      repassword: '',
      nowpassword: ''
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  methods: {
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      if (this.nowpassword === this.password) {
        this.$alert('新旧密码不得一致')
        return
      }
      changePassword({
        password: this.password,
        nowpassword: this.nowpassword
      }).then((res) => {
        if (res.code === 200) {
          this.$pop('', '密码更新成功')
          this.password = ''
          this.repassword = ''
          this.nowpassword = ''
          // requestAnimationFrame(() => {
          //   this.$refs.observer.reset()
          // })
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.mt-20 {
  margin-top: -20px;
}
</style>
