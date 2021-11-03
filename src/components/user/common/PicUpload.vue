<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <div class="layui-form-item">
      <div class="avatar-add">
        <p>建议尺寸168*168，支持jpg、png、gif，最大不能超过50KB</p>
        <label for="pic" class="layui-btn upload-img">
          <i class="layui-icon">&#xe67c;</i>上传头像
        </label>
        <input
          id="pic"
          type="file"
          name="file"
          accept="image/png, image/jpg"
          @change="upload($event)"
        />
        <img :src="pic" />
        <span class="loading"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { updateUserInfo } from '@/api/user.js'
import { uploadImg } from '@/api/content.js'
import config from '@/config'
export default {
  name: 'picUpload',
  data () {
    return {
      pic: (this.$store.state.userInfo && this.$store.state.userInfo.pic)
        ? this.$store.state.userInfo.pic : require('@/assets/img/kingCat.png')
    }
  },
  methods: {
    upload (e) {
      let file = e.target.files
      let formData = new FormData()
      if (file.length > 0) {
        formData.append('file', file[0])
        this.formData = formData
      }
      uploadImg(this.formData).then((res) => {
        if (res.code === 200) {
          const baseUrl = process.env.NODE_ENV === 'production' ? config.baseUrl.pro : config.baseUrl.dev
          this.pic = baseUrl + res.data
        }
        updateUserInfo({ pic: this.pic }).then((res) => {
          if (res.code === 200) {
            let user = this.$store.state.userInfo
            user.pic = this.pic
            this.$store.commit('setUserInfo', user)
            this.$pop('', '头像上传成功')
          }
        })
      })
      document.getElementById('pic').value = ''
    }
  }
}
</script>

<style lang='scss' scoped>
#pic {
  display: none;
}
</style>
