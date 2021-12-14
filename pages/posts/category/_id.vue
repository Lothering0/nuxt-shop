<template>
  <div>
    <h1>Posts with category: <span style="text-transform: capitalize">{{$route.params.id.replace('_', ' ')}}</span></h1>

    <PostsList
      :isCard="true"
      getPages="postsByCategory"
      :categoryName="$route.params.id"
    />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'postsByCategory',
  async fetch({ store, params }) {
    if (!store.getters['auth/auth'])
      await store.dispatch('auth/fetch')

    await store.dispatch('posts/fetchByCategoryName', [params.id, null])
  },
  methods: {
    ...mapMutations({
      clearPostsByCategoryName: 'posts/clearPostsByCategoryName',
      switchEnough: 'posts/switchEnough'
    }),
  },
  computed: {
    aoeu() {
      return this.$store.getters['posts/postsByCategory']
    }
  },
  beforeDestroy() {
    // console.log(this.aoeu)
    // this.clearPostsByCategoryName()
    // console.log(this.aoeu)
    this.switchEnough(false)
  }
}
</script>
