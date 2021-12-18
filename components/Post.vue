<template>
  <div
    class="post"
    v-if="!getEditMode"
  >
    <div class="inner-post">
      <div class="info">
        <div class="image-and-categories">
          <img
            :src="img"
            :title="post.image"
            class="post-image"
            alt=""
          >

          <template v-if="isMobile">
            <div class="main-info">
              <div class="title-and-name">
                <span class="post-title">{{post.title}}</span>

                <div class="name">{{post.user_name}}</div>
              </div>

              <transition name="fade">
                <div
                  class="edit-buttons"
                  v-show="showEditButtons || isMobile"
                  v-if="auth && username === post.user_name"
                >
                  <button
                    class="icon secondary"
                    type="button"
                    title="Edit post"
                    @click="switchEditMode"
                  >
                    <img src="@/static/svg/pencil.svg" alt="">
                  </button>
                  <button
                    class="icon danger"
                    type="button"
                    title="Delete post"
                    @click="deletePost(post._id)"
                  >
                    <img src="@/static/svg/trash.svg" alt="">
                  </button>
                </div>
              </transition>
            </div>

            <div class="description">
              {{post.description}}
            </div>
          </template>

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

        <div
          class="main-info"
          @mouseenter="showEditButtons = true"
          @mouseleave="showEditButtons = false"
        >
          <div class="title-and-buttons">
            <template v-if="!isMobile">
              <div class="title-and-name">
                <span class="post-title">{{post.title}}</span>

                <div class="name">{{post.user_name}}</div>
              </div>

              <transition name="fade">
                <div
                  class="edit-buttons"
                  v-show="showEditButtons || isMobile"
                  v-if="auth && username === post.user_name"
                >
                  <button
                    class="icon secondary"
                    type="button"
                    title="Edit post"
                    @click="switchEditMode"
                  >
                    <img src="@/static/svg/pencil.svg" alt="">
                  </button>
                  <button
                    class="icon danger"
                    type="button"
                    title="Delete post"
                    @click="deletePost(post._id)"
                  >
                    <img src="@/static/svg/trash.svg" alt="">
                  </button>
                </div>
              </transition>
            </template>
          </div>

          <div class="price-and-button">
            <div class="price">{{post.price}}$</div>

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
              v-if="auth"
            >
              <template v-if="!post.in_basket">
                <img src="@/static/svg/basket-plus.svg">
              </template>
              <template v-else>
                <img src="@/static/svg/basket-minus.svg">
              </template>
            </button>
          </div>

          <div class="description" v-if="!isMobile">
            {{post.description}}
          </div>
          <div
            class="characters"
            v-if="post.characters.length"
          >
            <span
              v-for="{character_type, character_value, _id} of post.characters"
              class="character"
              :key="_id"
            >
              <div
                class="character-type"
                v-scroll-reveal="scrollRevealOptionsTypes"
              >
                {{character_type}}
              </div>
              <div class="space-between"></div>
              <div
                class="character-value"
                v-scroll-reveal="scrollRevealOptionsValues"
              >
                {{character_value}}
              </div>
            </span>
          </div>
        </div>
      </div>

      <div class="comments-block">
        <h2>Comments ({{comments.length}})</h2>
        <template v-if="auth">
          <CommentForm :postId="post._id" />
        </template>
        <h3 v-else><nuxt-link to="/login">Login</nuxt-link> to send comment</h3>

        <CommentsList :postId="post._id" />
      </div>
    </div>
  </div>

  <div class="post" v-else>
    <PostForm :post="post" />
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  name: 'Post',
  data({ $config: { address } }) {
    return {
      img: (address.replace('/api', '') || 'http://localhost:9000/') + this.post.image,
      minPrice: 3,

      showEditButtons: false,

      scrollRevealOptionsTypes: {
        origin: 'left',
        distance: '10px',
        scale: 1,
        duration: 1000,
        reset: false,
      },
      scrollRevealOptionsValues: {
        origin: 'right',
        distance: '10px',
        scale: 1,
        duration: 1000,
        reset: false
      }
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
    ...mapGetters('auth', ['auth', 'username']),
    ...mapGetters('editMode', ['getEditMode']),
    ...mapGetters('comments', ['comments']),
    isMobile() {
      if (process.client) return window.innerWidth <= 320

      return true
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
}

.info {
  display: flex;
}

.basket {
  position: static;
}

.post-title {
  font-family: 'Mulish';
  font-size: 1.5em;
  font-weight: 600;
}

.title-and-buttons {
  display: flex;
}

.image-and-categories {
  display: flex;
  flex-direction: column;

  width: 467px;

  margin: 0 auto;
}

.post-image {
  max-width: 467px;
  height: 296px;
  border-radius: 3px;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 30px;
  margin-left: -39px;

  .title {
    font-family: 'Mulish';
    font-size: 0.9em;
    font-weight: 600;
  }

  .title, .category {
    margin-left: 39px;
    margin-bottom: 5px;
  }
}

.main-info {
  position: relative;

  width: 481px;
  margin: 0 auto;
}

.description {
  font-size: 1.3em;
  word-wrap: break-word;
}

.price-and-button {
  display: flex;
  align-items: center;
  justify-content: space-around;

  margin: 40px 0;
}

.price {
  font-size: 1.5em;
  font-weight: 600;
}

.icon {
  width: 60px;
  height: 60px;

  img {
    width: 38px;
    height: 32px;
  }
}

.edit-buttons {
  display: flex;
  position: absolute;
  top: -20px;
  right: 42px;

  button:nth-child(1) {
    margin-right: 26px;
  }

  button {
    width: 60px;
    height: 60px;

    img {
      width: 32px;
      height: 32px;
    }
  }
}

.comments-block {
  display: flex;
  flex-direction: column;
  margin-top: 45px;

  h2 {
    margin: 0 auto;
  }
}

@media screen and (max-width: 1000px) {
  .info {
    flex-direction: column;
  }
}

@media screen and (max-width: 500px) {
  .image-and-categories {
    display: flex;
    flex-direction: column;
    max-width: 100%;

    padding: 0;
  }

  .post-image {
    width: 262px;
    height: 166px;

    margin: 0 auto;
  }

  .info {
    flex-wrap: wrap;
  }

  .description, .price {
    font-size: 13px;
  }

  .price-and-button {
    margin: 18px 0;
  }

  .basket {
    width: 38.5px;
    height: 38.5px;

    img {
      width: 24px;
      height: 20px;
    }
  }

  .main-info {
    width: 100%;

    margin: 8px 0;

    .title-and-name {
      margin-left: 8px;
    }
  }

  .categories {
    margin-top: 18px;
  }

  .edit-buttons {
    top: 0;
    right: 8px;

    button:nth-child(1) {
      margin-right: 15px;
    }

    button {
      width: 37px;
      height: 37px;

      img {
        width: 20px;
        height: 20px;
      }
    }
  }

  .characters {
    padding: 0 19px;

    .character {
      margin-bottom: 15px;
    }
  }

  .comments-block {
    margin-top: 30px;

    h2 {
      margin-bottom: 11px;
    }
  }
}
</style>
