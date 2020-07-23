import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import users from '@/services/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    uuid: '',
    csrf: ''
  },
  mutations: {
    auth_request (state) {
      state.status = 'loading'
    },
    auth_success (state, token, uuid) {
      state.status = 'success'
      state.token = token
      state.uuid = uuid
    },
    auth_error (state) {
      state.status = 'error'
    },
    logout (state) {
      state.status = ''
      state.token = ''
      state.uuid = ''
    },
    init (state, csrf, token, uuid) {
      state.csrf = csrf
      state.uuid = uuid
      state.token = token
    }
  },
  actions: {
    login ({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        users.login(user)
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    allow ({commit}, logintoken) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        users.allow(logintoken)
          .then(resp => {
            const token = resp.data.api_token
            const uuid = resp.data.uuid
            console.log(token)
            localStorage.setItem('token', token)
            localStorage.setItem('uuid', uuid)
            axios.defaults.headers.common['Authorization'] = token
            axios.defaults.headers.common['X-REQUEST-ID'] = uuid
            console.log(resp)
            commit('auth_success', token, uuid)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            localStorage.removeItem('uuid')
            reject(err)
          })
      })
    },
    register ({commit}, data) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        users.register(data)
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout ({commit}) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('uuid')
        delete axios.defaults.headers.common['Authorization']
        delete axios.defaults.headers.common['X-REQUEST-ID']
        resolve()
      })
    },
    settings ({commit}, data) {
      return new Promise((resolve, reject) => {
        console.log(localStorage.getItem('csrf'))
        commit('init', data.csrf)
        localStorage.setItem('csrf', data.csrf)
        axios.defaults.headers.common['X-CSRF-TOKEN'] = data.csrf
        resolve()
      })
    }
  },
  getters: {
    isLoggedIn: state => {
      state.token = localStorage.getItem('token')
      if (!state.token || state.token === 'undefined' || state.token === null) {
        return false
      }
      return true
    },
    authStatus: state => state.status
  }
})
