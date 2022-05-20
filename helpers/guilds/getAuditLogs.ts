import type { Bot } from "../../bot.ts";
import { DiscordAuditLog } from "../../types/discord.ts";
import { AuditLogEvents } from "../../types/shared.ts";

/** Returns the audit logs for the guild. Requires VIEW AUDIT LOGS permission */
export async function getAuditLogs(bot: Bot, guildId: bigint, options?: GetGuildAuditLog) {
  if (options?.limit) options.limit = options.limit >= 1 && options.limit <= 100 ? options.limit : 50;

  let url = bot.constants.endpoints.GUILD_AUDIT_LOGS(guildId);
  if (options) {
    url += "?";

    if (options.actionType) url += `action_type=${options.actionType}`;
    if (options.before) url += `&before=${options.before}`;
    if (options.limit) url += `&limit=${options.limit}`;
    if (options.userId) url += `&user_id=${options.userId}`;
  }
  const auditlog = await bot.rest.runMethod<DiscordAuditLog>(
    bot.rest,
    "get",
    url,
  );

  return {
    users: auditlog.users.map((user) => bot.transformers.user(bot, user)),
    webhook: auditlog.webhooks.map((hook) => bot.transformers.webhook(bot, hook)),
    auditLogEntries: auditlog.audit_log_entries.map((entry) => bot.transformers.auditLogEntry(bot, entry)),
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
  /** Entries from a specific user ID */
  userId?: bigint | string;
  /** Entries for a specific audit log event */
  actionType?: AuditLogEvents;
  /** Entries that preceded a specific audit log entry ID */
  before?: bigint | string;
  /** Maximum number of entries (between 1-100) to return, defaults to 50 */
  limit?: number;
}
