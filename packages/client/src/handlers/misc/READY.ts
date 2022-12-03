import { DiscordGatewayPayload, DiscordReady } from '@discordeno/types'
import { Client } from '../../client.js'

export function handleReady (
  client: Client,
  data: DiscordGatewayPayload,
  shardId: number
): void {
  const payload = data.d as DiscordReady
  // Triggered on each shard
  client.events.ready(
    client,
    {
      shardId,
      v: payload.v,
      user: client.transformers.user(client, payload.user),
      guilds: payload.guilds.map((p) => client.transformers.snowflake(p.id)),
      sessionId: payload.session_id,
      shard: payload.shard,
      applicationId: client.transformers.snowflake(payload.application.id)
    },
    payload
  )

  client.id = client.transformers.snowflake(payload.user.id)
  client.applicationId = client.transformers.snowflake(payload.application.id)
}
