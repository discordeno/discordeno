[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / DiscordGatewayPayload

# Interface: DiscordGatewayPayload

[@discordeno/gateway](../modules/discordeno_gateway.md).DiscordGatewayPayload

https://discord.com/developers/docs/topics/gateway#payloads-gateway-payload-structure

## Table of contents

### Properties

- [d](discordeno_gateway.DiscordGatewayPayload.md#d)
- [op](discordeno_gateway.DiscordGatewayPayload.md#op)
- [s](discordeno_gateway.DiscordGatewayPayload.md#s)
- [t](discordeno_gateway.DiscordGatewayPayload.md#t)

## Properties

### d

• **d**: `unknown`

Event data

#### Defined in

packages/types/dist/discord.d.ts:1786

---

### op

• **op**: `number`

opcode for the payload

#### Defined in

packages/types/dist/discord.d.ts:1784

---

### s

• **s**: `null` \| `number`

Sequence number, used for resuming sessions and heartbeats

#### Defined in

packages/types/dist/discord.d.ts:1788

---

### t

• **t**: `null` \| [`GatewayEventNames`](../modules/discordeno_gateway.md#gatewayeventnames)

The event name for this payload

#### Defined in

packages/types/dist/discord.d.ts:1790
