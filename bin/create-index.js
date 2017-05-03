const fs = require('fs');

const Indexer = require('./indexer');

const indexer = new Indexer({
  dataPath: './src/database',
  dicPath: './src/dictionaries',
}).then(index => {
  fs.writeFile('./src/index.json', JSON.stringify(index), {
    encoding: 'utf-8',
  });
});
