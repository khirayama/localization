const http = require('http');
const path = require('path');

const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const template = require('./template');

const HomePage = require('./components/home-page');

const app = express();
const server = http.createServer(app);

const port = 3000;
const host = process.env.HOST || '127.0.0.1';

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  const state = {
  };

  res.send(
    template(
      'Localization',
      ReactDOMServer.renderToString(<HomePage />),
      state
    )
  );
});

server.listen(port, host);
