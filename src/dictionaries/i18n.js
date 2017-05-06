class I18n {
  constructor({dic, lang}) {
    this._lang = lang || 'en';
    this._dic = dic;
  }
  setLang(lang) {
    this._lang = lang;
  }
  t(key) {
    if (this._dic[key] && this._dic[key][this._lang]) {
      return this._dic[key][this._lang];
    }
    return key;
  }
}

module.exports = I18n;
