import type { DiscordGatewayPayload, DiscordInviteCreate } from '@discordeno/types'
import type { Bot } from '../../bot.js'

export async function handleInviteCreate(bot: Bot, data: DiscordGatewayPayload, shardId: number): Promise<void> {
  if (!bot.events.inviteCreate) return

  const payload = data.d as DiscordInviteCreate

  bot.events.inviteCreate({
    channelId: bot.transformers.snowflake(payload.channel_id),
    code: payload.code,
    createdAt: Date.parse(payload.created_at),
    guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
    inviter: payload.inviter ? bot.transformers.user(bot, payload.inviter) : undefined,
    maxAge: payload.max_age,
    maxUses: payload.max_uses,
    targetType: payload.target_type,
    targetUser: payload.target_user ? bot.transformers.user(bot, payload.target_user) : undefined,
    targetApplication: payload.target_application
      ? bot.transformers.application(bot, payload.target_application, { shardId, partial: true })
      : undefined,
    temporary: payload.temporary,
    uses: payload.uses,
    expiresAt: Date.parse(payload.expires_at),
  })
}
