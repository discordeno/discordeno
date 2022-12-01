[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/rest](../modules/discordeno_rest.md) / DiscordAuditLogEntry

# Interface: DiscordAuditLogEntry

[@discordeno/rest](../modules/discordeno_rest.md).DiscordAuditLogEntry

https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-entry-structure

## Table of contents

### Properties

- [action_type](discordeno_rest.DiscordAuditLogEntry.md#action_type)
- [changes](discordeno_rest.DiscordAuditLogEntry.md#changes)
- [id](discordeno_rest.DiscordAuditLogEntry.md#id)
- [options](discordeno_rest.DiscordAuditLogEntry.md#options)
- [reason](discordeno_rest.DiscordAuditLogEntry.md#reason)
- [target_id](discordeno_rest.DiscordAuditLogEntry.md#target_id)
- [user_id](discordeno_rest.DiscordAuditLogEntry.md#user_id)

## Properties

### action_type

• **action_type**: [`AuditLogEvents`](../enums/discordeno_rest.AuditLogEvents.md)

Type of action that occurred

#### Defined in

packages/types/dist/discord.d.ts:1397

---

### changes

• `Optional` **changes**: [`DiscordAuditLogChange`](../modules/discordeno_rest.md#discordauditlogchange)[]

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

• `Optional` **options**: [`DiscordOptionalAuditEntryInfo`](discordeno_rest.DiscordOptionalAuditEntryInfo.md)

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
