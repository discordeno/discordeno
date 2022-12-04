import { DiscordTemplate, Optionalize } from '@discordeno/types'
import type { RestManager } from '../restManager.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformTemplate (rest: RestManager, payload: DiscordTemplate) {
  const template = {
    code: payload.code,
    name: payload.name,
    description: payload.description,
    usageCount: payload.usage_count,
    creatorId: rest.transformers.snowflake(payload.creator_id),
    creator: rest.transformers.user(rest, payload.creator),
    createdAt: Date.parse(payload.created_at),
    updatedAt: Date.parse(payload.updated_at),
    sourceGuildId: rest.transformers.snowflake(payload.source_guild_id),
    serializedSourceGuild: payload.serialized_source_guild,
    isDirty: payload.is_dirty ?? undefined
  }

  return template as Optionalize<typeof template>
}

export interface Template extends ReturnType<typeof transformTemplate> {}
