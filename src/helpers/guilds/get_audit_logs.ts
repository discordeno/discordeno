import type { AuditLog } from "../../types/audit_log/audit_log.ts";
import type { GetGuildAuditLog } from "../../types/audit_log/get_guild_audit_log.ts";
import type { Bot } from "../../bot.ts";

/** Returns the audit logs for the guild. Requires VIEW AUDIT LOGS permission */
export async function getAuditLogs(bot: Bot, guildId: bigint, options?: GetGuildAuditLog) {
  await bot.utils.requireBotGuildPermissions(bot, guildId, ["VIEW_AUDIT_LOG"]);

  if (options?.userId) options.userId = options.userId.toString();
  if (options?.before) options.before = options.before.toString();
  if (options?.limit) options.limit = options.limit >= 1 && options.limit <= 100 ? options.limit : 50;

  const auditlog = await bot.rest.runMethod<AuditLog>(
    bot.rest,
    "get",
    bot.constants.endpoints.GUILD_AUDIT_LOGS(guildId),
    options
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
            summary: integration.application.summary,
            bot: integration.application.bot ? bot.transformers.user(bot, integration.application.bot) : undefined,
          }
        : undefined,
    })),
  };
}
