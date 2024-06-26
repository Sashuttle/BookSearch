// import setup for apollo server with express
const { gql } = require('apollo-server-express');

// Query[x], Mutation[x], User[x], Book[x], Auth[x]
const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: ID!
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(newBook: InputBook!): User
        removeBook(bookId: ID!): User
    }

    input InputBook {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }
    `;

module.exports = typeDefs;