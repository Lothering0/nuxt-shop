export const state = () => ({
  darkMode: false,
  editMode: false
})

export const mutations = {
  switchEditMode(state) {
    state.editMode = !state.editMode
  },
  switchDarkMode(state) {
    state.darkMode = !state.darkMode
    localStorage.setItem('dark_mode', state.darkMode)
  },
  setTheme(state, value) {
    state.darkMode = value
  }
}

export const getters = {
  getEditMode: state => state.editMode,
  getDarkMode: state => state.darkMode
}
