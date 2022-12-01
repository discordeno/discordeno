[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / DiscordScheduledEvent

# Interface: DiscordScheduledEvent

[@discordeno/gateway](../modules/discordeno_gateway.md).DiscordScheduledEvent

## Table of contents

### Properties

- [channel_id](discordeno_gateway.DiscordScheduledEvent.md#channel_id)
- [creator](discordeno_gateway.DiscordScheduledEvent.md#creator)
- [creator_id](discordeno_gateway.DiscordScheduledEvent.md#creator_id)
- [description](discordeno_gateway.DiscordScheduledEvent.md#description)
- [entity_id](discordeno_gateway.DiscordScheduledEvent.md#entity_id)
- [entity_metadata](discordeno_gateway.DiscordScheduledEvent.md#entity_metadata)
- [entity_type](discordeno_gateway.DiscordScheduledEvent.md#entity_type)
- [guild_id](discordeno_gateway.DiscordScheduledEvent.md#guild_id)
- [id](discordeno_gateway.DiscordScheduledEvent.md#id)
- [image](discordeno_gateway.DiscordScheduledEvent.md#image)
- [name](discordeno_gateway.DiscordScheduledEvent.md#name)
- [privacy_level](discordeno_gateway.DiscordScheduledEvent.md#privacy_level)
- [scheduled_end_time](discordeno_gateway.DiscordScheduledEvent.md#scheduled_end_time)
- [scheduled_start_time](discordeno_gateway.DiscordScheduledEvent.md#scheduled_start_time)
- [status](discordeno_gateway.DiscordScheduledEvent.md#status)
- [user_count](discordeno_gateway.DiscordScheduledEvent.md#user_count)

## Properties

### channel_id

• **channel_id**: `null` \| `string`

the channel id in which the scheduled event will be hosted if specified

#### Defined in

packages/types/dist/discord.d.ts:1492

---

### creator

• `Optional` **creator**: [`DiscordUser`](discordeno_gateway.DiscordUser.md)

the user that created the scheduled event

#### Defined in

packages/types/dist/discord.d.ts:1514

---

### creator_id

• `Optional` **creator_id**: `null` \| `string`

the id of the user that created the scheduled event

#### Defined in

packages/types/dist/discord.d.ts:1494

---

### description

• `Optional` **description**: `string`

the description of the scheduled event

#### Defined in

packages/types/dist/discord.d.ts:1498

---

### entity_id

• **entity_id**: `null` \| `string`

any additional id of the hosting entity associated with event

#### Defined in

packages/types/dist/discord.d.ts:1510

---

### entity_metadata

• **entity_metadata**: `null` \| [`DiscordScheduledEventEntityMetadata`](discordeno_gateway.DiscordScheduledEventEntityMetadata.md)

the entity metadata for the scheduled event

#### Defined in

packages/types/dist/discord.d.ts:1512

---

### entity_type

• **entity_type**: [`ScheduledEventEntityType`](../enums/discordeno_gateway.ScheduledEventEntityType.md)

the type of hosting entity associated with a scheduled event

#### Defined in

packages/types/dist/discord.d.ts:1508

---

### guild_id

• **guild_id**: `string`

the guild id which the scheduled event belongs to

#### Defined in

packages/types/dist/discord.d.ts:1490

---

### id

• **id**: `string`

the id of the scheduled event

#### Defined in

packages/types/dist/discord.d.ts:1488

---

### image

• `Optional` **image**: `null` \| `string`

the cover image hash of the scheduled event

#### Defined in

packages/types/dist/discord.d.ts:1518

---

### name

• **name**: `string`

the name of the scheduled event

#### Defined in

packages/types/dist/discord.d.ts:1496

---

### privacy_level

• **privacy_level**: [`GuildOnly`](../enums/discordeno_gateway.ScheduledEventPrivacyLevel.md#guildonly)

the privacy level of the scheduled event

#### Defined in

packages/types/dist/discord.d.ts:1504

---

### scheduled_end_time

• **scheduled_end_time**: `null` \| `string`

the time the scheduled event will end if it does end.

#### Defined in

packages/types/dist/discord.d.ts:1502

---

### scheduled_start_time

• **scheduled_start_time**: `string`

the time the scheduled event will start

#### Defined in

packages/types/dist/discord.d.ts:1500

---

### status

• **status**: [`ScheduledEventStatus`](../enums/discordeno_gateway.ScheduledEventStatus.md)

the status of the scheduled event

#### Defined in

packages/types/dist/discord.d.ts:1506

---

### user_count

• `Optional` **user_count**: `number`

the number of users subscribed to the scheduled event

#### Defined in

packages/types/dist/discord.d.ts:1516
