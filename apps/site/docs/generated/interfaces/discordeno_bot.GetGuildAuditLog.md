[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / GetGuildAuditLog

# Interface: GetGuildAuditLog

[@discordeno/bot](../modules/discordeno_bot.md).GetGuildAuditLog

https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log-query-string-parameters

## Table of contents

### Properties

- [actionType](discordeno_bot.GetGuildAuditLog.md#actiontype)
- [before](discordeno_bot.GetGuildAuditLog.md#before)
- [limit](discordeno_bot.GetGuildAuditLog.md#limit)
- [userId](discordeno_bot.GetGuildAuditLog.md#userid)

## Properties

### actionType

• `Optional` **actionType**: [`AuditLogEvents`](../enums/discordeno_bot.AuditLogEvents.md)

Entries for a specific audit log event

#### Defined in

[packages/bot/src/helpers/guilds/getAuditLog.ts:98](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/getAuditLog.ts#L98)

---

### before

• `Optional` **before**: [`BigString`](../modules/discordeno_bot.md#bigstring)

Entries that preceded a specific audit log entry ID

#### Defined in

[packages/bot/src/helpers/guilds/getAuditLog.ts:100](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/getAuditLog.ts#L100)

---

### limit

• `Optional` **limit**: `number`

Maximum number of entries (between 1-100) to return, defaults to 50

#### Defined in

[packages/bot/src/helpers/guilds/getAuditLog.ts:102](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/getAuditLog.ts#L102)

---

### userId

• `Optional` **userId**: [`BigString`](../modules/discordeno_bot.md#bigstring)

Entries from a specific user ID

#### Defined in

[packages/bot/src/helpers/guilds/getAuditLog.ts:96](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/getAuditLog.ts#L96)
