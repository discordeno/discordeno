[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordMessageReactionRemove

# Interface: DiscordMessageReactionRemove

[@discordeno/types](../modules/discordeno_types.md).DiscordMessageReactionRemove

https://discord.com/developers/docs/topics/gateway#message-reaction-remove

## Hierarchy

- `Omit`<[`DiscordMessageReactionAdd`](discordeno_types.DiscordMessageReactionAdd.md), `"member"`\>

  ↳ **`DiscordMessageReactionRemove`**

## Table of contents

### Properties

- [channel_id](discordeno_types.DiscordMessageReactionRemove.md#channel_id)
- [emoji](discordeno_types.DiscordMessageReactionRemove.md#emoji)
- [guild_id](discordeno_types.DiscordMessageReactionRemove.md#guild_id)
- [message_id](discordeno_types.DiscordMessageReactionRemove.md#message_id)
- [user_id](discordeno_types.DiscordMessageReactionRemove.md#user_id)

## Properties

### channel_id

• **channel_id**: `string`

The id of the channel

#### Inherited from

Omit.channel_id

#### Defined in

[packages/types/src/discord.ts:2145](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2145)

---

### emoji

• **emoji**: `Partial`<[`DiscordEmoji`](discordeno_types.DiscordEmoji.md)\>

The emoji used to react

#### Inherited from

Omit.emoji

#### Defined in

[packages/types/src/discord.ts:2153](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2153)

---

### guild_id

• `Optional` **guild_id**: `string`

The id of the guild

#### Inherited from

Omit.guild_id

#### Defined in

[packages/types/src/discord.ts:2149](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2149)

---

### message_id

• **message_id**: `string`

The id of the message

#### Inherited from

Omit.message_id

#### Defined in

[packages/types/src/discord.ts:2147](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2147)

---

### user_id

• **user_id**: `string`

The id of the user

#### Inherited from

Omit.user_id

#### Defined in

[packages/types/src/discord.ts:2143](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2143)
