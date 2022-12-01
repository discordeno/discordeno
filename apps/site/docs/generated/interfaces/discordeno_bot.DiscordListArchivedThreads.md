[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordListArchivedThreads

# Interface: DiscordListArchivedThreads

[@discordeno/bot](../modules/discordeno_bot.md).DiscordListArchivedThreads

## Hierarchy

- [`DiscordListActiveThreads`](discordeno_bot.DiscordListActiveThreads.md)

  ↳ **`DiscordListArchivedThreads`**

## Table of contents

### Properties

- [has_more](discordeno_bot.DiscordListArchivedThreads.md#has_more)
- [members](discordeno_bot.DiscordListArchivedThreads.md#members)
- [threads](discordeno_bot.DiscordListArchivedThreads.md#threads)

## Properties

### has_more

• **has_more**: `boolean`

Whether there are potentially additional threads that could be returned on a subsequent call

#### Defined in

packages/types/dist/discord.d.ts:1255

---

### members

• **members**: [`DiscordThreadMember`](discordeno_bot.DiscordThreadMember.md)[]

A thread member object for each returned thread the current user has joined

#### Inherited from

[DiscordListActiveThreads](discordeno_bot.DiscordListActiveThreads.md).[members](discordeno_bot.DiscordListActiveThreads.md#members)

#### Defined in

packages/types/dist/discord.d.ts:1251

---

### threads

• **threads**: [`DiscordChannel`](discordeno_bot.DiscordChannel.md)[]

The active threads

#### Inherited from

[DiscordListActiveThreads](discordeno_bot.DiscordListActiveThreads.md).[threads](discordeno_bot.DiscordListActiveThreads.md#threads)

#### Defined in

packages/types/dist/discord.d.ts:1249
