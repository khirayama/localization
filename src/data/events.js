const keywords = require('./constants/keywords');
const schedules = require('./constants/schedules');

const events = [{
  id: 1,
  eventTypeId: 1,
  name: {
    ja: '博多どんたく港まつり',
    en: 'Hakata Dontaku',
  }
  url: [
    'http://www.dontaku.fukunet.or.jp/',
    'https://twitter.com/HAKATA_DONTAK://twitter.com/HAKATA_DONTAKU',
    'https://www.instagram.com/explore/tags/%E5%8D%9A%E5%A4%9A%E3%81%A9%E3%82%93%E3%81%9F%E3%81%8F/',
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
