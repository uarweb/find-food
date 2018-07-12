const express = require('express');
const zomatoApi = require('./shared/zomatoApi');

const router = express.Router();

const app = express();
const port = 8080;

router.use('/', zomatoApi);

app.use(router);

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
});
