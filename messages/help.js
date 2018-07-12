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

module.exports = helpMessage;
