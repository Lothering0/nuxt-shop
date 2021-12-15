<template>
  <header :class="{'dark': getDarkMode}">
    <div class="inner-header">
      <nuxt-link
        exact
        no-prefetch
        aria-current="page"
        to="/"
      >
        <img
          class="home"
          :src="require(`@/static/svg/home${!getDarkMode ? '' : '-light'}.svg`)"
          title="Home"
        >
      </nuxt-link>
      <div class="icon-and-burger" v-if="auth">
        <div class="header-icon">
          <nuxt-link
            no-prefetch
            title="Basket"
            to="/basket"
          >
            <img
              :src="require(`@/static/svg/basket${!getDarkMode ? '' : '-light'}.svg`)"
            >
          </nuxt-link>
        </div>
        <div
          class="burger"
          @click="toggle = !toggle"
        >
          <div class="inner-burger"></div>
        </div>

        <transition name="fade">
          <ul
            class="collapse-navbar"
            :class="{'dark': getDarkMode}"
            v-if="toggle"
          >
            <li>
              <nuxt-link
                no-prefetch
                title="My posts"
                to="/posts/my_posts"
              >
                <img
                  :src="require(`@/static/svg/account${!getDarkMode ? '' : '-light'}.svg`)"
                >
              </nuxt-link>
            </li>
            <li>
              <img
                src="@/static/svg/moon.svg"
                title="Set dark theme"
                v-if="!getDarkMode"
                @click="switchDarkMode"
              >
              <img
                src="@/static/svg/sun.svg"
                title="Set light theme"
                v-else
                @click="switchDarkMode"
              >
            </li>
            <li>
              <nuxt-link
                no-prefetch
                title="Settings"
                to="/settings"
              >
                <img
                  :src="require(`@/static/svg/settings${!getDarkMode ? '' : '-light'}.svg`)"
                >
              </nuxt-link>
            </li>
            <li>
              <a
                title="Logout"
                href="#"
                @click="logout"
              >
                <img src="@/static/svg/logout.svg">
              </a>
            </li>
          </ul>
        </transition>
      </div>

      <div class="icon-and-burger" v-else>
        <div class="header-icon">
          <img
            src="@/static/svg/moon.svg"
            title="Set dark theme"
            v-if="!getDarkMode"
            @click="switchDarkMode"
          >
          <img
            src="@/static/svg/sun.svg"
            title="Set light theme"
            v-else
            @click="switchDarkMode"
          >
        </div>
        <div class="burger">
          <nuxt-link
            no-prefetch
            title="Login"
            to="/login"
          >
            <img
              :src="require(`@/static/svg/login${!getDarkMode ? '' : '-light'}.svg`)"
            >
          </nuxt-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Navbar',
  props: {
    userInfo: Object
  },
  data() {
    return {
      toggle: false,
      i: 0
    }
  },
  computed: {
    ...mapGetters('auth', ['auth', 'username']),
    ...mapGetters('editMode', ['getDarkMode']),
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout'
    }),
    ...mapMutations({
      switchDarkMode: 'editMode/switchDarkMode'
    }),
    clickOnPage() {
      if (this.toggle) {
        this.i++
        if (this.i % 2 === 0) this.toggle = false
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.clickOnPage)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.clickOnPage)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/colors.scss';
$padding: 69px;

* header {
  cursor: pointer;
}

header {
  position: fixed;
  top: 0;

  width: 100%;
  height: 142px;

  pointer-events: none;
  z-index: 3;
}

a {
  display: flex;
}

.inner-header {
  width: 100%;
  justify-content: space-between;
  padding: 0 $padding;
}

header,
.inner-header,
.icon-and-burger,
.header-icon {
  display: flex;
  align-items: center;
}

.home {
  width: 43px;
}

.header-icon {
  width: 43px;
  height: 43px;

  margin-right: 21px;

  a {
    display: flex;
    margin: auto;

    img {
      margin: auto;
    }
  }
}

.collapse-navbar {
  position: absolute;
  list-style: none;

  top: calc(96px + 28px);
  right: $padding;

  padding: 0;
  margin: 0;

  li {
    width: 50px;
    height: 50px;

    margin-bottom: 28px;
  }
}

a,
.icon-and-burger,
.collapse-navbar {
  pointer-events: all;
}

.burger {
  display: flex;

  width: 43px;
  height: 43px;

  .inner-burger {
    width: 9px;
    height: 9px;
    border-radius: 50%;

    margin: auto;
  }
}

@media screen and (max-width: 1400px) {
  header, .collapse-navbar {
    transition: .7s;
  }

  header {
    height: 90px;

    background-color: $primary;
  }

  .collapse-navbar {
    background: $primary;
  }

  header.dark {
    background-color: $standard;
  }

  .collapse-navbar.dark {
    background: $standard;
  }
}

@media screen and (max-width: 320px) {
  header {
    height: 60px;

    pointer-events: all;
  }

  .collapse-navbar {
    top: 60px;
    right: 0;

    padding: 20px;

    border-bottom-left-radius: 10px;
  }

  .home, .burger, .header-icon {
    width: 38.5px;
    height: 38.5px;

    img {
      max-width: 38.5px;
      max-height: 38.5px;
    }
  }

  .inner-header {
    padding: 0 30px;
  }
}
</style>
