// next.config.js
const withSass = require('@zeit/next-sass')
module.exports = withSass({
  // cssModules: true // Unsure whether css modules required
  sassLoaderOptions: {
    includePaths: ["node_modules"]
  },
  env: {
    API_URL: "http://15.223.144.222:1338",
  }
})