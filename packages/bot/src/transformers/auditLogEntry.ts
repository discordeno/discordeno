import type { DiscordAuditLogEntry } from '@discordeno/types'
import type { AuditLogEntry, Bot } from '../index.js'

export function transformAuditLogEntry(bot: Bot, payload: DiscordAuditLogEntry): AuditLogEntry {
  const auditLogEntry = {
    id: bot.transformers.snowflake(payload.id),
    changes: payload.changes,
    userId: payload.user_id ? bot.transformers.snowflake(payload.user_id) : undefined,
    targetId: payload.target_id ? bot.transformers.snowflake(payload.target_id) : undefined,
    actionType: payload.action_type,
    options: payload.options
      ? {
          applicationId: payload.options.application_id ? bot.transformers.snowflake(payload.options.application_id) : undefined,
          autoModerationRuleName: payload.options.auto_moderation_rule_name,
          autoModerationRuleTriggerType: payload.options.auto_moderation_rule_trigger_type,
          channelId: payload.options.channel_id ? bot.transformers.snowflake(payload.options.channel_id) : undefined,
          count: payload.options.count ? Number(payload.options.count) : undefined,
          deleteMemberDays: payload.options.delete_member_days ? Number(payload.options.delete_member_days) : undefined,
          id: payload.options.id ? bot.transformers.snowflake(payload.options.id) : undefined,
          membersRemoved: payload.options.members_removed ? Number(payload.options.members_removed) : undefined,
          messageId: payload.options.message_id ? bot.transformers.snowflake(payload.options.message_id) : undefined,
          roleName: payload.options.role_name,
          type: payload.options.type ? Number(payload.options.type) : undefined,
          integrationType: payload.options.integration_type,
        }
      : undefined,
    reason: payload.reason,
  } as AuditLogEntry

  return bot.transformers.customizers.auditLogEntry(bot, payload, auditLogEntry)
}
