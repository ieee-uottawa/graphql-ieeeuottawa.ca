const { Datastore } = require('@google-cloud/datastore');
const dayjs = require('dayjs');

const { GCP_PROJECT_ID } = process.env;
const datastore = new Datastore({ projectId: GCP_PROJECT_ID });
const kind = 'Events';

const createEvent = ({ event: eventInput, postTo }) => {
    const key = datastore.key(kind);
    const event = {
        id: `${eventInput.date.toString()}-${eventInput.name.toLowerCase().replace(/ /g, '-').replace(/[^\w\s-]/g, '').replace(/-{2,}/g, '-')}`,
        ...eventInput,
    }
    delete event.date;

    return new Promise((resolve, reject) => {
        datastore.save({
            key,
            excludeFromIndexes: [
                'description',
                'name',
                'url',
            ],
            data: {
                ...event,
            },
        }, err => {
            if (err) reject(err);
            else resolve(event);
        });
    });
};

const resolvers = {
    Mutation: {
        createEvent: (obj, { event, postTo }) => createEvent({ event, postTo }),
    },
};

module.exports = resolvers;
