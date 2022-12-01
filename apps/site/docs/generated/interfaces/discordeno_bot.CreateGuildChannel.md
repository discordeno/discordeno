[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / CreateGuildChannel

# Interface: CreateGuildChannel

[@discordeno/bot](../modules/discordeno_bot.md).CreateGuildChannel

## Hierarchy

- [`WithReason`](discordeno_bot.WithReason.md)

  ↳ **`CreateGuildChannel`**

## Table of contents

### Properties

- [availableTags](discordeno_bot.CreateGuildChannel.md#availabletags)
- [bitrate](discordeno_bot.CreateGuildChannel.md#bitrate)
- [defaultAutoArchiveDuration](discordeno_bot.CreateGuildChannel.md#defaultautoarchiveduration)
- [defaultReactionEmoji](discordeno_bot.CreateGuildChannel.md#defaultreactionemoji)
- [defaultSortOrder](discordeno_bot.CreateGuildChannel.md#defaultsortorder)
- [name](discordeno_bot.CreateGuildChannel.md#name)
- [nsfw](discordeno_bot.CreateGuildChannel.md#nsfw)
- [parentId](discordeno_bot.CreateGuildChannel.md#parentid)
- [permissionOverwrites](discordeno_bot.CreateGuildChannel.md#permissionoverwrites)
- [position](discordeno_bot.CreateGuildChannel.md#position)
- [rateLimitPerUser](discordeno_bot.CreateGuildChannel.md#ratelimitperuser)
- [reason](discordeno_bot.CreateGuildChannel.md#reason)
- [topic](discordeno_bot.CreateGuildChannel.md#topic)
- [type](discordeno_bot.CreateGuildChannel.md#type)
- [userLimit](discordeno_bot.CreateGuildChannel.md#userlimit)

## Properties

### availableTags

• `Optional` **availableTags**: { `emojiId`: [`BigString`](../modules/discordeno_bot.md#bigstring) ; `emojiName?`: `string` ; `id`: [`BigString`](../modules/discordeno_bot.md#bigstring) ; `moderated`: `boolean` ; `name`: `string` }[]

Set of tags that can be used in a forum channel

#### Defined in

[packages/bot/src/helpers/channels/createChannel.ts:109](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/createChannel.ts#L109)

---

### bitrate

• `Optional` **bitrate**: `number`

The bitrate (in bits) of the voice channel (voice only)

#### Defined in

[packages/bot/src/helpers/channels/createChannel.ts:86](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/createChannel.ts#L86)

---

### defaultAutoArchiveDuration

• `Optional` **defaultAutoArchiveDuration**: `number`

Default duration (in minutes) that clients (not the API) use for newly created threads in this channel, to determine when to automatically archive the thread after the last activity

#### Defined in

[packages/bot/src/helpers/channels/createChannel.ts:100](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/createChannel.ts#L100)

---

### defaultReactionEmoji

• `Optional` **defaultReactionEmoji**: `Object`

Emoji to show in the add reaction button on a thread in a forum channel

#### Type declaration

| Name         | Type                                                            | Description                                                                               |
| :----------- | :-------------------------------------------------------------- | :---------------------------------------------------------------------------------------- |
| `emojiId?`   | `null` \| [`BigString`](../modules/discordeno_bot.md#bigstring) | The id of a guild's custom emoji. Exactly one of `emojiId` and `emojiName` must be set.   |
| `emojiName?` | `null` \| `string`                                              | The unicode character of the emoji. Exactly one of `emojiId` and `emojiName` must be set. |

#### Defined in

[packages/bot/src/helpers/channels/createChannel.ts:102](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/createChannel.ts#L102)

---

### defaultSortOrder

• `Optional` **defaultSortOrder**: `null` \| [`SortOrderTypes`](../enums/discordeno_bot.SortOrderTypes.md)

the default sort order type used to order posts in forum channels

#### Defined in

[packages/bot/src/helpers/channels/createChannel.ts:122](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/createChannel.ts#L122)

---

### name

• **name**: `string`

Channel name (1-100 characters)

#### Defined in

[packages/bot/src/helpers/channels/createChannel.ts:80](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/createChannel.ts#L80)

---

### nsfw

• `Optional` **nsfw**: `boolean`

Whether the channel is nsfw

#### Defined in

[packages/bot/src/helpers/channels/createChannel.ts:98](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/createChannel.ts#L98)

---

### parentId

• `Optional` **parentId**: [`BigString`](../modules/discordeno_bot.md#bigstring)

Id of the parent category for a channel

#### Defined in

[packages/bot/src/helpers/channels/createChannel.ts:96](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/createChannel.ts#L96)

---

### permissionOverwrites

• `Optional` **permissionOverwrites**: [`OverwriteReadable`](discordeno_bot.OverwriteReadable.md)[]

The channel's permission overwrites

#### Defined in

[packages/bot/src/helpers/channels/createChannel.ts:94](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/createChannel.ts#L94)

---

### position

• `Optional` **position**: `number`

Sorting position of the channel

#### Defined in

[packages/bot/src/helpers/channels/createChannel.ts:92](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/createChannel.ts#L92)

---

### rateLimitPerUser

• `Optional` **rateLimitPerUser**: `number`

Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected

#### Defined in

[packages/bot/src/helpers/channels/createChannel.ts:90](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/createChannel.ts#L90)

---

### reason

• `Optional` **reason**: `string`

The reason which should be added in the audit logs for doing this action.

#### Inherited from

[WithReason](discordeno_bot.WithReason.md).[reason](discordeno_bot.WithReason.md#reason)

#### Defined in

packages/types/dist/discordeno.d.ts:177

---

### topic

• `Optional` **topic**: `string`

Channel topic (0-1024 characters)

#### Defined in

[packages/bot/src/helpers/channels/createChannel.ts:84](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/createChannel.ts#L84)

---

### type

• `Optional` **type**: [`ChannelTypes`](../enums/discordeno_bot.ChannelTypes.md)

The type of channel

#### Defined in

[packages/bot/src/helpers/channels/createChannel.ts:82](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/createChannel.ts#L82)

---

### userLimit

• `Optional` **userLimit**: `number`

The user limit of the voice channel (voice only)

#### Defined in

[packages/bot/src/helpers/channels/createChannel.ts:88](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/createChannel.ts#L88)
