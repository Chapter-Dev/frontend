<template>
  <div class="card-body">
    <h1>About Us</h1>
    <b-breadcrumb :items="items"></b-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'about-us',
  data () {
    return {
      items: [
        {
          text: 'Home',
          href: '/'
        },
        {
          text: 'About Us',
          active: true
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
