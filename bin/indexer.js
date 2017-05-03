const fs = require('fs');

class Indexer {
  constructor(options) {
    this._options = options;

    this._data = null;
    this._dics = null;

    this._indexedData = null;

    return new Promise(resolve => {
      this._load().then(res => {
        this._data = res[0];
        this._dics = res[1];

        this._index = this._createIndex();
        resolve(this._index);
      });
    });
  }
  _getName(fileFullName) {
    const fileName = fileFullName.split('.')[0];
    const splitedFileName = fileName.split('-');
    return splitedFileName.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join('');
  }
  _getDataName(key) {
    return this._getName(key).replace('Id', 's');
  }
  _getKeyName(key) {
    return key;
  }
  _findData(data, id) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        return this._generateIndexedData(data[i]);
      }
    }
    return null;
  }
  _findDics(dics, val) {
    return dics[val] || val;
  }
  _generateIndexedData(entity) {
    const indexedData = Object.assign({}, entity);

    const keys = Object.keys(entity);
    keys.forEach(key => {
      // for id or ids
      const idPos = key.length - key.lastIndexOf('Id');
      if (
        key !== 'id' &&
        key.indexOf('Id') !== -1 &&
        (idPos === 2 || idPos === 3)
      ) {
        const dataName = this._getDataName(key);
        const data = this._data[dataName];

        const value = entity[key];
        const lowerDataName = key.replace('Id', '');

        delete indexedData[key];
        if (Array.isArray(value)) {
          indexedData[lowerDataName] = value.map(id => {
            return this._findData(data, id);
          });
        } else {
          indexedData[lowerDataName] = this._findData(data, value);
        }
      }

      // for key or keys
      const keyPos = key.length - key.lastIndexOf('Key');
      if (
        key.indexOf('Key') !== -1 &&
        (keyPos === 3 || keyPos === 4)
      ) {
        const value = entity[key];
        const lowerDataName = key.replace('Key', '');

        delete indexedData[key];
        if (Array.isArray(value)) {
          indexedData[lowerDataName] = value.map(val=> {
            return this._findDics(this._dics, val);
          });
        } else {
          indexedData[lowerDataName] = this._findDics(this._dics, value);
        }
      }
    });

    return indexedData;
  }
  _createIndex() {
    const index = {};

    const dataNames = Object.keys(this._data);
    dataNames.forEach(dataName => {
      const collection = this._data[dataName];
      index[dataName] = collection.map(entity => {
        return this._generateIndexedData(entity);
      });
    });

    return index;
  }
  // load
  _load() {
    return Promise.all([
      this._loadData(this._options.dataPath),
      this._loadDics(this._options.dicPath),
    ]);
  }
  _loadData(path) {
    const data = {};

    return new Promise(resolve => {
      fs.readdir(path, (err, files) => {
        const fileList = files.filter(file => {
          if (file === 'index.js') {
            return false;
          }
          return fs.statSync(`${path}/${file}`).isFile() && /.*\.js/.test(file);
        });

        fileList.map(file => {
          const dataName = this._getName(file);
          data[dataName] = require(`${process.cwd()}/${path}/${file}`);
        });
        resolve(data);
      });
    });
  }
  _loadDics(path) {
    let dics = {};

    return new Promise(resolve => {
      fs.readdir(path, (err, files) => {
        const fileList = files.filter(file => {
          return fs.statSync(`${path}/${file}`).isFile() && /.*\.js/.test(file);
        });

        fileList.map(file => {
          dics = Object.assign({}, dics, require(`${process.cwd()}/${path}/${file}`));
        });
        resolve(dics);
      });
    });
  }
}

module.exports = Indexer;
