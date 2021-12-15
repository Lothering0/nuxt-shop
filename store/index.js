export const state = () => ({
  env: {}
})

export const mutations = {
  setEnv(state, env) {
    state.env = env
  }
}

export const actions = {
  nuxtServerInit({ commit }, { $config }) {
    if (process.server) commit('setEnv', $config)
  }
}
