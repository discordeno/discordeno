import type {
  DiscordGatewayPayload,
  DiscordGuildApplicationCommandPermissions
} from '@discordeno/types'
import type { Client } from '../../client.js'

export async function handleApplicationCommandPermissionsUpdate (
  client: Client,
  data: DiscordGatewayPayload
): Promise<void> {
  client.events.applicationCommandPermissionsUpdate(
    client,
    client.transformers.applicationCommandPermission(
      client,
      data.d as DiscordGuildApplicationCommandPermissions
    )
  )
}
