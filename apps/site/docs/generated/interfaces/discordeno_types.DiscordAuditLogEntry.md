[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordAuditLogEntry

# Interface: DiscordAuditLogEntry

[@discordeno/types](../modules/discordeno_types.md).DiscordAuditLogEntry

https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-entry-structure

## Table of contents

### Properties

- [action_type](discordeno_types.DiscordAuditLogEntry.md#action_type)
- [changes](discordeno_types.DiscordAuditLogEntry.md#changes)
- [id](discordeno_types.DiscordAuditLogEntry.md#id)
- [options](discordeno_types.DiscordAuditLogEntry.md#options)
- [reason](discordeno_types.DiscordAuditLogEntry.md#reason)
- [target_id](discordeno_types.DiscordAuditLogEntry.md#target_id)
- [user_id](discordeno_types.DiscordAuditLogEntry.md#user_id)

## Properties

### action_type

• **action_type**: [`AuditLogEvents`](../enums/discordeno_types.AuditLogEvents.md)

Type of action that occurred

#### Defined in

[packages/types/src/discord.ts:1565](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1565)

---

### changes

• `Optional` **changes**: [`DiscordAuditLogChange`](../modules/discordeno_types.md#discordauditlogchange)[]

Changes made to the `target_id`

#### Defined in

[packages/types/src/discord.ts:1559](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1559)

---

### id

• **id**: `string`

ID of the entry

#### Defined in

[packages/types/src/discord.ts:1563](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1563)

---

### options

• `Optional` **options**: [`DiscordOptionalAuditEntryInfo`](discordeno_types.DiscordOptionalAuditEntryInfo.md)

Additional info for certain event types

#### Defined in

[packages/types/src/discord.ts:1567](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1567)

---

### reason

• `Optional` **reason**: `string`

Reason for the change (1-512 characters)

#### Defined in

[packages/types/src/discord.ts:1569](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1569)

---

### target_id

• **target_id**: `null` \| `string`

ID of the affected entity (webhook, user, role, etc.)

#### Defined in

[packages/types/src/discord.ts:1557](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1557)

---

### user_id

• **user_id**: `null` \| `string`

User or app that made the changes

#### Defined in

[packages/types/src/discord.ts:1561](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1561)
