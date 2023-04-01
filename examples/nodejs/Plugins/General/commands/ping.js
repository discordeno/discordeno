const BaseCommand = require('../../../Structures/BaseCommand.js')
const Discord = require('discordeno.js')
class pingcommand extends BaseCommand {
  static name = 'ping'
  static description = 'See if the bot latency is okay'
  static usage = ''
  static category = 'General'
  static slash = { name: 'ping', category: 'info' }
  constructor(data) {
    super(data)
  }

  async execute() {
    const msg = await this.channel.send({ content: `Pinging...` })
    // Assign properties to the response
    const ping = msg.timestamp - (this.message ? this.message.timestamp : this.interaction.timestamp)

    const embed = new Discord.Embed().setTitle(`The Bots ping is ${ping} ms`).toJSON()
    // Edit Message with the Embed
    return this.reply({ embeds: [embed] })
  }
}
module.exports = pingcommand
