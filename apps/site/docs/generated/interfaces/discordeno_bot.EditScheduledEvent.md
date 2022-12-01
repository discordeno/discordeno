[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / EditScheduledEvent

# Interface: EditScheduledEvent

[@discordeno/bot](../modules/discordeno_bot.md).EditScheduledEvent

## Hierarchy

- [`WithReason`](discordeno_bot.WithReason.md)

  ↳ **`EditScheduledEvent`**

## Table of contents

### Properties

- [channelId](discordeno_bot.EditScheduledEvent.md#channelid)
- [description](discordeno_bot.EditScheduledEvent.md#description)
- [entityType](discordeno_bot.EditScheduledEvent.md#entitytype)
- [location](discordeno_bot.EditScheduledEvent.md#location)
- [name](discordeno_bot.EditScheduledEvent.md#name)
- [privacyLevel](discordeno_bot.EditScheduledEvent.md#privacylevel)
- [reason](discordeno_bot.EditScheduledEvent.md#reason)
- [scheduledEndTime](discordeno_bot.EditScheduledEvent.md#scheduledendtime)
- [scheduledStartTime](discordeno_bot.EditScheduledEvent.md#scheduledstarttime)
- [status](discordeno_bot.EditScheduledEvent.md#status)

## Properties

### channelId

• **channelId**: `null` \| [`BigString`](../modules/discordeno_bot.md#bigstring)

the channel id of the scheduled event. null if switching to external event.

#### Defined in

[packages/bot/src/helpers/guilds/events/editScheduledEvent.ts:71](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/events/editScheduledEvent.ts#L71)

---

### description

• `Optional` **description**: `string`

the description of the scheduled event

#### Defined in

[packages/bot/src/helpers/guilds/events/editScheduledEvent.ts:77](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/events/editScheduledEvent.ts#L77)

---

### entityType

• **entityType**: [`ScheduledEventEntityType`](../enums/discordeno_bot.ScheduledEventEntityType.md)

the type of hosting entity associated with a scheduled event

#### Defined in

[packages/bot/src/helpers/guilds/events/editScheduledEvent.ts:85](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/events/editScheduledEvent.ts#L85)

---

### location

• `Optional` **location**: `string`

location of the event

#### Defined in

[packages/bot/src/helpers/guilds/events/editScheduledEvent.ts:73](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/events/editScheduledEvent.ts#L73)

---

### name

• **name**: `string`

the name of the scheduled event

#### Defined in

[packages/bot/src/helpers/guilds/events/editScheduledEvent.ts:75](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/events/editScheduledEvent.ts#L75)

---

### privacyLevel

• **privacyLevel**: [`GuildOnly`](../enums/discordeno_bot.ScheduledEventPrivacyLevel.md#guildonly)

the privacy level of the scheduled event

#### Defined in

[packages/bot/src/helpers/guilds/events/editScheduledEvent.ts:83](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/events/editScheduledEvent.ts#L83)

---

### reason

• `Optional` **reason**: `string`

The reason which should be added in the audit logs for doing this action.

#### Inherited from

[WithReason](discordeno_bot.WithReason.md).[reason](discordeno_bot.WithReason.md#reason)

#### Defined in

packages/types/dist/discordeno.d.ts:177

---

### scheduledEndTime

• `Optional` **scheduledEndTime**: `number`

the time the scheduled event will end if it does end.

#### Defined in

[packages/bot/src/helpers/guilds/events/editScheduledEvent.ts:81](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/events/editScheduledEvent.ts#L81)

---

### scheduledStartTime

• **scheduledStartTime**: `number`

the time the scheduled event will start

#### Defined in

[packages/bot/src/helpers/guilds/events/editScheduledEvent.ts:79](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/events/editScheduledEvent.ts#L79)

---

### status

• **status**: [`ScheduledEventStatus`](../enums/discordeno_bot.ScheduledEventStatus.md)

the status of the scheduled event

#### Defined in

[packages/bot/src/helpers/guilds/events/editScheduledEvent.ts:87](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/events/editScheduledEvent.ts#L87)
