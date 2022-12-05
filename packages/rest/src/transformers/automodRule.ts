import type { DiscordAutoModerationRule, Optionalize } from '@discordeno/types'
import type { RestManager } from '../restManager.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformAutoModerationRule (
  rest: RestManager,
  payload: DiscordAutoModerationRule
) {
  const rule = {
    name: payload.name,
    eventType: payload.event_type,
    triggerType: payload.trigger_type,
    enabled: payload.enabled,
    id: rest.transformers.snowflake(payload.id),
    guildId: rest.transformers.snowflake(payload.guild_id),
    creatorId: rest.transformers.snowflake(payload.creator_id),
    exemptRoles: payload.exempt_roles.map((id) =>
      rest.transformers.snowflake(id)
    ),
    exemptChannels: payload.exempt_channels.map((id) =>
      rest.transformers.snowflake(id)
    ),
    triggerMetadata: payload.trigger_metadata
      ? {
          keywordFilter: payload.trigger_metadata.keyword_filter,
          presets: payload.trigger_metadata.presets,
          allowList: payload.trigger_metadata.allow_list,
          mentionTotalLimit: payload.trigger_metadata.mention_total_limit
        }
      : undefined,
    actions: payload.actions.map((action) => ({
      type: action.type,
      metadata: action.metadata
        ? {
            channelId: action.metadata.channel_id
              ? rest.transformers.snowflake(action.metadata.channel_id)
              : undefined,
            durationSeconds: action.metadata.duration_seconds
          }
        : undefined
    }))
  }

  return rule as Optionalize<typeof rule>
}

export interface AutoModerationRule
  extends ReturnType<typeof transformAutoModerationRule> {}
