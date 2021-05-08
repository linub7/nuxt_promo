
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Programming Courses | Mohammad Hadi',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { hid: 'og:title', name: 'og:title', content: 'Learn from amazing courses | Mohammad Hadi' },
      { hid: 'og:locale', name: 'og:locale', content: 'en_EU' },
      { hid: 'og:url', name: 'og:url', content: process.env.BASE_URL || 'http://localhost:3000' },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      { hid: 'og:image', name: 'og:image', content: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwj8szppBwpPezgfmD2h7di0rioaTwH0M6lg&usqp=CAU' },
      { hid: 'og:description', name: 'og:description', content: 'My name is Mohammad Hadi and I am an experienced freelance developer.' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://kit.fontawesome.com/ced382522b.js' }
    ]
  },
  // <script src="https://kit.fontawesome.com/ced382522b.js" crossorigin="anonymous"></script>
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/main.scss'
  ],

  styleResources: {
    scss: [
      '@/assetes/scss/variables.scss',
    ],
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/filters.js' },
    { src: '~/plugins/vuelidate.js' },
    { src: '~/plugins/integration.js' },
    { src: '~/plugins/components.js' },
    { src: '~/plugins/tooltip.js' },
    { src: '~/plugins/toasted.js', ssr: false },
    { src: '~/plugins/paginate.js', ssr: false },

  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'portal-vue/nuxt',
    '@nuxtjs/style-resources',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  serverMiddleware: [
    '~/server/routes/index.js'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
