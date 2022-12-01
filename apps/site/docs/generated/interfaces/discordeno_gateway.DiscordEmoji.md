[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / DiscordEmoji

# Interface: DiscordEmoji

[@discordeno/gateway](../modules/discordeno_gateway.md).DiscordEmoji

https://discord.com/developers/docs/resources/emoji#emoji-object-emoji-structure

## Table of contents

### Properties

- [animated](discordeno_gateway.DiscordEmoji.md#animated)
- [available](discordeno_gateway.DiscordEmoji.md#available)
- [id](discordeno_gateway.DiscordEmoji.md#id)
- [managed](discordeno_gateway.DiscordEmoji.md#managed)
- [name](discordeno_gateway.DiscordEmoji.md#name)
- [require_colons](discordeno_gateway.DiscordEmoji.md#require_colons)
- [roles](discordeno_gateway.DiscordEmoji.md#roles)
- [user](discordeno_gateway.DiscordEmoji.md#user)

## Properties

### animated

• `Optional` **animated**: `boolean`

Whether this emoji is animated

#### Defined in

packages/types/dist/discord.d.ts:581

---

### available

• `Optional` **available**: `boolean`

Whether this emoji can be used, may be false due to loss of Server Boosts

#### Defined in

packages/types/dist/discord.d.ts:583

---

### id

• `Optional` **id**: `string`

Emoji id

#### Defined in

packages/types/dist/discord.d.ts:571

---

### managed

• `Optional` **managed**: `boolean`

Whether this emoji is managed

#### Defined in

packages/types/dist/discord.d.ts:579

---

### name

• `Optional` **name**: `string`

Emoji name (can only be null in reaction emoji objects)

#### Defined in

packages/types/dist/discord.d.ts:569

---

### require_colons

• `Optional` **require_colons**: `boolean`

Whether this emoji must be wrapped in colons

#### Defined in

packages/types/dist/discord.d.ts:577

---

### roles

• `Optional` **roles**: `string`[]

Roles allowed to use this emoji

#### Defined in

packages/types/dist/discord.d.ts:573

---

### user

• `Optional` **user**: [`DiscordUser`](discordeno_gateway.DiscordUser.md)

User that created this emoji

#### Defined in

packages/types/dist/discord.d.ts:575
