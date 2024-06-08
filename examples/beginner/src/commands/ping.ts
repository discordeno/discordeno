import { ApplicationCommandTypes, snowflakeToTimestamp } from '@discordeno/bot'
import { createCommand } from '../commands.js'
import { humanizeMilliseconds } from '../utils/helpers.js'

createCommand({
  name: 'ping',
  description: 'Ping the Bot!',
  type: ApplicationCommandTypes.ChatInput,
  scope: 'Global',
  async execute(interaction) {
    const ping = Date.now() - snowflakeToTimestamp(interaction.id)

    await interaction.respond(`🏓 Pong! Ping ${ping}ms (${humanizeMilliseconds(ping)})`)
  },
})
