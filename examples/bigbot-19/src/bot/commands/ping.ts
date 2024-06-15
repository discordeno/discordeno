import { snowflakeToTimestamp } from '@discordeno/bot'
import { bot } from '../bot.js'
import createCommand from '../commands.js'
import { translate } from '../languages/translate.js'

createCommand({
  name: 'pingCommandName',
  description: 'pingCommandDescription',
  async run(interaction) {
    await interaction.respond(translate(interaction.guildId, 'pingCommandInitialResponse'))
    const response = await bot.helpers.getOriginalInteractionResponse(interaction.token)

    const ping = snowflakeToTimestamp(response.id) - snowflakeToTimestamp(interaction.id)

    await interaction.edit(translate(interaction.guildId, 'pingCommandResponseWithLatencies', 0, ping))
  },
})
