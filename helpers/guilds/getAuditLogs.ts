import type { Bot } from "../../bot.ts";
import { DiscordAuditLog } from "../../types/discord.ts";
import { AuditLogEvents } from "../../types/shared.ts";

/** Returns the audit logs for the guild. Requires VIEW AUDIT LOGS permission */
export async function getAuditLogs(bot: Bot, guildId: bigint, options?: GetGuildAuditLog) {
  if (options?.userId) options.userId = options.userId.toString();
  if (options?.before) options.before = options.before.toString();
  if (options?.limit) options.limit = options.limit >= 1 && options.limit <= 100 ? options.limit : 50;

  const auditlog = await bot.rest.runMethod<DiscordAuditLog>(
    bot.rest,
    "get",
    bot.constants.endpoints.GUILD_AUDIT_LOGS(guildId),
    options,
  );

  return {
    users: auditlog.users.map((user) => bot.transformers.user(bot, user)),
    webhook: auditlog.webhooks.map((hook) => bot.transformers.webhook(bot, hook)),
    auditLogEntries: auditlog.audit_log_entries.map((entry) => bot.transformers.auditlogEntry(bot, entry)),
    integrations: auditlog.integrations.map((integration) => ({
      id: integration.id ? bot.transformers.snowflake(integration.id) : undefined,
      name: integration.name,
      type: integration.type,
      enabled: integration.enabled,
      syncing: integration.syncing,
      roleId: integration.role_id ? bot.transformers.snowflake(integration.role_id) : undefined,
      enableEmoticons: integration.enable_emoticons,
      expireBehavior: integration.expire_behavior,
      expireGracePeriod: integration.expire_grace_period,
      user: integration.user ? bot.transformers.user(bot, integration.user) : undefined,
      account: {
        id: integration.account?.id ? bot.transformers.snowflake(integration.account.id) : undefined,
        name: integration.account?.name,
      },
      syncedAt: integration.synced_at ? Date.parse(integration.synced_at) : undefined,
      subscriberCount: integration.subscriber_count,
      revoked: integration.revoked,
      application: integration.application
        ? {
          id: bot.transformers.snowflake(integration.application.id),
          name: integration.application.name,
          icon: integration.application.icon ? bot.utils.iconHashToBigInt(integration.application.icon) : undefined,
          description: integration.application.description,
          bot: integration.application.bot ? bot.transformers.user(bot, integration.application.bot) : undefined,
        }
        : undefined,
    })),
    threads: auditlog.threads.map((thread) => bot.transformers.channel(bot, { channel: thread, guildId })),
    scheduledEvents: auditlog.guild_scheduled_events?.map((event) => bot.transformers.scheduledEvent(bot, event)),
  };
}

/** https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log-query-string-parameters */
export interface GetGuildAuditLog {
  /** Filter the log for actions made by a user */
  userId?: bigint | string;
  /** The type of audit log event */
  actionType?: AuditLogEvents;
  /** Filter the log before a certain entry id */
  before?: bigint | string;
  /** How many entries are returned (default 50, minimum 1, maximum 100) */
  limit?: number;
}
