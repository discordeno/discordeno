import { DiscordGatewayPayload, DiscordInviteCreate } from '@discordeno/types'
import { Client } from '../../client.js'

export function handleInviteCreate (
  client: Client,
  data: DiscordGatewayPayload
): void {
  client.events.inviteCreate(
    client,
    client.transformers.invite(client, data.d as DiscordInviteCreate)
  )
}
