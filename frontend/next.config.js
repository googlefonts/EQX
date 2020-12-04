// next.config.js
module.exports = {
  publicRuntimeConfig: {
    API_URL: process.env.API_URL || 'http://localhost:1337'
  },
};
