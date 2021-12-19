<template>
  <div
    class="body"
    :class="{'dark': getDarkMode}"
  >
    <Header :userInfo="userInfo" />

    <div class="container">
      <nuxt />

      <div class="space"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Header from '../components/Header.vue'

export default {
  components: {
    Header
  },
  data() {
    return {
      userInfo: {}
    }
  },
  methods: {
    ...mapActions({
      authFetch: 'auth/fetch'
    })
  },
  computed: {
    ...mapGetters('editMode', ['getDarkMode'])
  },
  mounted() {
    // On local you can use dispatch in fetch hook instead of this
    this.authFetch()
  }
}
</script>

<style lang="scss">
@import '@/assets/colors';

@font-face {
  font-family: 'Molengo';
  src: url('@/static/fonts/Molengo-Regular.ttf');
}

@font-face {
  font-family: 'Mulish';
  src: url('@/static/fonts/Mulish-VariableFont_wght.ttf');
}

* {
  -webkit-tap-highlight-color: transparent;
  outline: none;
}

html {
  line-height: inherit;
}

body {
  margin: 0;
  padding: 0;

  font-family: 'Molengo';
  font-size: 1em;
}

.body {
  min-height: 100vh;

  padding-top: 126px;

  transition: .7s;
}

.container {
  max-width: 1209px;

  margin: 0 auto;

  .space {
    height: 200px;
  }
}

h1 {
  margin: 0;
  margin-left: 61px;

  font-size: 2em;
  font-family: 'Mulish';
  font-weight: 700;
  text-transform: uppercase;
}

a {
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.stretched-link::after {
  position: absolute;
  content: "";

  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  z-index: 1;
  pointer-events: auto;
}

form, .inner-form {
  display: flex;
  flex-direction: column;
}

.inner-form {
  margin: auto;
  margin-top: 70px;

  .links-and-buttons {
    display: flex;
    justify-content: space-between;

    padding: 0 33px;

    .links {
      display: flex;
      flex-direction: column;

      font-size: 1.1em;

      a {
        margin-bottom: 12px;
      }
    }
  }
}

.characters {
  margin-top: 29px;
  margin-bottom: 24px;

  .character {
    display: flex;
    margin-bottom: 20px;

    .space-between {
      width: 100%;
    }
  }
}

.category,
.character-type,
.character-value {
  font-family: 'Mulish';
  font-size: 0.9em;
  font-weight: 600;
  text-transform: capitalize;
  white-space: nowrap;
}

input {
  min-width: 438px;
  max-width: 459px;

  margin-bottom: 29px;

  padding-left: 23px;
  padding-bottom: 3px;

  border: 0;
  background-color: transparent;

  font-family: 'Molengo';
  font-size: 1.5em;

  outline: none;
}

button {
  padding: 12px 13px;

  border: 0;
  border-radius: 6px;

  background: transparent;

  font-family: 'Mulish';
  font-size: 1em;

  transition: 0.3s;
  cursor: pointer;
}

.price {
  font-family: 'Mulish';
  font-size: 1.1em;
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 40px;

  padding: 0;

  border-radius: 50%;

  z-index: 2;

  img {
    width: 26px;
    height: 22px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-active {
  animation: fade 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media screen and (max-width: 500px) {
  body {
    font-size: 13px;
  }

  .body {
    padding-top: 90px;
  }

  .container {
    width: calc(100% - 20px);

    margin: 0 auto;

    .space {
      height: 100px;
    }
  }

  .inner-form {
    .links-and-buttons {
      display: flex;
      justify-content: space-between;

      padding: 0 11px;
    }
  }

  input {
    max-width: 164px;
    min-width: 164px;

    font-size: 13px;

    margin-bottom: 17px;
  }

  button {
    padding: 10px 11px;

    font-size: 8px;
  }
}
</style>
