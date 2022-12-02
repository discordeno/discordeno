import { DiscordGatewayPayload, DiscordInviteDelete } from '@discordeno/types'
import { Bot } from '../../bot.js'

export function handleInviteDelete (
  bot: Bot,
  data: DiscordGatewayPayload
): void {
  const payload = data.d as DiscordInviteDelete

  bot.events.inviteDelete(bot, {
    /** The channel of the invite */
    channelId: bot.transformers.snowflake(payload.channel_id),
    /** The guild of the invite */
    guildId: payload.guild_id
      ? bot.transformers.snowflake(payload.guild_id)
      : undefined,
    /** The unique invite code */
    code: payload.code
  })
}
