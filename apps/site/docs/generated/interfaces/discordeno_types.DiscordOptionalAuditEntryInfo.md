[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordOptionalAuditEntryInfo

# Interface: DiscordOptionalAuditEntryInfo

[@discordeno/types](../modules/discordeno_types.md).DiscordOptionalAuditEntryInfo

https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-optional-audit-entry-info

## Table of contents

### Properties

- [application_id](discordeno_types.DiscordOptionalAuditEntryInfo.md#application_id)
- [channel_id](discordeno_types.DiscordOptionalAuditEntryInfo.md#channel_id)
- [count](discordeno_types.DiscordOptionalAuditEntryInfo.md#count)
- [delete_member_days](discordeno_types.DiscordOptionalAuditEntryInfo.md#delete_member_days)
- [id](discordeno_types.DiscordOptionalAuditEntryInfo.md#id)
- [members_removed](discordeno_types.DiscordOptionalAuditEntryInfo.md#members_removed)
- [message_id](discordeno_types.DiscordOptionalAuditEntryInfo.md#message_id)
- [role_name](discordeno_types.DiscordOptionalAuditEntryInfo.md#role_name)
- [type](discordeno_types.DiscordOptionalAuditEntryInfo.md#type)

## Properties

### application_id

• **application_id**: `string`

ID of the app whose permissions were targeted.

Event types: `APPLICATION_COMMAND_PERMISSION_UPDATE`

#### Defined in

[packages/types/src/discord.ts:1722](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1722)

---

### channel_id

• **channel_id**: `string`

Channel in which the entities were targeted.

Event types: `MEMBER_MOVE`, `MESSAGE_PIN`, `MESSAGE_UNPIN`, `MESSAGE_DELETE`, `STAGE_INSTANCE_CREATE`, `STAGE_INSTANCE_UPDATE`, `STAGE_INSTANCE_DELETE`

#### Defined in

[packages/types/src/discord.ts:1686](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1686)

---

### count

• **count**: `string`

Number of entities that were targeted.

Event types: `MESSAGE_DELETE`, `MESSAGE_BULK_DELETE`, `MEMBER_DISCONNECT`, `MEMBER_MOVE`

#### Defined in

[packages/types/src/discord.ts:1698](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1698)

---

### delete_member_days

• **delete_member_days**: `string`

Number of days after which inactive members were kicked.

Event types: `MEMBER_PRUNE`

#### Defined in

[packages/types/src/discord.ts:1674](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1674)

---

### id

• **id**: `string`

ID of the overwritten entity.

Event types: `CHANNEL_OVERWRITE_CREATE`, `CHANNEL_OVERWRITE_UPDATE`, `CHANNEL_OVERWRITE_DELETE`

#### Defined in

[packages/types/src/discord.ts:1704](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1704)

---

### members_removed

• **members_removed**: `string`

Number of members removed by the prune.

Event types: `MEMBER_PRUNE`

#### Defined in

[packages/types/src/discord.ts:1680](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1680)

---

### message_id

• **message_id**: `string`

ID of the message that was targeted.

Event types: `MESSAGE_PIN`, `MESSAGE_UNPIN`, `STAGE_INSTANCE_CREATE`, `STAGE_INSTANCE_UPDATE`, `STAGE_INSTANCE_DELETE`

#### Defined in

[packages/types/src/discord.ts:1692](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1692)

---

### role_name

• **role_name**: `string`

Name of the role if type is "0" (not present if type is "1").

Event types: `CHANNEL_OVERWRITE_CREATE`, `CHANNEL_OVERWRITE_UPDATE`, `CHANNEL_OVERWRITE_DELETE`

#### Defined in

[packages/types/src/discord.ts:1716](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1716)

---

### type

• **type**: `string`

Type of overwritten entity - "0", for "role", or "1" for "member".

Event types: `CHANNEL_OVERWRITE_CREATE`, `CHANNEL_OVERWRITE_UPDATE`, `CHANNEL_OVERWRITE_DELETE`

#### Defined in

[packages/types/src/discord.ts:1710](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1710)
