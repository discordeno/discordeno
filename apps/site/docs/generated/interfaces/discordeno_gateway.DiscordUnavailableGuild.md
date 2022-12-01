[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / DiscordUnavailableGuild

# Interface: DiscordUnavailableGuild

[@discordeno/gateway](../modules/discordeno_gateway.md).DiscordUnavailableGuild

https://discord.com/developers/docs/resources/guild#unavailable-guild-object

## Hierarchy

- `Pick`<[`DiscordGuild`](discordeno_gateway.DiscordGuild.md), `"id"` \| `"unavailable"`\>

  ↳ **`DiscordUnavailableGuild`**

## Table of contents

### Properties

- [id](discordeno_gateway.DiscordUnavailableGuild.md#id)
- [unavailable](discordeno_gateway.DiscordUnavailableGuild.md#unavailable)

## Properties

### id

• **id**: `string`

Guild id

#### Inherited from

Pick.id

#### Defined in

packages/types/dist/discord.d.ts:482

---

### unavailable

• `Optional` **unavailable**: `boolean`

True if this guild is unavailable due to an outage

#### Inherited from

Pick.unavailable

#### Defined in

packages/types/dist/discord.d.ts:456
