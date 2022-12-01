[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/rest](../modules/discordeno_rest.md) / DiscordEmoji

# Interface: DiscordEmoji

[@discordeno/rest](../modules/discordeno_rest.md).DiscordEmoji

https://discord.com/developers/docs/resources/emoji#emoji-object-emoji-structure

## Table of contents

### Properties

- [animated](discordeno_rest.DiscordEmoji.md#animated)
- [available](discordeno_rest.DiscordEmoji.md#available)
- [id](discordeno_rest.DiscordEmoji.md#id)
- [managed](discordeno_rest.DiscordEmoji.md#managed)
- [name](discordeno_rest.DiscordEmoji.md#name)
- [require_colons](discordeno_rest.DiscordEmoji.md#require_colons)
- [roles](discordeno_rest.DiscordEmoji.md#roles)
- [user](discordeno_rest.DiscordEmoji.md#user)

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

• `Optional` **user**: [`DiscordUser`](discordeno_rest.DiscordUser.md)

User that created this emoji

#### Defined in

packages/types/dist/discord.d.ts:575
