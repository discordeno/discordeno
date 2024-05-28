const BaseCommand = require('../../../Structures/BaseCommand.js')

const { Interaction, Collector, ComponentOptions, Embed, Component } = require('discordeno.js')

class warncommand extends BaseCommand {
  static name = 'warn'
  static description = 'Warn a user from the server'
  static usage = ''
  static category = 'Moderation'
  static slash = { name: 'warn', category: 'mod' }
  constructor(data) {
    super(data)
  }

  async execute() {
    // Show Case Modal
    if (!this.interaction) return this.reply('You currently can just use this command as slash command.')

    if (!this.interaction.member.permissions.has('KICK_MEMBERS')) {
      return this.reply('You need the permission `KICK_MEMBERS` to use this command.')
    }

    const textinput = new Component()
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
    const textinput2 = new Component()
      .setType('TEXT_INPUT')
      .setStyle('PARAGRAPH')
      .setCustomId('t2')
      .setLabel('Reason')
      .setPlaceholder('Reason for Warning')
      .setRequired(false)
      .setMaxLength(300)
      .toJSON()

    const actionrow = new Component().setType(1).setComponents(textinput).toJSON()
    const actionrow2 = new Component().setType(1).setComponents(textinput2).toJSON()

    this.interaction.popupModal({ customId: 'warn_modal', title: 'Warn User', components: [actionrow, actionrow2] })

    const filter = (m) => m.data?.customId === 'warn_modal'
    const collector = new Collector('interactionCreate', { client: this.client, timeout: 60000, filter })
    collector.on('collect', (m) => {
      const options = new ComponentOptions(m.data.components)
      const i = new Interaction(this.client, m)
      collector.stop()

      const memberId = options.get('t1').value
      const reason = options.get('t2').value

      const embed = new Embed().setTitle('Warned User:').setDescription(`User ID: <@${memberId}> \n Reason: ${reason}`).setColor(0x00ff00).toJSON()

      const warnMessage = new Embed()
        .setTitle('Warning:')
        .setDescription(`You have been warned in **${this.guild.name}** for ${'`' + reason + '`'}`)
        .toJSON()

      this.guild.members
        .fetch(memberId)
        .then((m) => {
          m.send({ embeds: [warnMessage] })
            .then(() => {
              i.reply({ embeds: [embed] })
            })
            .catch((e) => {
              console.log(e)
              i.reply({ content: `Could not warn user ${'<@' + m.id + '>'} | They likely do not have their DMs open.` })
            })
        })
        .catch(() => {
          const embed = new Embed()
            .setTitle('Member not found')
            .setDescription(`The member with the ID of ${'`' + memberId + '`'} has not been found in this Server.`)
            .setColor(0xff0000)
            .toJSON()
          i.reply({ embeds: [embed] })
        })
    })
  }
}
module.exports = warncommand
