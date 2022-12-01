[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordUnavailableGuild

# Interface: DiscordUnavailableGuild

[@discordeno/types](../modules/discordeno_types.md).DiscordUnavailableGuild

https://discord.com/developers/docs/resources/guild#unavailable-guild-object

## Hierarchy

- `Pick`<[`DiscordGuild`](discordeno_types.DiscordGuild.md), `"id"` \| `"unavailable"`\>

  ↳ **`DiscordUnavailableGuild`**

## Table of contents

### Properties

- [id](discordeno_types.DiscordUnavailableGuild.md#id)
- [unavailable](discordeno_types.DiscordUnavailableGuild.md#unavailable)

## Properties

### id

• **id**: `string`

Guild id

#### Inherited from

Pick.id

#### Defined in

[packages/types/src/discord.ts:585](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L585)

---

### unavailable

• `Optional` **unavailable**: `boolean`

True if this guild is unavailable due to an outage

#### Inherited from

Pick.unavailable

#### Defined in

[packages/types/src/discord.ts:558](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L558)
