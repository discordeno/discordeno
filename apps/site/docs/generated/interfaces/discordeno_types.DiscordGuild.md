[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordGuild

# Interface: DiscordGuild

[@discordeno/types](../modules/discordeno_types.md).DiscordGuild

https://discord.com/developers/docs/resources/guild#guild-object

## Table of contents

### Properties

- [afk_channel_id](discordeno_types.DiscordGuild.md#afk_channel_id)
- [afk_timeout](discordeno_types.DiscordGuild.md#afk_timeout)
- [application_id](discordeno_types.DiscordGuild.md#application_id)
- [approximate_member_count](discordeno_types.DiscordGuild.md#approximate_member_count)
- [approximate_presence_count](discordeno_types.DiscordGuild.md#approximate_presence_count)
- [banner](discordeno_types.DiscordGuild.md#banner)
- [channels](discordeno_types.DiscordGuild.md#channels)
- [default_message_notifications](discordeno_types.DiscordGuild.md#default_message_notifications)
- [description](discordeno_types.DiscordGuild.md#description)
- [discovery_splash](discordeno_types.DiscordGuild.md#discovery_splash)
- [emojis](discordeno_types.DiscordGuild.md#emojis)
- [explicit_content_filter](discordeno_types.DiscordGuild.md#explicit_content_filter)
- [features](discordeno_types.DiscordGuild.md#features)
- [icon](discordeno_types.DiscordGuild.md#icon)
- [icon_hash](discordeno_types.DiscordGuild.md#icon_hash)
- [id](discordeno_types.DiscordGuild.md#id)
- [joined_at](discordeno_types.DiscordGuild.md#joined_at)
- [large](discordeno_types.DiscordGuild.md#large)
- [max_members](discordeno_types.DiscordGuild.md#max_members)
- [max_presences](discordeno_types.DiscordGuild.md#max_presences)
- [max_video_channel_users](discordeno_types.DiscordGuild.md#max_video_channel_users)
- [member_count](discordeno_types.DiscordGuild.md#member_count)
- [members](discordeno_types.DiscordGuild.md#members)
- [mfa_level](discordeno_types.DiscordGuild.md#mfa_level)
- [name](discordeno_types.DiscordGuild.md#name)
- [nsfw_level](discordeno_types.DiscordGuild.md#nsfw_level)
- [owner](discordeno_types.DiscordGuild.md#owner)
- [owner_id](discordeno_types.DiscordGuild.md#owner_id)
- [permissions](discordeno_types.DiscordGuild.md#permissions)
- [preferred_locale](discordeno_types.DiscordGuild.md#preferred_locale)
- [premium_progress_bar_enabled](discordeno_types.DiscordGuild.md#premium_progress_bar_enabled)
- [premium_subscription_count](discordeno_types.DiscordGuild.md#premium_subscription_count)
- [premium_tier](discordeno_types.DiscordGuild.md#premium_tier)
- [presences](discordeno_types.DiscordGuild.md#presences)
- [public_updates_channel_id](discordeno_types.DiscordGuild.md#public_updates_channel_id)
- [roles](discordeno_types.DiscordGuild.md#roles)
- [rules_channel_id](discordeno_types.DiscordGuild.md#rules_channel_id)
- [splash](discordeno_types.DiscordGuild.md#splash)
- [stage_instances](discordeno_types.DiscordGuild.md#stage_instances)
- [system_channel_flags](discordeno_types.DiscordGuild.md#system_channel_flags)
- [system_channel_id](discordeno_types.DiscordGuild.md#system_channel_id)
- [threads](discordeno_types.DiscordGuild.md#threads)
- [unavailable](discordeno_types.DiscordGuild.md#unavailable)
- [vanity_url_code](discordeno_types.DiscordGuild.md#vanity_url_code)
- [verification_level](discordeno_types.DiscordGuild.md#verification_level)
- [voice_states](discordeno_types.DiscordGuild.md#voice_states)
- [welcome_screen](discordeno_types.DiscordGuild.md#welcome_screen)
- [widget_channel_id](discordeno_types.DiscordGuild.md#widget_channel_id)
- [widget_enabled](discordeno_types.DiscordGuild.md#widget_enabled)

## Properties

### afk_channel_id

• **afk_channel_id**: `null` \| `string`

Id of afk channel

#### Defined in

[packages/types/src/discord.ts:599](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L599)

---

### afk_timeout

• **afk_timeout**: `number`

Afk timeout in seconds

#### Defined in

[packages/types/src/discord.ts:540](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L540)

---

### application_id

• **application_id**: `null` \| `string`

Application id of the guild creator if it is bot-created

#### Defined in

[packages/types/src/discord.ts:607](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L607)

---

### approximate_member_count

• `Optional` **approximate_member_count**: `number`

Approximate number of members in this guild, returned from the GET /guilds/<id> endpoint when with_counts is true

#### Defined in

[packages/types/src/discord.ts:576](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L576)

---

### approximate_presence_count

• `Optional` **approximate_presence_count**: `number`

Approximate number of non-offline members in this guild, returned from the GET /guilds/<id> endpoint when with_counts is true

#### Defined in

[packages/types/src/discord.ts:578](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L578)

---

### banner

• **banner**: `null` \| `string`

Banner hash

#### Defined in

[packages/types/src/discord.ts:626](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L626)

---

### channels

• `Optional` **channels**: [`DiscordChannel`](discordeno_types.DiscordChannel.md)[]

Channels in the guild

#### Defined in

[packages/types/src/discord.ts:619](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L619)

---

### default_message_notifications

• **default_message_notifications**: [`DefaultMessageNotificationLevels`](../enums/discordeno_types.DefaultMessageNotificationLevels.md)

Default message notifications level

#### Defined in

[packages/types/src/discord.ts:546](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L546)

---

### description

• **description**: `null` \| `string`

The description of a guild

#### Defined in

[packages/types/src/discord.ts:568](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L568)

---

### discovery_splash

• **discovery_splash**: `null` \| `string`

Discovery splash hash; only present for guilds with the "DISCOVERABLE" feature

#### Defined in

[packages/types/src/discord.ts:593](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L593)

---

### emojis

• **emojis**: [`DiscordEmoji`](discordeno_types.DiscordEmoji.md)[]

Custom guild emojis

#### Defined in

[packages/types/src/discord.ts:605](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L605)

---

### explicit_content_filter

• **explicit_content_filter**: [`ExplicitContentFilterLevels`](../enums/discordeno_types.ExplicitContentFilterLevels.md)

Explicit content filter level

#### Defined in

[packages/types/src/discord.ts:548](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L548)

---

### features

• **features**: [`GuildFeatures`](../enums/discordeno_types.GuildFeatures.md)[]

Enabled guild features

#### Defined in

[packages/types/src/discord.ts:550](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L550)

---

### icon

• **icon**: `null` \| `string`

Icon hash

#### Defined in

[packages/types/src/discord.ts:587](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L587)

---

### icon_hash

• `Optional` **icon_hash**: `null` \| `string`

Icon hash, returned when in the template object

#### Defined in

[packages/types/src/discord.ts:589](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L589)

---

### id

• **id**: `string`

Guild id

#### Defined in

[packages/types/src/discord.ts:585](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L585)

---

### joined_at

• `Optional` **joined_at**: `string`

When this guild was joined at

#### Defined in

[packages/types/src/discord.ts:613](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L613)

---

### large

• `Optional` **large**: `boolean`

True if this is considered a large guild

#### Defined in

[packages/types/src/discord.ts:556](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L556)

---

### max_members

• `Optional` **max_members**: `number`

The maximum number of members for the guild

#### Defined in

[packages/types/src/discord.ts:564](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L564)

---

### max_presences

• `Optional` **max_presences**: `null` \| `number`

The maximum number of presences for the guild (the default value, currently 25000, is in effect when null is returned)

#### Defined in

[packages/types/src/discord.ts:562](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L562)

---

### max_video_channel_users

• `Optional` **max_video_channel_users**: `number`

The maximum amount of users in a video channel

#### Defined in

[packages/types/src/discord.ts:574](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L574)

---

### member_count

• `Optional` **member_count**: `number`

Total number of members in this guild

#### Defined in

[packages/types/src/discord.ts:560](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L560)

---

### members

• `Optional` **members**: [`DiscordMember`](discordeno_types.DiscordMember.md)[]

Users in the guild

#### Defined in

[packages/types/src/discord.ts:617](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L617)

---

### mfa_level

• **mfa_level**: [`MfaLevels`](../enums/discordeno_types.MfaLevels.md)

Required MFA level for the guild

#### Defined in

[packages/types/src/discord.ts:552](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L552)

---

### name

• **name**: `string`

Guild name (2-100 characters, excluding trailing and leading whitespace)

#### Defined in

[packages/types/src/discord.ts:536](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L536)

---

### nsfw_level

• **nsfw_level**: [`GuildNsfwLevel`](../enums/discordeno_types.GuildNsfwLevel.md)

Guild NSFW level

#### Defined in

[packages/types/src/discord.ts:580](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L580)

---

### owner

• `Optional` **owner**: `boolean`

True if the user is the owner of the guild

#### Defined in

[packages/types/src/discord.ts:538](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L538)

---

### owner_id

• **owner_id**: `string`

Id of the owner

#### Defined in

[packages/types/src/discord.ts:595](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L595)

---

### permissions

• `Optional` **permissions**: `string`

Total permissions for the user in the guild (excludes overwrites)

#### Defined in

[packages/types/src/discord.ts:597](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L597)

---

### preferred_locale

• **preferred_locale**: `string`

The preferred locale of a Community guild; used in server discovery and notices from Discord; defaults to "en-US"

#### Defined in

[packages/types/src/discord.ts:629](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L629)

---

### premium_progress_bar_enabled

• **premium_progress_bar_enabled**: `boolean`

Whether the guild has the boost progress bar enabled

#### Defined in

[packages/types/src/discord.ts:582](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L582)

---

### premium_subscription_count

• `Optional` **premium_subscription_count**: `number`

The number of boosts this guild currently has

#### Defined in

[packages/types/src/discord.ts:572](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L572)

---

### premium_tier

• **premium_tier**: [`PremiumTiers`](../enums/discordeno_types.PremiumTiers.md)

Premium tier (Server Boost level)

#### Defined in

[packages/types/src/discord.ts:570](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L570)

---

### presences

• `Optional` **presences**: `Partial`<[`DiscordPresenceUpdate`](discordeno_types.DiscordPresenceUpdate.md)\>[]

Presences of the members in the guild, will only include non-offline members if the size is greater than large threshold

#### Defined in

[packages/types/src/discord.ts:624](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L624)

---

### public_updates_channel_id

• **public_updates_channel_id**: `null` \| `string`

The id of the channel where admins and moderators of Community guilds receive notices from Discord

#### Defined in

[packages/types/src/discord.ts:631](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L631)

---

### roles

• **roles**: [`DiscordRole`](discordeno_types.DiscordRole.md)[]

Roles in the guild

#### Defined in

[packages/types/src/discord.ts:603](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L603)

---

### rules_channel_id

• **rules_channel_id**: `null` \| `string`

The id of the channel where community guilds can display rules and/or guidelines

#### Defined in

[packages/types/src/discord.ts:611](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L611)

---

### splash

• **splash**: `null` \| `string`

Splash hash

#### Defined in

[packages/types/src/discord.ts:591](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L591)

---

### stage_instances

• `Optional` **stage_instances**: [`DiscordStageInstance`](discordeno_types.DiscordStageInstance.md)[]

Stage instances in the guild

#### Defined in

[packages/types/src/discord.ts:635](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L635)

---

### system_channel_flags

• **system_channel_flags**: [`SystemChannelFlags`](../enums/discordeno_types.SystemChannelFlags.md)

System channel flags

#### Defined in

[packages/types/src/discord.ts:554](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L554)

---

### system_channel_id

• **system_channel_id**: `null` \| `string`

The id of the channel where guild notices such as welcome messages and boost events are posted

#### Defined in

[packages/types/src/discord.ts:609](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L609)

---

### threads

• `Optional` **threads**: [`DiscordChannel`](discordeno_types.DiscordChannel.md)[]

All active threads in the guild that the current user has permission to view

#### Defined in

[packages/types/src/discord.ts:622](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L622)

---

### unavailable

• `Optional` **unavailable**: `boolean`

True if this guild is unavailable due to an outage

#### Defined in

[packages/types/src/discord.ts:558](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L558)

---

### vanity_url_code

• **vanity_url_code**: `null` \| `string`

The vanity url code for the guild

#### Defined in

[packages/types/src/discord.ts:566](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L566)

---

### verification_level

• **verification_level**: [`VerificationLevels`](../enums/discordeno_types.VerificationLevels.md)

Verification level required for the guild

#### Defined in

[packages/types/src/discord.ts:544](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L544)

---

### voice_states

• `Optional` **voice_states**: `Omit`<[`DiscordVoiceState`](discordeno_types.DiscordVoiceState.md), `"guildId"`\>[]

States of members currently in voice channels; lacks the guild_id key

#### Defined in

[packages/types/src/discord.ts:615](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L615)

---

### welcome_screen

• `Optional` **welcome_screen**: [`DiscordWelcomeScreen`](discordeno_types.DiscordWelcomeScreen.md)

The welcome screen of a Community guild, shown to new members, returned in an Invite's guild object

#### Defined in

[packages/types/src/discord.ts:633](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L633)

---

### widget_channel_id

• `Optional` **widget_channel_id**: `null` \| `string`

The channel id that the widget will generate an invite to, or null if set to no invite

#### Defined in

[packages/types/src/discord.ts:601](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L601)

---

### widget_enabled

• `Optional` **widget_enabled**: `boolean`

True if the server widget is enabled

#### Defined in

[packages/types/src/discord.ts:542](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L542)
