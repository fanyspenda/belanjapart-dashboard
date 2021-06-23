/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.static(`${__dirname}/dist`));
app.use(express.static(__dirname, +'public'));
app.use(express.static('/'));
const root = path.resolve(__dirname, 'dist', 'index.html');

app.get('*', (req, res) => {
  res.sendFile(root);
});

app.listen(port);
console.log(`Listening on port ${port}`);
