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
const uuid = localStorage.getItem('uuid')

if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}
if (csrf) {
  Vue.prototype.$http.defaults.headers.common['X-CSRF-TOKEN'] = csrf
}
if (uuid) {
  Vue.prototype.$http.defaults.headers.common['X-REQUEST-ID'] = uuid
}

Vue.prototype.$http.interceptors.request.use(config => {
  // perform a task before the request is sent
  console.log('asdsad')

  return config
}, error => {
  // handle the error
  return Promise.reject(error)
})

// declare a response interceptor
Vue.prototype.$http.interceptors.response.use((response) => {
  // do something with the response data
  localStorage.setItem('csrf', response.headers['x-csrf-token'])
  return response
}, error => {
  // handle the response error
  return Promise.reject(error)
})

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
