<template>
  <section>
    <h1>Error 404</h1>

    <nuxt-link to="/">Home</nuxt-link>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({
      authFetch: 'auth/fetch'
    })
  },
  mounted() {
    // On local you can use dispatch in fetch hook instead of this
    this.authFetch()
  }
}
</script>


<style scoped>
section {
  width: 600px;
  margin: 0 auto;
  padding-top: 5rem;
}

h1 {
  color: darkred;
}
</style>