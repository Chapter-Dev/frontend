// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import store from '@/store/store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.prototype.$http = Axios

const token = localStorage.getItem('token')
const csrf = localStorage.getItem('csrf')

if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}
if (csrf) {
  Vue.prototype.$http.defaults.headers.common['X-CSRF'] = csrf
}

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
