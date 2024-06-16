import { snowflakeToTimestamp } from '@discordeno/bot'
import { bot } from '../bot.js'
import createCommand from '../commands.js'

createCommand({
  name: 'ping',
  description: '🏓 Check whether the bot is online and responsive.',
  async run(interaction) {
    await interaction.respond(`🏓 Pong! I am online and responsive! 🕙`)
    const response = await bot.helpers.getOriginalInteractionResponse(interaction.token)

    const ping = snowflakeToTimestamp(response.id) - snowflakeToTimestamp(interaction.id)

    // TODO: add gateway latency

    await interaction.edit(`🏓 Pong! Gateway Latency: TBD, Roundtrip Latency: ${ping}ms. I am online and responsive! 🕙`)
  },
})
