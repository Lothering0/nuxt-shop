<template>
  <form @submit.prevent="onSubmit()">
    <div class="inner-form">
      <input
        type="text"
        class="form-control"
        id="name"
        placeholder="Enter your name"
        v-model="name"
        v-if="authType === 'registration'"
        :minlength="minNameLength"
        :maxlength="maxNameLength"
        required
      >
      <input
        type="text"
        class="form-control"
        id="email"
        placeholder="Enter your email"
        v-model="email"
        :minlength="minEmailLength"
        :maxlength="maxEmailLength"
        required
      >
      <input
        type="password"
        class="form-control"
        id="password"
        placeholder="Enter your password"
        v-model="password"
        :minlength="minPasswordLength"
        :maxlength="maxPasswordLength"
        required
      >

      <div class="links-and-buttons">
        <div class="links">
          <nuxt-link
            to="/register"
            v-if="authType === 'login'"
          >
            To registration page
          </nuxt-link>
          <nuxt-link
            to="/login"
            v-else
          >
            To login page
          </nuxt-link>

          <nuxt-link to="/">To home page</nuxt-link>
        </div>
        <div>
          <button
            class="main"
            type="submit"
          >
            <template v-if="authType === 'login'">Login</template>
            <template v-else>Registration</template>
          </button>
        </div>
      </div>
    </div>
    <div
      class="danger-text"
      role="alert"
      v-if="wrongLogin"
    >
      Wrong email or password!
    </div>
    <div
      class="danger-text"
      role="alert"
      v-if="wrongRegister"
    >
      Invalid credentials!
    </div>

  </form>
</template>

<script>
export default {
  name: 'AuthForm',
  props: {
    authType: String
  },
  data({ $config: { address } }) {
    return {
      valid: false,
      showPassword: false,
      name: '',
      email: '',
      password: '',

      minNameLength: 2,
      maxNameLength: 26,
      minEmailLength: 3,
      maxEmailLength: 320,
      minPasswordLength: 6,
      maxPasswordLength: 15,

      wrongLogin: false,
      wrongRegister: false,

      address
    }
  },
  methods: {
    async login() {
      try {
        await this.$axios.$post(`${this.address}/auth/login`, {
          email: this.email,
          password: this.password,
        }, {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        })

        await this.$router.push('/')
      } catch (e) {
        this.wrongLogin = true
      }
    },
    async registration() {
      try {
        await this.$axios.$post(`${this.address}/auth/register`, {
          name: this.name,
          email: this.email,
          password: this.password,
        }, {
          headers: { 'Content-Type': 'application/json' },
        })

        await this.$router.push('/login')
      } catch (e) {
        this.wrongRegister = true
      }
    },
    async onSubmit() {
      this.authType === 'login'
        ? await this.login()
        : await this.registration()
    }
  }
}
</script>

<style lang="scss" scoped>
.danger-text {
  margin-top: 25px;

  font-size: 1.2em;
  text-align: center;
}
</style>
