const http = require('http');
const path = require('path');

const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const Event = require('./models/event');
const EventType = require('./models/event-type');

const I18n = require('./dictionaries/i18n');
const dic = require('./dictionaries');

const template = require('./template');

const HomePage = require('./components/home-page');

const app = express();
const server = http.createServer(app);

const port = 3000;
const host = process.env.HOST || '127.0.0.1';

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  const state = {
    lang: 'ja',
    events: Event.all(),
    eventTypes: EventType.all(),
  };

  const i18n = new I18n({
    lang: state.lang,
    dic,
  });

  res.send(
    template(
      'Localization',
      ReactDOMServer.renderToString(
        <HomePage {...state} i18n={i18n} />
      ),
      state
    )
  );
});

server.listen(port, host);
