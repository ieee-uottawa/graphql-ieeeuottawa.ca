const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
    latestEvents(minLimit: Int! = 4): [Event]
    events: [Event]
}

type Event {
    id: String!
    name: String!
    description: String!
    url: String!
}
`;

module.exports = typeDefs;