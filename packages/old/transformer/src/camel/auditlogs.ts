import type { Camelize, DiscordAuditLog } from '@discordeno/types'
import TRANSFORMERS from '..'

export function c1amelize1Auditlogs (payload: DiscordAuditLog): Camelize<DiscordAuditLog> {
  return {
    users: payload.users.map(user => TRANSFORMERS.user(user)),
    webhooks: payload.webhooks.map(hook => TRANSFORMERS.webhook(hook)),
    threads: payload.threads.map(thread => TRANSFORMERS.channel(thread)),

    auditLogEntries: payload.audit_log_entries.map(log => TRANSFORMERS.auditlogs.entry(log)),
    applicationCommands: payload.application_commands.map(cmd => TRANSFORMERS.command(cmd)),
    guildScheduledEvents: payload.guild_scheduled_events?.map(event => TRANSFORMERS.event(event)),
    autoModerationRules: payload.auto_moderation_rules?.map(rule => TRANSFORMERS.automodRule(rule)),

    integrations: payload.integrations.map(integration => ({
      id: integration.id
    }))
  }
}
