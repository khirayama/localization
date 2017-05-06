const React = require('react');
const ReactDOM = require('react-dom');

const index = require('./index.json');
const SeachEngine = require('./search-engine');

const I18n = require('./dictionaries/i18n');
const dic = require('./dictionaries');

const HomePage = require('./components/home-page');

window.addEventListener('DOMContentLoaded', () => {
  console.log(`Start app at ${new Date()}`);

  const searchEngine = new SeachEngine(index);

  const state = window.state;

  const i18n = new I18n({
    lang: state.lang,
    dic,
  });

  ReactDOM.render(
    <HomePage {...state} i18n={i18n}/>,
    document.querySelector('.application')
  );
});
