<template>
  <div>
    <b-form @submit="register">
    <b-card
      class="mt-5"
      header-tag="header"
      footer-tag="footer"
      sub-title="Login link will be sent to your email after registration">
        <template v-slot:header>
            <h6 class="mb-0">Edit Profile</h6>
        </template>
            <b-card-text>
                <b-form-group
                  id="input-group-fname"
                >
                    <b-form-input
                    id="first_name"
                    v-model="first_name"
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
                    v-model="last_name"
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
                    v-model="email"
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
                      v-model="dob"
                      placeholder="Select your date of birth"
                      required
                      class="mb-2">
                    </b-form-datepicker>
                </b-form-group>

                <b-form-group
                  id="input-group-gender"
                >
                    <b-form-select
                        v-model="gender"
                        required
                        :options="gender_options"
                    ></b-form-select>
                </b-form-group>
          </b-card-text>
        <template v-slot:footer>
            <b-button type="submit" variant="primary">Submit</b-button>
            <router-link to="/login" class="card-link float-right btn btn-secondary">Login</router-link>
          </template>
    </b-card>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'profile',
  data () {
    return {
      first_name: '',
      last_name: '',
      dob: '',
      gender: 'male',
      email: '',
      gender_options: [
        { value: 'male', text: 'Male' },
        { value: 'female', text: 'Female' }
      ]
    }
  },
  methods: {
    update: function () {
      let data = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        dob: this.dob,
        gender: this.gender
      }
      this.$store.dispatch('update', data)
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>
