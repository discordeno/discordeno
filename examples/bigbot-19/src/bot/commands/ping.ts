import { snowflakeToTimestamp } from '@discordeno/bot'
import { bot } from '../bot.js'
import createCommand from '../commands.js'

createCommand({
  name: 'ping',
  description: 'The ping command',
  async run(interaction) {
    await interaction.respond(`🏓 Ping?`)
    const response = await bot.helpers.getOriginalInteractionResponse(interaction.token)

    const ping = snowflakeToTimestamp(response.id) - snowflakeToTimestamp(interaction.id)

    await interaction.edit(`🏓 Pong! Gateway Latency: TBD, Roundtrip Latency: ${ping}ms. I am online and responsive! 🕙`)
  },
})
