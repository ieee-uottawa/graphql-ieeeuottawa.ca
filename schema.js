const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');
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