const Fuse = require('fuse.js');

class SearchEngine {
  constructor(index) {
    this._index = index;
  }
  _getKeys(index) {
    const keys = Object.keys(index);
    return Array.prototype.concat.apply(keys,
      keys.map(key => {
        const val = index[key];
        if (Array.isArray(val) && val.length) {
          if (typeof val[0] === 'object') {
            return this._getKeys(val[0]).map(property => {
              if (Number.isInteger(Number(property))) {
                return key;
              }
              return key + '.' + property;
            });
          }
          return key;
        } else if (typeof val === 'object') {
          return this._getKeys(val).map(property => {
            return key + '.' + property;
          });
        } else {
          return key;
        }
      })
    );
  }
  search(keyword) {
    const result = {};

    const keys = Object.keys(this._index);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (this._index[key].length) {
        const options = {
          shouldSort: true,
          threshold: 0.6,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: this._getKeys(this._index[key][0]),
        };
        const fuse = new Fuse(this._index[key], options);
        const searchedResult = fuse.search(keyword);
        if (searchedResult.length) {
          result[key] = searchedResult;
        }
      }
    }
    return result;
  }
}

module.exports = SearchEngine;
