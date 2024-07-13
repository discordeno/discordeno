import type { DiscordGatewayPayload, DiscordThreadMemberUpdate } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleThreadMemberUpdate(bot: Bot, data: DiscordGatewayPayload, _shardId: number): Promise<void> {
  if (!bot.events.threadMemberUpdate) return

  const payload = data.d as DiscordThreadMemberUpdate

  bot.events.threadMemberUpdate({
    id: bot.transformers.snowflake(payload.id),
    guildId: bot.transformers.snowflake(payload.guild_id),
    joinedAt: Date.parse(payload.joined_at),
    flags: payload.flags,
  })
}
