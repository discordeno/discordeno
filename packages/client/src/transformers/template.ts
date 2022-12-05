import type { DiscordTemplate, Optionalize } from '@discordeno/types'
import type { Client } from '../client.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformTemplate (client: Client, payload: DiscordTemplate) {
  const template = {
    code: payload.code,
    name: payload.name,
    description: payload.description,
    usageCount: payload.usage_count,
    creatorId: client.transformers.snowflake(payload.creator_id),
    creator: client.transformers.user(client, payload.creator),
    createdAt: Date.parse(payload.created_at),
    updatedAt: Date.parse(payload.updated_at),
    sourceGuildId: client.transformers.snowflake(payload.source_guild_id),
    serializedSourceGuild: payload.serialized_source_guild,
    isDirty: payload.is_dirty ?? undefined
  }

  return template as Optionalize<typeof template>
}

export interface Template extends ReturnType<typeof transformTemplate> {}
