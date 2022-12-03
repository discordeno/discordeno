import { DiscordGatewayPayload, DiscordInviteDelete } from '@discordeno/types'
import { Client } from '../../client.js'

export function handleInviteDelete (
  client: Client,
  data: DiscordGatewayPayload
): void {
  const payload = data.d as DiscordInviteDelete

  client.events.inviteDelete(client, {
    /** The channel of the invite */
    channelId: client.transformers.snowflake(payload.channel_id),
    /** The guild of the invite */
    guildId: payload.guild_id
      ? client.transformers.snowflake(payload.guild_id)
      : undefined,
    /** The unique invite code */
    code: payload.code
  })
}
