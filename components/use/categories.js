import { reactive } from '@nuxtjs/composition-api'
import { convertToValidString } from './helper_functions'

export function useCategories() {
  const categoriesForm = reactive({
    categories: [],
    newCategories: [],
    categoriesToDelete: [],
    dynamicCategory: '',
    categoriesAlert: false,

    addCategory(post_id) {
      const category = convertToValidString(this.dynamicCategory)

      if (!category) return null

      if (!this.categories.filter(el => el.name == category).length) {
        if (typeof post_id === 'string') {
          const ctg = {
            post_id,
            name: category
          }

          this.categories.push(ctg)
          this.newCategories.push(ctg)
          this.dynamicCategory = ''
        } else {
          const ctg = {
            name: category
          }

          this.categories.push(ctg)
          this.dynamicCategory = ''
        }
      } else {
        this.categoriesAlert = true
      }
    },
    removeCategory(ctg, editMode) {
      if (!editMode) {
        this.categories = this.categories.filter(el => el != ctg)
      } else {
        this.categories = this.categories.filter(el => el != ctg)
        this.categoriesToDelete.push(ctg)
        this.newCategories = this.newCategories.filter(el => el.name == ctg)
      }
    }
  })

  return categoriesForm
}