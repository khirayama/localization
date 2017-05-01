const Model = require('./index');

const Event = Object.assign({
  data: require('../data/events'),
  schema: {
    id: {
      type: 'number',
    },
    eventTypeId: {
      type: 'number',
    },
    name: {
      type: 'object',
      properties: {
        ja: {
          type: 'string',
        },
        en: {
          type: 'string',
        }
      },
    },
    url: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    schedule: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    keywords: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
}, Model);

module.exports = Event;
