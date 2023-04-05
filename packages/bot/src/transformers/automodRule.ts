import type { DiscordAutoModerationRule } from '@discordeno/types'
import type { Bot } from '../index.js'
import type { Optionalize } from '../optionalize.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformAutoModerationRule(bot: Bot, payload: DiscordAutoModerationRule) {
  const rule = {
    name: payload.name,
    eventType: payload.event_type,
    triggerType: payload.trigger_type,
    enabled: payload.enabled,
    id: bot.transformers.snowflake(payload.id),
    guildId: bot.transformers.snowflake(payload.guild_id),
    creatorId: bot.transformers.snowflake(payload.creator_id),
    exemptRoles: payload.exempt_roles.map((id) => bot.transformers.snowflake(id)),
    exemptChannels: payload.exempt_channels.map((id) => bot.transformers.snowflake(id)),
    triggerMetadata: payload.trigger_metadata
      ? {
          keywordFilter: payload.trigger_metadata.keyword_filter,
          regexPatterns: payload.trigger_metadata.regex_patterns,
          presets: payload.trigger_metadata.presets,
          allowList: payload.trigger_metadata.allow_list,
          mentionTotalLimit: payload.trigger_metadata.mention_total_limit,
        }
      : undefined,
    actions: payload.actions.map((action) => ({
      type: action.type,
      metadata: action.metadata
        ? {
            channelId: action.metadata.channel_id ? bot.transformers.snowflake(action.metadata.channel_id) : undefined,
            customMessage: action.metadata.custom_message,
            durationSeconds: action.metadata.duration_seconds,
          }
        : undefined,
    })),
  }

  return rule as Optionalize<typeof rule>
}

export interface AutoModerationRule extends ReturnType<typeof transformAutoModerationRule> {}
