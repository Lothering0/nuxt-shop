<template>
  <div>
    <h1>
      Create post
    </h1>

    <PostForm :post="{}" />
  </div>
</template>

<script>
export default {
  name: 'CreatePost',
  middleware: ['notAuthenticated'],
  async fetch({ store }) {
    if (!store.getters['auth/auth']) {
      await store.dispatch('auth/fetch')
    }
  },
}
</script>
