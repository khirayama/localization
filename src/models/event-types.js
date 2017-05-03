const Model = require('./index');

const EventType = Object.assign({
  data: require('../database/event-types'),
  schema: {
    id: {
      type: 'number',
    },
    name: {
      type: 'string',
    },
  },
}, Model);

module.exports = EventType;
