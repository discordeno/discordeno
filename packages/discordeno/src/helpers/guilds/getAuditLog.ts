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
import { AuditLogEvents, BigString } from "../../types/shared.ts";

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

// TODO: Move `AuditLog` into its own transformer file.

/**
 * Gets a guild's audit log.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to get the audit log of.
 * @param options - The parameters for the fetching of the audit log.
 * @returns An instance of {@link AuditLog}.
 *
 * @remarks
 * Requires the `VIEW_AUDIT_LOG` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log}
 */
export async function getAuditLog(bot: Bot, guildId: BigString, options?: GetGuildAuditLog): Promise<AuditLog> {
  if (options?.limit) {
    options.limit = options.limit >= 1 && options.limit <= 100 ? options.limit : 50;
  }

  const result = await bot.rest.runMethod<DiscordAuditLog>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_AUDIT_LOGS(guildId, options),
  );

  const id = bot.transformers.snowflake(guildId);
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
    threads: result.threads.map((thread) => bot.transformers.channel(bot, { channel: thread, guildId: id })),
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
  userId?: BigString | string;
  /** Entries for a specific audit log event */
  actionType?: AuditLogEvents;
  /** Entries that preceded a specific audit log entry ID */
  before?: BigString | string;
  /** Maximum number of entries (between 1-100) to return, defaults to 50 */
  limit?: number;
}
