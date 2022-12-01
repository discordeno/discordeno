[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/rest](../modules/discordeno_rest.md) / DiscordListArchivedThreads

# Interface: DiscordListArchivedThreads

[@discordeno/rest](../modules/discordeno_rest.md).DiscordListArchivedThreads

## Hierarchy

- [`DiscordListActiveThreads`](discordeno_rest.DiscordListActiveThreads.md)

  ↳ **`DiscordListArchivedThreads`**

## Table of contents

### Properties

- [has_more](discordeno_rest.DiscordListArchivedThreads.md#has_more)
- [members](discordeno_rest.DiscordListArchivedThreads.md#members)
- [threads](discordeno_rest.DiscordListArchivedThreads.md#threads)

## Properties

### has_more

• **has_more**: `boolean`

Whether there are potentially additional threads that could be returned on a subsequent call

#### Defined in

packages/types/dist/discord.d.ts:1255

---

### members

• **members**: [`DiscordThreadMember`](discordeno_rest.DiscordThreadMember.md)[]

A thread member object for each returned thread the current user has joined

#### Inherited from

[DiscordListActiveThreads](discordeno_rest.DiscordListActiveThreads.md).[members](discordeno_rest.DiscordListActiveThreads.md#members)

#### Defined in

packages/types/dist/discord.d.ts:1251

---

### threads

• **threads**: [`DiscordChannel`](discordeno_rest.DiscordChannel.md)[]

The active threads

#### Inherited from

[DiscordListActiveThreads](discordeno_rest.DiscordListActiveThreads.md).[threads](discordeno_rest.DiscordListActiveThreads.md#threads)

#### Defined in

packages/types/dist/discord.d.ts:1249
