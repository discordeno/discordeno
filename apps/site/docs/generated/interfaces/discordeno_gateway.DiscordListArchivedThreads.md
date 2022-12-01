[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / DiscordListArchivedThreads

# Interface: DiscordListArchivedThreads

[@discordeno/gateway](../modules/discordeno_gateway.md).DiscordListArchivedThreads

## Hierarchy

- [`DiscordListActiveThreads`](discordeno_gateway.DiscordListActiveThreads.md)

  ↳ **`DiscordListArchivedThreads`**

## Table of contents

### Properties

- [has_more](discordeno_gateway.DiscordListArchivedThreads.md#has_more)
- [members](discordeno_gateway.DiscordListArchivedThreads.md#members)
- [threads](discordeno_gateway.DiscordListArchivedThreads.md#threads)

## Properties

### has_more

• **has_more**: `boolean`

Whether there are potentially additional threads that could be returned on a subsequent call

#### Defined in

packages/types/dist/discord.d.ts:1255

---

### members

• **members**: [`DiscordThreadMember`](discordeno_gateway.DiscordThreadMember.md)[]

A thread member object for each returned thread the current user has joined

#### Inherited from

[DiscordListActiveThreads](discordeno_gateway.DiscordListActiveThreads.md).[members](discordeno_gateway.DiscordListActiveThreads.md#members)

#### Defined in

packages/types/dist/discord.d.ts:1251

---

### threads

• **threads**: [`DiscordChannel`](discordeno_gateway.DiscordChannel.md)[]

The active threads

#### Inherited from

[DiscordListActiveThreads](discordeno_gateway.DiscordListActiveThreads.md).[threads](discordeno_gateway.DiscordListActiveThreads.md#threads)

#### Defined in

packages/types/dist/discord.d.ts:1249
