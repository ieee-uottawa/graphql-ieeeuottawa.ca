const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./types/event');
const resolvers = require('./resolvers/queries/event');
const { GRAPHQL_PORT } = require('./config');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: {
        endpoint: `http://localhost:${GRAPHQL_PORT}/graphql`,
        settings: {
            'editor.theme': 'light'
        }
    }
});

module.exports = server;