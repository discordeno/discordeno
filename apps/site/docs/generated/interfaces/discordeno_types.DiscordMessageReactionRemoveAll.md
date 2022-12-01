[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordMessageReactionRemoveAll

# Interface: DiscordMessageReactionRemoveAll

[@discordeno/types](../modules/discordeno_types.md).DiscordMessageReactionRemoveAll

https://discord.com/developers/docs/topics/gateway#message-reaction-remove-all

## Hierarchy

- `Pick`<[`DiscordMessageReactionAdd`](discordeno_types.DiscordMessageReactionAdd.md), `"channel_id"` \| `"message_id"` \| `"guild_id"`\>

  ↳ **`DiscordMessageReactionRemoveAll`**

## Table of contents

### Properties

- [channel_id](discordeno_types.DiscordMessageReactionRemoveAll.md#channel_id)
- [guild_id](discordeno_types.DiscordMessageReactionRemoveAll.md#guild_id)
- [message_id](discordeno_types.DiscordMessageReactionRemoveAll.md#message_id)

## Properties

### channel_id

• **channel_id**: `string`

The id of the channel

#### Inherited from

Pick.channel_id

#### Defined in

[packages/types/src/discord.ts:2145](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2145)

---

### guild_id

• `Optional` **guild_id**: `string`

The id of the guild

#### Inherited from

Pick.guild_id

#### Defined in

[packages/types/src/discord.ts:2149](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2149)

---

### message_id

• **message_id**: `string`

The id of the message

#### Inherited from

Pick.message_id

#### Defined in

[packages/types/src/discord.ts:2147](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2147)
