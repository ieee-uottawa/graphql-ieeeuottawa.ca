const { gql } = require('apollo-server-express');

const typeDef = gql`
scalar Date
`;

module.exports = typeDef;