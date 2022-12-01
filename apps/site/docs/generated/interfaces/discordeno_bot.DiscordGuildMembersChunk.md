[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordGuildMembersChunk

# Interface: DiscordGuildMembersChunk

[@discordeno/bot](../modules/discordeno_bot.md).DiscordGuildMembersChunk

https://discord.com/developers/docs/topics/gateway#guild-members-chunk

## Table of contents

### Properties

- [chunk_count](discordeno_bot.DiscordGuildMembersChunk.md#chunk_count)
- [chunk_index](discordeno_bot.DiscordGuildMembersChunk.md#chunk_index)
- [guild_id](discordeno_bot.DiscordGuildMembersChunk.md#guild_id)
- [members](discordeno_bot.DiscordGuildMembersChunk.md#members)
- [nonce](discordeno_bot.DiscordGuildMembersChunk.md#nonce)
- [not_found](discordeno_bot.DiscordGuildMembersChunk.md#not_found)
- [presences](discordeno_bot.DiscordGuildMembersChunk.md#presences)

## Properties

### chunk_count

• **chunk_count**: `number`

The total number of expected chunks for this response

#### Defined in

packages/types/dist/discord.d.ts:1801

---

### chunk_index

• **chunk_index**: `number`

The chunk index in the expected chunks for this response (0 <= chunk_index < chunk_count)

#### Defined in

packages/types/dist/discord.d.ts:1799

---

### guild_id

• **guild_id**: `string`

The id of the guild

#### Defined in

packages/types/dist/discord.d.ts:1795

---

### members

• **members**: [`DiscordMemberWithUser`](discordeno_bot.DiscordMemberWithUser.md)[]

Set of guild members

#### Defined in

packages/types/dist/discord.d.ts:1797

---

### nonce

• `Optional` **nonce**: `string`

The nonce used in the Guild Members Request

#### Defined in

packages/types/dist/discord.d.ts:1807

---

### not_found

• `Optional` **not_found**: `string`[]

If passing an invalid id to `REQUEST_GUILD_MEMBERS`, it will be returned here

#### Defined in

packages/types/dist/discord.d.ts:1803

---

### presences

• `Optional` **presences**: [`DiscordPresenceUpdate`](discordeno_bot.DiscordPresenceUpdate.md)[]

If passing true to `REQUEST_GUILD_MEMBERS`, presences of the returned members will be here

#### Defined in

packages/types/dist/discord.d.ts:1805
