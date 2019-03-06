const { Datastore } = require('@google-cloud/datastore');
const { GCP_PROJECT_ID } = process.env;
const datastore = new Datastore({ projectId: GCP_PROJECT_ID });
const kind = 'Events';

const resolvers = {
    Query: {
        latestEvents: async (minLimit = 4) => {
            const query = datastore.createQuery(kind).order('id', { descending: true });
            const [events] = await datastore.runQuery(query);

            return events;
        }
    }
}

module.exports = resolvers;