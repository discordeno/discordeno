import type {
  DiscordGatewayPayload,
  DiscordGuildEmojisUpdate
} from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { Client } from '../../client.js'

export async function handleGuildEmojisUpdate (
  client: Client,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordGuildEmojisUpdate

  client.events.guildEmojisUpdate(client, {
    guildId: client.transformers.snowflake(payload.guild_id),
    emojis: new Collection(
      payload.emojis.map((emoji) => [
        client.transformers.snowflake(emoji.id!),
        emoji
      ])
    )
  })
}
