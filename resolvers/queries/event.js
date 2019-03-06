const { Datastore } = require('@google-cloud/datastore');
const dayjs = require('dayjs');

const { GCP_PROJECT_ID } = process.env;
const datastore = new Datastore({ projectId: GCP_PROJECT_ID });
const kind = 'Events';

const latestEvents = async (minLimit = 4, operator = '>') => {
    const query = datastore.createQuery(kind)
        .order('id', { descending: true })
        .limit(minLimit)
        .filter('id', operator, dayjs().format('YYYY-MM-DD'));

    let [events] = await datastore.runQuery(query);
    if (events.length < minLimit && operator === '>') {
        const moreEvents = await latestEvents(minLimit - events.length, '<');
        events = events.concat(moreEvents);
    }

    return events;
};

const resolvers = {
    Query: {
        latestEvents: (obj, { minLimit = 4 }) => latestEvents(minLimit),
    }
}

module.exports = resolvers;