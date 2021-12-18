export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  publicRuntimeConfig: {
    address: process.env.BACKEND_ADDRESS
  },
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'O_o',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  loading: {
    color: '#f2f9aa',
    failedColor: '#f2f9aa'
  },
  /*
   ** Global CSS
   */
  css: [
    'normalize.css/normalize.css'
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    {
      src: '~/plugins/vue-scroll-reveal',
      ssr: false
    }
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   ** See https://nuxtjs.org/api/configuration-modules/#buildmodules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://nuxtjs.org/api/configuration-modules/
    '@nuxtjs/axios',
    // '@nuxtjs/auth-next',
    '@nuxtjs/composition-api/module',
    '@forked-prs/nuxt-infinite-scroll-module'
  ],
  router: {
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    babel: {
      plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-private-methods',
        [
          '@babel/plugin-proposal-private-property-in-object',
          { loose: false }
        ]
      ]
    },
    loaders: {
      sass: {
        implementation: require('sass')
      },
      scss: {
        implementation: require('sass')
      }
    }
    /*
    ** You can extend webpack config here
    */
  },
  styleResources: {
    scss: [
      '~/assets/colors.scss'
    ]
  }
}
