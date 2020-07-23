<template>
    <div class="text-center">
        <b-spinner style="width: 3rem; height: 3rem;margin-top:20%" label="Large Spinner"></b-spinner>
    </div>
</template>
<script>
export default {
  name: 'profile',
  props: ['token'],
  created: function () {
    this.$store.dispatch('allow', this.$props.token)
      .then((response) => {
        this.$bvToast.toast(response.data.message, {
          'autoHideDelay': 1000,
          'noHoverPause': true,
          'variant': 'success',
          'noCloseButton': true
        })
        // this.$router.push('/edit-profile')
      })
      .catch(err => {
        this.$bvToast.toast(err.response.data.message, {
          'autoHideDelay': 1000,
          'noHoverPause': true,
          'variant': 'danger',
          'noCloseButton': true
        })
        // this.$router.push('/login')
      })
  }
}
</script>
