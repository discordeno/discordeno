[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / DiscordMessageReactionAdd

# Interface: DiscordMessageReactionAdd

[@discordeno/gateway](../modules/discordeno_gateway.md).DiscordMessageReactionAdd

https://discord.com/developers/docs/topics/gateway#message-reaction-add

## Table of contents

### Properties

- [channel_id](discordeno_gateway.DiscordMessageReactionAdd.md#channel_id)
- [emoji](discordeno_gateway.DiscordMessageReactionAdd.md#emoji)
- [guild_id](discordeno_gateway.DiscordMessageReactionAdd.md#guild_id)
- [member](discordeno_gateway.DiscordMessageReactionAdd.md#member)
- [message_id](discordeno_gateway.DiscordMessageReactionAdd.md#message_id)
- [user_id](discordeno_gateway.DiscordMessageReactionAdd.md#user_id)

## Properties

### channel_id

• **channel_id**: `string`

The id of the channel

#### Defined in

packages/types/dist/discord.d.ts:1881

---

### emoji

• **emoji**: `Partial`<[`DiscordEmoji`](discordeno_gateway.DiscordEmoji.md)\>

The emoji used to react

#### Defined in

packages/types/dist/discord.d.ts:1889

---

### guild_id

• `Optional` **guild_id**: `string`

The id of the guild

#### Defined in

packages/types/dist/discord.d.ts:1885

---

### member

• `Optional` **member**: [`DiscordMemberWithUser`](discordeno_gateway.DiscordMemberWithUser.md)

The member who reacted if this happened in a guild

#### Defined in

packages/types/dist/discord.d.ts:1887

---

### message_id

• **message_id**: `string`

The id of the message

#### Defined in

packages/types/dist/discord.d.ts:1883

---

### user_id

• **user_id**: `string`

The id of the user

#### Defined in

packages/types/dist/discord.d.ts:1879
