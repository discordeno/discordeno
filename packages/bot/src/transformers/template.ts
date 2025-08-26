import type { DiscordTemplate } from '@discordeno/types'
import type { Bot } from '../bot.js'
import type { Template } from './types.js'
export function transformTemplate(bot: Bot, payload: DiscordTemplate): Template {
  const template = {
    code: payload.code,
    name: payload.name,
    description: payload.description,
    usageCount: payload.usage_count,
    creatorId: bot.transformers.snowflake(payload.creator_id),
    creator: bot.transformers.user(bot, payload.creator),
    createdAt: Date.parse(payload.created_at),
    updatedAt: Date.parse(payload.updated_at),
    sourceGuildId: bot.transformers.snowflake(payload.source_guild_id),
    serializedSourceGuild: payload.serialized_source_guild,
    isDirty: payload.is_dirty ?? undefined,
  } as Template

  return bot.transformers.customizers.template(bot, payload, template)
}
