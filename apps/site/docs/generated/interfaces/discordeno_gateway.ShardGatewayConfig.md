[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / ShardGatewayConfig

# Interface: ShardGatewayConfig

[@discordeno/gateway](../modules/discordeno_gateway.md).ShardGatewayConfig

## Table of contents

### Properties

- [compress](discordeno_gateway.ShardGatewayConfig.md#compress)
- [intents](discordeno_gateway.ShardGatewayConfig.md#intents)
- [properties](discordeno_gateway.ShardGatewayConfig.md#properties)
- [token](discordeno_gateway.ShardGatewayConfig.md#token)
- [url](discordeno_gateway.ShardGatewayConfig.md#url)
- [version](discordeno_gateway.ShardGatewayConfig.md#version)

## Properties

### compress

• **compress**: `boolean`

Whether incoming payloads are compressed using zlib.

**`Default`**

false

#### Defined in

[packages/gateway/src/shard/types.ts:38](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/shard/types.ts#L38)

---

### intents

• **intents**: `number`

The calculated intent value of the events which the shard should receive.

**`Default`**

0

#### Defined in

[packages/gateway/src/shard/types.ts:43](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/shard/types.ts#L43)

---

### properties

• **properties**: `Object`

Identify properties to use

#### Type declaration

| Name      | Type     | Description                                                                        |
| :-------- | :------- | :--------------------------------------------------------------------------------- |
| `browser` | `string` | The "browser" where this shard is running on. **`Default`** "Discordeno"           |
| `device`  | `string` | The device on which the shard is running. **`Default`** "Discordeno"               |
| `os`      | `string` | Operating system the shard runs on. **`Default`** "darwin" \| "linux" \| "windows" |

#### Defined in

[packages/gateway/src/shard/types.ts:45](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/shard/types.ts#L45)

---

### token

• **token**: `string`

Bot token which is used to connect to Discord

#### Defined in

[packages/gateway/src/shard/types.ts:63](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/shard/types.ts#L63)

---

### url

• **url**: `string`

The URL of the gateway which should be connected to.

**`Default`**

"wss://gateway.discord.gg"

#### Defined in

[packages/gateway/src/shard/types.ts:68](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/shard/types.ts#L68)

---

### version

• **version**: `number`

The gateway version which should be used.

**`Default`**

10

#### Defined in

[packages/gateway/src/shard/types.ts:73](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/shard/types.ts#L73)
