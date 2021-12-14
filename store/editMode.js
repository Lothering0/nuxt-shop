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
  }
}

export const getters = {
  getEditMode: state => state.editMode,
  getDarkMode: state => state.darkMode
}
