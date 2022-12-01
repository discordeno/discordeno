[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordListArchivedThreads

# Interface: DiscordListArchivedThreads

[@discordeno/types](../modules/discordeno_types.md).DiscordListArchivedThreads

## Hierarchy

- [`DiscordListActiveThreads`](discordeno_types.DiscordListActiveThreads.md)

  ↳ **`DiscordListArchivedThreads`**

## Table of contents

### Properties

- [has_more](discordeno_types.DiscordListArchivedThreads.md#has_more)
- [members](discordeno_types.DiscordListArchivedThreads.md#members)
- [threads](discordeno_types.DiscordListArchivedThreads.md#threads)

## Properties

### has_more

• **has_more**: `boolean`

Whether there are potentially additional threads that could be returned on a subsequent call

#### Defined in

[packages/types/src/discord.ts:1410](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1410)

---

### members

• **members**: [`DiscordThreadMember`](discordeno_types.DiscordThreadMember.md)[]

A thread member object for each returned thread the current user has joined

#### Inherited from

[DiscordListActiveThreads](discordeno_types.DiscordListActiveThreads.md).[members](discordeno_types.DiscordListActiveThreads.md#members)

#### Defined in

[packages/types/src/discord.ts:1405](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1405)

---

### threads

• **threads**: [`DiscordChannel`](discordeno_types.DiscordChannel.md)[]

The active threads

#### Inherited from

[DiscordListActiveThreads](discordeno_types.DiscordListActiveThreads.md).[threads](discordeno_types.DiscordListActiveThreads.md#threads)

#### Defined in

[packages/types/src/discord.ts:1403](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1403)
