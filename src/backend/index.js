const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use('/images', express.static(path.join(__dirname, '../frontend/src/assets')));
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

const booksData = [
  { author: 'Author 1', coverPhotoURL: 'https://raw.githubusercontent.com/ElloTechnology/fullstack-take-home-test/main/frontend/assets/image2.webp', readingLevel: '1', title: 'Book 1' },
  { author: 'Author 2', coverPhotoURL:'/images/image1.png', readingLevel: '2', title: 'Book 2' },
  // Add more books as needed
  { author: 'Author 3', coverPhotoURL: '/images/image2.webp', readingLevel: '3', title: 'Book 3' },
  { author: 'Author 4', coverPhotoURL: '/image1.png', readingLevel: '4', title: 'Book 4' },
];

const root = {
  books: () => booksData,
};

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/graphql', graphqlHTTP((req, res) => ({
  schema: schema,
  rootValue: root,
  graphiql: process.env.NODE_ENV !== 'production', // Enable GraphiQL in development
})));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
