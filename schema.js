const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./types/event');
const { GRAPHQL_PORT } = require('./config');

const server = new ApolloServer({
    typeDefs: [
        require('./types/event'),
        require('./types/date'),
    ],
    resolvers: {
        ...require('./resolvers/queries/event'),
        ...require('./resolvers/mutations/event'),
        ...require('./resolvers/date'),
    },
    playground: {
        endpoint: `http://localhost:${GRAPHQL_PORT}/graphql`,
        settings: {
            'editor.theme': 'light'
        }
    }
});

module.exports = server;