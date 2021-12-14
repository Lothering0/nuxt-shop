<template>
  <form @submit.prevent="onSubmit()">
    <div class="form-group">
      <input
        type="text"
        id="message-input"
        placeholder="Enter message"
        name="message"
        v-model="message"
        required
      >

      <button type="submit" class="main">
        Send comment
      </button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CommentForm',
  data() {
    return {
      message: ''
    }
  },
  props: {
    postId: String
  },
  computed: {
    getUserId() {
      return this.$store.getters['auth/userId']
    }
  },
  methods: {
    ...mapActions({
      addComment: 'comments/addComment'
    }),
    onSubmit() {
      const form = { "message": this.message }

      this.addComment([this.postId, form])
      this.message = ''
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  margin: 0;
}

.form-group {
  margin: 0 auto;

  button {
    margin-left: 36px;
  }
}

@media screen and (max-width: 320px) {
  .form-group {
    display: flex;

    input {
      margin-bottom: 0;
    }

    button {
      margin-left: 10px;
    }
  }
}
</style>
