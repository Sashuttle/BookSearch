const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
//importing apollo server
const { ApolloServer } = require('apollo-server-express');
//importing typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
//importing middleware
const { authMiddleware } = require('./utils');
//database connection
const db = require('./config');

//express server & default port
const app = express();
const PORT = process.env.PORT || 3001;
//apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
