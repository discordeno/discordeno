[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordMessageReactionAdd

# Interface: DiscordMessageReactionAdd

[@discordeno/types](../modules/discordeno_types.md).DiscordMessageReactionAdd

https://discord.com/developers/docs/topics/gateway#message-reaction-add

## Table of contents

### Properties

- [channel_id](discordeno_types.DiscordMessageReactionAdd.md#channel_id)
- [emoji](discordeno_types.DiscordMessageReactionAdd.md#emoji)
- [guild_id](discordeno_types.DiscordMessageReactionAdd.md#guild_id)
- [member](discordeno_types.DiscordMessageReactionAdd.md#member)
- [message_id](discordeno_types.DiscordMessageReactionAdd.md#message_id)
- [user_id](discordeno_types.DiscordMessageReactionAdd.md#user_id)

## Properties

### channel_id

• **channel_id**: `string`

The id of the channel

#### Defined in

[packages/types/src/discord.ts:2145](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2145)

---

### emoji

• **emoji**: `Partial`<[`DiscordEmoji`](discordeno_types.DiscordEmoji.md)\>

The emoji used to react

#### Defined in

[packages/types/src/discord.ts:2153](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2153)

---

### guild_id

• `Optional` **guild_id**: `string`

The id of the guild

#### Defined in

[packages/types/src/discord.ts:2149](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2149)

---

### member

• `Optional` **member**: [`DiscordMemberWithUser`](discordeno_types.DiscordMemberWithUser.md)

The member who reacted if this happened in a guild

#### Defined in

[packages/types/src/discord.ts:2151](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2151)

---

### message_id

• **message_id**: `string`

The id of the message

#### Defined in

[packages/types/src/discord.ts:2147](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2147)

---

### user_id

• **user_id**: `string`

The id of the user

#### Defined in

[packages/types/src/discord.ts:2143](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2143)
