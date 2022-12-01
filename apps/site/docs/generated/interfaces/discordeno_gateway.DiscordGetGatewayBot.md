[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / DiscordGetGatewayBot

# Interface: DiscordGetGatewayBot

[@discordeno/gateway](../modules/discordeno_gateway.md).DiscordGetGatewayBot

https://discord.com/developers/docs/topics/gateway#get-gateway-bot

## Table of contents

### Properties

- [session_start_limit](discordeno_gateway.DiscordGetGatewayBot.md#session_start_limit)
- [shards](discordeno_gateway.DiscordGetGatewayBot.md#shards)
- [url](discordeno_gateway.DiscordGetGatewayBot.md#url)

## Properties

### session_start_limit

• **session_start_limit**: [`DiscordSessionStartLimit`](discordeno_gateway.DiscordSessionStartLimit.md)

Information on the current session start limit

#### Defined in

packages/types/dist/discord.d.ts:1531

---

### shards

• **shards**: `number`

The recommended number of shards to use when connecting

#### Defined in

packages/types/dist/discord.d.ts:1529

---

### url

• **url**: `string`

The WSS URL that can be used for connecting to the gateway

#### Defined in

packages/types/dist/discord.d.ts:1527
