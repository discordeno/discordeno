[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordGatewayPayload

# Interface: DiscordGatewayPayload

[@discordeno/types](../modules/discordeno_types.md).DiscordGatewayPayload

https://discord.com/developers/docs/topics/gateway#payloads-gateway-payload-structure

## Table of contents

### Properties

- [d](discordeno_types.DiscordGatewayPayload.md#d)
- [op](discordeno_types.DiscordGatewayPayload.md#op)
- [s](discordeno_types.DiscordGatewayPayload.md#s)
- [t](discordeno_types.DiscordGatewayPayload.md#t)

## Properties

### d

• **d**: `unknown`

Event data

#### Defined in

[packages/types/src/discord.ts:2044](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2044)

---

### op

• **op**: `number`

opcode for the payload

#### Defined in

[packages/types/src/discord.ts:2042](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2042)

---

### s

• **s**: `null` \| `number`

Sequence number, used for resuming sessions and heartbeats

#### Defined in

[packages/types/src/discord.ts:2046](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2046)

---

### t

• **t**: `null` \| [`GatewayEventNames`](../modules/discordeno_types.md#gatewayeventnames)

The event name for this payload

#### Defined in

[packages/types/src/discord.ts:2048](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2048)
