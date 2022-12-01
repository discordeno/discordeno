[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / CreateScheduledEvent

# Interface: CreateScheduledEvent

[@discordeno/bot](../modules/discordeno_bot.md).CreateScheduledEvent

## Hierarchy

- [`WithReason`](discordeno_bot.WithReason.md)

  ↳ **`CreateScheduledEvent`**

## Table of contents

### Properties

- [channelId](discordeno_bot.CreateScheduledEvent.md#channelid)
- [description](discordeno_bot.CreateScheduledEvent.md#description)
- [entityType](discordeno_bot.CreateScheduledEvent.md#entitytype)
- [location](discordeno_bot.CreateScheduledEvent.md#location)
- [name](discordeno_bot.CreateScheduledEvent.md#name)
- [privacyLevel](discordeno_bot.CreateScheduledEvent.md#privacylevel)
- [reason](discordeno_bot.CreateScheduledEvent.md#reason)
- [scheduledEndTime](discordeno_bot.CreateScheduledEvent.md#scheduledendtime)
- [scheduledStartTime](discordeno_bot.CreateScheduledEvent.md#scheduledstarttime)

## Properties

### channelId

• `Optional` **channelId**: [`BigString`](../modules/discordeno_bot.md#bigstring)

the channel id of the scheduled event.

#### Defined in

[packages/bot/src/helpers/guilds/events/createScheduledEvent.ts:72](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/events/createScheduledEvent.ts#L72)

---

### description

• **description**: `string`

the description of the scheduled event

#### Defined in

[packages/bot/src/helpers/guilds/events/createScheduledEvent.ts:78](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/events/createScheduledEvent.ts#L78)

---

### entityType

• **entityType**: [`ScheduledEventEntityType`](../enums/discordeno_bot.ScheduledEventEntityType.md)

the type of hosting entity associated with a scheduled event

#### Defined in

[packages/bot/src/helpers/guilds/events/createScheduledEvent.ts:86](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/events/createScheduledEvent.ts#L86)

---

### location

• `Optional` **location**: `string`

location of the event. Required for events with `entityType: ScheduledEventEntityType.External`

#### Defined in

[packages/bot/src/helpers/guilds/events/createScheduledEvent.ts:74](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/events/createScheduledEvent.ts#L74)

---

### name

• **name**: `string`

the name of the scheduled event

#### Defined in

[packages/bot/src/helpers/guilds/events/createScheduledEvent.ts:76](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/events/createScheduledEvent.ts#L76)

---

### privacyLevel

• `Optional` **privacyLevel**: [`GuildOnly`](../enums/discordeno_bot.ScheduledEventPrivacyLevel.md#guildonly)

the privacy level of the scheduled event

#### Defined in

[packages/bot/src/helpers/guilds/events/createScheduledEvent.ts:84](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/events/createScheduledEvent.ts#L84)

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

the time the scheduled event will end if it does end. Required for events with `entityType: ScheduledEventEntityType.External`

#### Defined in

[packages/bot/src/helpers/guilds/events/createScheduledEvent.ts:82](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/events/createScheduledEvent.ts#L82)

---

### scheduledStartTime

• **scheduledStartTime**: `number`

the time the scheduled event will start

#### Defined in

[packages/bot/src/helpers/guilds/events/createScheduledEvent.ts:80](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/events/createScheduledEvent.ts#L80)
