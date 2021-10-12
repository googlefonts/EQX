module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: "mysql",
        host: "mariadb",
        port: 3306,
        database: "strapi",
        username: "strapi",
        password: "strapi",
      },
      options: {
        debug: false,
        ssl: false,
        autoMigration: true,
      }
    }
  }
});
