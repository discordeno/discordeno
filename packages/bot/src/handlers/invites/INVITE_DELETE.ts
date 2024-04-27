import type { DiscordGatewayPayload, DiscordInviteDelete } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleInviteDelete(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.inviteDelete) return

  const payload = data.d as DiscordInviteDelete

  bot.events.inviteDelete({
    /** The channel of the invite */
    channelId: bot.transformers.snowflake(payload.channel_id),
    /** The guild of the invite */
    guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
    /** The unique invite code */
    code: payload.code,
  })
}
