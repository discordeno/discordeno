import {
  DiscordGatewayPayload,
  DiscordPresenceUpdate
} from '@discordeno/types'
import { Bot } from '../../bot.js'

export async function handlePresenceUpdate (
  bot: Bot,
  data: DiscordGatewayPayload
): Promise<void> {
  bot.events.presenceUpdate(
    bot,
    bot.transformers.presence(bot, data.d as DiscordPresenceUpdate)
  )
}
