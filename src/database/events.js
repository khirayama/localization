const keywords = require('./keys/keywords');
const schedules = require('./keys/schedules');

const events = [{
  id: 1,
  eventTypeId: 1,
  nameKey: 'HAKATA_DONTAKU',
  url: [
    'http://www.dontaku.fukunet.or.jp/',
    'https://twitter.com/HAKATA_DONTAKU',
    'https://www.instagram.com/explore/tags/%E5%8D%9A%E5%A4%9A%E3%81%A9%E3%82%93%E3%81%9F%E3%81%8F/',
  ],
  scheduleKeys: [
    schedules.period.ANNUAL,
    '05/03',
    '05/04',
  ],
  keywordKeys: [
    keywords.season.SUMMER,
    keywords.month.MAY,
  ],
}, {
  id: 2,
  eventTypeId: 1,
  nameKey: 'HAKATA_GION_YAMAKASA',
  url: [
    'http://www.hakatayamakasa.com/',
    'https://www.instagram.com/explore/tags/%E5%8D%9A%E5%A4%9A%E5%B1%B1%E7%AC%A0/',
  ],
  scheduleKeys: [
    schedules.period.ANNUAL,
    '07/01',
    '07/09',
    '07/10',
    '07/11',
    '07/12',
    '07/13',
    '07/14',
    '07/15',
  ],
  keywordKeys: [
    keywords.season.SUMMER,
    keywords.month.JULY,
  ],
}];

module.exports = events;
