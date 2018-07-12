const express = require('express')
const bodyParser  = require('body-parser');
const app = express()
const port = 8080;

const surpriseMessage = require('./messages/surprise.js')
const helpMessage = require('./messages/help.js')
const defaultMessage = require('./messages/default.js')

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (request, response) => {
  const {
    body: {
      text,
    }
  } = request;

  const [command, ...details] = text.split(' ')

  switch (command) {
    case 'surprise':
      surpriseMessage(request, response)
      break;
    case 'help':
      helpMessage(response)
      break;
    default:
      defaultMessage(response)
  }
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`)
})


