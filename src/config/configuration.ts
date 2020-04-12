export default () => ({
  DATABASE: {
    MONGODB: process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost:27017/',
    NAME: 'soccer-rewind-local'
  }
})