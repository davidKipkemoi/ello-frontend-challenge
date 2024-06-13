const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Book {
    author: String
    coverPhotoURL: String
    readingLevel: String
    title: String
  }

  type Query {
    books: [Book]
  }
`);

module.exports = schema;
