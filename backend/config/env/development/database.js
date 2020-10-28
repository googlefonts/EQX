module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'sqlite',
        filename: '.tmp/data.db'
      },
      options: {
        useNullAsDefault: true
      }
    }
  }
});
