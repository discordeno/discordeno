[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordGetGatewayBot

# Interface: DiscordGetGatewayBot

[@discordeno/types](../modules/discordeno_types.md).DiscordGetGatewayBot

https://discord.com/developers/docs/topics/gateway#get-gateway-bot

## Table of contents

### Properties

- [session_start_limit](discordeno_types.DiscordGetGatewayBot.md#session_start_limit)
- [shards](discordeno_types.DiscordGetGatewayBot.md#shards)
- [url](discordeno_types.DiscordGetGatewayBot.md#url)

## Properties

### session_start_limit

• **session_start_limit**: [`DiscordSessionStartLimit`](discordeno_types.DiscordSessionStartLimit.md)

Information on the current session start limit

#### Defined in

[packages/types/src/discord.ts:1772](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1772)

---

### shards

• **shards**: `number`

The recommended number of shards to use when connecting

#### Defined in

[packages/types/src/discord.ts:1770](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1770)

---

### url

• **url**: `string`

The WSS URL that can be used for connecting to the gateway

#### Defined in

[packages/types/src/discord.ts:1768](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1768)
