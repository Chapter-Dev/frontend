<template>
  <div class="card-body">
    <h1>Login</h1>
    <b-breadcrumb :items="items"></b-breadcrumb>
    <b-form @submit="login">
    <b-card
      class=""
      header-tag="header"
      sub-title="Login link will be sent to your email">
      
        <b-card-text>
            <b-form-group
              id="input-group-1"
              description="We'll never share your email with anyone else."
            >
              <b-form-input
                id="email"
                v-model="email"
                type="email"
                required
                placeholder="Enter email"
              ></b-form-input>
            </b-form-group>
        </b-card-text>
      <template v-slot:footer>
        <b-button type="submit" variant="primary">Submit</b-button>
        <router-link to="/register" class="card-link float-right btn btn-secondary">Register</router-link>
      </template>
      </b-card>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      email: '',
      items: [
        {
          text: 'Home',
          href: '/'
        },
        {
          text: 'Login',
          active: true
        }
      ]
    }
  },
  methods: {
    login: function () {
      let email = this.email
      this.$store.dispatch('login', { email })
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>
