import type {
  DiscordGatewayPayload,
  DiscordInviteCreate
} from '@discordeno/types'
import type { Client } from '../../client.js'

export function handleInviteCreate (
  client: Client,
  data: DiscordGatewayPayload
): void {
  client.events.inviteCreate(
    client,
    client.transformers.invite(client, data.d as DiscordInviteCreate)
  )
}
