import { snowflakeToTimestamp } from '@discordeno/bot'
import { bot, getShardInfoFromGuild } from '../bot.js'
import createCommand from '../commands.js'

createCommand({
  name: 'ping',
  description: '🏓 Check whether the bot is online and responsive.',
  async run(interaction) {
    await interaction.respond(`🏓 Pong! I am online and responsive! 🕙`)
    const response = await bot.helpers.getOriginalInteractionResponse(interaction.token)

    const ping = snowflakeToTimestamp(response.id) - snowflakeToTimestamp(interaction.id)
    const shardInfo = await getShardInfoFromGuild(interaction.guildId)

    const shardPing = shardInfo.rtt === -1 ? '*Not yet available*' : `${shardInfo.rtt}ms`

    await interaction.edit(`🏓 Pong! Gateway Latency: ${shardPing}, Roundtrip Latency: ${ping}ms. I am online and responsive! 🕙`)
  },
})
