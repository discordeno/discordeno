[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / Template

# Interface: Template

[@discordeno/bot](../modules/discordeno_bot.md).Template

## Hierarchy

- `ReturnType`<typeof `transformTemplate`\>

  ↳ **`Template`**

## Table of contents

### Properties

- [code](discordeno_bot.Template.md#code)
- [createdAt](discordeno_bot.Template.md#createdat)
- [creator](discordeno_bot.Template.md#creator)
- [creatorId](discordeno_bot.Template.md#creatorid)
- [description](discordeno_bot.Template.md#description)
- [isDirty](discordeno_bot.Template.md#isdirty)
- [name](discordeno_bot.Template.md#name)
- [serializedSourceGuild](discordeno_bot.Template.md#serializedsourceguild)
- [sourceGuildId](discordeno_bot.Template.md#sourceguildid)
- [updatedAt](discordeno_bot.Template.md#updatedat)
- [usageCount](discordeno_bot.Template.md#usagecount)

## Properties

### code

• **code**: `string`

#### Inherited from

ReturnType.code

---

### createdAt

• **createdAt**: `number`

#### Inherited from

ReturnType.createdAt

---

### creator

• **creator**: `Object`

#### Type declaration

| Name            | Type                                                                     |
| :-------------- | :----------------------------------------------------------------------- |
| `avatar`        | `undefined` \| `bigint`                                                  |
| `discriminator` | `string`                                                                 |
| `email`         | `undefined` \| `string`                                                  |
| `flags`         | `undefined` \| [`UserFlags`](../enums/discordeno_bot.UserFlags.md)       |
| `id`            | `bigint`                                                                 |
| `locale`        | `undefined` \| `string`                                                  |
| `premiumType`   | `undefined` \| [`PremiumTypes`](../enums/discordeno_bot.PremiumTypes.md) |
| `publicFlags`   | `undefined` \| [`UserFlags`](../enums/discordeno_bot.UserFlags.md)       |
| `toggles`       | [`UserToggles`](../classes/discordeno_bot.UserToggles.md)                |
| `username`      | `string`                                                                 |

#### Inherited from

ReturnType.creator

---

### creatorId

• **creatorId**: `bigint`

#### Inherited from

ReturnType.creatorId

---

### description

• **description**: `undefined` \| `null` \| `string`

#### Inherited from

ReturnType.description

---

### isDirty

• **isDirty**: `undefined` \| `boolean`

#### Inherited from

ReturnType.isDirty

---

### name

• **name**: `string`

#### Inherited from

ReturnType.name

---

### serializedSourceGuild

• **serializedSourceGuild**: `Object`

#### Type declaration

| Name                            | Type                                                                                                                                                                                                                                                                                                                                                         |
| :------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `afk_channel_id`                | `undefined` \| `null` \| `string`                                                                                                                                                                                                                                                                                                                            |
| `afk_timeout`                   | `number`                                                                                                                                                                                                                                                                                                                                                     |
| `application_id`                | `undefined` \| `null` \| `string`                                                                                                                                                                                                                                                                                                                            |
| `approximate_member_count`      | `undefined` \| `number`                                                                                                                                                                                                                                                                                                                                      |
| `approximate_presence_count`    | `undefined` \| `number`                                                                                                                                                                                                                                                                                                                                      |
| `banner`                        | `undefined` \| `null` \| `string`                                                                                                                                                                                                                                                                                                                            |
| `channels`                      | `undefined` \| { position?: number \| undefined; name?: string \| undefined; topic?: string \| null \| undefined; nsfw?: boolean \| undefined; bitrate?: number \| undefined; permissions?: string \| undefined; ... 24 more ...; default_thread_rate_limit_per_user: number; }[]                                                                            |
| `default_message_notifications` | `DefaultMessageNotificationLevels`                                                                                                                                                                                                                                                                                                                           |
| `description`                   | `undefined` \| `null` \| `string`                                                                                                                                                                                                                                                                                                                            |
| `discovery_splash`              | `undefined` \| `null` \| `string`                                                                                                                                                                                                                                                                                                                            |
| `emojis`                        | `undefined` \| { name?: string \| undefined; id?: string \| undefined; user?: { flags?: UserFlags \| undefined; bot?: boolean \| undefined; avatar?: string \| null \| undefined; locale?: string \| undefined; ... 10 more ...; discriminator: string; } \| undefined; ... 4 more ...; available?: boolean \| undefined; }[]                                |
| `explicit_content_filter`       | `ExplicitContentFilterLevels`                                                                                                                                                                                                                                                                                                                                |
| `features`                      | `undefined` \| [`GuildFeatures`](../enums/discordeno_bot.GuildFeatures.md)[]                                                                                                                                                                                                                                                                                 |
| `icon`                          | `undefined` \| `null` \| `string`                                                                                                                                                                                                                                                                                                                            |
| `icon_hash`                     | `undefined` \| `null` \| `string`                                                                                                                                                                                                                                                                                                                            |
| `id`                            | `undefined` \| `string`                                                                                                                                                                                                                                                                                                                                      |
| `joined_at`                     | `undefined` \| `string`                                                                                                                                                                                                                                                                                                                                      |
| `large`                         | `undefined` \| `boolean`                                                                                                                                                                                                                                                                                                                                     |
| `max_members`                   | `undefined` \| `number`                                                                                                                                                                                                                                                                                                                                      |
| `max_presences`                 | `undefined` \| `null` \| `number`                                                                                                                                                                                                                                                                                                                            |
| `max_video_channel_users`       | `undefined` \| `number`                                                                                                                                                                                                                                                                                                                                      |
| `member_count`                  | `undefined` \| `number`                                                                                                                                                                                                                                                                                                                                      |
| `members`                       | `undefined` \| { permissions?: string \| undefined; avatar?: string \| undefined; user?: { flags?: UserFlags \| undefined; bot?: boolean \| undefined; avatar?: string \| null \| undefined; locale?: string \| undefined; ... 10 more ...; discriminator: string; } \| undefined; ... 7 more ...; joined_at: string; }[]                                    |
| `mfa_level`                     | `undefined` \| [`MfaLevels`](../enums/discordeno_bot.MfaLevels.md)                                                                                                                                                                                                                                                                                           |
| `name`                          | `string`                                                                                                                                                                                                                                                                                                                                                     |
| `nsfw_level`                    | `undefined` \| [`GuildNsfwLevel`](../enums/discordeno_bot.GuildNsfwLevel.md)                                                                                                                                                                                                                                                                                 |
| `owner`                         | `undefined` \| `boolean`                                                                                                                                                                                                                                                                                                                                     |
| `owner_id`                      | `undefined` \| `string`                                                                                                                                                                                                                                                                                                                                      |
| `permissions`                   | `undefined` \| `string`                                                                                                                                                                                                                                                                                                                                      |
| `preferred_locale`              | `string`                                                                                                                                                                                                                                                                                                                                                     |
| `premium_progress_bar_enabled`  | `undefined` \| `boolean`                                                                                                                                                                                                                                                                                                                                     |
| `premium_subscription_count`    | `undefined` \| `number`                                                                                                                                                                                                                                                                                                                                      |
| `premium_tier`                  | `undefined` \| [`PremiumTiers`](../enums/discordeno_bot.PremiumTiers.md)                                                                                                                                                                                                                                                                                     |
| `presences`                     | `undefined` \| { user?: { flags?: UserFlags \| undefined; bot?: boolean \| undefined; avatar?: string \| null \| undefined; locale?: string \| undefined; email?: string \| null \| undefined; premium_type?: PremiumTypes \| undefined; ... 8 more ...; discriminator: string; } \| undefined; guild_id?: string \| undefined; status?: "idle" \| ... ...[] |
| `public_updates_channel_id`     | `undefined` \| `null` \| `string`                                                                                                                                                                                                                                                                                                                            |
| `roles`                         | `Omit`<[`PickPartial`](../modules/discordeno_bot.md#pickpartial)<[`DiscordRole`](discordeno_bot.DiscordRole.md), `"name"` \| `"permissions"` \| `"icon"` \| `"color"` \| `"hoist"` \| `"mentionable"` \| `"unicode_emoji"`\>, `"id"`\> & { `id`: `number` }[]                                                                                                |
| `rules_channel_id`              | `undefined` \| `null` \| `string`                                                                                                                                                                                                                                                                                                                            |
| `splash`                        | `undefined` \| `null` \| `string`                                                                                                                                                                                                                                                                                                                            |
| `stage_instances`               | `undefined` \| { guild_scheduled_event_id?: string \| undefined; topic: string; id: string; channel_id: string; guild_id: string; }[]                                                                                                                                                                                                                        |
| `system_channel_flags`          | `SystemChannelFlags`                                                                                                                                                                                                                                                                                                                                         |
| `system_channel_id`             | `undefined` \| `null` \| `string`                                                                                                                                                                                                                                                                                                                            |
| `threads`                       | `undefined` \| { position?: number \| undefined; name?: string \| undefined; topic?: string \| null \| undefined; nsfw?: boolean \| undefined; bitrate?: number \| undefined; permissions?: string \| undefined; ... 24 more ...; default_thread_rate_limit_per_user: number; }[]                                                                            |
| `unavailable`                   | `undefined` \| `boolean`                                                                                                                                                                                                                                                                                                                                     |
| `vanity_url_code`               | `undefined` \| `null` \| `string`                                                                                                                                                                                                                                                                                                                            |
| `verification_level`            | `VerificationLevels`                                                                                                                                                                                                                                                                                                                                         |
| `voice_states`                  | `undefined` \| { member?: { permissions?: string \| undefined; avatar?: string \| undefined; deaf?: boolean \| undefined; mute?: boolean \| undefined; pending?: boolean \| undefined; nick?: string \| null \| undefined; ... 4 more ...; joined_at: string; } \| undefined; ... 11 more ...; suppress: boolean; }[]                                        |
| `welcome_screen`                | `undefined` \| { description?: string \| null \| undefined; welcome_channels: DiscordWelcomeScreenChannel[]; }                                                                                                                                                                                                                                               |
| `widget_channel_id`             | `undefined` \| `null` \| `string`                                                                                                                                                                                                                                                                                                                            |
| `widget_enabled`                | `undefined` \| `boolean`                                                                                                                                                                                                                                                                                                                                     |

#### Inherited from

ReturnType.serializedSourceGuild

---

### sourceGuildId

• **sourceGuildId**: `bigint`

#### Inherited from

ReturnType.sourceGuildId

---

### updatedAt

• **updatedAt**: `number`

#### Inherited from

ReturnType.updatedAt

---

### usageCount

• **usageCount**: `number`

#### Inherited from

ReturnType.usageCount
