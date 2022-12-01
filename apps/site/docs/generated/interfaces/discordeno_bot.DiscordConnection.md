[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordConnection

# Interface: DiscordConnection

[@discordeno/bot](../modules/discordeno_bot.md).DiscordConnection

https://discord.com/developers/docs/resources/user#connection-object

## Table of contents

### Properties

- [friend_sync](discordeno_bot.DiscordConnection.md#friend_sync)
- [id](discordeno_bot.DiscordConnection.md#id)
- [integrations](discordeno_bot.DiscordConnection.md#integrations)
- [name](discordeno_bot.DiscordConnection.md#name)
- [revoked](discordeno_bot.DiscordConnection.md#revoked)
- [show_activity](discordeno_bot.DiscordConnection.md#show_activity)
- [two_way_link](discordeno_bot.DiscordConnection.md#two_way_link)
- [type](discordeno_bot.DiscordConnection.md#type)
- [verified](discordeno_bot.DiscordConnection.md#verified)
- [visibility](discordeno_bot.DiscordConnection.md#visibility)

## Properties

### friend_sync

• **friend_sync**: `boolean`

Whether friend sync is enabled for this connection

#### Defined in

packages/types/dist/discord.d.ts:48

---

### id

• **id**: `string`

id of the connection account

#### Defined in

packages/types/dist/discord.d.ts:38

---

### integrations

• `Optional` **integrations**: [`DiscordIntegration`](discordeno_bot.DiscordIntegration.md)[]

An array of partial server integrations

#### Defined in

packages/types/dist/discord.d.ts:54

---

### name

• **name**: `string`

The username of the connection account

#### Defined in

packages/types/dist/discord.d.ts:40

---

### revoked

• `Optional` **revoked**: `boolean`

Whether the connection is revoked

#### Defined in

packages/types/dist/discord.d.ts:44

---

### show_activity

• **show_activity**: `boolean`

Whether activities related to this connection will be shown in presence updates

#### Defined in

packages/types/dist/discord.d.ts:50

---

### two_way_link

• **two_way_link**: `boolean`

Whether this connection has a corresponding third party OAuth2 token.

#### Defined in

packages/types/dist/discord.d.ts:56

---

### type

• **type**: [`DiscordConnectionServices`](../modules/discordeno_bot.md#discordconnectionservices)

The service of the connection (twitch, youtube)

#### Defined in

packages/types/dist/discord.d.ts:42

---

### verified

• **verified**: `boolean`

Whether the connection is verified

#### Defined in

packages/types/dist/discord.d.ts:46

---

### visibility

• **visibility**: [`VisibilityTypes`](../enums/discordeno_bot.VisibilityTypes.md)

Visibility of this connection

#### Defined in

packages/types/dist/discord.d.ts:52
