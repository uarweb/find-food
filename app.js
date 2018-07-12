const express = require('express')
const bodyParser  = require('body-parser');
const app = express()
const port = 8080;

const surpriseMessage = require('./messages/surprise.js')
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

function helpMessage (request) {
  request.send({
    "response_type": "in_channel",
    "text": "Use one of the available commands.",
    "attachments": [
      { "text": "\`/feed_me surprise\`" },
      { "text": "\`/feed_me deals\`" }
    ],
  })
}

function defaultMessage (request) {
  request.send({
    "response_type": "in_channel",
    "text": "Not a valid command! Valid commands are 'help', 'deals', or 'some [category]'",
  });
}
