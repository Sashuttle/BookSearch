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
const mongoose = require('mongoose');

//express server & default port
const app = express();
const PORT = process.env.PORT || 3001;

//apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

async function startApolloServer () {
  await server.start();
  server.applyMiddleware({ app });
}

startApolloServer().then(() => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

const _dirname = path.dirname("");
const buildPath = path.join(_dirname, '../client/build');
app.use(express.static(buildPath));

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

//going to try get all
app.get("*", (req, res) => {
  res.sendFile(path.json(_dirname, '../client/build/index.html'));
});

mongoose.connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
  });
});
});




/*
app.get('/', (req, res) => {
  res.sendFile.apply(path.join(_dirname, '../client/build/index.html'));
});

const startApolloServer = async(typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log
    })
  })
};

startApolloServer(typeDefs, resolvers); */


/*
//code already given
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
}); */
