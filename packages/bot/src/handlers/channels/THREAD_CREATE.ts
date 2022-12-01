import { DiscordChannel, DiscordGatewayPayload } from '@discordeno/types'
import { Bot } from '../../bot.js'

export async function handleThreadCreate (
  bot: Bot,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordChannel

  bot.events.threadCreate(
    bot,
    bot.transformers.channel(bot, { channel: payload })
  )
}
