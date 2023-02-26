import { ApplicationCommandTypes, InteractionResponseTypes } from '../../deps.ts.js'
import { snowflakeToTimestamp } from '../utils/helpers.ts.js'
import { createCommand } from './mod.ts.js'

createCommand({
  name: 'ping',
  description: 'Ping the Bot!',
  type: ApplicationCommandTypes.ChatInput,
  execute: async (Bot, interaction) => {
    const ping = Date.now() - snowflakeToTimestamp(interaction.id)
    await Bot.helpers.sendInteractionResponse(interaction.id, interaction.token, {
      type: InteractionResponseTypes.ChannelMessageWithSource,
      data: {
        content: `🏓 Pong! ${ping}ms`,
      },
    })
  },
})
