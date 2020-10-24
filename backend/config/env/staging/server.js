module.exports = ({ env }) => ({
  host: '0.0.0.0',
  port: '${process.env.PORT || 1337}',
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
