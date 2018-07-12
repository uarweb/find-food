const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

const helpMessage = require('./messages/help.js');
const defaultMessage = require('./messages/default.js');

const collectionApi = require('./api/collections.js');
const cuisinesApi = require('./api/cuisines.js');
const surpriseMessage = require('./api/surprise.js');

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (request, response) => {
  const {
    body: {
      text,
    },
  } = request;

  const [command, ...details] = text.split(' ');

  switch (command) {
    case 'surprise':
      surpriseMessage(request, response);
      break;
    case 'help':
      helpMessage(response);
      break;
    default: {
      Promise.all([collectionApi.getCollections(), cuisinesApi.getCuisines()])
        .then(([collections, cuisines]) => {
          const collection = collections
            .find(col => col.title.toLowerCase() === text.toLowerCase());
          const cuisine = cuisines
            .find(cui => cui.cuisine_name.toLowerCase() === text.toLowerCase());
          if (collection) {
            collectionApi.collectionSearch(request, response, collection.id);
          } else if (cuisine) {
            cuisinesApi.cuisineSearch(request, response, cuisine.cuisine_id);
          }
        });
    }
  }
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  return console.log(`server is listening on ${port}`);
});
