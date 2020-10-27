module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'sqlite',
        host: env('DATABASE_HOST', "127.0.0.1"),
        port: env('DATABASE_PORT', 27017),
        srv: env('DATABASE_SRV', false),
        database: env('DATABASE_NAME', "strapi"),
        username: env('DATABASE_USERNAME', ""),
        password: env('DATABASE_PASSWORD', ""),
        ssl: env('DATABASE_SSL', false)
      },
      options: {
        ssl: env('DATABASE_SSL', false),
        authenticationDatabase: env('DATABASE_AUTHENTICATION_DATABASE', "")
      }
    }
  }
});
