<template>
  <div
    class="post"
    @mouseenter="showBasket = true"
    @mouseleave="showBasket = false"
    v-if="!getEditMode"
  >
    <img
      :src="img"
      :title="post.image"
      class="post-image"
      alt=""
    >

    <transition name="fade">
      <button
        class="icon basket"
        :class="{
          'main': !post.in_basket,
          'danger': post.in_basket
        }"
        :title="
          !post.in_basket
            ? 'Add to basket'
            : 'Remove from basket'
        "
        @click="addToBasket([post._id, post.in_basket])"
        v-show="showBasket || isMobile"
        v-if="getAuth"
      >
        <template v-if="!post.in_basket">
          <img src="@/static/svg/basket-plus.svg">
        </template>
        <template v-else>
          <img src="@/static/svg/basket-minus.svg">
        </template>
      </button>
    </transition>

    <div class="info">
      <div
        class="main-info"
        :title="
          post.description.length > 20
            ? post.description.slice(0, 20) + '...'
            : post.description
        "
      >
        <div class="title-and-name">
          <nuxt-link
            :to="`/posts/${post._id}`"
            class="stretched-link"
          >
            {{post.title}}
          </nuxt-link>

          <div class="name">{{post.user_name}}</div>
        </div>

        <div class="price">{{post.price}}$</div>
      </div>

      <div class="description">
        {{ post.description.length > 41
            ? post.description.slice(0, 41) + '...'
            : post.description }}
      </div>

      <div
        class="categories"
        v-if="post.categories.length"
      >
        <div class="title">Categories:</div>
        <nuxt-link
          v-for="{ name, _id } of post.categories"
          class="category"
          :to="`/posts/category/${name.replace(' ', '_')}`"
          :key="_id"
        >
          {{name}}
        </nuxt-link>
      </div>
    </div>
  </div>

  <div class="post" v-else>
    <PostForm :post="post" />
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  name: 'Post',
  data() {
    return {
      img: `http://localhost:9000/${this.post.image}`,
      minPrice: 3,

      showBasket: false
    }
  },
  props: {
    post: Object,
    from: String
  },
  methods: {
    ...mapMutations({
      addCommentToPost: 'posts/addCommentToPost',
      switchEditMode: 'editMode/switchEditMode'
    }),
    ...mapActions({
      addToBasket: 'posts/addToBasket',
      deletePost: 'posts/deletePost',
    }),
  },
  computed: {
    getEditMode() {
      return this.$store.getters['editMode/getEditMode']
    },
    getAuth() {
      return this.$store.getters['auth/auth']
    },
    getUsername() {
      return this.$store.getters['auth/username']
    },
    isMobile() {
      if (process.client) return window.innerWidth <= 320

      return false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/colors';

.post {
  display: flex;
  position: relative;
  flex-direction: column;
  width: 262px;
}

.post-image {
  border-radius: 3px;
  width: 262px;
  height: 166px;
}

.info {
  padding: 12px 16px;
}

.basket {
  position: absolute;
  top: 20px;
  right: 20px;
}

.main-info {
  display: flex;
  justify-content: space-between;
  align-items: center;

  a, .name {
    font-weight: 600;
  }

  a {
    font-family: 'Mulish';
    font-size: 1.25em;
  }

  .name {
    margin-top: 3px;

    font-size: 0.9em;
  }
}

.description {
  margin: 10px 0;

  font-size: 1em;
  word-wrap: break-word;
}

.categories {
  position: relative;
  z-index: 2;

  display: flex;
  flex-wrap: wrap;
  margin-left: -8px;

  .title {
    user-select: none;
  }

  .title, a {
    margin-left: 8px;
  }

  a {
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
