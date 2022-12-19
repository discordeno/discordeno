import type { Camelize, DiscordAutoModerationRule } from '@discordeno/types'

export function s1nakelize1AutoModerationRule (payload: Camelize<DiscordAutoModerationRule>): DiscordAutoModerationRule {
  return {
    id: payload.id,
    name: payload.name,
    enabled: payload.enabled,

    guild_id: payload.guildId,
    creator_id: payload.creatorId,
    event_type: payload.eventType,
    trigger_type: payload.triggerType,
    exempt_roles: payload.exemptRoles,
    exempt_channels: payload.exemptChannels,

    trigger_metadata: payload.triggerMetadata && {
      presets: payload.triggerMetadata.presets,

      allow_list: payload.triggerMetadata.allowList,
      keyword_filter: payload.triggerMetadata.keywordFilter,
      mention_total_limit: payload.triggerMetadata.mentionTotalLimit
    },
    actions: payload.actions.map((action) => ({
      type: action.type,

      metadata: action.metadata && {
        channel_id: action.metadata.channelId,
        duration_seconds: action.metadata.durationSeconds
      }
    }))
  }
}
