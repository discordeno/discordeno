[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/rest](../modules/discordeno_rest.md) / DiscordSessionStartLimit

# Interface: DiscordSessionStartLimit

[@discordeno/rest](../modules/discordeno_rest.md).DiscordSessionStartLimit

https://discord.com/developers/docs/topics/gateway#session-start-limit-object

## Table of contents

### Properties

- [max_concurrency](discordeno_rest.DiscordSessionStartLimit.md#max_concurrency)
- [remaining](discordeno_rest.DiscordSessionStartLimit.md#remaining)
- [reset_after](discordeno_rest.DiscordSessionStartLimit.md#reset_after)
- [total](discordeno_rest.DiscordSessionStartLimit.md#total)

## Properties

### max_concurrency

• **max_concurrency**: `number`

The number of identify requests allowed per 5 seconds

#### Defined in

packages/types/dist/discord.d.ts:1542

---

### remaining

• **remaining**: `number`

The remaining number of session starts the current user is allowed

#### Defined in

packages/types/dist/discord.d.ts:1538

---

### reset_after

• **reset_after**: `number`

The number of milliseconds after which the limit resets

#### Defined in

packages/types/dist/discord.d.ts:1540

---

### total

• **total**: `number`

The total number of session starts the current user is allowed

#### Defined in

packages/types/dist/discord.d.ts:1536
