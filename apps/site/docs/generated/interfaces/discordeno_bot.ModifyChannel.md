[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / ModifyChannel

# Interface: ModifyChannel

[@discordeno/bot](../modules/discordeno_bot.md).ModifyChannel

## Hierarchy

- [`WithReason`](discordeno_bot.WithReason.md)

  ↳ **`ModifyChannel`**

## Table of contents

### Properties

- [appliedTags](discordeno_bot.ModifyChannel.md#appliedtags)
- [archived](discordeno_bot.ModifyChannel.md#archived)
- [autoArchiveDuration](discordeno_bot.ModifyChannel.md#autoarchiveduration)
- [availableTags](discordeno_bot.ModifyChannel.md#availabletags)
- [bitrate](discordeno_bot.ModifyChannel.md#bitrate)
- [defaultReactionEmoji](discordeno_bot.ModifyChannel.md#defaultreactionemoji)
- [defaultSortOrder](discordeno_bot.ModifyChannel.md#defaultsortorder)
- [defaultThreadRateLimitPerUser](discordeno_bot.ModifyChannel.md#defaultthreadratelimitperuser)
- [invitable](discordeno_bot.ModifyChannel.md#invitable)
- [locked](discordeno_bot.ModifyChannel.md#locked)
- [name](discordeno_bot.ModifyChannel.md#name)
- [nsfw](discordeno_bot.ModifyChannel.md#nsfw)
- [parentId](discordeno_bot.ModifyChannel.md#parentid)
- [permissionOverwrites](discordeno_bot.ModifyChannel.md#permissionoverwrites)
- [position](discordeno_bot.ModifyChannel.md#position)
- [rateLimitPerUser](discordeno_bot.ModifyChannel.md#ratelimitperuser)
- [reason](discordeno_bot.ModifyChannel.md#reason)
- [rtcRegion](discordeno_bot.ModifyChannel.md#rtcregion)
- [topic](discordeno_bot.ModifyChannel.md#topic)
- [type](discordeno_bot.ModifyChannel.md#type)
- [userLimit](discordeno_bot.ModifyChannel.md#userlimit)
- [videoQualityMode](discordeno_bot.ModifyChannel.md#videoqualitymode)

## Properties

### appliedTags

• `Optional` **appliedTags**: [`BigString`](../modules/discordeno_bot.md#bigstring)[]

The IDs of the set of tags that have been applied to a thread in a GUILD_FORUM channel; limited to 5

#### Defined in

[packages/bot/src/helpers/channels/editChannel.ts:217](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/editChannel.ts#L217)

---

### archived

• `Optional` **archived**: `boolean`

Whether the thread is archived

#### Defined in

[packages/bot/src/helpers/channels/editChannel.ts:195](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/editChannel.ts#L195)

---

### autoArchiveDuration

• `Optional` **autoArchiveDuration**: `60` \| `1440` \| `4320` \| `10080`

Duration in minutes to automatically archive the thread after recent activity

#### Defined in

[packages/bot/src/helpers/channels/editChannel.ts:197](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/editChannel.ts#L197)

---

### availableTags

• `Optional` **availableTags**: { `emojiId`: `string` ; `emojiName`: `string` ; `id`: `string` ; `moderated`: `boolean` ; `name`: `string` }[]

The set of tags that can be used in a GUILD_FORUM channel

#### Defined in

[packages/bot/src/helpers/channels/editChannel.ts:204](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/editChannel.ts#L204)

---

### bitrate

• `Optional` **bitrate**: `null` \| `number`

The bitrate (in bits) of the voice channel; 8000 to 96000 (128000 for VIP servers)

#### Defined in

[packages/bot/src/helpers/channels/editChannel.ts:183](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/editChannel.ts#L183)

---

### defaultReactionEmoji

• `Optional` **defaultReactionEmoji**: `Object`

the emoji to show in the add reaction button on a thread in a GUILD_FORUM channel

#### Type declaration

| Name        | Type               | Description                        |
| :---------- | :----------------- | :--------------------------------- |
| `emojiId`   | `string`           | The id of a guild's custom emoji   |
| `emojiName` | `null` \| `string` | The unicode character of the emoji |

#### Defined in

[packages/bot/src/helpers/channels/editChannel.ts:219](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/editChannel.ts#L219)

---

### defaultSortOrder

• `Optional` **defaultSortOrder**: `null` \| [`SortOrderTypes`](../enums/discordeno_bot.SortOrderTypes.md)

the default sort order type used to order posts in forum channels

#### Defined in

[packages/bot/src/helpers/channels/editChannel.ts:228](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/editChannel.ts#L228)

---

### defaultThreadRateLimitPerUser

• `Optional` **defaultThreadRateLimitPerUser**: `number`

the initial rate_limit_per_user to set on newly created threads in a channel. this field is copied to the thread at creation time and does not live update.

#### Defined in

[packages/bot/src/helpers/channels/editChannel.ts:226](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/editChannel.ts#L226)

---

### invitable

• `Optional` **invitable**: `boolean`

whether non-moderators can add other non-moderators to a thread; only available on private threads

#### Defined in

[packages/bot/src/helpers/channels/editChannel.ts:201](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/editChannel.ts#L201)

---

### locked

• `Optional` **locked**: `boolean`

When a thread is locked, only users with `MANAGE_THREADS` can unarchive it

#### Defined in

[packages/bot/src/helpers/channels/editChannel.ts:199](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/editChannel.ts#L199)

---

### name

• `Optional` **name**: `string`

1-100 character channel name

#### Defined in

[packages/bot/src/helpers/channels/editChannel.ts:171](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/editChannel.ts#L171)

---

### nsfw

• `Optional` **nsfw**: `null` \| `boolean`

Whether the channel is nsfw

#### Defined in

[packages/bot/src/helpers/channels/editChannel.ts:179](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/editChannel.ts#L179)

---

### parentId

• `Optional` **parentId**: `null` \| [`BigString`](../modules/discordeno_bot.md#bigstring)

Id of the new parent category for a channel

#### Defined in

[packages/bot/src/helpers/channels/editChannel.ts:189](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/editChannel.ts#L189)

---

### permissionOverwrites

• `Optional` **permissionOverwrites**: `null` \| [`OverwriteReadable`](discordeno_bot.OverwriteReadable.md)[]

Channel or category-specific permissions

#### Defined in

[packages/bot/src/helpers/channels/editChannel.ts:187](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/editChannel.ts#L187)

---

### position

• `Optional` **position**: `null` \| `number`

The position of the channel in the left-hand listing

#### Defined in

[packages/bot/src/helpers/channels/editChannel.ts:175](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/editChannel.ts#L175)

---

### rateLimitPerUser

• `Optional` **rateLimitPerUser**: `null` \| `number`

Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected

#### Defined in

[packages/bot/src/helpers/channels/editChannel.ts:181](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/editChannel.ts#L181)

---

### reason

• `Optional` **reason**: `string`

The reason which should be added in the audit logs for doing this action.

#### Inherited from

[WithReason](discordeno_bot.WithReason.md).[reason](discordeno_bot.WithReason.md#reason)

#### Defined in

packages/types/dist/discordeno.d.ts:177

---

### rtcRegion

• `Optional` **rtcRegion**: `null` \| `string`

Voice region id for the voice channel, automatic when set to null

#### Defined in

[packages/bot/src/helpers/channels/editChannel.ts:191](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/editChannel.ts#L191)

---

### topic

• `Optional` **topic**: `null` \| `string`

0-1024 character channel topic

#### Defined in

[packages/bot/src/helpers/channels/editChannel.ts:177](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/editChannel.ts#L177)

---

### type

• `Optional` **type**: [`ChannelTypes`](../enums/discordeno_bot.ChannelTypes.md)

The type of channel; only conversion between text and news is supported and only in guilds with the "NEWS" feature

#### Defined in

[packages/bot/src/helpers/channels/editChannel.ts:173](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/editChannel.ts#L173)

---

### userLimit

• `Optional` **userLimit**: `null` \| `number`

The user limit of the voice channel; 0 refers to no limit, 1 to 99 refers to a user limit

#### Defined in

[packages/bot/src/helpers/channels/editChannel.ts:185](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/editChannel.ts#L185)

---

### videoQualityMode

• `Optional` **videoQualityMode**: [`VideoQualityModes`](../enums/discordeno_bot.VideoQualityModes.md)

The camera video quality mode of the voice channel

#### Defined in

[packages/bot/src/helpers/channels/editChannel.ts:193](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/editChannel.ts#L193)
