<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
      <validation-provider
        name="email"
        rules="required|email"
        v-slot="{ errors }"
      >
        <div class="layui-form-item">
          <label for="L_email" class="layui-form-label">邮箱</label>
          <div class="layui-input-inline">
            <input
              type="text"
              name="email"
              class="layui-input"
              v-model="username"
            />
          </div>
          <div class="layui-form-mid">
            <span style="color: #c00">{{ errors[0] }}</span>
          </div>
          <!--           <div class="layui-form-mid layui-word-aux">
            如果您在邮箱已激活的情况下，变更了邮箱，需<a
              href="activate.html"
              style="font-size: 12px; color: #4f99cf"
              >重新验证邮箱</a
            >。
          </div> -->
        </div>
      </validation-provider>
      <div class="layui-form-item">
        <validation-provider
          name="name"
          rules="required"
          v-slot="{ errors }"
        >
          <label for="L_username" class="layui-form-label">昵称</label>
          <div class="layui-input-inline">
            <input
              type="text"
              name="username"
              class="layui-input"
              v-model="name"
            />
          </div>
          <div class="layui-form-mid">
            <span style="color: #c00">{{ errors[0] }}</span>
          </div>
        </validation-provider>
      </div>

      <div class="layui-form-item">
        <label for="L_city" class="layui-form-label">城市</label>
        <div class="layui-input-inline">
          <input type="text" class="layui-input" v-model="location" />
        </div>
      </div>
      <div class="layui-form-item">
        <label for="L_city" class="layui-form-label">性别</label>
        <div class="layui-input-inline ml1 mt1 gray">
          <label for="man" class="mr1">
            <input
              id="man"
              type="radio"
              name="sex"
              value="0"
              title="男"
              v-model="gender"
            />
            <i
              class="layui-icon layui-icon-circle"
              :class="{ 'layui-icon-radio': gender === '0' }"
            ></i>
            男
          </label>
          <label for="woman">
            <input
              id="woman"
              type="radio"
              name="sex"
              value="1"
              title="女"
              v-model="gender"
            />
            <i
              class="layui-icon layui-icon-circle"
              :class="{ 'layui-icon-radio': gender === '1' }"
            ></i>
            女
          </label>
        </div>
      </div>
      <div class="layui-form-item layui-form-text">
        <label for="L_sign" class="layui-form-label">签名</label>
        <div class="layui-input-block">
          <textarea
            placeholder="随便写些什么刷下存在感"
            class="layui-textarea"
            style="height: 80px"
            v-model="regmark"
          ></textarea>
        </div>
      </div>
      <div class="layui-form-item">
        <button class="layui-btn" key="set-mine" lay-filter="*" lay-submit @click="submit()">
          确认修改
        </button>
      </div>
  </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import { updateUserInfo } from '@/api/user.js'
export default {
  name: 'myInfo',
  components: {
    ValidationProvider
  },
  data () {
    return {
      gender: '',
      name: '',
      username: '',
      location: '',
      regmark: ''
    }
  },
  mounted () {
    let { gender, name, username, location, regmark } = this.$store.state.userInfo
    this.gender = gender || ''
    this.name = name || ''
    this.username = username || ''
    this.location = location || ''
    this.regmark = regmark || ''
  },
  methods: {
    async submit () {
      updateUserInfo({
        gender: this.gender,
        name: this.name,
        username: this.username,
        location: this.location,
        regmark: this.regmark
      }).then((res) => {
        if (res.code === 200) {
          this.$store.commit('setUserInfo', {
            ...this.$store.state.userInfo,
            ...{
              gender: this.gender,
              name: this.name,
              username: this.username,
              location: this.location,
              regmark: this.regmark
            }
          })
          this.$alert('更新成功！')
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.layui-icon-radio {
  color: #5fb878;
}
</style>
