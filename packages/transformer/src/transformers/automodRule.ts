import type { Camelize, DiscordAutoModerationRule } from '@discordeno/types'

export function c1amelize1AutoModerationRule (
  payload: DiscordAutoModerationRule
): Camelize<DiscordAutoModerationRule> {
  return {
    id: payload.id,
    guildId: payload.guild_id,
    name: payload.name,
    creatorId: payload.creator_id,
    eventType: payload.event_type,
    triggerType: payload.trigger_type,
    triggerMetadata: payload.trigger_metadata && {
      keywordFilter: payload.trigger_metadata.keyword_filter,
      presets: payload.trigger_metadata.presets,
      allowList: payload.trigger_metadata.allow_list,
      mentionTotalLimit: payload.trigger_metadata.mention_total_limit
    },
    actions: payload.actions.map((action) => ({
      type: action.type,
      metadata: action.metadata && {
        channelId: action.metadata.channel_id,
        durationSeconds: action.metadata.duration_seconds
      }
    })),
    enabled: payload.enabled,
    exemptRoles: payload.exempt_roles,
    exemptChannels: payload.exempt_channels
  }
}
