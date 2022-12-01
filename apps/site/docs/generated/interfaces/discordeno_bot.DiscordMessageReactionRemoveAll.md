[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordMessageReactionRemoveAll

# Interface: DiscordMessageReactionRemoveAll

[@discordeno/bot](../modules/discordeno_bot.md).DiscordMessageReactionRemoveAll

https://discord.com/developers/docs/topics/gateway#message-reaction-remove-all

## Hierarchy

- `Pick`<[`DiscordMessageReactionAdd`](discordeno_bot.DiscordMessageReactionAdd.md), `"channel_id"` \| `"message_id"` \| `"guild_id"`\>

  ↳ **`DiscordMessageReactionRemoveAll`**

## Table of contents

### Properties

- [channel_id](discordeno_bot.DiscordMessageReactionRemoveAll.md#channel_id)
- [guild_id](discordeno_bot.DiscordMessageReactionRemoveAll.md#guild_id)
- [message_id](discordeno_bot.DiscordMessageReactionRemoveAll.md#message_id)

## Properties

### channel_id

• **channel_id**: `string`

The id of the channel

#### Inherited from

Pick.channel_id

#### Defined in

packages/types/dist/discord.d.ts:1881

---

### guild_id

• `Optional` **guild_id**: `string`

The id of the guild

#### Inherited from

Pick.guild_id

#### Defined in

packages/types/dist/discord.d.ts:1885

---

### message_id

• **message_id**: `string`

The id of the message

#### Inherited from

Pick.message_id

#### Defined in

packages/types/dist/discord.d.ts:1883
