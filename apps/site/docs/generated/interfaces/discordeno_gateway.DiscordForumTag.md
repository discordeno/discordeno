[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / DiscordForumTag

# Interface: DiscordForumTag

[@discordeno/gateway](../modules/discordeno_gateway.md).DiscordForumTag

## Table of contents

### Properties

- [emoji_id](discordeno_gateway.DiscordForumTag.md#emoji_id)
- [emoji_name](discordeno_gateway.DiscordForumTag.md#emoji_name)
- [id](discordeno_gateway.DiscordForumTag.md#id)
- [moderated](discordeno_gateway.DiscordForumTag.md#moderated)
- [name](discordeno_gateway.DiscordForumTag.md#name)

## Properties

### emoji_id

• **emoji_id**: `string`

The id of a guild's custom emoji At most one of emoji_id and emoji_name may be set.

#### Defined in

packages/types/dist/discord.d.ts:2176

---

### emoji_name

• **emoji_name**: `null` \| `string`

The unicode character of the emoji

#### Defined in

packages/types/dist/discord.d.ts:2178

---

### id

• **id**: `string`

The id of the tag

#### Defined in

packages/types/dist/discord.d.ts:2170

---

### moderated

• **moderated**: `boolean`

Whether this tag can only be added to or removed from threads by a member with the MANAGE_THREADS permission

#### Defined in

packages/types/dist/discord.d.ts:2174

---

### name

• **name**: `string`

The name of the tag (0-20 characters)

#### Defined in

packages/types/dist/discord.d.ts:2172
