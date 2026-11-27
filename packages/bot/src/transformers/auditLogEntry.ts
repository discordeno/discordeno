import type { DiscordAuditLogEntry, DiscordOptionalAuditEntryInfo } from '@discordeno/types';
import { camelize } from '@discordeno/utils';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import type { AuditLogEntry, OptionalAuditEntryInfo } from './types.js';

export function transformAuditLogEntry(bot: Bot, payload: Partial<DiscordAuditLogEntry>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.auditLogEntry;
  const auditLogEntry = {} as SetupDesiredProps<AuditLogEntry, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.id && payload.id) auditLogEntry.id = bot.transformers.snowflake(payload.id);
  if (props.userId && payload.user_id) auditLogEntry.userId = bot.transformers.snowflake(payload.user_id);
  if (props.reason && payload.reason) auditLogEntry.reason = payload.reason;
  if (props.changes && payload.changes) auditLogEntry.changes = camelize(payload.changes);
  if (props.targetId && payload.target_id) auditLogEntry.targetId = bot.transformers.snowflake(payload.target_id);
  if (props.actionType && payload.action_type !== undefined) auditLogEntry.actionType = payload.action_type;
  if (props.options && payload.options) auditLogEntry.options = bot.transformers.optionalAuditEntryInfo(bot, payload.options);

  return callCustomizer('auditLogEntry', bot, payload, auditLogEntry, {
    partial: extra?.partial ?? false,
  });
}

export function transformOptionalAuditEntryInfo(bot: Bot, payload: Partial<DiscordOptionalAuditEntryInfo>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.optionalAuditEntryInfo;
  const optionalAuditEntryInfo = {} as SetupDesiredProps<OptionalAuditEntryInfo, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.applicationId && payload.application_id) optionalAuditEntryInfo.applicationId = bot.transformers.snowflake(payload.application_id);
  if (props.autoModerationRuleName && payload.auto_moderation_rule_name)
    optionalAuditEntryInfo.autoModerationRuleName = payload.auto_moderation_rule_name;
  if (props.autoModerationRuleTriggerType && payload.auto_moderation_rule_trigger_type)
    optionalAuditEntryInfo.autoModerationRuleTriggerType = payload.auto_moderation_rule_trigger_type;
  if (props.channelId && payload.channel_id) optionalAuditEntryInfo.channelId = bot.transformers.snowflake(payload.channel_id);
  if (props.count && payload.count) optionalAuditEntryInfo.count = Number(payload.count);
  if (props.deleteMemberDays && payload.delete_member_days) optionalAuditEntryInfo.deleteMemberDays = Number(payload.delete_member_days);
  if (props.id && payload.id) optionalAuditEntryInfo.id = bot.transformers.snowflake(payload.id);
  if (props.membersRemoved && payload.members_removed) optionalAuditEntryInfo.membersRemoved = Number(payload.members_removed);
  if (props.messageId && payload.message_id) optionalAuditEntryInfo.messageId = bot.transformers.snowflake(payload.message_id);
  if (props.roleName && payload.role_name) optionalAuditEntryInfo.roleName = payload.role_name;
  if (props.type && payload.type) optionalAuditEntryInfo.type = Number(payload.type);
  if (props.integrationType && payload.integration_type) optionalAuditEntryInfo.integrationType = payload.integration_type;
  if (props.status && payload.status) optionalAuditEntryInfo.status = payload.status;

  return callCustomizer('optionalAuditEntryInfo', bot, payload, optionalAuditEntryInfo, {
    partial: extra?.partial ?? false,
  });
}
