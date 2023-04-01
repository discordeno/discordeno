module.exports = async (client, message) => {
  message = client.messages.forge(message)
  client.commands.isCommand(message)
}
