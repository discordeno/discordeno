[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordConnection

# Interface: DiscordConnection

[@discordeno/types](../modules/discordeno_types.md).DiscordConnection

https://discord.com/developers/docs/resources/user#connection-object

## Table of contents

### Properties

- [friend_sync](discordeno_types.DiscordConnection.md#friend_sync)
- [id](discordeno_types.DiscordConnection.md#id)
- [integrations](discordeno_types.DiscordConnection.md#integrations)
- [name](discordeno_types.DiscordConnection.md#name)
- [revoked](discordeno_types.DiscordConnection.md#revoked)
- [show_activity](discordeno_types.DiscordConnection.md#show_activity)
- [two_way_link](discordeno_types.DiscordConnection.md#two_way_link)
- [type](discordeno_types.DiscordConnection.md#type)
- [verified](discordeno_types.DiscordConnection.md#verified)
- [visibility](discordeno_types.DiscordConnection.md#visibility)

## Properties

### friend_sync

• **friend_sync**: `boolean`

Whether friend sync is enabled for this connection

#### Defined in

[packages/types/src/discord.ts:95](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L95)

---

### id

• **id**: `string`

id of the connection account

#### Defined in

[packages/types/src/discord.ts:85](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L85)

---

### integrations

• `Optional` **integrations**: [`DiscordIntegration`](discordeno_types.DiscordIntegration.md)[]

An array of partial server integrations

#### Defined in

[packages/types/src/discord.ts:102](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L102)

---

### name

• **name**: `string`

The username of the connection account

#### Defined in

[packages/types/src/discord.ts:87](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L87)

---

### revoked

• `Optional` **revoked**: `boolean`

Whether the connection is revoked

#### Defined in

[packages/types/src/discord.ts:91](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L91)

---

### show_activity

• **show_activity**: `boolean`

Whether activities related to this connection will be shown in presence updates

#### Defined in

[packages/types/src/discord.ts:97](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L97)

---

### two_way_link

• **two_way_link**: `boolean`

Whether this connection has a corresponding third party OAuth2 token.

#### Defined in

[packages/types/src/discord.ts:104](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L104)

---

### type

• **type**: [`DiscordConnectionServices`](../modules/discordeno_types.md#discordconnectionservices)

The service of the connection (twitch, youtube)

#### Defined in

[packages/types/src/discord.ts:89](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L89)

---

### verified

• **verified**: `boolean`

Whether the connection is verified

#### Defined in

[packages/types/src/discord.ts:93](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L93)

---

### visibility

• **visibility**: [`VisibilityTypes`](../enums/discordeno_types.VisibilityTypes.md)

Visibility of this connection

#### Defined in

[packages/types/src/discord.ts:99](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L99)
