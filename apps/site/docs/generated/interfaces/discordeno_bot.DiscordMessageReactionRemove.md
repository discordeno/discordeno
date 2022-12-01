[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordMessageReactionRemove

# Interface: DiscordMessageReactionRemove

[@discordeno/bot](../modules/discordeno_bot.md).DiscordMessageReactionRemove

https://discord.com/developers/docs/topics/gateway#message-reaction-remove

## Hierarchy

- `Omit`<[`DiscordMessageReactionAdd`](discordeno_bot.DiscordMessageReactionAdd.md), `"member"`\>

  ↳ **`DiscordMessageReactionRemove`**

## Table of contents

### Properties

- [channel_id](discordeno_bot.DiscordMessageReactionRemove.md#channel_id)
- [emoji](discordeno_bot.DiscordMessageReactionRemove.md#emoji)
- [guild_id](discordeno_bot.DiscordMessageReactionRemove.md#guild_id)
- [message_id](discordeno_bot.DiscordMessageReactionRemove.md#message_id)
- [user_id](discordeno_bot.DiscordMessageReactionRemove.md#user_id)

## Properties

### channel_id

• **channel_id**: `string`

The id of the channel

#### Inherited from

Omit.channel_id

#### Defined in

packages/types/dist/discord.d.ts:1881

---

### emoji

• **emoji**: `Partial`<[`DiscordEmoji`](discordeno_bot.DiscordEmoji.md)\>

The emoji used to react

#### Inherited from

Omit.emoji

#### Defined in

packages/types/dist/discord.d.ts:1889

---

### guild_id

• `Optional` **guild_id**: `string`

The id of the guild

#### Inherited from

Omit.guild_id

#### Defined in

packages/types/dist/discord.d.ts:1885

---

### message_id

• **message_id**: `string`

The id of the message

#### Inherited from

Omit.message_id

#### Defined in

packages/types/dist/discord.d.ts:1883

---

### user_id

• **user_id**: `string`

The id of the user

#### Inherited from

Omit.user_id

#### Defined in

packages/types/dist/discord.d.ts:1879
