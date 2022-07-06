const RESOURCE_URL = '/auth'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  server: {
    port: process.env.PORT ? process.env.PORT : '8080' // default: 3000
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'portabilis-challenge-frontend',
    htmlAttrs: {
      lang: 'en'
    },
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
    '~/assets/style/bootstrap.min.css',
    '~/assets/style/bootstrap-extended.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // middleware for tokens inside headers
    { src: '~plugins/axios.js' },
    // package for input form validations
    { src: '~plugins/veevalidate.js' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // axios for requests
    '@nuxtjs/axios',
    // auth package for Nuxt
    '@nuxtjs/auth-next',
  ],

  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    // baseURL: process.env.VUE_APP_REST_API_URL,
    proxy: true,
    debug: process.env.NODE_ENV && process.env.NODE_ENV === 'development',
  },

  proxy: {
    '/api': {
      target: 'http://127.0.0.1:3000',
      pathRewrite: {
        '^/api': '/api',
      }
    },
    '/auth': {
      target: 'http://127.0.0.1:3000',
      pathRewrite: {
        '^/auth': '/auth',
      }
    },
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: false,
          global: true,
          required: true,
          type: 'Bearer',
        },
        user: {
          property: 'data',
          autoFetch: true,
        },
        endpoints: {
          login: {
            url: `${RESOURCE_URL}/sign_in`,
            method: 'post',
            propertyName: false
          },
          user: {
            url: `${RESOURCE_URL}/validate_token`,
            method: 'get',
          },
          logout: {
            url: `${RESOURCE_URL}/sign_out`,
            method: 'delete',
          }
        },
      },
    },
    redirect: {
      login: '/',
      logout: false,
      home: false,
      callback: false,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
