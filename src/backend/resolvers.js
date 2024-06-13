const booksData = require('./data');

const resolvers = {
  books: () => booksData,
};

module.exports = resolvers;
