import type { Bot } from "../../bot.ts";
import { ApplicationCommand } from "../../transformers/applicationCommand.ts";
import { AuditLogEntry } from "../../transformers/auditLogEntry.ts";
import { AutoModerationRule } from "../../transformers/automodRule.ts";
import { Channel } from "../../transformers/channel.ts";
import { Integration } from "../../transformers/integration.ts";
import { User } from "../../transformers/member.ts";
import { ScheduledEvent } from "../../transformers/scheduledEvent.ts";
import { Webhook } from "../../transformers/webhook.ts";
import { DiscordAuditLog } from "../../types/discord.ts";
import { AuditLogEvents } from "../../types/shared.ts";

export type AuditLog = {
  auditLogEntries: AuditLogEntry[];
  autoModerationRules?: AutoModerationRule[];
  guildScheduledEvents?: ScheduledEvent[];
  integrations: Partial<Omit<Integration, "guildId">>[];
  threads: Channel[];
  users: User[];
  webhooks: Webhook[];
  applicationCommands: ApplicationCommand[];
};

/** Returns the audit logs for the guild. Requires VIEW_AUDIT_LOGS permission */
export async function getAuditLogs(bot: Bot, guildId: bigint, options?: GetGuildAuditLog): Promise<AuditLog> {
  if (options?.limit) {
    options.limit = options.limit >= 1 && options.limit <= 100 ? options.limit : 50;
  }

  const result = await bot.rest.runMethod<DiscordAuditLog>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_AUDIT_LOGS(guildId, options),
  );

  return {
    auditLogEntries: result.audit_log_entries.map((entry) => bot.transformers.auditLogEntry(bot, entry)),
    autoModerationRules: result.auto_moderation_rules?.map((rule) => bot.transformers.automodRule(bot, rule)),
    guildScheduledEvents: result.guild_scheduled_events?.map((event) => bot.transformers.scheduledEvent(bot, event)),
    integrations: result.integrations.map((integration) => ({
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
      account: integration.account
        ? {
          id: bot.transformers.snowflake(integration.account.id),
          name: integration.account.name,
        }
        : undefined,
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
    threads: result.threads.map((thread) => bot.transformers.channel(bot, { channel: thread, guildId })),
    users: result.users.map((user) => bot.transformers.user(bot, user)),
    webhooks: result.webhooks.map((hook) => bot.transformers.webhook(bot, hook)),
    applicationCommands: result.application_commands.map((applicationCommand) =>
      bot.transformers.applicationCommand(bot, applicationCommand)
    ),
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
