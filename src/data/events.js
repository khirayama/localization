const keywords = require('./constants/keywords');

const events = [{
  id: 1,
  eventTypeId: 1,
  name: '博多どんたく港まつり',
  url: [
    'http://www.dontaku.fukunet.or.jp/',
  ],
  schedule: '毎年5/3、5/4',
  keywords: [
    keywords.season.SUMMER,
    keywords.month.MAY,
  ],
}];

module.exports = events;
