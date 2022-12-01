[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / ModifyGuild

# Interface: ModifyGuild

[@discordeno/bot](../modules/discordeno_bot.md).ModifyGuild

https://discord.com/developers/docs/resources/guild#modify-guild

## Table of contents

### Properties

- [afkChannelId](discordeno_bot.ModifyGuild.md#afkchannelid)
- [afkTimeout](discordeno_bot.ModifyGuild.md#afktimeout)
- [banner](discordeno_bot.ModifyGuild.md#banner)
- [defaultMessageNotifications](discordeno_bot.ModifyGuild.md#defaultmessagenotifications)
- [discoverySplash](discordeno_bot.ModifyGuild.md#discoverysplash)
- [explicitContentFilter](discordeno_bot.ModifyGuild.md#explicitcontentfilter)
- [features](discordeno_bot.ModifyGuild.md#features)
- [icon](discordeno_bot.ModifyGuild.md#icon)
- [name](discordeno_bot.ModifyGuild.md#name)
- [ownerId](discordeno_bot.ModifyGuild.md#ownerid)
- [preferredLocale](discordeno_bot.ModifyGuild.md#preferredlocale)
- [premiumProgressBarEnabled](discordeno_bot.ModifyGuild.md#premiumprogressbarenabled)
- [publicUpdatesChannelId](discordeno_bot.ModifyGuild.md#publicupdateschannelid)
- [rulesChannelId](discordeno_bot.ModifyGuild.md#ruleschannelid)
- [splash](discordeno_bot.ModifyGuild.md#splash)
- [systemChannelFlags](discordeno_bot.ModifyGuild.md#systemchannelflags)
- [systemChannelId](discordeno_bot.ModifyGuild.md#systemchannelid)
- [verificationLevel](discordeno_bot.ModifyGuild.md#verificationlevel)

## Properties

### afkChannelId

• `Optional` **afkChannelId**: `null` \| [`BigString`](../modules/discordeno_bot.md#bigstring)

Id for afk channel

#### Defined in

[packages/bot/src/helpers/guilds/editGuild.ts:87](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/editGuild.ts#L87)

---

### afkTimeout

• `Optional` **afkTimeout**: `number`

Afk timeout in seconds

#### Defined in

[packages/bot/src/helpers/guilds/editGuild.ts:89](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/editGuild.ts#L89)

---

### banner

• `Optional` **banner**: `null` \| `string`

Base64 16:9 png/jpeg image for the guild banner (when the server has BANNER feature)

#### Defined in

[packages/bot/src/helpers/guilds/editGuild.ts:99](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/editGuild.ts#L99)

---

### defaultMessageNotifications

• `Optional` **defaultMessageNotifications**: `null` \| [`DefaultMessageNotificationLevels`](../enums/discordeno_bot.DefaultMessageNotificationLevels.md)

Default message notification filter level

#### Defined in

[packages/bot/src/helpers/guilds/editGuild.ts:83](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/editGuild.ts#L83)

---

### discoverySplash

• `Optional` **discoverySplash**: `null` \| `string`

Base64 16:9 png/jpeg image for the guild discovery spash (when the server has the `DISCOVERABLE` feature)

#### Defined in

[packages/bot/src/helpers/guilds/editGuild.ts:97](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/editGuild.ts#L97)

---

### explicitContentFilter

• `Optional` **explicitContentFilter**: `null` \| [`ExplicitContentFilterLevels`](../enums/discordeno_bot.ExplicitContentFilterLevels.md)

Explicit content filter level

#### Defined in

[packages/bot/src/helpers/guilds/editGuild.ts:85](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/editGuild.ts#L85)

---

### features

• `Optional` **features**: [`GuildFeatures`](../enums/discordeno_bot.GuildFeatures.md)[]

Enabled guild features

#### Defined in

[packages/bot/src/helpers/guilds/editGuild.ts:111](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/editGuild.ts#L111)

---

### icon

• `Optional` **icon**: `null` \| `string`

Base64 1024x1024 png/jpeg/gif image for the guild icon (can be animated gif when the server has the `ANIMATED_ICON` feature)

#### Defined in

[packages/bot/src/helpers/guilds/editGuild.ts:91](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/editGuild.ts#L91)

---

### name

• `Optional` **name**: `string`

Guild name

#### Defined in

[packages/bot/src/helpers/guilds/editGuild.ts:79](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/editGuild.ts#L79)

---

### ownerId

• `Optional` **ownerId**: [`BigString`](../modules/discordeno_bot.md#bigstring)

User id to transfer guild ownership to (must be owner)

#### Defined in

[packages/bot/src/helpers/guilds/editGuild.ts:93](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/editGuild.ts#L93)

---

### preferredLocale

• `Optional` **preferredLocale**: `null` \| `string`

The preferred locale of a Community guild used in server discovery and notices from Discord; defaults to "en-US"

#### Defined in

[packages/bot/src/helpers/guilds/editGuild.ts:109](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/editGuild.ts#L109)

---

### premiumProgressBarEnabled

• `Optional` **premiumProgressBarEnabled**: `boolean`

Whether the guild's boost progress bar should be enabled

#### Defined in

[packages/bot/src/helpers/guilds/editGuild.ts:113](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/editGuild.ts#L113)

---

### publicUpdatesChannelId

• `Optional` **publicUpdatesChannelId**: `null` \| [`BigString`](../modules/discordeno_bot.md#bigstring)

The id of the channel where admins and moderators of Community guilds receive notices from Discord

#### Defined in

[packages/bot/src/helpers/guilds/editGuild.ts:107](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/editGuild.ts#L107)

---

### rulesChannelId

• `Optional` **rulesChannelId**: `null` \| [`BigString`](../modules/discordeno_bot.md#bigstring)

The id of the channel where Community guilds display rules and/or guidelines

#### Defined in

[packages/bot/src/helpers/guilds/editGuild.ts:105](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/editGuild.ts#L105)

---

### splash

• `Optional` **splash**: `null` \| `string`

Base64 16:9 png/jpeg image for the guild splash (when the server has `INVITE_SPLASH` feature)

#### Defined in

[packages/bot/src/helpers/guilds/editGuild.ts:95](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/editGuild.ts#L95)

---

### systemChannelFlags

• `Optional` **systemChannelFlags**: [`SystemChannelFlags`](../enums/discordeno_bot.SystemChannelFlags.md)

System channel flags

#### Defined in

[packages/bot/src/helpers/guilds/editGuild.ts:103](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/editGuild.ts#L103)

---

### systemChannelId

• `Optional` **systemChannelId**: `null` \| [`BigString`](../modules/discordeno_bot.md#bigstring)

The id of the channel where guild notices such as welcome messages and boost events are posted

#### Defined in

[packages/bot/src/helpers/guilds/editGuild.ts:101](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/editGuild.ts#L101)

---

### verificationLevel

• `Optional` **verificationLevel**: `null` \| [`VerificationLevels`](../enums/discordeno_bot.VerificationLevels.md)

Verification level

#### Defined in

[packages/bot/src/helpers/guilds/editGuild.ts:81](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/editGuild.ts#L81)
