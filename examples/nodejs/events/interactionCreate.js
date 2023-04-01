module.exports = async (client, interaction) => {
  interaction = client.interactions.forge(interaction)
  client.commands.isInteraction(interaction)
}
