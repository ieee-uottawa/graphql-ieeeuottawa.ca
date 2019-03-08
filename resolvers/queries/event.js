const { Datastore } = require('@google-cloud/datastore');
const dayjs = require('dayjs');

const { GCP_PROJECT_ID } = process.env;
const datastore = new Datastore({ projectId: GCP_PROJECT_ID });
const kind = 'Events';

const getEvents = async (minLimit = 4, operator = '>') => {
    let query = datastore.createQuery(kind)
        .order('id', { descending: true });

    if (minLimit) {
        query = query
            .limit(minLimit)
            .filter('id', operator, dayjs().format('YYYY-MM-DD'));;
    }

    let [events] = await datastore.runQuery(query);
    if (events.length < minLimit && operator === '>') {
        const moreEvents = await getEvents(minLimit - events.length, '<');
        events = events.concat(moreEvents);
    }

    return events;
};

const resolvers = {
    Query: {
        latestEvents: (obj, { minLimit }) => getEvents(minLimit),
        events: () => getEvents(null),
    }
}

module.exports = resolvers;