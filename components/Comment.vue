<template>
  <li
    @mouseenter="showEditButtons = true"
    @mouseleave="showEditButtons = false"
  >
    <transition name="fade">
      <div
        class="edit-buttons"
        v-show="showEditButtons || isMobile"
        v-if="auth && !editMode && comment.user_name === username"
      >
        <button
          class="icon secondary"
          type="button"
          title="Edit comment"
          @click="editMode = !editMode"
        >
          <img src="@/static/svg/pencil.svg" alt="">
        </button>
        <button
          class="icon danger"
          type="button"
          title="Delete comment"
          @click="deleteComment(comment._id)"
        >
          <img src="@/static/svg/trash.svg" alt="">
        </button>
      </div>
    </transition>

    <div class="name-and-marks">
      <span class="name">{{comment.user_name}}</span> <span class="date secondary-text">{{date}}</span>
      <template
        v-if="comment.createdAt !== comment.updatedAt"
      >
        <img
          class="edited"
          :title="updatedDate"
          src="@/static/svg/edited.svg"
          alt=""
        >
      </template>
      <div class="likes-and-dislikes" v-if="!isMobile">
        <button
          type="button"
          title="Like"
          :disabled="!auth"
          @click="setLike(comment._id)"
        >
          <span
            class="likes"
            :class="{
              'standard-text': !getDarkMode && comment.has_like && auth,
              'primary-text': getDarkMode && comment.has_like && auth,
              'secondary-text': !comment.has_like || !auth
            }"
          >{{comment.likes}}</span> <img
            :src="require(`@/static/svg/thumbsup${
              comment.has_like && auth
                ? (getDarkMode ? '-light' : '-dark')
                : ''
            }.svg`)"
            alt=""
          >
        </button>
        <button
          type="button"
          title="Dislike"
          :disabled="!auth"
          @click="setDislike(comment._id)"
        >
          <img
            :src="require(`@/static/svg/thumbsdown${
              comment.has_dislike && auth
                ? (getDarkMode ? '-light' : '-dark')
                : ''
            }.svg`)"
            alt=""
          > <span
              class="dislikes"
              :class="{
                'standard-text': !getDarkMode && comment.has_dislike && auth,
                'primary-text': getDarkMode && comment.has_dislike && auth,
                'secondary-text': !comment.has_dislike || !auth
              }"
            >{{comment.dislikes}}</span>
        </button>
      </div>
    </div>

    <div
      class="message"
      v-if="!editMode"
    >
      {{comment.message}}
    </div>

    <div class="likes-and-dislikes" v-if="isMobile">
      <button
        type="button"
        title="Like"
        :disabled="!auth"
        @click="setLike(comment._id)"
      >
        <span
          class="likes"
          :class="{
            'standard-text': !getDarkMode && comment.has_like && auth,
            'primary-text': getDarkMode && comment.has_like && auth,
            'secondary-text': !comment.has_like || !auth
          }"
        >{{comment.likes}}</span> <img
          :src="require(`@/static/svg/thumbsup${
            comment.has_like && auth
              ? (getDarkMode ? '-light' : '-dark')
              : ''
          }.svg`)"
          alt=""
        >
      </button>
      <button
        type="button"
        title="Dislike"
        :disabled="!auth"
        @click="setDislike(comment._id)"
      >
        <img
          :src="require(`@/static/svg/thumbsdown${
            comment.has_dislike && auth
              ? (getDarkMode ? '-light' : '-dark')
              : ''
          }.svg`)"
          alt=""
        > <span
            class="dislikes"
            :class="{
              'standard-text': !getDarkMode && comment.has_dislike && auth,
              'primary-text': getDarkMode && comment.has_dislike && auth,
              'secondary-text': !comment.has_dislike || !auth
            }"
          >{{comment.dislikes}}</span>
      </button>
    </div>

    <template v-if="editMode">
      <input
        type="text"
        :value="newMessage || comment.message"
        @input="newMessage = $event.target.value"
      >
      <br>
      <div class="mt-1">
        <button
          class="main"
          @click="save(comment._id)"
          v-if="auth && editMode"
        >
          Save
        </button>
        <button
          class="secondary"
          @click="cancel"
          v-if="auth && editMode"
        >
          Cancel
        </button>
      </div>
    </template>
  </li>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Comment',
  props: {
    comment: Object
  },
  data() {
    return {
      editMode: false,
      showEditButtons: false,
      newMessage: ''
    }
  },
  computed: {
    ...mapGetters('auth', ['auth', 'username']),
    ...mapGetters('editMode', ['getDarkMode']),
    date() {
      return this.normalizeDate(this.comment.createdAt)
    },
    updatedDate() {
      return 'Comment was updated at ' + this.normalizeDate(this.comment.updatedAt)
    },
    isMobile() {
      if (process.client) return window.innerWidth <= 320

      return true
    }
  },
  methods: {
    ...mapActions({
      updateComment: 'comments/updateComment',
      setLike: 'comments/setLike',
      setDislike: 'comments/setDislike',
      deleteComment: 'comments/deleteComment'
    }),
    normalizeDate(date) {
      const dateInstance = new Date(date)

      return `${dateInstance.getDate()}.${dateInstance.getMonth()}.${dateInstance.getFullYear()} - ${dateInstance.getHours()}:${dateInstance.getMinutes()}`
    },
    save(id) {
      const data = {
        message: this.newMessage
      }

      this.editMode = false
      if (this.newMessage) {
        this.updateComment([id, data])
      }
    },
    cancel() {
      this.editMode = false
      this.newMessage = ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/colors.scss';

li {
  position: relative;
  list-style: none;
  margin-bottom: 49px;
}

.edited {
  cursor: pointer;
}

.message {
  padding-right: 25px;
}

.edit-buttons {
  position: absolute;
  left: -40px;

  .secondary {
    margin-bottom: 10px;
  }

  button {
    width: 26px;
    height: 26px;

    img {
      width: 15px;
    }
  }
}

.name-and-marks {
  display: flex;
  align-items: center;

  .name {
    font-family: 'Mulish';
    font-weight: 600;
  }

  .date {
    margin: 0 21px 0 16px;
  }

  .edited {
    width: 15px;
  }
}

.likes-and-dislikes {
  display: flex;
  margin-left: auto;
  margin-right: 25px;

  button:nth-child(1) {
    margin-right: 12px;
  }

  button {
    display: flex;
    align-items: center;
    padding: 0;
  }

  .likes {
    margin-right: 11px;
  }

  .dislikes {
    margin-left: 11px;
  }
}

input, .message {
  margin-top: 11px;
}

.name,
.date,
.likes-and-dislikes button,
.message {
  font-size: 1.5em;

  word-wrap: break-word;
}

@media screen and (max-width: 320px) {
  li {
    margin-bottom: 20px;
  }

  .name,
  .date,
  .likes-and-dislikes button,
  .message {
    font-size: 13px;
  }

  .edit-buttons {
    display: flex;

    left: unset;
    right: 0;

    button.icon {
      margin-bottom: 0;
    }

    .danger {
      margin-left: 10px;
    }
  }

  .message {
    margin-top: 6px;
    margin-bottom: 7px;

    padding-right: 0;
  }

  .likes-and-dislikes {
    justify-content: end;
    margin-right: 0;

    button img {
      width: 14px;
    }
  }
}
</style>
