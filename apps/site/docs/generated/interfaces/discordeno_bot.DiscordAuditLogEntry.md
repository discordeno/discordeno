[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordAuditLogEntry

# Interface: DiscordAuditLogEntry

[@discordeno/bot](../modules/discordeno_bot.md).DiscordAuditLogEntry

https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-entry-structure

## Table of contents

### Properties

- [action_type](discordeno_bot.DiscordAuditLogEntry.md#action_type)
- [changes](discordeno_bot.DiscordAuditLogEntry.md#changes)
- [id](discordeno_bot.DiscordAuditLogEntry.md#id)
- [options](discordeno_bot.DiscordAuditLogEntry.md#options)
- [reason](discordeno_bot.DiscordAuditLogEntry.md#reason)
- [target_id](discordeno_bot.DiscordAuditLogEntry.md#target_id)
- [user_id](discordeno_bot.DiscordAuditLogEntry.md#user_id)

## Properties

### action_type

• **action_type**: [`AuditLogEvents`](../enums/discordeno_bot.AuditLogEvents.md)

Type of action that occurred

#### Defined in

packages/types/dist/discord.d.ts:1397

---

### changes

• `Optional` **changes**: [`DiscordAuditLogChange`](../modules/discordeno_bot.md#discordauditlogchange)[]

Changes made to the `target_id`

#### Defined in

packages/types/dist/discord.d.ts:1391

---

### id

• **id**: `string`

ID of the entry

#### Defined in

packages/types/dist/discord.d.ts:1395

---

### options

• `Optional` **options**: [`DiscordOptionalAuditEntryInfo`](discordeno_bot.DiscordOptionalAuditEntryInfo.md)

Additional info for certain event types

#### Defined in

packages/types/dist/discord.d.ts:1399

---

### reason

• `Optional` **reason**: `string`

Reason for the change (1-512 characters)

#### Defined in

packages/types/dist/discord.d.ts:1401

---

### target_id

• **target_id**: `null` \| `string`

ID of the affected entity (webhook, user, role, etc.)

#### Defined in

packages/types/dist/discord.d.ts:1389

---

### user_id

• **user_id**: `null` \| `string`

User or app that made the changes

#### Defined in

packages/types/dist/discord.d.ts:1393
