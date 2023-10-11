import type { DiscordGatewayPayload, DiscordReady } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleReady(bot: Bot, data: DiscordGatewayPayload, shardId: number): Promise<void> {
  if (!bot.events.ready) return

  const payload = data.d as DiscordReady
  // Triggered on each shard
  bot.events.ready(
    {
      shardId,
      v: payload.v,
      user: bot.transformers.user(bot, payload.user),
      guilds: payload.guilds.map((p) => bot.transformers.snowflake(p.id)),
      sessionId: payload.session_id,
      shard: payload.shard,
      applicationId: bot.transformers.snowflake(payload.application.id),
    },
    payload,
  )

  bot.id = bot.transformers.snowflake(payload.user.id)
  bot.applicationId = bot.transformers.snowflake(payload.application.id)
}
