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
      setTheme: 'editMode/setTheme',
      clearPosts: 'posts/clearPosts',
      switchEnough: 'posts/switchEnough',
    }),
  },
  computed: {
    ...mapGetters('auth', ['auth']),
    getEditMode() {
      return this.$store.getters['editMode/getEditMode']
    },
  },
  mounted() {
    if (this.getEditMode) this.switchEditMode()

    const isDarkMode = localStorage.getItem('dark_mode') === 'true'

    this.setTheme(isDarkMode)
  },
  beforeDestroy() {
    this.clearPosts()
    this.switchEnough(false)
  }
}
</script>

<style lang="scss" scoped>
</style>
