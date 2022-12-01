[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/rest](../modules/discordeno_rest.md) / DiscordGatewayPayload

# Interface: DiscordGatewayPayload

[@discordeno/rest](../modules/discordeno_rest.md).DiscordGatewayPayload

https://discord.com/developers/docs/topics/gateway#payloads-gateway-payload-structure

## Table of contents

### Properties

- [d](discordeno_rest.DiscordGatewayPayload.md#d)
- [op](discordeno_rest.DiscordGatewayPayload.md#op)
- [s](discordeno_rest.DiscordGatewayPayload.md#s)
- [t](discordeno_rest.DiscordGatewayPayload.md#t)

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

• **t**: `null` \| [`GatewayEventNames`](../modules/discordeno_rest.md#gatewayeventnames)

The event name for this payload

#### Defined in

packages/types/dist/discord.d.ts:1790
