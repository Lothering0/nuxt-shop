export const state = () => ({
  isAuth: false,
  username: '',
  userId: '',
  email: ''
})

export const mutations = {
  setAuth(state, auth) {
    state.isAuth = auth
  },
  setUser(state, { name, email, _id }) {
    state.username = name
    state.userId = _id
    state.email = email
  }
}

export const actions = {
  async fetch({ commit }) {
    const address = this.state.env.address

    try {
      const response = await this.$axios.$get(`${address}/auth/user`, {
        withCredentials: true
      })

      console.log(response)

      commit('setUser', response)

      response.message !== 'Unauthorized'
        ? commit('setAuth', true)
        : commit('setAuth', false)
    } catch (e) {
      console.log(e.message)
      commit('setAuth', false)
    }
  },
  async logout({ commit }) {
    const address = this.state.env.address

    try {
      await this.$axios.$post(`${address}/auth/logout`, null, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })

      commit('setAuth', false)
      this.$router.push('/login')
    } catch (e) {
      console.log(e.message)
    }
  },
  async updateInfo({ commit }, form) {
    const address = this.state.env.address

    try {
      const updatedInfo = await this.$axios.$patch(`${address}/auth/update`, form, {
        withCredentials: true
      })

      commit('setUser', updatedInfo)
      return false
    } catch (e) {
      console.log(e.message)
      return true
    }
  }
}

export const getters = {
  auth: state => state.isAuth,
  username: state => state.username,
  email: state => state.email,
  userId: state => state.userId,
}
