[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordAuditLog

# Interface: DiscordAuditLog

[@discordeno/types](../modules/discordeno_types.md).DiscordAuditLog

https://discord.com/developers/docs/resources/audit-log#audit-log-object

## Table of contents

### Properties

- [application_commands](discordeno_types.DiscordAuditLog.md#application_commands)
- [audit_log_entries](discordeno_types.DiscordAuditLog.md#audit_log_entries)
- [auto_moderation_rules](discordeno_types.DiscordAuditLog.md#auto_moderation_rules)
- [guild_scheduled_events](discordeno_types.DiscordAuditLog.md#guild_scheduled_events)
- [integrations](discordeno_types.DiscordAuditLog.md#integrations)
- [threads](discordeno_types.DiscordAuditLog.md#threads)
- [users](discordeno_types.DiscordAuditLog.md#users)
- [webhooks](discordeno_types.DiscordAuditLog.md#webhooks)

## Properties

### application_commands

• **application_commands**: [`DiscordApplicationCommand`](discordeno_types.DiscordApplicationCommand.md)[]

List of application commands referenced in the audit log

#### Defined in

[packages/types/src/discord.ts:1444](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1444)

---

### audit_log_entries

• **audit_log_entries**: [`DiscordAuditLogEntry`](discordeno_types.DiscordAuditLogEntry.md)[]

List of audit log entries, sorted from most to least recent

#### Defined in

[packages/types/src/discord.ts:1431](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1431)

---

### auto_moderation_rules

• `Optional` **auto_moderation_rules**: [`DiscordAutoModerationRule`](discordeno_types.DiscordAutoModerationRule.md)[]

List of auto moderation rules referenced in the audit log

#### Defined in

[packages/types/src/discord.ts:1442](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1442)

---

### guild_scheduled_events

• `Optional` **guild_scheduled_events**: [`DiscordScheduledEvent`](discordeno_types.DiscordScheduledEvent.md)[]

List of guild scheduled events found in the audit log

#### Defined in

[packages/types/src/discord.ts:1440](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1440)

---

### integrations

• **integrations**: `Partial`<[`DiscordIntegration`](discordeno_types.DiscordIntegration.md)\>[]

List of partial integration objects

#### Defined in

[packages/types/src/discord.ts:1433](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1433)

---

### threads

• **threads**: [`DiscordChannel`](discordeno_types.DiscordChannel.md)[]

List of threads found in the audit log.
Threads referenced in `THREAD_CREATE` and `THREAD_UPDATE` events are included in the threads map since archived threads might not be kept in memory by clients.

#### Defined in

[packages/types/src/discord.ts:1438](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1438)

---

### users

• **users**: [`DiscordUser`](discordeno_types.DiscordUser.md)[]

List of users found in the audit log

#### Defined in

[packages/types/src/discord.ts:1429](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1429)

---

### webhooks

• **webhooks**: [`DiscordWebhook`](../modules/discordeno_types.md#discordwebhook)[]

List of webhooks found in the audit log

#### Defined in

[packages/types/src/discord.ts:1427](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1427)
