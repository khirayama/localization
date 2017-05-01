const keywords = require('./constants/keywords');
const schedules = require('./constants/schedules');

const events = [{
  id: 1,
  eventTypeId: 1,
  name: '博多どんたく港まつり',
  url: [
    'http://www.dontaku.fukunet.or.jp/',
  ],
  schedule: [
    schedules.period.ANNUAL,
    '5/3',
    '5/4',
  ],
  keywords: [
    keywords.season.SUMMER,
    keywords.month.MAY,
  ],
}];

module.exports = events;
