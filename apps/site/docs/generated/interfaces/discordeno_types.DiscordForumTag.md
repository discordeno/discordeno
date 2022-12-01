[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordForumTag

# Interface: DiscordForumTag

[@discordeno/types](../modules/discordeno_types.md).DiscordForumTag

## Table of contents

### Properties

- [emoji_id](discordeno_types.DiscordForumTag.md#emoji_id)
- [emoji_name](discordeno_types.DiscordForumTag.md#emoji_name)
- [id](discordeno_types.DiscordForumTag.md#id)
- [moderated](discordeno_types.DiscordForumTag.md#moderated)
- [name](discordeno_types.DiscordForumTag.md#name)

## Properties

### emoji_id

• **emoji_id**: `string`

The id of a guild's custom emoji At most one of emoji_id and emoji_name may be set.

#### Defined in

[packages/types/src/discord.ts:2496](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2496)

---

### emoji_name

• **emoji_name**: `null` \| `string`

The unicode character of the emoji

#### Defined in

[packages/types/src/discord.ts:2498](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2498)

---

### id

• **id**: `string`

The id of the tag

#### Defined in

[packages/types/src/discord.ts:2490](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2490)

---

### moderated

• **moderated**: `boolean`

Whether this tag can only be added to or removed from threads by a member with the MANAGE_THREADS permission

#### Defined in

[packages/types/src/discord.ts:2494](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2494)

---

### name

• **name**: `string`

The name of the tag (0-20 characters)

#### Defined in

[packages/types/src/discord.ts:2492](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2492)
