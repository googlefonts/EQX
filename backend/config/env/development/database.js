module.exports = ({ env }) => ({
    defaultConnection: 'default',
    connections: {
      default: {
        connector: 'mongoose',
        settings: {
          uri: env('MONGODB_URI', 'localhost'),
        },
        options: {
          ssl: true,
        },
      },
    },
  });
