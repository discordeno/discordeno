[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / DiscordThreadListSync

# Interface: DiscordThreadListSync

[@discordeno/gateway](../modules/discordeno_gateway.md).DiscordThreadListSync

## Table of contents

### Properties

- [channel_ids](discordeno_gateway.DiscordThreadListSync.md#channel_ids)
- [guild_id](discordeno_gateway.DiscordThreadListSync.md#guild_id)
- [members](discordeno_gateway.DiscordThreadListSync.md#members)
- [threads](discordeno_gateway.DiscordThreadListSync.md#threads)

## Properties

### channel_ids

• `Optional` **channel_ids**: `string`[]

The parent channel ids whose threads are being synced. If omitted, then threads were synced for the entire guild. This array may contain channelIds that have no active threads as well, so you know to clear that data

#### Defined in

packages/types/dist/discord.d.ts:1261

---

### guild_id

• **guild_id**: `string`

The id of the guild

#### Defined in

packages/types/dist/discord.d.ts:1259

---

### members

• **members**: [`DiscordThreadMember`](discordeno_gateway.DiscordThreadMember.md)[]

All thread member objects from the synced threads for the current user, indicating which threads the current user has been added to

#### Defined in

packages/types/dist/discord.d.ts:1265

---

### threads

• **threads**: [`DiscordChannel`](discordeno_gateway.DiscordChannel.md)[]

All active threads in the given channels that the current user can access

#### Defined in

packages/types/dist/discord.d.ts:1263
