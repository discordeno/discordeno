import type { DiscordAuditLogEntry } from '@discordeno/types'
import type { AuditLogEntry, Bot } from '../../index.js'

export function transformAuditLogEntryToDiscordAuditLogEntry(bot: Bot, payload: AuditLogEntry): DiscordAuditLogEntry {
  return {
    id: bot.transformers.reverse.snowflake(payload.id),
    changes: payload.changes,
    user_id: payload.userId ? bot.transformers.reverse.snowflake(payload.userId) : null,
    target_id: payload.targetId ? bot.transformers.reverse.snowflake(payload.targetId) : null,
    action_type: payload.actionType,

    options: payload.options
      ? {
          // respect transformer as reference than type
          application_id: payload.options.applicationId ? bot.transformers.reverse.snowflake(payload.options.applicationId) : undefined,
          auto_moderation_rule_name: payload.options.autoModerationRuleName,
          auto_moderation_rule_trigger_type: payload.options.autoModerationRuleTriggerType,
          channel_id: payload.options.channelId ? bot.transformers.reverse.snowflake(payload.options.channelId) : undefined,
          count: payload.options.count !== undefined ? payload.options.count.toString() : undefined,
          delete_member_days: payload.options.deleteMemberDays !== undefined ? payload.options.deleteMemberDays.toString() : undefined,
          id: payload.options.id ? bot.transformers.reverse.snowflake(payload.options.id) : undefined,
          members_removed: payload.options.membersRemoved !== undefined ? payload.options.membersRemoved.toString() : undefined,
          message_id: payload.options.messageId ? bot.transformers.reverse.snowflake(payload.options.messageId) : undefined,
          role_name: payload.options.roleName,
          type: payload.options.type !== undefined ? payload.options.type.toString() : undefined,
          integration_type: payload.options.integrationType,
        }
      : undefined,
    reason: payload.reason,
  }
}
