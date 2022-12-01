[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordEmoji

# Interface: DiscordEmoji

[@discordeno/types](../modules/discordeno_types.md).DiscordEmoji

https://discord.com/developers/docs/resources/emoji#emoji-object-emoji-structure

## Table of contents

### Properties

- [animated](discordeno_types.DiscordEmoji.md#animated)
- [available](discordeno_types.DiscordEmoji.md#available)
- [id](discordeno_types.DiscordEmoji.md#id)
- [managed](discordeno_types.DiscordEmoji.md#managed)
- [name](discordeno_types.DiscordEmoji.md#name)
- [require_colons](discordeno_types.DiscordEmoji.md#require_colons)
- [roles](discordeno_types.DiscordEmoji.md#roles)
- [user](discordeno_types.DiscordEmoji.md#user)

## Properties

### animated

• `Optional` **animated**: `boolean`

Whether this emoji is animated

#### Defined in

[packages/types/src/discord.ts:690](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L690)

---

### available

• `Optional` **available**: `boolean`

Whether this emoji can be used, may be false due to loss of Server Boosts

#### Defined in

[packages/types/src/discord.ts:692](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L692)

---

### id

• `Optional` **id**: `string`

Emoji id

#### Defined in

[packages/types/src/discord.ts:680](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L680)

---

### managed

• `Optional` **managed**: `boolean`

Whether this emoji is managed

#### Defined in

[packages/types/src/discord.ts:688](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L688)

---

### name

• `Optional` **name**: `string`

Emoji name (can only be null in reaction emoji objects)

#### Defined in

[packages/types/src/discord.ts:677](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L677)

---

### require_colons

• `Optional` **require_colons**: `boolean`

Whether this emoji must be wrapped in colons

#### Defined in

[packages/types/src/discord.ts:686](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L686)

---

### roles

• `Optional` **roles**: `string`[]

Roles allowed to use this emoji

#### Defined in

[packages/types/src/discord.ts:682](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L682)

---

### user

• `Optional` **user**: [`DiscordUser`](discordeno_types.DiscordUser.md)

User that created this emoji

#### Defined in

[packages/types/src/discord.ts:684](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L684)
