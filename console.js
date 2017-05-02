const rl = require('readline');
const util = require('util');

const fs = require('fs');

class CLI {
  constructor(handler) {
    this.rli = rl.createInterface(process.stdin, process.stdout);
    this.rli.setPrompt('> ');
    this.rli.prompt();

    this.handleLine = this._handleLine.bind(this);
    this._setEventHandler();
  }
  _setEventHandler() {
    this.rli.on('line', this.handleLine);

    this.rli.on('close', function() {
      process.stdin.destroy();
    });
  }
  _handleLine(line) {
    console.log(eval(line));
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
    fs.readdir(this._path, (err, files) => {
      if (err) {
        throw err;
      }

      const fileList = files.filter(file => {
        if (file === 'index.js') {
          return false;
        }
        return fs.statSync(`${this._path}/${file}`).isFile() && /.*\.js/.test(file);
      });
      fileList.map(file => {
        eval(`global.${this._getModelName(file)} = require('${this._path}/${file}');`);
      });
    });
  }
}

// entry point
const path = './src/models';

const modelLoader = new ModelLoader(path);
modelLoader.load();

const cli = new CLI();
