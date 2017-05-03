const React = require('react');
const ReactDOM = require('react-dom');

const index = require('./index.json');
const SeachEngine = require('./search-engine');

const HomePage = require('./components/home-page');

window.addEventListener('DOMContentLoaded', () => {
  console.log(`Start app at ${new Date()}`);

  const searchEngine = new SeachEngine(index);

  ReactDOM.render(<HomePage />, document.querySelector('.application'));
});
