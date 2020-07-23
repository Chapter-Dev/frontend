<template>
  <div class="card-body">
    <h1>Register</h1>
    <b-breadcrumb :items="items"></b-breadcrumb>
    <b-form v-on:submit.prevent="register">
    <b-card
      class=""
      footer-tag="footer"
      sub-title="Login link will be sent to your email after registration">
            <b-card-text>
                <b-form-group
                  id="input-group-fname"
                >
                    <b-form-input
                    id="first_name"
                    v-model="form.first_name"
                    type="text"
                    required
                    placeholder="Enter first name here"
                    ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-lname"
                >
                    <b-form-input
                    id="last_name"
                    v-model="form.last_name"
                    type="text"
                    required
                    placeholder="Enter last name here"
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-1"
                  description="We'll never share your email with anyone else."
                >
                    <b-form-input
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="Enter email"
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-lname"
                >
                    <b-form-datepicker
                      id="dob"
                      v-model="form.dob"
                      placeholder="Select your date of birth"
                      required
                      class="mb-2">
                    </b-form-datepicker>
                </b-form-group>

                <b-form-group
                  id="input-group-gender"
                >
                    <b-form-select
                        v-model="form.gender"
                        required
                        :options="gender_options"
                    ></b-form-select>
                </b-form-group>
          </b-card-text>
        <template v-slot:footer>
            <b-button type="submit" variant="primary">Submit</b-button>
            <router-link to="/login" class="card-link float-right btn btn-secondary">Back</router-link>
        </template>
    </b-card>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      form: {
        first_name: '',
        last_name: '',
        dob: '',
        gender: 'male',
        email: '',
      },
      gender_options: [
        { value: 'male', text: 'Male' },
        { value: 'female', text: 'Female' }
      ],
      items: [
        {
          text: 'Home',
          href: '/'
        },
        {
          text: 'Login',
          href: '/login'
        },
        {
          text: 'Register',
          active: true
        }
      ]
    }
  },
  methods: {
    register: function () {
      this.$store.dispatch('register', this.form)
        .then((response) => {
          this.$bvToast.toast(response.data.message, {
            'autoHideDelay': 1000,
            'noHoverPause': true,
            'variant': 'success',
            'noCloseButton': true
          })
        })
        .catch(err => {
          this.$bvToast.toast(err.response.data.message, {
            'autoHideDelay': 1000,
            'noHoverPause': true,
            'variant': 'danger',
            'noCloseButton': true
          })
        })
    }
  }
}
</script>

<style scoped>

</style>
