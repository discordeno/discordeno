import { ApplicationCommandTypes, snowflakeToTimestamp } from '@discordeno/bot'
import { createCommand } from '../commands.js'

createCommand({
  name: 'ping',
  description: 'Ping the Bot!',
  type: ApplicationCommandTypes.ChatInput,
  async execute(interaction) {
    const ping = Date.now() - snowflakeToTimestamp(interaction.id)

    await interaction.reply(`🏓 Pong! ${ping}ms`)
  },
})
