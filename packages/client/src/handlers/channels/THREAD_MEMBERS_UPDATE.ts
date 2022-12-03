import {
  DiscordGatewayPayload,
  DiscordThreadMembersUpdate
} from '@discordeno/types'
import { Client } from '../../client.js'

export async function handleThreadMembersUpdate (
  client: Client,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordThreadMembersUpdate
  client.events.threadMembersUpdate(client, {
    id: client.transformers.snowflake(payload.id),
    guildId: client.transformers.snowflake(payload.guild_id),
    addedMembers: payload.added_members?.map((member) =>
      client.transformers.threadMember(client, member)
    ),
    removedMemberIds: payload.removed_member_ids?.map((id) =>
      client.transformers.snowflake(id)
    )
  })
}
