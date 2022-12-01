[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/rest](../modules/discordeno_rest.md) / DiscordGuild

# Interface: DiscordGuild

[@discordeno/rest](../modules/discordeno_rest.md).DiscordGuild

https://discord.com/developers/docs/resources/guild#guild-object

## Table of contents

### Properties

- [afk_channel_id](discordeno_rest.DiscordGuild.md#afk_channel_id)
- [afk_timeout](discordeno_rest.DiscordGuild.md#afk_timeout)
- [application_id](discordeno_rest.DiscordGuild.md#application_id)
- [approximate_member_count](discordeno_rest.DiscordGuild.md#approximate_member_count)
- [approximate_presence_count](discordeno_rest.DiscordGuild.md#approximate_presence_count)
- [banner](discordeno_rest.DiscordGuild.md#banner)
- [channels](discordeno_rest.DiscordGuild.md#channels)
- [default_message_notifications](discordeno_rest.DiscordGuild.md#default_message_notifications)
- [description](discordeno_rest.DiscordGuild.md#description)
- [discovery_splash](discordeno_rest.DiscordGuild.md#discovery_splash)
- [emojis](discordeno_rest.DiscordGuild.md#emojis)
- [explicit_content_filter](discordeno_rest.DiscordGuild.md#explicit_content_filter)
- [features](discordeno_rest.DiscordGuild.md#features)
- [icon](discordeno_rest.DiscordGuild.md#icon)
- [icon_hash](discordeno_rest.DiscordGuild.md#icon_hash)
- [id](discordeno_rest.DiscordGuild.md#id)
- [joined_at](discordeno_rest.DiscordGuild.md#joined_at)
- [large](discordeno_rest.DiscordGuild.md#large)
- [max_members](discordeno_rest.DiscordGuild.md#max_members)
- [max_presences](discordeno_rest.DiscordGuild.md#max_presences)
- [max_video_channel_users](discordeno_rest.DiscordGuild.md#max_video_channel_users)
- [member_count](discordeno_rest.DiscordGuild.md#member_count)
- [members](discordeno_rest.DiscordGuild.md#members)
- [mfa_level](discordeno_rest.DiscordGuild.md#mfa_level)
- [name](discordeno_rest.DiscordGuild.md#name)
- [nsfw_level](discordeno_rest.DiscordGuild.md#nsfw_level)
- [owner](discordeno_rest.DiscordGuild.md#owner)
- [owner_id](discordeno_rest.DiscordGuild.md#owner_id)
- [permissions](discordeno_rest.DiscordGuild.md#permissions)
- [preferred_locale](discordeno_rest.DiscordGuild.md#preferred_locale)
- [premium_progress_bar_enabled](discordeno_rest.DiscordGuild.md#premium_progress_bar_enabled)
- [premium_subscription_count](discordeno_rest.DiscordGuild.md#premium_subscription_count)
- [premium_tier](discordeno_rest.DiscordGuild.md#premium_tier)
- [presences](discordeno_rest.DiscordGuild.md#presences)
- [public_updates_channel_id](discordeno_rest.DiscordGuild.md#public_updates_channel_id)
- [roles](discordeno_rest.DiscordGuild.md#roles)
- [rules_channel_id](discordeno_rest.DiscordGuild.md#rules_channel_id)
- [splash](discordeno_rest.DiscordGuild.md#splash)
- [stage_instances](discordeno_rest.DiscordGuild.md#stage_instances)
- [system_channel_flags](discordeno_rest.DiscordGuild.md#system_channel_flags)
- [system_channel_id](discordeno_rest.DiscordGuild.md#system_channel_id)
- [threads](discordeno_rest.DiscordGuild.md#threads)
- [unavailable](discordeno_rest.DiscordGuild.md#unavailable)
- [vanity_url_code](discordeno_rest.DiscordGuild.md#vanity_url_code)
- [verification_level](discordeno_rest.DiscordGuild.md#verification_level)
- [voice_states](discordeno_rest.DiscordGuild.md#voice_states)
- [welcome_screen](discordeno_rest.DiscordGuild.md#welcome_screen)
- [widget_channel_id](discordeno_rest.DiscordGuild.md#widget_channel_id)
- [widget_enabled](discordeno_rest.DiscordGuild.md#widget_enabled)

## Properties

### afk_channel_id

• **afk_channel_id**: `null` \| `string`

Id of afk channel

#### Defined in

packages/types/dist/discord.d.ts:496

---

### afk_timeout

• **afk_timeout**: `number`

Afk timeout in seconds

#### Defined in

packages/types/dist/discord.d.ts:438

---

### application_id

• **application_id**: `null` \| `string`

Application id of the guild creator if it is bot-created

#### Defined in

packages/types/dist/discord.d.ts:504

---

### approximate_member_count

• `Optional` **approximate_member_count**: `number`

Approximate number of members in this guild, returned from the GET /guilds/<id> endpoint when with_counts is true

#### Defined in

packages/types/dist/discord.d.ts:474

---

### approximate_presence_count

• `Optional` **approximate_presence_count**: `number`

Approximate number of non-offline members in this guild, returned from the GET /guilds/<id> endpoint when with_counts is true

#### Defined in

packages/types/dist/discord.d.ts:476

---

### banner

• **banner**: `null` \| `string`

Banner hash

#### Defined in

packages/types/dist/discord.d.ts:522

---

### channels

• `Optional` **channels**: [`DiscordChannel`](discordeno_rest.DiscordChannel.md)[]

Channels in the guild

#### Defined in

packages/types/dist/discord.d.ts:516

---

### default_message_notifications

• **default_message_notifications**: [`DefaultMessageNotificationLevels`](../enums/discordeno_rest.DefaultMessageNotificationLevels.md)

Default message notifications level

#### Defined in

packages/types/dist/discord.d.ts:444

---

### description

• **description**: `null` \| `string`

The description of a guild

#### Defined in

packages/types/dist/discord.d.ts:466

---

### discovery_splash

• **discovery_splash**: `null` \| `string`

Discovery splash hash; only present for guilds with the "DISCOVERABLE" feature

#### Defined in

packages/types/dist/discord.d.ts:490

---

### emojis

• **emojis**: [`DiscordEmoji`](discordeno_rest.DiscordEmoji.md)[]

Custom guild emojis

#### Defined in

packages/types/dist/discord.d.ts:502

---

### explicit_content_filter

• **explicit_content_filter**: [`ExplicitContentFilterLevels`](../enums/discordeno_rest.ExplicitContentFilterLevels.md)

Explicit content filter level

#### Defined in

packages/types/dist/discord.d.ts:446

---

### features

• **features**: [`GuildFeatures`](../enums/discordeno_rest.GuildFeatures.md)[]

Enabled guild features

#### Defined in

packages/types/dist/discord.d.ts:448

---

### icon

• **icon**: `null` \| `string`

Icon hash

#### Defined in

packages/types/dist/discord.d.ts:484

---

### icon_hash

• `Optional` **icon_hash**: `null` \| `string`

Icon hash, returned when in the template object

#### Defined in

packages/types/dist/discord.d.ts:486

---

### id

• **id**: `string`

Guild id

#### Defined in

packages/types/dist/discord.d.ts:482

---

### joined_at

• `Optional` **joined_at**: `string`

When this guild was joined at

#### Defined in

packages/types/dist/discord.d.ts:510

---

### large

• `Optional` **large**: `boolean`

True if this is considered a large guild

#### Defined in

packages/types/dist/discord.d.ts:454

---

### max_members

• `Optional` **max_members**: `number`

The maximum number of members for the guild

#### Defined in

packages/types/dist/discord.d.ts:462

---

### max_presences

• `Optional` **max_presences**: `null` \| `number`

The maximum number of presences for the guild (the default value, currently 25000, is in effect when null is returned)

#### Defined in

packages/types/dist/discord.d.ts:460

---

### max_video_channel_users

• `Optional` **max_video_channel_users**: `number`

The maximum amount of users in a video channel

#### Defined in

packages/types/dist/discord.d.ts:472

---

### member_count

• `Optional` **member_count**: `number`

Total number of members in this guild

#### Defined in

packages/types/dist/discord.d.ts:458

---

### members

• `Optional` **members**: [`DiscordMember`](discordeno_rest.DiscordMember.md)[]

Users in the guild

#### Defined in

packages/types/dist/discord.d.ts:514

---

### mfa_level

• **mfa_level**: [`MfaLevels`](../enums/discordeno_rest.MfaLevels.md)

Required MFA level for the guild

#### Defined in

packages/types/dist/discord.d.ts:450

---

### name

• **name**: `string`

Guild name (2-100 characters, excluding trailing and leading whitespace)

#### Defined in

packages/types/dist/discord.d.ts:434

---

### nsfw_level

• **nsfw_level**: [`GuildNsfwLevel`](../enums/discordeno_rest.GuildNsfwLevel.md)

Guild NSFW level

#### Defined in

packages/types/dist/discord.d.ts:478

---

### owner

• `Optional` **owner**: `boolean`

True if the user is the owner of the guild

#### Defined in

packages/types/dist/discord.d.ts:436

---

### owner_id

• **owner_id**: `string`

Id of the owner

#### Defined in

packages/types/dist/discord.d.ts:492

---

### permissions

• `Optional` **permissions**: `string`

Total permissions for the user in the guild (excludes overwrites)

#### Defined in

packages/types/dist/discord.d.ts:494

---

### preferred_locale

• **preferred_locale**: `string`

The preferred locale of a Community guild; used in server discovery and notices from Discord; defaults to "en-US"

#### Defined in

packages/types/dist/discord.d.ts:524

---

### premium_progress_bar_enabled

• **premium_progress_bar_enabled**: `boolean`

Whether the guild has the boost progress bar enabled

#### Defined in

packages/types/dist/discord.d.ts:480

---

### premium_subscription_count

• `Optional` **premium_subscription_count**: `number`

The number of boosts this guild currently has

#### Defined in

packages/types/dist/discord.d.ts:470

---

### premium_tier

• **premium_tier**: [`PremiumTiers`](../enums/discordeno_rest.PremiumTiers.md)

Premium tier (Server Boost level)

#### Defined in

packages/types/dist/discord.d.ts:468

---

### presences

• `Optional` **presences**: `Partial`<[`DiscordPresenceUpdate`](discordeno_rest.DiscordPresenceUpdate.md)\>[]

Presences of the members in the guild, will only include non-offline members if the size is greater than large threshold

#### Defined in

packages/types/dist/discord.d.ts:520

---

### public_updates_channel_id

• **public_updates_channel_id**: `null` \| `string`

The id of the channel where admins and moderators of Community guilds receive notices from Discord

#### Defined in

packages/types/dist/discord.d.ts:526

---

### roles

• **roles**: [`DiscordRole`](discordeno_rest.DiscordRole.md)[]

Roles in the guild

#### Defined in

packages/types/dist/discord.d.ts:500

---

### rules_channel_id

• **rules_channel_id**: `null` \| `string`

The id of the channel where community guilds can display rules and/or guidelines

#### Defined in

packages/types/dist/discord.d.ts:508

---

### splash

• **splash**: `null` \| `string`

Splash hash

#### Defined in

packages/types/dist/discord.d.ts:488

---

### stage_instances

• `Optional` **stage_instances**: [`DiscordStageInstance`](discordeno_rest.DiscordStageInstance.md)[]

Stage instances in the guild

#### Defined in

packages/types/dist/discord.d.ts:530

---

### system_channel_flags

• **system_channel_flags**: [`SystemChannelFlags`](../enums/discordeno_rest.SystemChannelFlags.md)

System channel flags

#### Defined in

packages/types/dist/discord.d.ts:452

---

### system_channel_id

• **system_channel_id**: `null` \| `string`

The id of the channel where guild notices such as welcome messages and boost events are posted

#### Defined in

packages/types/dist/discord.d.ts:506

---

### threads

• `Optional` **threads**: [`DiscordChannel`](discordeno_rest.DiscordChannel.md)[]

All active threads in the guild that the current user has permission to view

#### Defined in

packages/types/dist/discord.d.ts:518

---

### unavailable

• `Optional` **unavailable**: `boolean`

True if this guild is unavailable due to an outage

#### Defined in

packages/types/dist/discord.d.ts:456

---

### vanity_url_code

• **vanity_url_code**: `null` \| `string`

The vanity url code for the guild

#### Defined in

packages/types/dist/discord.d.ts:464

---

### verification_level

• **verification_level**: [`VerificationLevels`](../enums/discordeno_rest.VerificationLevels.md)

Verification level required for the guild

#### Defined in

packages/types/dist/discord.d.ts:442

---

### voice_states

• `Optional` **voice_states**: `Omit`<[`DiscordVoiceState`](discordeno_rest.DiscordVoiceState.md), `"guildId"`\>[]

States of members currently in voice channels; lacks the guild_id key

#### Defined in

packages/types/dist/discord.d.ts:512

---

### welcome_screen

• `Optional` **welcome_screen**: [`DiscordWelcomeScreen`](discordeno_rest.DiscordWelcomeScreen.md)

The welcome screen of a Community guild, shown to new members, returned in an Invite's guild object

#### Defined in

packages/types/dist/discord.d.ts:528

---

### widget_channel_id

• `Optional` **widget_channel_id**: `null` \| `string`

The channel id that the widget will generate an invite to, or null if set to no invite

#### Defined in

packages/types/dist/discord.d.ts:498

---

### widget_enabled

• `Optional` **widget_enabled**: `boolean`

True if the server widget is enabled

#### Defined in

packages/types/dist/discord.d.ts:440
