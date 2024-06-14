const express = require('express');
const path = require('path');
const db = require('./config/connection');
//const routes = require('./routes');
//importing apollo server
const { ApolloServer } = require('apollo-server-express');
//importing typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
//importing middleware
const { authMiddleware } = require('../server/utils/auth');

//express server & default port
const PORT = process.env.PORT || 3001;
const app = express();
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

app.get('/', (req, res) => {
  res.sendFile.apply(path.join(_dirname, '../client/build/index.html'));
});

const startApolloServer = async(typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`The server is running on port ${PORT}`);
    })
  })
};

startApolloServer(typeDefs, resolvers);


/*
//code already given
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
}); */
