[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / DiscordAuditLog

# Interface: DiscordAuditLog

[@discordeno/gateway](../modules/discordeno_gateway.md).DiscordAuditLog

https://discord.com/developers/docs/resources/audit-log#audit-log-object

## Table of contents

### Properties

- [application_commands](discordeno_gateway.DiscordAuditLog.md#application_commands)
- [audit_log_entries](discordeno_gateway.DiscordAuditLog.md#audit_log_entries)
- [auto_moderation_rules](discordeno_gateway.DiscordAuditLog.md#auto_moderation_rules)
- [guild_scheduled_events](discordeno_gateway.DiscordAuditLog.md#guild_scheduled_events)
- [integrations](discordeno_gateway.DiscordAuditLog.md#integrations)
- [threads](discordeno_gateway.DiscordAuditLog.md#threads)
- [users](discordeno_gateway.DiscordAuditLog.md#users)
- [webhooks](discordeno_gateway.DiscordAuditLog.md#webhooks)

## Properties

### application_commands

• **application_commands**: [`DiscordApplicationCommand`](discordeno_gateway.DiscordApplicationCommand.md)[]

List of application commands referenced in the audit log

#### Defined in

packages/types/dist/discord.d.ts:1287

---

### audit_log_entries

• **audit_log_entries**: [`DiscordAuditLogEntry`](discordeno_gateway.DiscordAuditLogEntry.md)[]

List of audit log entries, sorted from most to least recent

#### Defined in

packages/types/dist/discord.d.ts:1274

---

### auto_moderation_rules

• `Optional` **auto_moderation_rules**: [`DiscordAutoModerationRule`](discordeno_gateway.DiscordAutoModerationRule.md)[]

List of auto moderation rules referenced in the audit log

#### Defined in

packages/types/dist/discord.d.ts:1285

---

### guild_scheduled_events

• `Optional` **guild_scheduled_events**: [`DiscordScheduledEvent`](discordeno_gateway.DiscordScheduledEvent.md)[]

List of guild scheduled events found in the audit log

#### Defined in

packages/types/dist/discord.d.ts:1283

---

### integrations

• **integrations**: `Partial`<[`DiscordIntegration`](discordeno_gateway.DiscordIntegration.md)\>[]

List of partial integration objects

#### Defined in

packages/types/dist/discord.d.ts:1276

---

### threads

• **threads**: [`DiscordChannel`](discordeno_gateway.DiscordChannel.md)[]

List of threads found in the audit log.
Threads referenced in `THREAD_CREATE` and `THREAD_UPDATE` events are included in the threads map since archived threads might not be kept in memory by clients.

#### Defined in

packages/types/dist/discord.d.ts:1281

---

### users

• **users**: [`DiscordUser`](discordeno_gateway.DiscordUser.md)[]

List of users found in the audit log

#### Defined in

packages/types/dist/discord.d.ts:1272

---

### webhooks

• **webhooks**: [`DiscordWebhook`](../modules/discordeno_gateway.md#discordwebhook)[]

List of webhooks found in the audit log

#### Defined in

packages/types/dist/discord.d.ts:1270
