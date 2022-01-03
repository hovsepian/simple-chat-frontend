export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'simple-chat',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/app.scss',
  ],

  styleResources: {
    // your settings here
    sass: [],
    scss: [
      '~/assets/scss/_variables.scss',
    ],
    less: [],
    stylus: [],
    hoistUseStatements: true  // Hoists the "@use" imports. Applies only to "sass", "scss" and "less". Default: false.
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/vuelidate', ssr: true, mode: 'both' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    { path: '~/components/', pathPrefix: false }

  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/style-resources',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/auth-next',
    'nuxt-socket-io',
  ],
  io: {
    // module options
    sockets: [{
      name: 'main',
      url: 'http://api.simple-chat.loc/api'
    }],
    server: {
      // @ts-ignore
      cors: {
        credentials: true, // "Configures the Access-Control-Allow-Credentials CORS header. Set to true to pass the header, otherwise it is omitted."
        origin: ['http://localhost:3000/'] // Array of whitelisted origin(s)
      }
    }
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://api.simple-chat.loc/api',
  },
  auth: {
    cookie: {
      options: {
        maxAge: 86400 // 24 hours
      }
    },
    redirect: {
      login: '/sign-in',
      logout: '/',
      home: '/'
    },
    strategies: {
      'chatJWT': {
        provider: 'laravel/jwt',
        url: 'http://api.simple-chat.loc',
        token: {
          property: 'access_token',
          maxAge: 60 * 60
        },
        refreshToken: {
          maxAge: 20160 * 60
        },
      },
    }
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
