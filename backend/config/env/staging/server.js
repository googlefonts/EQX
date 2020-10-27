module.exports = ({ env }) => ({
  host: env('APP_HOST', '0.0.0.0'),
  port: env('PORT', 1337),
  production: true,
  proxy: {
    enabled: false
  },
  cron: {
    enabled: false
  },
  admin: {
    autoOpen: false
  }
});
