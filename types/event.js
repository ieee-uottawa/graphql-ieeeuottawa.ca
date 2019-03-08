const { gql } = require('apollo-server-express');

const typeDefs = gql`
input SocialMediaSelection {
    facebook: Boolean!
    twitter: Boolean!
    instagram: Boolean!
}

input EventInput {
    id: String
    name: String!
    description: String!
    url: String!
    date: Date!
}

type Query {
    latestEvents(minLimit: Int! = 4): [Event]
    events: [Event]
}

type Mutation {
    createEvent(event: EventInput!, postTo: SocialMediaSelection): Event
}

type Event {
    id: String!
    name: String!
    description: String!
    url: String!
}
`;

module.exports = typeDefs;