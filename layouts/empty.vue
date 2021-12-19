<template>
  <div class="empty-layout">
    <nuxt />
  </div>
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
.empty-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 5rem;
}
</style>