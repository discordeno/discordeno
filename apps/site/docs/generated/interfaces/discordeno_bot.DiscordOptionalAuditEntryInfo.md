[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordOptionalAuditEntryInfo

# Interface: DiscordOptionalAuditEntryInfo

[@discordeno/bot](../modules/discordeno_bot.md).DiscordOptionalAuditEntryInfo

https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-optional-audit-entry-info

## Table of contents

### Properties

- [application_id](discordeno_bot.DiscordOptionalAuditEntryInfo.md#application_id)
- [channel_id](discordeno_bot.DiscordOptionalAuditEntryInfo.md#channel_id)
- [count](discordeno_bot.DiscordOptionalAuditEntryInfo.md#count)
- [delete_member_days](discordeno_bot.DiscordOptionalAuditEntryInfo.md#delete_member_days)
- [id](discordeno_bot.DiscordOptionalAuditEntryInfo.md#id)
- [members_removed](discordeno_bot.DiscordOptionalAuditEntryInfo.md#members_removed)
- [message_id](discordeno_bot.DiscordOptionalAuditEntryInfo.md#message_id)
- [role_name](discordeno_bot.DiscordOptionalAuditEntryInfo.md#role_name)
- [type](discordeno_bot.DiscordOptionalAuditEntryInfo.md#type)

## Properties

### application_id

• **application_id**: `string`

ID of the app whose permissions were targeted.

Event types: `APPLICATION_COMMAND_PERMISSION_UPDATE`

#### Defined in

packages/types/dist/discord.d.ts:1484

---

### channel_id

• **channel_id**: `string`

Channel in which the entities were targeted.

Event types: `MEMBER_MOVE`, `MESSAGE_PIN`, `MESSAGE_UNPIN`, `MESSAGE_DELETE`, `STAGE_INSTANCE_CREATE`, `STAGE_INSTANCE_UPDATE`, `STAGE_INSTANCE_DELETE`

#### Defined in

packages/types/dist/discord.d.ts:1448

---

### count

• **count**: `string`

Number of entities that were targeted.

Event types: `MESSAGE_DELETE`, `MESSAGE_BULK_DELETE`, `MEMBER_DISCONNECT`, `MEMBER_MOVE`

#### Defined in

packages/types/dist/discord.d.ts:1460

---

### delete_member_days

• **delete_member_days**: `string`

Number of days after which inactive members were kicked.

Event types: `MEMBER_PRUNE`

#### Defined in

packages/types/dist/discord.d.ts:1436

---

### id

• **id**: `string`

ID of the overwritten entity.

Event types: `CHANNEL_OVERWRITE_CREATE`, `CHANNEL_OVERWRITE_UPDATE`, `CHANNEL_OVERWRITE_DELETE`

#### Defined in

packages/types/dist/discord.d.ts:1466

---

### members_removed

• **members_removed**: `string`

Number of members removed by the prune.

Event types: `MEMBER_PRUNE`

#### Defined in

packages/types/dist/discord.d.ts:1442

---

### message_id

• **message_id**: `string`

ID of the message that was targeted.

Event types: `MESSAGE_PIN`, `MESSAGE_UNPIN`, `STAGE_INSTANCE_CREATE`, `STAGE_INSTANCE_UPDATE`, `STAGE_INSTANCE_DELETE`

#### Defined in

packages/types/dist/discord.d.ts:1454

---

### role_name

• **role_name**: `string`

Name of the role if type is "0" (not present if type is "1").

Event types: `CHANNEL_OVERWRITE_CREATE`, `CHANNEL_OVERWRITE_UPDATE`, `CHANNEL_OVERWRITE_DELETE`

#### Defined in

packages/types/dist/discord.d.ts:1478

---

### type

• **type**: `string`

Type of overwritten entity - "0", for "role", or "1" for "member".

Event types: `CHANNEL_OVERWRITE_CREATE`, `CHANNEL_OVERWRITE_UPDATE`, `CHANNEL_OVERWRITE_DELETE`

#### Defined in

packages/types/dist/discord.d.ts:1472
