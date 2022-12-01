[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordAuditLog

# Interface: DiscordAuditLog

[@discordeno/bot](../modules/discordeno_bot.md).DiscordAuditLog

https://discord.com/developers/docs/resources/audit-log#audit-log-object

## Table of contents

### Properties

- [application_commands](discordeno_bot.DiscordAuditLog.md#application_commands)
- [audit_log_entries](discordeno_bot.DiscordAuditLog.md#audit_log_entries)
- [auto_moderation_rules](discordeno_bot.DiscordAuditLog.md#auto_moderation_rules)
- [guild_scheduled_events](discordeno_bot.DiscordAuditLog.md#guild_scheduled_events)
- [integrations](discordeno_bot.DiscordAuditLog.md#integrations)
- [threads](discordeno_bot.DiscordAuditLog.md#threads)
- [users](discordeno_bot.DiscordAuditLog.md#users)
- [webhooks](discordeno_bot.DiscordAuditLog.md#webhooks)

## Properties

### application_commands

• **application_commands**: [`DiscordApplicationCommand`](discordeno_bot.DiscordApplicationCommand.md)[]

List of application commands referenced in the audit log

#### Defined in

packages/types/dist/discord.d.ts:1287

---

### audit_log_entries

• **audit_log_entries**: [`DiscordAuditLogEntry`](discordeno_bot.DiscordAuditLogEntry.md)[]

List of audit log entries, sorted from most to least recent

#### Defined in

packages/types/dist/discord.d.ts:1274

---

### auto_moderation_rules

• `Optional` **auto_moderation_rules**: [`DiscordAutoModerationRule`](discordeno_bot.DiscordAutoModerationRule.md)[]

List of auto moderation rules referenced in the audit log

#### Defined in

packages/types/dist/discord.d.ts:1285

---

### guild_scheduled_events

• `Optional` **guild_scheduled_events**: [`DiscordScheduledEvent`](discordeno_bot.DiscordScheduledEvent.md)[]

List of guild scheduled events found in the audit log

#### Defined in

packages/types/dist/discord.d.ts:1283

---

### integrations

• **integrations**: `Partial`<[`DiscordIntegration`](discordeno_bot.DiscordIntegration.md)\>[]

List of partial integration objects

#### Defined in

packages/types/dist/discord.d.ts:1276

---

### threads

• **threads**: [`DiscordChannel`](discordeno_bot.DiscordChannel.md)[]

List of threads found in the audit log.
Threads referenced in `THREAD_CREATE` and `THREAD_UPDATE` events are included in the threads map since archived threads might not be kept in memory by clients.

#### Defined in

packages/types/dist/discord.d.ts:1281

---

### users

• **users**: [`DiscordUser`](discordeno_bot.DiscordUser.md)[]

List of users found in the audit log

#### Defined in

packages/types/dist/discord.d.ts:1272

---

### webhooks

• **webhooks**: [`DiscordWebhook`](../modules/discordeno_bot.md#discordwebhook)[]

List of webhooks found in the audit log

#### Defined in

packages/types/dist/discord.d.ts:1270
