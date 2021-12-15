<template>
  <form
    @submit.prevent="onSubmit(post._id)"
    v-if="isAuth"
  >
    <h1 v-if="getEditMode">Edit post</h1>
    <div class="inner-form">
      <input
        type="text"
        id="title-input"
        placeholder="Enter title"
        name="title"
        v-if="!getEditMode"
        v-model="title"
        :minlength="minTitleLength"
        :maxlength="maxTitleLength"
        required
      >
      <input
        type="text"
        id="title-input"
        placeholder="New title"
        name="title"
        :value="title"
        @input="title = $event.target.value !== post.title ? $event.target.value : post.title"
        :minlength="minTitleLength"
        :maxlength="maxTitleLength"
        required

        v-else
      >

      <input
        type="text"
        id="description-input"
        placeholder="Enter description"
        name="description"
        v-model="description"
        :minlength="minDescriptionLength"
        :maxlength="maxDescriptionLength"
        required

        v-if="!getEditMode"
      >
      <input
        type="text"
        id="description-input"
        placeholder="Enter new description"
        :value="description"
        @input="description = $event.target.value !== post.description ? $event.target.value : post.description"
        name="description"
        :minlength="minDescriptionLength"
        :maxlength="maxDescriptionLength"
        required

        v-else
      >

      <div class="price-and-image-group">
        <div class="price-input">
          <label for="price-input">Enter price (min 3$)</label>
          <input
            type="number"
            :min="minPrice"
            :max="maxPrice"
            :value="price || minPrice"
            step="0.01"
            id="price-input"
            placeholder="Enter price"
            name="price"
            @input="price = $event.target.value"
            required

            v-if="!getEditMode"
          >
          <input
            type="number"
            :min="minPrice"
            :max="maxPrice"
            :value="price || post.price"
            step="0.01"
            id="price-input"
            placeholder="Enter price"
            name="price"
            @input="price = $event.target.value"
            required

            v-else
          >
        </div>

        <label for="image-input">
          Select image
          <div class="cross">
            <div class="vertical"></div>
            <div class="horizontal"></div>
          </div>
        </label>
        <input
          type="file"
          ref="inputFile"
          id="image-input"
          aria-describedby="image-input"
          aria-label="Upload"
          alt="Post image"
          multiple="false"
          accept=".jpeg,.jpg,.png"
          @change="selectFile"
          required

          v-if="!getEditMode"
        >
        <input
          type="file"
          ref="inputFile"
          id="image-input"
          aria-describedby="image-input"
          aria-label="Upload"
          alt="Post image"
          multiple="false"
          accept=".jpeg,.jpg,.png"
          @change="selectFile"

          v-else
        >
      </div>

      <div class="category-group">
        <input
          class="category-input"
          type="text"
          placeholder="Enter category"
          name="categories"
          v-model="dynamicCategory"
          @keydown="clearAlert('categories')"
          v-if="!getEditMode"
        >
        <input
          class="category-input"
          type="text"
          placeholder="Enter category"
          name="categories"
          v-model="dynamicCategory"
          @keydown="clearAlert('categories')"
          :maxlength="maxCategoryLength"
          v-else
        >

        <button
          class="secondary add-category-btn"
          type="button"
          @click="addCategory"
          v-if="!getEditMode"
        >
          Add category
        </button>
        <button
          class="secondary add-category-btn"
          type="button"
          @click="addCategory(post._id)"
          v-else
        >
          Add category
        </button>
        <div class="categories">
          <template v-if="!getEditMode">
            <div
              class="category"
              v-for="category of categories"
              :key="category.id"
            >
              {{category.name}}
              <button
                class="remove"
                title="Remove"
                type="button"
                aria-label="close"
                @click="removeCategory(category, getEditMode)"
              >
                <img src="@/static/svg/cross.svg"> 
              </button>
            </div>
          </template>
          <template v-else>
            <div
              class="category"
              v-for="category of categories"
              :key="category.id"
            >
              {{category.name}}
              <button
                class="remove"
                title="Remove"
                type="button"
                aria-label="close"
                @click="removeCategory(category, getEditMode)"
              >
                <img src="@/static/svg/cross.svg"> 
              </button>
            </div>
          </template>
        </div>
      </div>
      <div
        role="alert"
        v-if="categoriesAlert"
      >
        Category {{dynamicCategory}} is already exists!
      </div>

      <div class="character-group">
        <div class="character-inputs">
          <input
            class="character-input"
            type="text"
            placeholder="Enter type"
            name="character-type"
            v-model="dynamicCharacterType"
            :maxlength="maxCharacterTypeLength"
            @keydown="clearAlert('characters')"
          >
          <input
            class="character-input"
            type="text"
            placeholder="Enter value"
            name="character-input"
            v-model="dynamicCharacterValue"
            :maxlength="maxCharacterValueLength"
          >
        </div>

        <button
          class="secondary add-character-btn"
          type="button"
          @click="addCharacter"
          v-if="!getEditMode"
        >
          Add character
        </button>
        <button
          class="secondary add-character-btn"
          type="button"
          @click="addCharacter(post._id)"
          v-else
        >
          Add character
        </button>

        <div class="characters">
          <template v-if="!getEditMode">
            <div
              class="character"
              v-for="character of characters"
              :key="character._id"
            >
              <div class="character-type">{{character.character_type}}</div>
              <div class="space-between"></div>
              <div class="character-value">{{character.character_value}}</div>
              <button
                class="remove"
                type="button"
                @click="removeCharacter(character, getEditMode)"
              >
                <img src="@/static/svg/cross.svg"> 
              </button>
            </div>
          </template>
          <template v-else>
            <div
              class="character"
              v-for="character of characters"
              :key="character._id"
            >
              <div class="character-type">{{character.character_type}}</div>
              <div class="space-between"></div>
              <div class="character-value">{{character.character_value}}</div>
              <button
                class="remove"
                type="button"
                @click="removeCharacter(character, getEditMode)"
              >
                <img src="@/static/svg/cross.svg"> 
              </button>
            </div>
          </template>
        </div>
      </div>

      <div
        role="alert"
        v-if="charactersAlert"
      >
        Character {{dynamicCharacterType}} is already exists!
      </div>
      <div class="buttons">
        <button
          class="main"
          type="submit"
          v-if="!getEditMode"
        >
          Add post
        </button>
        <button
          class="main"
          type="submit"
          v-else
        >
          Save changes
        </button>
        <button
          class="secondary"
          type="button"
          v-if="getEditMode"
          @click="switchEditMode"
        >
          Cancel
        </button>
        <button
          class="secondary"
          type="button"
          v-else
          @click="$router.push('/')"
        >
          Cancel
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import { useCategories } from '@/components/use/categories.js'
import { useCharacters } from '@/components/use/characters.js'

export default {
  name: 'PostForm',
  data() {
    return {
      title: this.post.title,
      price: this.post.price,
      description: this.post.description,
      image: '',

      minTitleLength: 2,
      maxTitleLength: 35,

      minPrice: 3,
      maxPrice: 30000000,

      minDescriptionLength: 4,
      maxDescriptionLength: 300,

      maxCharacterTypeLength: 15,
      maxCharacterValueLength: 15,
      maxCategoryLength: 15
    }
  },
  props: {
    post: Object
  },
  computed: {
    ...mapGetters('editMode', ['getEditMode']),
    isAuth() {
      return this.$store.getters['auth/auth']
    },
    getUsername() {
      return this.$store.getters['auth/username']
    }
  },
  setup() {
    const {
      categories,
      newCategories,
      categoriesToDelete,
      dynamicCategory,
      categoriesAlert,
      addCategory,
      removeCategory
    } = useCategories()
    const {
      characters,
      newCharacters,
      charactersToDelete,
      dynamicCharacterType,
      dynamicCharacterValue,
      charactersAlert,
      addCharacter,
      removeCharacter
    } = useCharacters()

    return {
      // Categories
      categories,
      newCategories,
      categoriesToDelete,
      dynamicCategory,
      categoriesAlert,
      addCategory,
      removeCategory,

      // Characters
      characters,
      newCharacters,
      charactersToDelete,
      dynamicCharacterType,
      dynamicCharacterValue,
      charactersAlert,
      addCharacter,
      removeCharacter
    }
  },
  mounted() {
    if (this.post.categories && this.post.characters) {
      this.categories.unshift(...this.post.categories)
      this.characters.unshift(...this.post.characters)
    }
  },
  methods: {
    ...mapMutations({
      switchEditMode: 'editMode/switchEditMode',
    }),
    ...mapActions({
      addPost: 'posts/addPost',
      updatePost: 'posts/updatePost',
    }),
    onSwitch() {
      this.switchEditMode()
    },
    clearAlert(arg) {
      if (arg === 'categories') this.categoriesAlert = false
      if (arg === 'characters') this.charactersAlert = false
    },
    selectFile() {
      this.image = this.$refs.inputFile.files[0]
      console.log('Image: ', this.image)
    },
    onSubmit(id) {
      const newForm = new FormData()
      newForm.append("title", this.title)
      newForm.append("price", this.price || this.minPrice)
      newForm.append("description", this.description)
      newForm.append("image", this.image)
      newForm.append("newCharacters", JSON.stringify(this.characters))
      newForm.append("newCategories", JSON.stringify(this.categories))
      newForm.append("categoriesToDelete", JSON.stringify([]))

      const updatedForm = new FormData()
      updatedForm.append("title", this.title || this.post.title)
      updatedForm.append("price", this.price || this.post.price)
      updatedForm.append("description", this.description || this.post.description)
      updatedForm.append("image", this.image || this.post.image)
      // Get this.categories and this.characters from ./use/categories|characters.js
      updatedForm.append("newCharacters", JSON.stringify(this.newCharacters))
      updatedForm.append("charactersToDelete", JSON.stringify(this.charactersToDelete))
      updatedForm.append("newCategories", JSON.stringify(this.newCategories))
      updatedForm.append("categoriesToDelete", JSON.stringify(this.categoriesToDelete))

      const validateForm = form => {
        if (form.price < this.minPrice) form.price = this.minPrice

        return form
      }

      if (!this.getEditMode) {
        console.log('Add post')
        this.addPost(newForm)
        this.$router.push('/')
      } else {
        console.log('Update post')
        this.updatePost([id, validateForm(updatedForm)])
      }

      this.title = ''
      this.price = this.minPrice
      this.description = ''
      this.$refs.inputFile.value = null
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/colors';

.price-and-image-group {
  display: flex;
  justify-content: space-around;

  input[type="number"] {
    max-width: 108px;
    min-width: 108px;

    margin-top: 8px;
  }

  .price-input {
    display: flex;
    flex-direction: column;
  }

  input[type="file"] {
    display: none;
  }

  label[for="image-input"] {
    cursor: pointer;
    display: flex;
    flex-direction: column;

    .cross {
      position: relative;
      width: 32px;
      height: 32px;
      display: flex;

      margin: 0 auto;
      margin-top: 8px;

      .vertical, .horizontal {
        position: absolute;
        background: $secondary-2;
      }

      .vertical {
        width: 6px;
        height: 100%;
        margin-left: 50%;
        transform: translate(-50%);
      }

      .horizontal {
        width: 100%;
        height: 6px;
        margin-top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}

.remove {
  width: 24px;
  height: 24px;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  padding: 0;

  background: transparent;

  img {
    width: 14px;
    height: 14px;
  }
}

.category-input {
  min-width: 325px;
  max-width: 325px;

  margin-right: 3px;
}

.categories {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 484px;

  margin-bottom: 29px;

  .category {
    display: flex;
    align-items: center;
    margin-right: 37px;
  }
}

.character {
  .character-type, .character-value {
    display: flex;
    align-items: end;
  }
}

.character-group {
  display: flex;
  flex-direction: column;
}

.character-input {
  min-width: 202px;
  max-width: 202px;
  margin-bottom: 21px;
}

.character-input:nth-child(1) {
  margin-right: 25px;
}

.add-character-btn {
  margin-left: auto;
}

.buttons {
  display: flex;

  button:nth-child(1) {
    margin-right: 16px;
  }
}

@media screen and (max-width: 320px) {
  .inner-form {
    width: 271px;

    margin-top: 30px;
  }

  input {
    max-width: 100%;
  }

  .category-group {
    display: flex;
    flex-direction: column;
  }

  .categories {
    width: 100%;

    margin: 17px 0;
  }

  .category-input {
    max-width: 100%;
    min-width: unset;
  }

  .add-category-btn {
    margin-left: auto;
  }

  .characters {
    margin-top: 13px;
    margin-bottom: 18px;
  }

  .character {
    margin-bottom: 4px;
  }

  .character-input {
    max-width: 100px;
    min-width: unset;
  }

  .character-input:nth-child(1) {
    margin-right: 17px;
  }
}
</style>
