<template>
  <div class="settings" v-if="auth">
    <h1>
      Settings
    </h1>

    <form @submit.prevent="saveInfo">
      <div class="inner-form">
        <input
          type="text"
          id="staticName"
          :minlength="minNameLength"
          :maxlength="maxNameLength"
          :value="newName !== username ? newName : username"
          @input="newName = $event.target.value"
        >

        <input
          type="email"
          id="inputEmail"
          :minlength="minEmailLength"
          :maxlength="maxEmailLength"
          :value="newEmail"
          @input="newEmail = $event.target.value !== newEmail ? $event.target.value : newEmail"
        >

        <div
          class="alert alert-danger"
          role="alert"
          v-if="wrong"
        >
          Invalid credentials!
        </div>

        <div class="links-and-buttons">
          <button
            class="main"
            type="submit"
            @click="saveInfo"
          >
            Save
          </button>
          <button
            class="danger"
            @click="logout"
          >
            Logout
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  async fetch({ store }) {
    if (!store.getters['auth/auth'])
      await store.dispatch('auth/fetch')
  },
  middleware: ['notAuthenticated'],
  data() {
    return {
      newName: this.username,
      newEmail: this.email,
      
      minNameLength: 2,
      maxNameLength: 26,
      minEmailLength: 3,
      maxEmailLength: 320,

      wrong: false
    }
  },
  computed: {
    ...mapGetters('auth', ['auth', 'username', 'email'])
  },
  mounted() {
    this.newName = this.username
    this.newEmail = this.email
  },
  methods: {
    ...mapActions({
      updateInfo: 'auth/updateInfo',
      logout: 'auth/logout'
    }),
    async saveInfo() {
      const info = {
        'name': this.newName || this.name,
        'email': this.newEmail || this.email
      }

      if (this.newName || this.newEmail) {
        this.wrong = await this.updateInfo(info)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// .buttons {
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
// }
</style>
