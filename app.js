const express = require('express');
const zomatoApi = require('./shared/zomatoApi');
const surprise = require('./messages/surprise.js')

const app = express();
const port = 3000;

app.get('/', surprise);

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
});
