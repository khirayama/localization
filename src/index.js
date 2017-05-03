const index = require('./index.json');
const SeachEngine = require('./search-engine');

window.addEventListener('DOMContentLoaded', () => {
  console.log(`Start app at ${new Date()}`);

  const searchEngine = new SeachEngine(index);

  const result = searchEngine.search('夏');
  console.log(result);
});
