[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordTypingStart

# Interface: DiscordTypingStart

[@discordeno/bot](../modules/discordeno_bot.md).DiscordTypingStart

https://discord.com/developers/docs/topics/gateway#typing-start

## Table of contents

### Properties

- [channel_id](discordeno_bot.DiscordTypingStart.md#channel_id)
- [guild_id](discordeno_bot.DiscordTypingStart.md#guild_id)
- [member](discordeno_bot.DiscordTypingStart.md#member)
- [timestamp](discordeno_bot.DiscordTypingStart.md#timestamp)
- [user_id](discordeno_bot.DiscordTypingStart.md#user_id)

## Properties

### channel_id

• **channel_id**: `string`

id of the channel

#### Defined in

packages/types/dist/discord.d.ts:139

---

### guild_id

• `Optional` **guild_id**: `string`

id of the guild

#### Defined in

packages/types/dist/discord.d.ts:141

---

### member

• `Optional` **member**: [`DiscordMember`](discordeno_bot.DiscordMember.md)

The member who started typing if this happened in a guild

#### Defined in

packages/types/dist/discord.d.ts:145

---

### timestamp

• **timestamp**: `number`

Unix time (in seconds) of when the user started typing

#### Defined in

packages/types/dist/discord.d.ts:137

---

### user_id

• **user_id**: `string`

id of the user

#### Defined in

packages/types/dist/discord.d.ts:143
