[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordChannel

# Interface: DiscordChannel

[@discordeno/types](../modules/discordeno_types.md).DiscordChannel

https://discord.com/developers/docs/resources/channel#channel-object

## Table of contents

### Properties

- [application_id](discordeno_types.DiscordChannel.md#application_id)
- [applied_tags](discordeno_types.DiscordChannel.md#applied_tags)
- [available_tags](discordeno_types.DiscordChannel.md#available_tags)
- [bitrate](discordeno_types.DiscordChannel.md#bitrate)
- [default_auto_archive_duration](discordeno_types.DiscordChannel.md#default_auto_archive_duration)
- [default_reaction_emoji](discordeno_types.DiscordChannel.md#default_reaction_emoji)
- [default_sort_order](discordeno_types.DiscordChannel.md#default_sort_order)
- [default_thread_rate_limit_per_user](discordeno_types.DiscordChannel.md#default_thread_rate_limit_per_user)
- [flags](discordeno_types.DiscordChannel.md#flags)
- [guild_id](discordeno_types.DiscordChannel.md#guild_id)
- [id](discordeno_types.DiscordChannel.md#id)
- [last_message_id](discordeno_types.DiscordChannel.md#last_message_id)
- [last_pin_timestamp](discordeno_types.DiscordChannel.md#last_pin_timestamp)
- [member](discordeno_types.DiscordChannel.md#member)
- [member_count](discordeno_types.DiscordChannel.md#member_count)
- [message_count](discordeno_types.DiscordChannel.md#message_count)
- [name](discordeno_types.DiscordChannel.md#name)
- [newly_created](discordeno_types.DiscordChannel.md#newly_created)
- [nsfw](discordeno_types.DiscordChannel.md#nsfw)
- [owner_id](discordeno_types.DiscordChannel.md#owner_id)
- [parent_id](discordeno_types.DiscordChannel.md#parent_id)
- [permission_overwrites](discordeno_types.DiscordChannel.md#permission_overwrites)
- [permissions](discordeno_types.DiscordChannel.md#permissions)
- [position](discordeno_types.DiscordChannel.md#position)
- [rate_limit_per_user](discordeno_types.DiscordChannel.md#rate_limit_per_user)
- [rtc_region](discordeno_types.DiscordChannel.md#rtc_region)
- [thread_metadata](discordeno_types.DiscordChannel.md#thread_metadata)
- [topic](discordeno_types.DiscordChannel.md#topic)
- [type](discordeno_types.DiscordChannel.md#type)
- [user_limit](discordeno_types.DiscordChannel.md#user_limit)
- [video_quality_mode](discordeno_types.DiscordChannel.md#video_quality_mode)

## Properties

### application_id

• `Optional` **application_id**: `string`

Application id of the group DM creator if it is bot-created

#### Defined in

[packages/types/src/discord.ts:768](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L768)

---

### applied_tags

• **applied_tags**: `string`[]

The IDs of the set of tags that have been applied to a thread in a GUILD_FORUM channel

#### Defined in

[packages/types/src/discord.ts:784](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L784)

---

### available_tags

• **available_tags**: [`DiscordForumTag`](discordeno_types.DiscordForumTag.md)[]

The set of tags that can be used in a GUILD_FORUM channel

#### Defined in

[packages/types/src/discord.ts:782](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L782)

---

### bitrate

• `Optional` **bitrate**: `number`

The bitrate (in bits) of the voice or stage channel

#### Defined in

[packages/types/src/discord.ts:739](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L739)

---

### default_auto_archive_duration

• `Optional` **default_auto_archive_duration**: `number`

Default duration for newly created threads, in minutes, to automatically archive the thread after recent activity, can be set to: 60, 1440, 4320, 10080

#### Defined in

[packages/types/src/discord.ts:753](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L753)

---

### default_reaction_emoji

• `Optional` **default_reaction_emoji**: `null` \| [`DiscordDefaultReactionEmoji`](discordeno_types.DiscordDefaultReactionEmoji.md)

the emoji to show in the add reaction button on a thread in a GUILD_FORUM channel

#### Defined in

[packages/types/src/discord.ts:786](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L786)

---

### default_sort_order

• `Optional` **default_sort_order**: `null` \| [`SortOrderTypes`](../enums/discordeno_types.SortOrderTypes.md)

the default sort order type used to order posts in GUILD_FORUM channels. Defaults to null, which indicates a preferred sort order hasn't been set by a channel admin

#### Defined in

[packages/types/src/discord.ts:790](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L790)

---

### default_thread_rate_limit_per_user

• **default_thread_rate_limit_per_user**: `number`

the initial rate_limit_per_user to set on newly created threads in a channel. this field is copied to the thread at creation time and does not live update.

#### Defined in

[packages/types/src/discord.ts:788](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L788)

---

### flags

• `Optional` **flags**: [`ChannelFlags`](../enums/discordeno_types.ChannelFlags.md)

The flags of the channel

#### Defined in

[packages/types/src/discord.ts:731](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L731)

---

### guild_id

• `Optional` **guild_id**: `string`

The id of the guild

#### Defined in

[packages/types/src/discord.ts:758](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L758)

---

### id

• **id**: `string`

The id of the channel

#### Defined in

[packages/types/src/discord.ts:756](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L756)

---

### last_message_id

• `Optional` **last_message_id**: `null` \| `string`

The id of the last message sent in this channel (may not point to an existing or valid message)

#### Defined in

[packages/types/src/discord.ts:764](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L764)

---

### last_pin_timestamp

• `Optional` **last_pin_timestamp**: `null` \| `string`

When the last pinned message was pinned. This may be null in events such as GUILD_CREATE when a message is not pinned.

#### Defined in

[packages/types/src/discord.ts:772](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L772)

---

### member

• `Optional` **member**: [`DiscordThreadMember`](discordeno_types.DiscordThreadMember.md)

Thread member object for the current user, if they have joined the thread, only included on certain API endpoints

#### Defined in

[packages/types/src/discord.ts:776](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L776)

---

### member_count

• `Optional` **member_count**: `number`

An approximate count of users in a thread, stops counting at 50

#### Defined in

[packages/types/src/discord.ts:751](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L751)

---

### message_count

• `Optional` **message_count**: `number`

An approximate count of messages in a thread, stops counting at 50

#### Defined in

[packages/types/src/discord.ts:749](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L749)

---

### name

• `Optional` **name**: `string`

The name of the channel (1-100 characters)

#### Defined in

[packages/types/src/discord.ts:735](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L735)

---

### newly_created

• `Optional` **newly_created**: `boolean`

When a thread is created this will be true on that channel payload for the thread.

#### Defined in

[packages/types/src/discord.ts:780](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L780)

---

### nsfw

• `Optional` **nsfw**: `boolean`

Whether the channel is nsfw

#### Defined in

[packages/types/src/discord.ts:762](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L762)

---

### owner_id

• `Optional` **owner_id**: `string`

Id of the creator of the thread

#### Defined in

[packages/types/src/discord.ts:766](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L766)

---

### parent_id

• `Optional` **parent_id**: `null` \| `string`

For guild channels: Id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created

#### Defined in

[packages/types/src/discord.ts:770](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L770)

---

### permission_overwrites

• `Optional` **permission_overwrites**: [`DiscordOverwrite`](discordeno_types.DiscordOverwrite.md)[]

Explicit permission overwrites for members and roles

#### Defined in

[packages/types/src/discord.ts:760](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L760)

---

### permissions

• `Optional` **permissions**: `string`

computed permissions for the invoking user in the channel, including overwrites, only included when part of the resolved data received on a application command interaction

#### Defined in

[packages/types/src/discord.ts:778](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L778)

---

### position

• `Optional` **position**: `number`

Sorting position of the channel

#### Defined in

[packages/types/src/discord.ts:733](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L733)

---

### rate_limit_per_user

• `Optional` **rate_limit_per_user**: `number`

Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected

#### Defined in

[packages/types/src/discord.ts:743](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L743)

---

### rtc_region

• `Optional` **rtc_region**: `null` \| `string`

Voice region id for the voice or stage channel, automatic when set to null

#### Defined in

[packages/types/src/discord.ts:745](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L745)

---

### thread_metadata

• `Optional` **thread_metadata**: [`DiscordThreadMetadata`](discordeno_types.DiscordThreadMetadata.md)

Thread-specific fields not needed by other channels

#### Defined in

[packages/types/src/discord.ts:774](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L774)

---

### topic

• `Optional` **topic**: `null` \| `string`

The channel topic (0-4096 characters for GUILD_FORUM channels, 0-1024 characters for all others)

#### Defined in

[packages/types/src/discord.ts:737](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L737)

---

### type

• **type**: [`ChannelTypes`](../enums/discordeno_types.ChannelTypes.md)

The type of channel

#### Defined in

[packages/types/src/discord.ts:729](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L729)

---

### user_limit

• `Optional` **user_limit**: `number`

The user limit of the voice or stage channel

#### Defined in

[packages/types/src/discord.ts:741](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L741)

---

### video_quality_mode

• `Optional` **video_quality_mode**: [`VideoQualityModes`](../enums/discordeno_types.VideoQualityModes.md)

The camera video quality mode of the voice channel, 1 when not present

#### Defined in

[packages/types/src/discord.ts:747](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L747)
