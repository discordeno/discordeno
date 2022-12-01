[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordThreadListSync

# Interface: DiscordThreadListSync

[@discordeno/bot](../modules/discordeno_bot.md).DiscordThreadListSync

## Table of contents

### Properties

- [channel_ids](discordeno_bot.DiscordThreadListSync.md#channel_ids)
- [guild_id](discordeno_bot.DiscordThreadListSync.md#guild_id)
- [members](discordeno_bot.DiscordThreadListSync.md#members)
- [threads](discordeno_bot.DiscordThreadListSync.md#threads)

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

• **members**: [`DiscordThreadMember`](discordeno_bot.DiscordThreadMember.md)[]

All thread member objects from the synced threads for the current user, indicating which threads the current user has been added to

#### Defined in

packages/types/dist/discord.d.ts:1265

---

### threads

• **threads**: [`DiscordChannel`](discordeno_bot.DiscordChannel.md)[]

All active threads in the given channels that the current user can access

#### Defined in

packages/types/dist/discord.d.ts:1263
