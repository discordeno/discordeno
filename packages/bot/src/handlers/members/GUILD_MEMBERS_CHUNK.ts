import type { DiscordGatewayPayload, DiscordGuildMembersChunk } from '@discordeno/types'
import { PresenceStatus } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleGuildMembersChunk(bot: Bot, data: DiscordGatewayPayload): Promise<any> {
  const payload = data.d as DiscordGuildMembersChunk

  const guildId = bot.transformers.snowflake(payload.guild_id)

  return {
    guildId,
    members: payload.members.map((m) => bot.transformers.member(bot, m, guildId, bot.transformers.snowflake(m.user.id))),
    chunkIndex: payload.chunk_index,
    chunkCount: payload.chunk_count,
    notFound: payload.not_found?.map((id) => bot.transformers.snowflake(id)),
    presences: payload.presences?.map((presence) => ({
      user: bot.transformers.user(bot, presence.user),
      guildId,
      status: PresenceStatus[presence.status],
      activities: presence.activities.map((activity) => bot.transformers.activity(bot, activity)),
      clientStatus: {
        desktop: presence.client_status.desktop,
        mobile: presence.client_status.mobile,
        web: presence.client_status.web,
      },
    })),
    nonce: payload.nonce,
  }
}
