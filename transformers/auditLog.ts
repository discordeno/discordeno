import { DiscordAuditLog } from "../types/discord.ts";
import { Bot } from "../bot.ts";
import { Optionalize } from "../types/shared.ts";

export function transformAuditLog(bot: Bot, payload: DiscordAuditLog & { guildId: bigint }) {
  const auditLog = {
    users: payload.users.map((user) => bot.transformers.user(bot, user)),
    webhook: payload.webhooks.map((hook) => bot.transformers.webhook(bot, hook)),
    auditLogEntries: payload.audit_log_entries.map((entry) => bot.transformers.auditLogEntry(bot, entry)),
    integrations: payload.integrations.map((integration) => ({
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
    threads: payload.threads.map((thread) =>
      bot.transformers.channel(bot, { channel: thread, guildId: payload.guildId })
    ),
    scheduledEvents: payload.guild_scheduled_events?.map((event) => bot.transformers.scheduledEvent(bot, event)),
  };
  return auditLog as Optionalize<typeof auditLog>;
}

export interface AuditLog extends ReturnType<typeof transformAuditLog> {}
