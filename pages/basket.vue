<template>
  <div>
    <h1>Basket</h1>

    <PostsList :isCard="true" getPages="basket" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Basket',
  async fetch({ store }) {
    if (!store.getters['auth/auth'])
      await store.dispatch('auth/fetch')

    await store.dispatch('posts/fetchBasket')
  },
  middleware: ['notAuthenticated'],
  methods: {
    ...mapMutations({
      clearBasket: 'posts/clearBasket',
      switchEnough: 'posts/switchEnough'
    }),
  },
  beforeDestroy() {
    this.clearBasket()
    this.switchEnough(false)
  }
}
</script>
