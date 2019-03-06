const express = require('express');

const server = require('./schema');
const { GRAPHQL_PORT } = require('./config');

const app = express();

server.applyMiddleware({ app });

app.listen(GRAPHQL_PORT, () => {
    console.log(`GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphql`);
});