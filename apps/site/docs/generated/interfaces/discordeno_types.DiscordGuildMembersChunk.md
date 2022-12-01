[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordGuildMembersChunk

# Interface: DiscordGuildMembersChunk

[@discordeno/types](../modules/discordeno_types.md).DiscordGuildMembersChunk

https://discord.com/developers/docs/topics/gateway#guild-members-chunk

## Table of contents

### Properties

- [chunk_count](discordeno_types.DiscordGuildMembersChunk.md#chunk_count)
- [chunk_index](discordeno_types.DiscordGuildMembersChunk.md#chunk_index)
- [guild_id](discordeno_types.DiscordGuildMembersChunk.md#guild_id)
- [members](discordeno_types.DiscordGuildMembersChunk.md#members)
- [nonce](discordeno_types.DiscordGuildMembersChunk.md#nonce)
- [not_found](discordeno_types.DiscordGuildMembersChunk.md#not_found)
- [presences](discordeno_types.DiscordGuildMembersChunk.md#presences)

## Properties

### chunk_count

• **chunk_count**: `number`

The total number of expected chunks for this response

#### Defined in

[packages/types/src/discord.ts:2060](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2060)

---

### chunk_index

• **chunk_index**: `number`

The chunk index in the expected chunks for this response (0 <= chunk_index < chunk_count)

#### Defined in

[packages/types/src/discord.ts:2058](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2058)

---

### guild_id

• **guild_id**: `string`

The id of the guild

#### Defined in

[packages/types/src/discord.ts:2054](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2054)

---

### members

• **members**: [`DiscordMemberWithUser`](discordeno_types.DiscordMemberWithUser.md)[]

Set of guild members

#### Defined in

[packages/types/src/discord.ts:2056](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2056)

---

### nonce

• `Optional` **nonce**: `string`

The nonce used in the Guild Members Request

#### Defined in

[packages/types/src/discord.ts:2066](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2066)

---

### not_found

• `Optional` **not_found**: `string`[]

If passing an invalid id to `REQUEST_GUILD_MEMBERS`, it will be returned here

#### Defined in

[packages/types/src/discord.ts:2062](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2062)

---

### presences

• `Optional` **presences**: [`DiscordPresenceUpdate`](discordeno_types.DiscordPresenceUpdate.md)[]

If passing true to `REQUEST_GUILD_MEMBERS`, presences of the returned members will be here

#### Defined in

[packages/types/src/discord.ts:2064](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2064)
