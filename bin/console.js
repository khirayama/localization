const rl = require('readline');
const util = require('util');

const fs = require('fs');

const Indexer = require('./indexer');
const SeachEngine = require('../src/search-engine');

class CLI {
  constructor() {
    this.rli = rl.createInterface(process.stdin, process.stdout);
    this.rli.setPrompt('> ');
    this.rli.prompt();

    this.handleLine = this._handleLine.bind(this);
    this._setEventHandler();
  }
  _setEventHandler() {
    this.rli.on('line', this.handleLine);

    this.rli.on('close', () => {
      process.stdin.destroy();
    });
  }
  _handleLine(line) {
    console.log(JSON.stringify(eval(line), null, '  '));
    this.rli.prompt();
  }
}

class ModelLoader {
  constructor(path) {
    this._path = path;
  }
  _getModelName(fileFullName) {
    const fileName = fileFullName.split('.')[0];
    const splitedFileName = fileName.split('-');
    return splitedFileName.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join('');
  }
  load() {
    const data = {};

    return new Promise(resolve => {
      fs.readdir(this._path, (err, files) => {
        const fileList = files.filter(file => {
          if (file === 'index.js') {
            return false;
          }
          return fs.statSync(`${this._path}/${file}`).isFile() && /.*\.js/.test(file);
        });
        fileList.map(file => {
          const modelName = this._getModelName(file);
          data[modelName] = require(`${process.cwd()}/${this._path}/${file}`);
        });
        resolve(data);
      });
    });
  }
}

// entry point
const indexer = new Indexer({
  dataPath: './src/data',
  dicPath: './src/dictionaries',
}).then(index => {
  const modelLoader = new ModelLoader('./src/models');
  modelLoader.load().then(models => {
    Object.keys(models).forEach(modelName => {
      global[modelName] = models[modelName];
    });

    const searchEngine = new SeachEngine(index);

    global.search = searchEngine.search.bind(searchEngine);

    const cli = new CLI();
  });
});
