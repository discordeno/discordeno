[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordThreadListSync

# Interface: DiscordThreadListSync

[@discordeno/types](../modules/discordeno_types.md).DiscordThreadListSync

## Table of contents

### Properties

- [channel_ids](discordeno_types.DiscordThreadListSync.md#channel_ids)
- [guild_id](discordeno_types.DiscordThreadListSync.md#guild_id)
- [members](discordeno_types.DiscordThreadListSync.md#members)
- [threads](discordeno_types.DiscordThreadListSync.md#threads)

## Properties

### channel_ids

• `Optional` **channel_ids**: `string`[]

The parent channel ids whose threads are being synced. If omitted, then threads were synced for the entire guild. This array may contain channelIds that have no active threads as well, so you know to clear that data

#### Defined in

[packages/types/src/discord.ts:1417](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1417)

---

### guild_id

• **guild_id**: `string`

The id of the guild

#### Defined in

[packages/types/src/discord.ts:1415](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1415)

---

### members

• **members**: [`DiscordThreadMember`](discordeno_types.DiscordThreadMember.md)[]

All thread member objects from the synced threads for the current user, indicating which threads the current user has been added to

#### Defined in

[packages/types/src/discord.ts:1421](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1421)

---

### threads

• **threads**: [`DiscordChannel`](discordeno_types.DiscordChannel.md)[]

All active threads in the given channels that the current user can access

#### Defined in

[packages/types/src/discord.ts:1419](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1419)
