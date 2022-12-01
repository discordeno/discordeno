[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / AuditLog

# Interface: AuditLog

[@discordeno/bot](../modules/discordeno_bot.md).AuditLog

## Table of contents

### Properties

- [applicationCommands](discordeno_bot.AuditLog.md#applicationcommands)
- [auditLogEntries](discordeno_bot.AuditLog.md#auditlogentries)
- [autoModerationRules](discordeno_bot.AuditLog.md#automoderationrules)
- [guildScheduledEvents](discordeno_bot.AuditLog.md#guildscheduledevents)
- [integrations](discordeno_bot.AuditLog.md#integrations)
- [threads](discordeno_bot.AuditLog.md#threads)
- [users](discordeno_bot.AuditLog.md#users)
- [webhooks](discordeno_bot.AuditLog.md#webhooks)

## Properties

### applicationCommands

• **applicationCommands**: [`ApplicationCommand`](discordeno_bot.ApplicationCommand.md)[]

#### Defined in

[packages/bot/src/helpers/guilds/getAuditLog.ts:20](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/getAuditLog.ts#L20)

---

### auditLogEntries

• **auditLogEntries**: [`AuditLogEntry`](discordeno_bot.AuditLogEntry.md)[]

#### Defined in

[packages/bot/src/helpers/guilds/getAuditLog.ts:13](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/getAuditLog.ts#L13)

---

### autoModerationRules

• `Optional` **autoModerationRules**: [`AutoModerationRule`](discordeno_bot.AutoModerationRule.md)[]

#### Defined in

[packages/bot/src/helpers/guilds/getAuditLog.ts:14](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/getAuditLog.ts#L14)

---

### guildScheduledEvents

• `Optional` **guildScheduledEvents**: [`ScheduledEvent`](discordeno_bot.ScheduledEvent.md)[]

#### Defined in

[packages/bot/src/helpers/guilds/getAuditLog.ts:15](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/getAuditLog.ts#L15)

---

### integrations

• **integrations**: `Partial`<`Omit`<[`Integration`](discordeno_bot.Integration.md), `"guildId"`\>\>[]

#### Defined in

[packages/bot/src/helpers/guilds/getAuditLog.ts:16](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/getAuditLog.ts#L16)

---

### threads

• **threads**: [`Channel`](discordeno_bot.Channel.md)[]

#### Defined in

[packages/bot/src/helpers/guilds/getAuditLog.ts:17](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/getAuditLog.ts#L17)

---

### users

• **users**: [`User`](discordeno_bot.User.md)[]

#### Defined in

[packages/bot/src/helpers/guilds/getAuditLog.ts:18](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/getAuditLog.ts#L18)

---

### webhooks

• **webhooks**: [`Webhook`](discordeno_bot.Webhook.md)[]

#### Defined in

[packages/bot/src/helpers/guilds/getAuditLog.ts:19](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/getAuditLog.ts#L19)
