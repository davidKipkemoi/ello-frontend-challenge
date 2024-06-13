const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const path = require('path');
const  resolvers = require('./resolvers');
const schema = require('./schema')
const app = express();
const PORT = process.env.PORT || 4000;
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use('/images', express.static(path.join(__dirname, '../frontend/src/assets')));

const root = resolvers
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
