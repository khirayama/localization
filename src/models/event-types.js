const Model = require('./index');

const EventType = Object.assign({
  data: require('../data/event-types'),
  schema: {
    id: {
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
        },
      },
    },
  },
}, Model);

module.exports = EventType;
