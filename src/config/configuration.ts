export default () => ({
  DATABASE: {
    CONNECTION_STRING:
      process.env.MONGODB_CONNECTION_STRING ||
      'mongodb://localhost:27017/soccer-rewind-dev',
  },
});
