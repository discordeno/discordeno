import {
  DiscordGatewayPayload,
  DiscordGuildMembersChunk,
  PresenceStatus
} from '@discordeno/types'
import { Bot } from '../../bot.js'
import { Activity, Member, User } from '../../transformers/index.js'

export async function handleGuildMembersChunk (
  bot: Bot,
  data: DiscordGatewayPayload
): Promise<{
    guildId: bigint
    members: Member[]
    chunkIndex: number
    chunkCount: number
    notFound: bigint[] | undefined
    presences:
    | Array<{
      user: User
      guildId: bigint
      status: PresenceStatus
      activities: Activity[]
      clientStatus: {
        desktop?: string
        mobile?: string
        web?: string
      }
    }>
    | undefined
    nonce: string | undefined
  }> {
  const payload = data.d as DiscordGuildMembersChunk

  const guildId = bot.transformers.snowflake(payload.guild_id)

  if (payload.nonce && payload.chunk_index >= payload.chunk_count - 1) {
    bot.cache.fetchAllMembersProcessingRequests.get(payload.nonce)?.(
      `Member fetching complete. Nonce: ${payload.nonce}`
    )
  }

  return {
    guildId,
    members: payload.members.map((m) =>
      bot.transformers.member(
        bot,
        m,
        guildId,
        bot.transformers.snowflake(m.user.id)
      )
    ),
    chunkIndex: payload.chunk_index,
    chunkCount: payload.chunk_count,
    notFound: payload.not_found?.map((id) => bot.transformers.snowflake(id)),
    presences: payload.presences?.map((presence) => ({
      user: bot.transformers.user(bot, presence.user),
      guildId,
      status: PresenceStatus[presence.status],
      activities: presence.activities.map((activity) =>
        bot.transformers.activity(bot, activity)
      ),
      clientStatus: {
        desktop: presence.client_status.desktop,
        mobile: presence.client_status.mobile,
        web: presence.client_status.web
      }
    })),
    nonce: payload.nonce
  }
}
