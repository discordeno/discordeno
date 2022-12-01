[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / BotStatusUpdate

# Interface: BotStatusUpdate

[@discordeno/gateway](../modules/discordeno_gateway.md).BotStatusUpdate

https://discord.com/developers/docs/topics/gateway-events#update-presence

## Table of contents

### Properties

- [activities](discordeno_gateway.BotStatusUpdate.md#activities)
- [since](discordeno_gateway.BotStatusUpdate.md#since)
- [status](discordeno_gateway.BotStatusUpdate.md#status)

## Properties

### activities

• **activities**: [`BotActivity`](discordeno_gateway.BotActivity.md)[]

The user's activities

#### Defined in

[packages/gateway/src/shard/createShard.ts:241](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/shard/createShard.ts#L241)

---

### since

• **since**: `null` \| `number`

#### Defined in

[packages/gateway/src/shard/createShard.ts:239](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/shard/createShard.ts#L239)

---

### status

• **status**: `"online"` \| `"dnd"` \| `"idle"` \| `"offline"`

The user's new status

#### Defined in

[packages/gateway/src/shard/createShard.ts:243](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/shard/createShard.ts#L243)
