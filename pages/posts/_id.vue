<template>
  <div>
    <template v-if="!getEditMode">
      <Post
        v-if="postById"
        :post="postById"
      />

      <h1 class="text-danger" v-else>
        Post not exist!
      </h1>
    </template>

    <template v-else>
      <PostForm :post="postById" />
    </template>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import CommentForm from '@/components/CommentForm'
import CommentsList from '@/components/CommentsList'
import Post from '@/components/Post'
import PostForm from '@/components/PostForm'

export default {
  async fetch({ store, params }) {
    if (!store.getters['auth/auth']) {
      await store.dispatch('auth/fetch')
    }
    await store.dispatch('comments/fetch', params.id)
    await store.dispatch('posts/fetchById', params.id)
  },
  components: {
    CommentForm,
    CommentsList,
    Post,
    PostForm,
  },
  methods: {
    ...mapMutations({
      switchEditMode: 'editMode/switchEditMode'
    })
  },
  computed: {
    ...mapGetters({
      postById: ['posts/postById'],
      getEditMode: ['editMode/getEditMode']
    })
  }
}
</script>

<style scoped>
button {
  margin-bottom: 13px;
}

.category {
  margin-right: 5px;
  text-transform: capitalize;
}

.category:first-child {
  margin-left: 10px;
}

input {
  width: 500px;
  margin-bottom: 15px;
}

#categories-input {
  width: 200px;
}

.characters-input {
  width: 200px;
}

#categories-input, .add-category, .characters-input {
  display: inline-block;
}

.categories, .characters {
  display: flex;
}

.category, .character {
  display: flex;
  align-items: center;
  column-gap: 5px;
  font-size: 0.8em;
}

.category, .character {
  margin-right: 4px;
  text-transform: capitalize;
}

.character {
  text-transform: none;
}

.categories, .characters {
  margin-top: 15px;
  margin-bottom: 10px;
}

button[type="submit"] {
  margin-bottom: 20px;
}
</style>
