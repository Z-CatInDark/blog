import { getCode } from '@/api/login.js'
import uuid from 'uuid/v4'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  data () {
    return {
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
    // 获取验证码
    getVerCode () {
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
    }
  }
}
