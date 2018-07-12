function defaultMessage (request) {
  request.send({
    "response_type": "in_channel",
    "text": "Not a valid command! Valid commands are 'help', 'deals', or 'some [category]'",
  });
}

module.exports = defaultMessage;
