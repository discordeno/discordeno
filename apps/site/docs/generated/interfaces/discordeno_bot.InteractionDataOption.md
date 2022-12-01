[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / InteractionDataOption

# Interface: InteractionDataOption

[@discordeno/bot](../modules/discordeno_bot.md).InteractionDataOption

## Hierarchy

- `ReturnType`<typeof [`transformInteractionDataOption`](../modules/discordeno_bot.md#transforminteractiondataoption)\>

  ↳ **`InteractionDataOption`**

## Table of contents

### Properties

- [focused](discordeno_bot.InteractionDataOption.md#focused)
- [name](discordeno_bot.InteractionDataOption.md#name)
- [options](discordeno_bot.InteractionDataOption.md#options)
- [type](discordeno_bot.InteractionDataOption.md#type)
- [value](discordeno_bot.InteractionDataOption.md#value)

## Properties

### focused

• **focused**: `undefined` \| `boolean`

#### Inherited from

ReturnType.focused

---

### name

• **name**: `string`

#### Inherited from

ReturnType.name

---

### options

• **options**: `undefined` \| { `focused`: `undefined` \| `boolean` ; `name`: `string` ; `options`: `undefined` \| { options?: ...[] \| undefined; value?: string \| number \| boolean \| { position?: number \| undefined; name?: string \| undefined; topic?: string \| null \| undefined; nsfw?: boolean \| undefined; ... 26 more ...; default_thread_rate_limit_per_user: number; } \| { ...; } \| { ...; } \| undefined; focused?: boolean \| undefined...[] ; `type`: [`ApplicationCommandOptionTypes`](../enums/discordeno_bot.ApplicationCommandOptionTypes.md) ; `value`: `undefined` \| `string` \| `number` \| `boolean` \| { position?: number \| undefined; name?: string \| undefined; topic?: string \| null \| undefined; nsfw?: boolean \| undefined; bitrate?: number \| undefined; permissions?: string \| undefined; ... 24 more ...; default_thread_rate_limit_per_user: number; } \| { permissions?: string \| undefined; avatar?: string \| undefined; user?: { flags?: UserFlags \| undefined; bot?: boolean \| undefined; avatar?: string \| null \| undefined; locale?: string \| undefined; ... 10 more ...; discriminator: string; } \| undefined; ... 7 more ...; joined_at: string; } \| { icon?: string \| undefined; tags?: { bot_id?: string \| undefined; integration_id?: string \| undefined; premium_subscriber?: null \| undefined; } \| undefined; unicode_emoji?: string \| undefined; ... 7 more ...; mentionable: boolean; } }[]

#### Inherited from

ReturnType.options

---

### type

• **type**: [`ApplicationCommandOptionTypes`](../enums/discordeno_bot.ApplicationCommandOptionTypes.md)

#### Inherited from

ReturnType.type

---

### value

• **value**: `undefined` \| `string` \| `number` \| `boolean` \| { `application_id`: `undefined` \| `string` ; `applied_tags`: `string`[] ; `available_tags`: [`DiscordForumTag`](discordeno_bot.DiscordForumTag.md)[] ; `bitrate`: `undefined` \| `number` ; `default_auto_archive_duration`: `undefined` \| `number` ; `default_reaction_emoji`: `undefined` \| `null` \| { emoji_name?: string \| null \| undefined; emoji_id: string; } ; `default_sort_order`: `undefined` \| `null` \| [`SortOrderTypes`](../enums/discordeno_bot.SortOrderTypes.md) ; `default_thread_rate_limit_per_user`: `number` ; `flags`: `undefined` \| [`ChannelFlags`](../enums/discordeno_bot.ChannelFlags.md) ; `guild_id`: `undefined` \| `string` ; `id`: `string` ; `last_message_id`: `undefined` \| `null` \| `string` ; `last_pin_timestamp`: `undefined` \| `null` \| `string` ; `member`: `undefined` \| { id: string; flags: number; user_id: string; join_timestamp: string; } ; `member_count`: `undefined` \| `number` ; `message_count`: `undefined` \| `number` ; `name`: `undefined` \| `string` ; `newly_created`: `undefined` \| `boolean` ; `nsfw`: `undefined` \| `boolean` ; `owner_id`: `undefined` \| `string` ; `parent_id`: `undefined` \| `null` \| `string` ; `permission_overwrites`: `undefined` \| { allow?: string \| undefined; deny?: string \| undefined; type: OverwriteTypes; id: string; }[] ; `permissions`: `undefined` \| `string` ; `position`: `undefined` \| `number` ; `rate_limit_per_user`: `undefined` \| `number` ; `rtc_region`: `undefined` \| `null` \| `string` ; `thread_metadata`: `undefined` \| { invitable?: boolean \| undefined; create_timestamp?: string \| null \| undefined; archive_timestamp: string; auto_archive_duration: 60 \| 1440 \| 4320 \| 10080; archived: boolean; locked: boolean; } ; `topic`: `undefined` \| `null` \| `string` ; `type`: [`ChannelTypes`](../enums/discordeno_bot.ChannelTypes.md) ; `user_limit`: `undefined` \| `number` ; `video_quality_mode`: `undefined` \| [`VideoQualityModes`](../enums/discordeno_bot.VideoQualityModes.md) } \| { `avatar`: `undefined` \| `string` ; `communication_disabled_until`: `undefined` \| `null` \| `string` ; `deaf`: `undefined` \| `boolean` ; `joined_at`: `string` ; `mute`: `undefined` \| `boolean` ; `nick`: `undefined` \| `null` \| `string` ; `pending`: `undefined` \| `boolean` ; `permissions`: `undefined` \| `string` ; `premium_since`: `undefined` \| `null` \| `string` ; `roles`: `string`[] ; `user`: `undefined` \| { flags?: UserFlags \| undefined; bot?: boolean \| undefined; avatar?: string \| null \| undefined; locale?: string \| undefined; email?: string \| null \| undefined; premium_type?: PremiumTypes \| undefined; ... 8 more ...; discriminator: string; } } \| { `color`: `number` ; `hoist`: `boolean` ; `icon`: `undefined` \| `string` ; `id`: `string` ; `managed`: `boolean` ; `mentionable`: `boolean` ; `name`: `string` ; `permissions`: `string` ; `position`: `number` ; `tags`: `undefined` \| { bot_id?: string \| undefined; integration_id?: string \| undefined; premium_subscriber?: null \| undefined; } ; `unicode_emoji`: `undefined` \| `string` }

#### Inherited from

ReturnType.value
