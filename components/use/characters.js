import { reactive } from '@nuxtjs/composition-api'
import { convertToValidString } from './helper_functions'

export function useCharacters() {
  const charactersForm = reactive({
    characters: [],
    newCharacters: [],
    charactersToDelete: [],
    dynamicCharacterType: '',
    dynamicCharacterValue: '',
    charactersAlert: false,

    addCharacter(post_id) {
      const characterType = convertToValidString(this.dynamicCharacterType)
      const characterValue = convertToValidString(this.dynamicCharacterValue)

      if (!characterType || !characterValue) return null

      if (!this.characters.filter(el => el.character_type == characterType).length) {
        if (typeof post_id === 'string') {
          const chr = {
            post_id,
            character_type: characterType,
            character_value: characterValue
          }

          this.characters.push(chr)
          this.newCharacters.push(chr)
          this.dynamicCharacterType = ''
          this.dynamicCharacterValue = ''
        } else {
          const chr = {
            character_type: characterType,
            character_value: characterValue
          }

          this.characters.push(chr)
          this.dynamicCharacterType = ''
          this.dynamicCharacterValue = ''
        }
      } else {
        this.charactersAlert = true
      }
    },
    removeCharacter(chr, editMode) {
      if (!editMode) {
        this.characters = this.characters.filter(({ character_type }) => character_type != chr.character_type)
      } else {
        this.characters = this.characters.filter(({ character_type }) => character_type != chr.character_type)
        this.charactersToDelete.push(chr)
        this.newCharacters = this.newCharacters.filter(({ character_type }) => character_type == chr.character_type)
      }
    }
  })

  return charactersForm
}
