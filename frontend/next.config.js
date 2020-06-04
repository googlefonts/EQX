// next.config.js
const withSass = require('@zeit/next-sass')
module.exports = withSass({
  // cssModules: true // Unsure whether css modules required
  // crossOrigin: 'anonymous',
  sassLoaderOptions: {
    includePaths: ["node_modules"]
  },
  publicRuntimeConfig: {
    API_URL: process.env.API_URL || 'http://localhost:1337'
  },
  // webpack(config) {
  //   config.node = { fs: 'empty' }
  //   return config
  // },
});
