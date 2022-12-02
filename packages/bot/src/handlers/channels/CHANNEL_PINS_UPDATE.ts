import {
  DiscordChannelPinsUpdate,
  DiscordGatewayPayload
} from '@discordeno/types'
import type { Bot } from '../../bot.js'

export async function handleChannelPinsUpdate (
  bot: Bot,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordChannelPinsUpdate

  bot.events.channelPinsUpdate(bot, {
    guildId: payload.guild_id
      ? bot.transformers.snowflake(payload.guild_id)
      : undefined,
    channelId: bot.transformers.snowflake(payload.channel_id),
    lastPinTimestamp: payload.last_pin_timestamp
      ? Date.parse(payload.last_pin_timestamp)
      : undefined
  })
}
