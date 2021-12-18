<template>
  <div class="comments-list">
    <ul>
      <template v-for="comment of comments">
        <Comment :comment="comment" :key="comment._id" />
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CommentsList',
  props: {
    postId: String
  },
  computed: {
    comments() {
      return this.$store.getters['comments/comments']
    }
  }
}
</script>

<style lang="scss" scoped>
.comments-list {
  width: 100%;

  margin: 0 auto;
  padding: 0;
}

@media screen and (max-width: 500px) {
  .comments-list {
    min-width: 300px;
  }

  ul {
    margin: 0;
    margin-top: 14px;

    padding: 0 19px;
  }
}
</style>
