import { DiscordChannel, DiscordGatewayPayload } from '@discordeno/types'
import { Bot } from '../../bot.js'

export async function handleThreadUpdate (
  bot: Bot,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordChannel

  bot.events.threadUpdate(
    bot,
    bot.transformers.channel(bot, { channel: payload })
  )
}
