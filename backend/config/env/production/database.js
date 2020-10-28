module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DATABASE_HOST', "127.0.0.1"),
        port: env('DATABASE_PORT', 27017),
        database: env('DATABASE_NAME', "strapi"),
        username: env('DATABASE_USERNAME', ""),
        password: env('DATABASE_PASSWORD', ""),
        schema: 'public'
      },
      options: {
        debug: 'false',
        ssl: 'false'
      }
    }
  }
});
