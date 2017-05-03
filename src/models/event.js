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
    nameKey: {
      type: 'string',
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
    keywordKeys: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
}, Model);

module.exports = Event;
