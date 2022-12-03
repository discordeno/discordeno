import {
  DiscordGatewayPayload,
  DiscordGuildMembersChunk,
  PresenceStatus
} from '@discordeno/types'
import { Client } from '../../client.js'
import { Activity, Member, User } from '../../transformers/index.js'

export async function handleGuildMembersChunk (
  client: Client,
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

  const guildId = client.transformers.snowflake(payload.guild_id)

  if (payload.nonce && payload.chunk_index >= payload.chunk_count - 1) {
    client.cache.fetchAllMembersProcessingRequests.get(payload.nonce)?.(
      `Member fetching complete. Nonce: ${payload.nonce}`
    )
  }

  return {
    guildId,
    members: payload.members.map((m) =>
      client.transformers.member(
        client,
        m,
        guildId,
        client.transformers.snowflake(m.user.id)
      )
    ),
    chunkIndex: payload.chunk_index,
    chunkCount: payload.chunk_count,
    notFound: payload.not_found?.map((id) => client.transformers.snowflake(id)),
    presences: payload.presences?.map((presence) => ({
      user: client.transformers.user(client, presence.user),
      guildId,
      status: PresenceStatus[presence.status],
      activities: presence.activities.map((activity) =>
        client.transformers.activity(client, activity)
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
