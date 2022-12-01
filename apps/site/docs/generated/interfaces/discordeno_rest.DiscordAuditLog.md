[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/rest](../modules/discordeno_rest.md) / DiscordAuditLog

# Interface: DiscordAuditLog

[@discordeno/rest](../modules/discordeno_rest.md).DiscordAuditLog

https://discord.com/developers/docs/resources/audit-log#audit-log-object

## Table of contents

### Properties

- [application_commands](discordeno_rest.DiscordAuditLog.md#application_commands)
- [audit_log_entries](discordeno_rest.DiscordAuditLog.md#audit_log_entries)
- [auto_moderation_rules](discordeno_rest.DiscordAuditLog.md#auto_moderation_rules)
- [guild_scheduled_events](discordeno_rest.DiscordAuditLog.md#guild_scheduled_events)
- [integrations](discordeno_rest.DiscordAuditLog.md#integrations)
- [threads](discordeno_rest.DiscordAuditLog.md#threads)
- [users](discordeno_rest.DiscordAuditLog.md#users)
- [webhooks](discordeno_rest.DiscordAuditLog.md#webhooks)

## Properties

### application_commands

• **application_commands**: [`DiscordApplicationCommand`](discordeno_rest.DiscordApplicationCommand.md)[]

List of application commands referenced in the audit log

#### Defined in

packages/types/dist/discord.d.ts:1287

---

### audit_log_entries

• **audit_log_entries**: [`DiscordAuditLogEntry`](discordeno_rest.DiscordAuditLogEntry.md)[]

List of audit log entries, sorted from most to least recent

#### Defined in

packages/types/dist/discord.d.ts:1274

---

### auto_moderation_rules

• `Optional` **auto_moderation_rules**: [`DiscordAutoModerationRule`](discordeno_rest.DiscordAutoModerationRule.md)[]

List of auto moderation rules referenced in the audit log

#### Defined in

packages/types/dist/discord.d.ts:1285

---

### guild_scheduled_events

• `Optional` **guild_scheduled_events**: [`DiscordScheduledEvent`](discordeno_rest.DiscordScheduledEvent.md)[]

List of guild scheduled events found in the audit log

#### Defined in

packages/types/dist/discord.d.ts:1283

---

### integrations

• **integrations**: `Partial`<[`DiscordIntegration`](discordeno_rest.DiscordIntegration.md)\>[]

List of partial integration objects

#### Defined in

packages/types/dist/discord.d.ts:1276

---

### threads

• **threads**: [`DiscordChannel`](discordeno_rest.DiscordChannel.md)[]

List of threads found in the audit log.
Threads referenced in `THREAD_CREATE` and `THREAD_UPDATE` events are included in the threads map since archived threads might not be kept in memory by clients.

#### Defined in

packages/types/dist/discord.d.ts:1281

---

### users

• **users**: [`DiscordUser`](discordeno_rest.DiscordUser.md)[]

List of users found in the audit log

#### Defined in

packages/types/dist/discord.d.ts:1272

---

### webhooks

• **webhooks**: [`DiscordWebhook`](../modules/discordeno_rest.md#discordwebhook)[]

List of webhooks found in the audit log

#### Defined in

packages/types/dist/discord.d.ts:1270
