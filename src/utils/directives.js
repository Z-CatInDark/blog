import { escapeHtml } from '@/utils/escape'
export default {
  'rechtext': {
    bind: function (el, binding, vnode) {
      el.innerHTML = escapeHtml(binding.value)
    },
    componentUpdated: function (el, binding, vnode) {
      el.innerHTML = escapeHtml(binding.value)
    }
  }
}
