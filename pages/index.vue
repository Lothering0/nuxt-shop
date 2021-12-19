<template>
  <main>
    <h1>
      Home page
    </h1>

    <PostsList :isCard="true" getPages="posts" />
  </main>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'Container',
  async fetch({ store }) {
    // This works only on localhost
    /* await store.dispatch('auth/fetch') */
    await store.dispatch('posts/fetch')
  },
  methods: {
    ...mapMutations({
      switchEditMode: 'editMode/switchEditMode',
      clearPosts: 'posts/clearPosts',
      switchEnough: 'posts/switchEnough',
      setUser: 'auth/setUser',
      setAuth: 'auth/setAuth'
    }),
  },
  computed: {
    ...mapGetters('auth', ['auth']),
    getEditMode() {
      return this.$store.getters['editMode/getEditMode']
    },
  },
  async mounted() {
    if (this.getEditMode) this.switchEditMode()

    try {
      const response = await this.$axios.$get(`http://localhost:9000/api/auth/user`, {
        withCredentials: true
      })

      this.setUser(response)

      response.message !== 'Unauthorized'
        ? this.setAuth(true)
        : this.setAuth(false)
    } catch (e) {
      this.setAuth(false)
    }
  },
  beforeDestroy() {
    this.clearPosts()
    this.switchEnough(false)
  }
}
</script>

<style lang="scss" scoped>
</style>
