const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-expess');
const { signToken } = require('../utils/auth');

//resolvers for GraphQL server
const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                data = await User.findOne({_id: context.user._id}).select('-_v -password');
            }
            throw new AuthenticationError('You must be logged in!!!');
        },
    },

    //Mutations for login, save book, remove book
    Mutation: {
        addUser: async (parent, { username, email, password}) => {
            const user = await User.create({username, email, password});
            const token = signToken(user);
            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('User not found. Please create an account!');
            }
            const correctPassword = await user.isCorrectPassword(password);
            if (!correctPassword) {
                throw new AuthenticationError('Wrong password, please try again.');
            }
            const token = signToken(user);
            return  {token, user};
        },

        saveBook: async (parent, {newBook}, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$push: {savedBooks: newBook}},
                    {new: true}
                );
                return updatedUser;
            }
            throw new AuthenticationError('You must be logged in to continue!');
        },
        
        removeBook: async (parent, {bookId}, context) => {
            if (context.user) {
                const updatedUser = await user.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedBooks: { bookId}}},
                    {new: true}
                );
                return updatedUser;
            }
            throw new  AuthenticationError('Please login to continue!');
        },
    }
};

module.exports = resolvers;