import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
import Home from '@/components/views/Home.vue'
import About from '@/components/views/About.vue'
import Login from '@/components/views/Login.vue'
import Profile from '@/components/views/Profile.vue'
import Register from '@/components/views/Register.vue'

Vue.use(Router)

var routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/edit-profile',
    name: 'profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
]

let router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
