import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { formatDate } from '@/utils/filter'
import directives from '@/utils/directives'

import '@/utils/veevalidate'
import Alert from './components/modules/alert'
import Pop from './components/modules/pop'
Vue.config.productionTip = false
Vue.use(Alert)
Vue.use(Pop)
Vue.filter('moment', formatDate)

Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key])
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
