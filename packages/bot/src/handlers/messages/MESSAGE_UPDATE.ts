import { DiscordGatewayPayload, DiscordMessage } from '@discordeno/types'
import { Bot } from '../../bot.js'

export async function handleMessageUpdate (
  bot: Bot,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordMessage
  if (!payload.edited_timestamp) return

  bot.events.messageUpdate(bot, bot.transformers.message(bot, payload))
}
