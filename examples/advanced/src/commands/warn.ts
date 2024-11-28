import { ApplicationCommandOptionTypes, ApplicationCommandTypes, type Member, Permissions, type User, createEmbeds } from '@discordeno/bot'
import { bot } from '../bot.js'
import { createCommand } from '../commands.js'
import { calculateMemberPermissions } from '../utils/permissions.js'

createCommand({
  name: 'warn',
  description: 'Warn a user from the server',
  type: ApplicationCommandTypes.ChatInput,
  options: [
    {
      name: 'user',
      description: 'The user you want to warn',
      type: ApplicationCommandOptionTypes.User,
      required: true,
    },
    {
      name: 'reason',
      description: 'The reason for the warn',
      type: ApplicationCommandOptionTypes.String,
      maxLength: 300,
    },
  ],
  async execute(interaction, options) {
    if (!interaction.guildId || !interaction.member) {
      await interaction.respond('This command can only be ran in guilds')
      return
    }

    // Type based on the options declared above
    const { user, reason } = options as { user: UserResolved; reason?: string }

    const guild = await bot.cache.guilds.get(interaction.guildId)

    if (!guild || !guild.roles) {
      await interaction.respond('An error has occurred')
      return
    }

    await interaction.defer()

    const perms = new Permissions(await calculateMemberPermissions(guild, interaction.member))

    const adminPerm = perms.has('ADMINISTRATOR')
    const kickMembersPerm = adminPerm || perms.has('KICK_MEMBERS')

    if (!kickMembersPerm) {
      await interaction.respond("You don't have the necessary permissions to warn a members (this command requires `Kick members`)")
      return
    }

    const embeds = createEmbeds()
      .setTitle('Warned User:')
      .setDescription(`User: <@${user.user.id}>\nReason: ${reason}`)
      .setColor(0x00ff00)
      .setTimestamp(Date.now())

    const warnEmbeds = createEmbeds()
      .setTitle('Warning:')
      .setDescription(`You have been warned in **${guild.name}** for \`${reason}\``)
      .setTimestamp(Date.now())

    try {
      const dmChannel = await bot.helpers.getDmChannel(user.user.id)
      await bot.helpers.sendMessage(dmChannel.id, { embeds: warnEmbeds })
    } catch (error) {
      bot.logger.error(`There was an error in the warn command:`, error)

      await interaction.respond(`Could not warn user <@${user.user.id}> | They likely do not have their DMs open.`)
      return
    }

    await interaction.respond({ embeds })
  },
})

interface UserResolved {
  user: User
  member?: Member
}
