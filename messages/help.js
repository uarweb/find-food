function helpMessage (response, command) {

  response.send({
    "text": "Use one of the available commands.",
    "attachments": [
      {
        "title": `${command} surprise`,
        "text": "Returns a single suggestion at random",
      },
      {
        "title": `${command} Chinese`,
        "text": "Shows the top five closest matching cuisines",
      },
      {
        "title": `${command} trending this week`,
        "text": "Shows the top five trending restaurants in town this week",
      }
    ],
  })
}

module.exports = helpMessage;
