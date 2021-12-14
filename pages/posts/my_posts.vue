<template>
  <div>
    <div class="title-and-button">
      <h1>
        My posts
      </h1>

      <nuxt-link to="/posts/create_post" v-if="auth">
        <button class="main">
          + Add post
        </button>
      </nuxt-link>
    </div>

    <PostsList :isCard="true" getPages="userPosts" />
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'MyPosts',
  async fetch({ store }) {
    if (!store.getters['auth/auth'])
      await store.dispatch('auth/fetch')

    await store.dispatch('posts/fetchByUserId', [this.userId, null])
  },
  middleware: ['notAuthenticated'],
  methods: {
    ...mapMutations({
      clearUserPosts: 'posts/clearUserPosts',
      switchEnough: 'posts/switchEnough'
    }),
  },
  computed: {
    ...mapGetters('auth', ['auth', 'userId'])
  },
  beforeDestroy() {
    this.clearUserPosts()
    this.switchEnough(false)
  }
}
</script>

<style lang="scss" scoped>
.title-and-button {
  display: flex;

  button {
    margin-left: 20px;
  }
}
</style>
