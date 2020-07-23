<template>
  <div id="app">
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <a class="navbar-brand" href="#">Test</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link to="/" class="nav-link">Home <span class="sr-only">(current)</span></router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link">About</router-link>
            </li>
            <li class="nav-item" v-if="isLoggedIn">
              <router-link to="/edit-profile" class="nav-link">Profile</router-link>
            </li>
            <li class="nav-item">
              <span v-if="isLoggedIn">
                <a @click="logout" class="nav-link">Logout</a>
              </span>
              <span v-else>
                <router-link to="/login" class="nav-link">Login</router-link>
              </span>
            </li>
          </ul>
        </div>
      </nav>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import users from '@/services/users'
export default {
  name: 'App',
  computed: {
    isLoggedIn: function () { return this.$store.getters.isLoggedIn }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
    }
  },
  beforeCreate: function () {
    users.init()
      .then(response => {
        this.$store.dispatch('settings', response.data)
      })
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          // this.$store.dispatch('logout')
        }
        throw err
      })
    })
  }
}
</script>

<style>
</style>
