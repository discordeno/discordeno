[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordChannelPinsUpdate

# Interface: DiscordChannelPinsUpdate

[@discordeno/types](../modules/discordeno_types.md).DiscordChannelPinsUpdate

https://discord.com/developers/docs/topics/gateway#channel-pins-update

## Table of contents

### Properties

- [channel_id](discordeno_types.DiscordChannelPinsUpdate.md#channel_id)
- [guild_id](discordeno_types.DiscordChannelPinsUpdate.md#guild_id)
- [last_pin_timestamp](discordeno_types.DiscordChannelPinsUpdate.md#last_pin_timestamp)

## Properties

### channel_id

• **channel_id**: `string`

The id of the channel

#### Defined in

[packages/types/src/discord.ts:2116](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2116)

---

### guild_id

• `Optional` **guild_id**: `string`

The id of the guild

#### Defined in

[packages/types/src/discord.ts:2114](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2114)

---

### last_pin_timestamp

• `Optional` **last_pin_timestamp**: `null` \| `string`

The time at which the most recent pinned message was pinned

#### Defined in

[packages/types/src/discord.ts:2118](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2118)
