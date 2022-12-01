[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordSessionStartLimit

# Interface: DiscordSessionStartLimit

[@discordeno/types](../modules/discordeno_types.md).DiscordSessionStartLimit

https://discord.com/developers/docs/topics/gateway#session-start-limit-object

## Table of contents

### Properties

- [max_concurrency](discordeno_types.DiscordSessionStartLimit.md#max_concurrency)
- [remaining](discordeno_types.DiscordSessionStartLimit.md#remaining)
- [reset_after](discordeno_types.DiscordSessionStartLimit.md#reset_after)
- [total](discordeno_types.DiscordSessionStartLimit.md#total)

## Properties

### max_concurrency

• **max_concurrency**: `number`

The number of identify requests allowed per 5 seconds

#### Defined in

[packages/types/src/discord.ts:1784](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1784)

---

### remaining

• **remaining**: `number`

The remaining number of session starts the current user is allowed

#### Defined in

[packages/types/src/discord.ts:1780](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1780)

---

### reset_after

• **reset_after**: `number`

The number of milliseconds after which the limit resets

#### Defined in

[packages/types/src/discord.ts:1782](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1782)

---

### total

• **total**: `number`

The total number of session starts the current user is allowed

#### Defined in

[packages/types/src/discord.ts:1778](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1778)
