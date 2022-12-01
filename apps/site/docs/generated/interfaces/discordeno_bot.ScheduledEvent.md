[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / ScheduledEvent

# Interface: ScheduledEvent

[@discordeno/bot](../modules/discordeno_bot.md).ScheduledEvent

## Hierarchy

- `ReturnType`<typeof [`transformScheduledEvent`](../modules/discordeno_bot.md#transformscheduledevent)\>

  ↳ **`ScheduledEvent`**

## Table of contents

### Properties

- [channelId](discordeno_bot.ScheduledEvent.md#channelid)
- [creator](discordeno_bot.ScheduledEvent.md#creator)
- [creatorId](discordeno_bot.ScheduledEvent.md#creatorid)
- [description](discordeno_bot.ScheduledEvent.md#description)
- [entityId](discordeno_bot.ScheduledEvent.md#entityid)
- [entityType](discordeno_bot.ScheduledEvent.md#entitytype)
- [guildId](discordeno_bot.ScheduledEvent.md#guildid)
- [id](discordeno_bot.ScheduledEvent.md#id)
- [image](discordeno_bot.ScheduledEvent.md#image)
- [location](discordeno_bot.ScheduledEvent.md#location)
- [name](discordeno_bot.ScheduledEvent.md#name)
- [privacyLevel](discordeno_bot.ScheduledEvent.md#privacylevel)
- [scheduledEndTime](discordeno_bot.ScheduledEvent.md#scheduledendtime)
- [scheduledStartTime](discordeno_bot.ScheduledEvent.md#scheduledstarttime)
- [status](discordeno_bot.ScheduledEvent.md#status)
- [userCount](discordeno_bot.ScheduledEvent.md#usercount)

## Properties

### channelId

• **channelId**: `undefined` \| `bigint`

#### Inherited from

ReturnType.channelId

---

### creator

• **creator**: `undefined` \| { `avatar`: `undefined` \| `bigint` ; `discriminator`: `string` ; `email`: `undefined` \| `string` ; `flags`: `undefined` \| [`UserFlags`](../enums/discordeno_bot.UserFlags.md) ; `id`: `bigint` ; `locale`: `undefined` \| `string` ; `premiumType`: `undefined` \| [`PremiumTypes`](../enums/discordeno_bot.PremiumTypes.md) ; `publicFlags`: `undefined` \| [`UserFlags`](../enums/discordeno_bot.UserFlags.md) ; `toggles`: [`UserToggles`](../classes/discordeno_bot.UserToggles.md) ; `username`: `string` }

#### Inherited from

ReturnType.creator

---

### creatorId

• **creatorId**: `bigint`

#### Inherited from

ReturnType.creatorId

---

### description

• **description**: `undefined` \| `string`

#### Inherited from

ReturnType.description

---

### entityId

• **entityId**: `undefined` \| `bigint`

#### Inherited from

ReturnType.entityId

---

### entityType

• **entityType**: [`ScheduledEventEntityType`](../enums/discordeno_bot.ScheduledEventEntityType.md)

#### Inherited from

ReturnType.entityType

---

### guildId

• **guildId**: `bigint`

#### Inherited from

ReturnType.guildId

---

### id

• **id**: `bigint`

#### Inherited from

ReturnType.id

---

### image

• **image**: `undefined` \| `bigint`

#### Inherited from

ReturnType.image

---

### location

• **location**: `undefined` \| `string`

#### Inherited from

ReturnType.location

---

### name

• **name**: `string`

#### Inherited from

ReturnType.name

---

### privacyLevel

• **privacyLevel**: [`GuildOnly`](../enums/discordeno_bot.ScheduledEventPrivacyLevel.md#guildonly)

#### Inherited from

ReturnType.privacyLevel

---

### scheduledEndTime

• **scheduledEndTime**: `undefined` \| `number`

#### Inherited from

ReturnType.scheduledEndTime

---

### scheduledStartTime

• **scheduledStartTime**: `number`

#### Inherited from

ReturnType.scheduledStartTime

---

### status

• **status**: [`ScheduledEventStatus`](../enums/discordeno_bot.ScheduledEventStatus.md)

#### Inherited from

ReturnType.status

---

### userCount

• **userCount**: `number`

#### Inherited from

ReturnType.userCount
