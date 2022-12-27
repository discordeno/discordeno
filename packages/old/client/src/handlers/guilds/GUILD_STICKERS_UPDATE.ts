import type {
  DiscordGatewayPayload,
  DiscordGuildStickersUpdate
} from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { Client } from '../../client.js'

export async function handleGuildStickersUpdate (
  client: Client,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordGuildStickersUpdate
  client.events.guildStickersUpdate(client, {
    guildId: client.transformers.snowflake(payload.guild_id),
    stickers: new Collection(
      payload.stickers.map((sticker) => [
        client.transformers.snowflake(sticker.id),
        sticker
      ])
    )
  })
}
