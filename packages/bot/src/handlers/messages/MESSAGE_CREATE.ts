import { DiscordGatewayPayload, DiscordMessage } from '@discordeno/types'
import { Bot } from '../../bot.js'

export async function handleMessageCreate (
  bot: Bot,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordMessage

  bot.events.messageCreate(bot, bot.transformers.message(bot, payload))
}
