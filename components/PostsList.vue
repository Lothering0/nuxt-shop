<template>
  <div class="posts">
    <ul
      v-if="posts.length"
    >
      <li
        v-for="post of posts"
        :key="post._id"
      >
        <Card
          :post="post"
          :getPages="getPages"
          v-scroll-reveal="scrollRevealOptions"
        />
      </li>

      <InfiniteScroll
        :enough="enough"
        style="display: none;"
        @load-more="fetch(page++)"
      />
    </ul>
    <h2 v-else>Posts not found!</h2>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PostsList',
  data() {
    return {
      page: 2,
      scrollRevealOptions: {
        origin: 'top',
        distance: '10px',
        scale: 1,
        duration: 1000,
        reset: false,
      }
    }
  },
  props: {
    getPages: String,
    categoryName: String
  },
  computed: {
    ...mapGetters('posts', ['enough']),
    posts() {
      return this.$store.getters[`posts/${this.getPages}`]
    }
  },
  methods: {
    fetch(page) {
      if (this.getPages === 'posts')
        return this.fetchPosts(page)

      if (this.getPages === 'userPosts')
        return this.fetchByUserId([null, page])

      if (this.getPages === 'postsByCategory')
        return this.fetchByCategoryName([this.categoryName, page])

      if (this.getPages === 'basket')
        return this.fetchBasket(page)
    },
    ...mapActions({
      fetchPosts: 'posts/fetch',
      fetchByUserId: 'posts/fetchByUserId',
      fetchByCategoryName: 'posts/fetchByCategoryName',
      fetchBasket: 'posts/fetchBasket'
    })
  }
}
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;

  margin: 0;
  margin-top: 49px;
  margin-left: -41px;
  padding: 0;
}

li {
  list-style: none;
  margin-left: 40px;
  margin-bottom: 30px;
}

.skeleton {
  width: 262px;
  height: 322px;
  background: #aaa;
}

@media screen and (max-width: 1300px) {
  ul {
    margin-left: 0;
  }

  li {
    margin-left: auto;
    margin-right: auto;
  }
}

@media screen and (max-width: 320px) {
  ul {
    justify-content: center;

    margin-top: 35px;
    margin-left: 0;
  }

  li {
    margin-left: 0;
  }
}
</style>
