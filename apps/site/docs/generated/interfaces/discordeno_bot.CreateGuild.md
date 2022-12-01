[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / CreateGuild

# Interface: CreateGuild

[@discordeno/bot](../modules/discordeno_bot.md).CreateGuild

https://discord.com/developers/docs/resources/guild#create-guild

## Table of contents

### Properties

- [afkChannelId](discordeno_bot.CreateGuild.md#afkchannelid)
- [afkTimeout](discordeno_bot.CreateGuild.md#afktimeout)
- [channels](discordeno_bot.CreateGuild.md#channels)
- [defaultMessageNotifications](discordeno_bot.CreateGuild.md#defaultmessagenotifications)
- [explicitContentFilter](discordeno_bot.CreateGuild.md#explicitcontentfilter)
- [icon](discordeno_bot.CreateGuild.md#icon)
- [name](discordeno_bot.CreateGuild.md#name)
- [roles](discordeno_bot.CreateGuild.md#roles)
- [systemChannelFlags](discordeno_bot.CreateGuild.md#systemchannelflags)
- [systemChannelId](discordeno_bot.CreateGuild.md#systemchannelid)
- [verificationLevel](discordeno_bot.CreateGuild.md#verificationlevel)

## Properties

### afkChannelId

• `Optional` **afkChannelId**: `string`

Id for afk channel

#### Defined in

[packages/bot/src/helpers/guilds/createGuild.ts:60](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/createGuild.ts#L60)

---

### afkTimeout

• `Optional` **afkTimeout**: `number`

Afk timeout in seconds

#### Defined in

[packages/bot/src/helpers/guilds/createGuild.ts:62](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/createGuild.ts#L62)

---

### channels

• `Optional` **channels**: `Partial`<[`Channel`](discordeno_bot.Channel.md)\>[]

New guild's channels

#### Defined in

[packages/bot/src/helpers/guilds/createGuild.ts:58](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/createGuild.ts#L58)

---

### defaultMessageNotifications

• `Optional` **defaultMessageNotifications**: [`DefaultMessageNotificationLevels`](../enums/discordeno_bot.DefaultMessageNotificationLevels.md)

Default message notification level

#### Defined in

[packages/bot/src/helpers/guilds/createGuild.ts:52](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/createGuild.ts#L52)

---

### explicitContentFilter

• `Optional` **explicitContentFilter**: [`ExplicitContentFilterLevels`](../enums/discordeno_bot.ExplicitContentFilterLevels.md)

Explicit content filter level

#### Defined in

[packages/bot/src/helpers/guilds/createGuild.ts:54](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/createGuild.ts#L54)

---

### icon

• `Optional` **icon**: `string`

Base64 128x128 image for the guild icon

#### Defined in

[packages/bot/src/helpers/guilds/createGuild.ts:48](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/createGuild.ts#L48)

---

### name

• **name**: `string`

Name of the guild (1-100 characters)

#### Defined in

[packages/bot/src/helpers/guilds/createGuild.ts:46](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/createGuild.ts#L46)

---

### roles

• `Optional` **roles**: [`Role`](discordeno_bot.Role.md)[]

New guild roles (first role is the everyone role)

#### Defined in

[packages/bot/src/helpers/guilds/createGuild.ts:56](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/createGuild.ts#L56)

---

### systemChannelFlags

• `Optional` **systemChannelFlags**: [`SystemChannelFlags`](../enums/discordeno_bot.SystemChannelFlags.md)

System channel flags

#### Defined in

[packages/bot/src/helpers/guilds/createGuild.ts:66](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/createGuild.ts#L66)

---

### systemChannelId

• `Optional` **systemChannelId**: `string`

The id of the channel where guild notices such as welcome messages and boost events are posted

#### Defined in

[packages/bot/src/helpers/guilds/createGuild.ts:64](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/createGuild.ts#L64)

---

### verificationLevel

• `Optional` **verificationLevel**: [`VerificationLevels`](../enums/discordeno_bot.VerificationLevels.md)

Verification level

#### Defined in

[packages/bot/src/helpers/guilds/createGuild.ts:50](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/createGuild.ts#L50)
