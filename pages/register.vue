<template>
  <section>
    <h1>Registration</h1>

    <AuthForm authType="registration" />
  </section>
</template>

<script>
import AuthForm from '@/components/AuthForm'

export default {
  middleware: ['authenticated'],
  async fetch({ store }) {
    if (!store.getters['auth/auth']) {
      await store.dispatch('auth/fetch')
    }
  },
  computed: {
    isAuth() {
      return this.$store.getters['auth/auth']
    }
  },
  components: {
    AuthForm
  },
}
</script>
