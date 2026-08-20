import type { DiscordAuditLogEntry, DiscordOptionalAuditEntryInfo } from '@discordeno/types';
import { camelize } from '@discordeno/utils';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import type { AuditLogEntry, OptionalAuditEntryInfo } from './types.js';

export function transformAuditLogEntry(bot: Bot, payload: Partial<DiscordAuditLogEntry>, extra?: { partial?: boolean }) {
  const auditLogEntry = {} as SetupDesiredProps<AuditLogEntry, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (payload.id) auditLogEntry.id = bot.transformers.snowflake(payload.id);
  if (payload.user_id) auditLogEntry.userId = bot.transformers.snowflake(payload.user_id);
  if (payload.reason) auditLogEntry.reason = payload.reason;
  if (payload.changes) auditLogEntry.changes = camelize(payload.changes);
  if (payload.target_id) auditLogEntry.targetId = bot.transformers.snowflake(payload.target_id);
  if (payload.action_type !== undefined) auditLogEntry.actionType = payload.action_type;
  if (payload.options) auditLogEntry.options = bot.transformers.optionalAuditEntryInfo(bot, payload.options);

  return callCustomizer('auditLogEntry', bot, payload, auditLogEntry, {
    partial: extra?.partial ?? false,
  });
}

export function transformOptionalAuditEntryInfo(bot: Bot, payload: Partial<DiscordOptionalAuditEntryInfo>, extra?: { partial?: boolean }) {
  const optionalAuditEntryInfo = {} as SetupDesiredProps<OptionalAuditEntryInfo, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (payload.application_id) optionalAuditEntryInfo.applicationId = bot.transformers.snowflake(payload.application_id);
  if (payload.auto_moderation_rule_name) optionalAuditEntryInfo.autoModerationRuleName = payload.auto_moderation_rule_name;
  if (payload.auto_moderation_rule_trigger_type) optionalAuditEntryInfo.autoModerationRuleTriggerType = payload.auto_moderation_rule_trigger_type;
  if (payload.channel_id) optionalAuditEntryInfo.channelId = bot.transformers.snowflake(payload.channel_id);
  if (payload.count) optionalAuditEntryInfo.count = Number(payload.count);
  if (payload.delete_member_days) optionalAuditEntryInfo.deleteMemberDays = Number(payload.delete_member_days);
  if (payload.id) optionalAuditEntryInfo.id = bot.transformers.snowflake(payload.id);
  if (payload.members_removed) optionalAuditEntryInfo.membersRemoved = Number(payload.members_removed);
  if (payload.message_id) optionalAuditEntryInfo.messageId = bot.transformers.snowflake(payload.message_id);
  if (payload.role_name) optionalAuditEntryInfo.roleName = payload.role_name;
  if (payload.type) optionalAuditEntryInfo.type = Number(payload.type);
  if (payload.integration_type) optionalAuditEntryInfo.integrationType = payload.integration_type;

  return callCustomizer('optionalAuditEntryInfo', bot, payload, optionalAuditEntryInfo, {
    partial: extra?.partial ?? false,
  });
}
