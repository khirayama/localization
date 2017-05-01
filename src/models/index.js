const Ajv = require('ajv');
const ajv = new Ajv();
const Fuse = require('fuse.js');

const Model = {
  valid: function(target) {
    let validate = null;

    const entitySchema = {
      type: 'object',
      properties: this.schema,
    };

    if (Array.isArray(target)) {
      validate = ajv.compile({
        type: 'array',
        items: entitySchema,
      });
    } else {
      validate = ajv.compile(entitySchema);
    }
    return validate(target);
  },
  all: function() {
    return this.data;
  },
  where: function(where) {
    if (typeof where === 'object') {
      const keys = Object.keys(where);
      return this.data.filter(data_ => {
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          return data_[key] === where[key];
        }
        return false;
      });
    } else if (typeof where === 'function') {
      return this.data.filter(where);
    }
    return [];
  },
  find: function(options) {
    const result = this.where(options);
    if (result.length) {
      return result[0];
    }
    return null;
  },
  search: function(keyword = '', options) {
    let options_ = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: Object.keys(this.schema),
    };
    if (options) {
      options_ = options;
    } else if (this.searchOptions) {
      options_ = this.searchOptions;
    }

    const fuse = new Fuse(this.data, options_);
    return fuse.search(keyword);
  }
}

module.exports = Model;
