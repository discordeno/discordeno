[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordScheduledEvent

# Interface: DiscordScheduledEvent

[@discordeno/types](../modules/discordeno_types.md).DiscordScheduledEvent

## Table of contents

### Properties

- [channel_id](discordeno_types.DiscordScheduledEvent.md#channel_id)
- [creator](discordeno_types.DiscordScheduledEvent.md#creator)
- [creator_id](discordeno_types.DiscordScheduledEvent.md#creator_id)
- [description](discordeno_types.DiscordScheduledEvent.md#description)
- [entity_id](discordeno_types.DiscordScheduledEvent.md#entity_id)
- [entity_metadata](discordeno_types.DiscordScheduledEvent.md#entity_metadata)
- [entity_type](discordeno_types.DiscordScheduledEvent.md#entity_type)
- [guild_id](discordeno_types.DiscordScheduledEvent.md#guild_id)
- [id](discordeno_types.DiscordScheduledEvent.md#id)
- [image](discordeno_types.DiscordScheduledEvent.md#image)
- [name](discordeno_types.DiscordScheduledEvent.md#name)
- [privacy_level](discordeno_types.DiscordScheduledEvent.md#privacy_level)
- [scheduled_end_time](discordeno_types.DiscordScheduledEvent.md#scheduled_end_time)
- [scheduled_start_time](discordeno_types.DiscordScheduledEvent.md#scheduled_start_time)
- [status](discordeno_types.DiscordScheduledEvent.md#status)
- [user_count](discordeno_types.DiscordScheduledEvent.md#user_count)

## Properties

### channel_id

• **channel_id**: `null` \| `string`

the channel id in which the scheduled event will be hosted if specified

#### Defined in

[packages/types/src/discord.ts:1731](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1731)

---

### creator

• `Optional` **creator**: [`DiscordUser`](discordeno_types.DiscordUser.md)

the user that created the scheduled event

#### Defined in

[packages/types/src/discord.ts:1753](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1753)

---

### creator_id

• `Optional` **creator_id**: `null` \| `string`

the id of the user that created the scheduled event

#### Defined in

[packages/types/src/discord.ts:1733](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1733)

---

### description

• `Optional` **description**: `string`

the description of the scheduled event

#### Defined in

[packages/types/src/discord.ts:1737](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1737)

---

### entity_id

• **entity_id**: `null` \| `string`

any additional id of the hosting entity associated with event

#### Defined in

[packages/types/src/discord.ts:1749](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1749)

---

### entity_metadata

• **entity_metadata**: `null` \| [`DiscordScheduledEventEntityMetadata`](discordeno_types.DiscordScheduledEventEntityMetadata.md)

the entity metadata for the scheduled event

#### Defined in

[packages/types/src/discord.ts:1751](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1751)

---

### entity_type

• **entity_type**: [`ScheduledEventEntityType`](../enums/discordeno_types.ScheduledEventEntityType.md)

the type of hosting entity associated with a scheduled event

#### Defined in

[packages/types/src/discord.ts:1747](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1747)

---

### guild_id

• **guild_id**: `string`

the guild id which the scheduled event belongs to

#### Defined in

[packages/types/src/discord.ts:1729](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1729)

---

### id

• **id**: `string`

the id of the scheduled event

#### Defined in

[packages/types/src/discord.ts:1727](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1727)

---

### image

• `Optional` **image**: `null` \| `string`

the cover image hash of the scheduled event

#### Defined in

[packages/types/src/discord.ts:1757](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1757)

---

### name

• **name**: `string`

the name of the scheduled event

#### Defined in

[packages/types/src/discord.ts:1735](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1735)

---

### privacy_level

• **privacy_level**: [`GuildOnly`](../enums/discordeno_types.ScheduledEventPrivacyLevel.md#guildonly)

the privacy level of the scheduled event

#### Defined in

[packages/types/src/discord.ts:1743](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1743)

---

### scheduled_end_time

• **scheduled_end_time**: `null` \| `string`

the time the scheduled event will end if it does end.

#### Defined in

[packages/types/src/discord.ts:1741](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1741)

---

### scheduled_start_time

• **scheduled_start_time**: `string`

the time the scheduled event will start

#### Defined in

[packages/types/src/discord.ts:1739](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1739)

---

### status

• **status**: [`ScheduledEventStatus`](../enums/discordeno_types.ScheduledEventStatus.md)

the status of the scheduled event

#### Defined in

[packages/types/src/discord.ts:1745](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1745)

---

### user_count

• `Optional` **user_count**: `number`

the number of users subscribed to the scheduled event

#### Defined in

[packages/types/src/discord.ts:1755](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1755)
