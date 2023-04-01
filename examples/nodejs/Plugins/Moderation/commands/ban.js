const BaseCommand = require('../../../Structures/BaseCommand.js')
const Discord = require('discordeno.js')

class bancommand extends BaseCommand {
  static name = 'ban'
  static description = 'Ban a user from the server'
  static usage = ''
  static category = 'Moderation'
  static slash = { name: 'ban', category: 'mod' }
  constructor(data) {
    super(data)
  }

  async execute() {
    // Show Case Modal

    // Because no permission system has not been added
    if (!this.client.config.owners.includes(String(this.user.id))) return

    const textinput = new Discord.Component()
      .setType('TEXT_INPUT')
      .setStyle('SHORT')
      .setCustomId('t1')
      .setLabel('User ID')
      .setPlaceholder('User ID')
      .setRequired(true)
      .setMaxLength(20)
      .setMinLength(1)
      .setValue(this.args[0])
      .toJSON()
    const textinput2 = new Discord.Component()
      .setType('TEXT_INPUT')
      .setStyle('PARAGRAPH')
      .setCustomId('t2')
      .setLabel('Reason')
      .setPlaceholder('Reason for Ban')
      .setRequired(false)
      .setMaxLength(300)
      .toJSON()

    const actionrow = new Discord.Component().setType(1).setComponents(textinput).toJSON()
    const actionrow2 = new Discord.Component().setType(1).setComponents(textinput2).toJSON()

    this.interaction.popupModal({ customId: 'ban_modal', title: 'Ban User', components: [actionrow, actionrow2] })
  }
}
module.exports = bancommand
