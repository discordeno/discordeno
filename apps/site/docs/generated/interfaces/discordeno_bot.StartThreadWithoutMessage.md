[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / StartThreadWithoutMessage

# Interface: StartThreadWithoutMessage

[@discordeno/bot](../modules/discordeno_bot.md).StartThreadWithoutMessage

## Hierarchy

- [`WithReason`](discordeno_bot.WithReason.md)

  ↳ **`StartThreadWithoutMessage`**

## Table of contents

### Properties

- [autoArchiveDuration](discordeno_bot.StartThreadWithoutMessage.md#autoarchiveduration)
- [invitable](discordeno_bot.StartThreadWithoutMessage.md#invitable)
- [name](discordeno_bot.StartThreadWithoutMessage.md#name)
- [rateLimitPerUser](discordeno_bot.StartThreadWithoutMessage.md#ratelimitperuser)
- [reason](discordeno_bot.StartThreadWithoutMessage.md#reason)
- [type](discordeno_bot.StartThreadWithoutMessage.md#type)

## Properties

### autoArchiveDuration

• **autoArchiveDuration**: `60` \| `1440` \| `4320` \| `10080`

Duration in minutes to automatically archive the thread after recent activity

#### Defined in

[packages/bot/src/helpers/channels/threads/startThreadWithoutMessage.ts:50](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/threads/startThreadWithoutMessage.ts#L50)

---

### invitable

• `Optional` **invitable**: `boolean`

whether non-moderators can add other non-moderators to a thread; only available when creating a private thread

#### Defined in

[packages/bot/src/helpers/channels/threads/startThreadWithoutMessage.ts:56](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/threads/startThreadWithoutMessage.ts#L56)

---

### name

• **name**: `string`

1-100 character thread name

#### Defined in

[packages/bot/src/helpers/channels/threads/startThreadWithoutMessage.ts:48](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/threads/startThreadWithoutMessage.ts#L48)

---

### rateLimitPerUser

• `Optional` **rateLimitPerUser**: `null` \| `number`

Amount of seconds a user has to wait before sending another message (0-21600)

#### Defined in

[packages/bot/src/helpers/channels/threads/startThreadWithoutMessage.ts:52](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/threads/startThreadWithoutMessage.ts#L52)

---

### reason

• `Optional` **reason**: `string`

The reason which should be added in the audit logs for doing this action.

#### Inherited from

[WithReason](discordeno_bot.WithReason.md).[reason](discordeno_bot.WithReason.md#reason)

#### Defined in

packages/types/dist/discordeno.d.ts:177

---

### type

• **type**: [`AnnouncementThread`](../enums/discordeno_bot.ChannelTypes.md#announcementthread) \| [`PublicThread`](../enums/discordeno_bot.ChannelTypes.md#publicthread) \| [`PrivateThread`](../enums/discordeno_bot.ChannelTypes.md#privatethread)

the type of thread to create

#### Defined in

[packages/bot/src/helpers/channels/threads/startThreadWithoutMessage.ts:54](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/threads/startThreadWithoutMessage.ts#L54)
