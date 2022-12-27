import type {
  DiscordGatewayPayload,
  DiscordThreadListSync
} from '@discordeno/types'
import type { Client } from '../../client.js'
import type { Channel } from '../../transformers/index.js'

export async function handleThreadListSync (
  client: Client,
  data: DiscordGatewayPayload
): Promise<{
    guildId: bigint
    channelIds: bigint[] | undefined
    threads: Channel[]
    members: Array<{
      id: bigint | undefined
      userId: bigint | undefined
      joinTimestamp: number
    }>
  }> {
  const payload = data.d as DiscordThreadListSync

  const guildId = client.transformers.snowflake(payload.guild_id)
  return {
    guildId,
    channelIds: payload.channel_ids?.map((id) =>
      client.transformers.snowflake(id)
    ),
    threads: payload.threads.map((thread) =>
      client.transformers.channel(client, { channel: thread, guildId })
    ),
    members: payload.members.map((member) => ({
      id: member.id ? client.transformers.snowflake(member.id) : undefined,
      userId: member.user_id
        ? client.transformers.snowflake(member.user_id)
        : undefined,
      joinTimestamp: Date.parse(member.join_timestamp)
    }))
  }
}
