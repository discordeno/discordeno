import {
  DiscordGatewayPayload,
  DiscordThreadMemberUpdate
} from '@discordeno/types'
import { Bot } from '../../bot.js'

export async function handleThreadMemberUpdate (
  bot: Bot,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordThreadMemberUpdate

  bot.events.threadMemberUpdate(bot, {
    id: bot.transformers.snowflake(payload.id),
    guildId: bot.transformers.snowflake(payload.guild_id),
    joinedAt: Date.parse(payload.joined_at),
    flags: payload.flags
  })
}
