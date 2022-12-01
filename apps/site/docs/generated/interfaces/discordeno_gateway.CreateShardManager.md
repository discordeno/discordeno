[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / CreateShardManager

# Interface: CreateShardManager

[@discordeno/gateway](../modules/discordeno_gateway.md).CreateShardManager

## Table of contents

### Properties

- [createShardOptions](discordeno_gateway.CreateShardManager.md#createshardoptions)
- [gatewayConfig](discordeno_gateway.CreateShardManager.md#gatewayconfig)
- [handleMessage](discordeno_gateway.CreateShardManager.md#handlemessage)
- [requestIdentify](discordeno_gateway.CreateShardManager.md#requestidentify)
- [shardIds](discordeno_gateway.CreateShardManager.md#shardids)
- [totalShards](discordeno_gateway.CreateShardManager.md#totalshards)

## Properties

### createShardOptions

• `Optional` **createShardOptions**: `Omit`<[`CreateShard`](discordeno_gateway.CreateShard.md), `"gatewayConfig"` \| `"totalShards"` \| `"id"` \| `"requestIdentify"`\>

Options which are used to create a new Shard.

#### Defined in

[packages/gateway/src/manager/shardManager.ts:103](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/manager/shardManager.ts#L103)

---

### gatewayConfig

• **gatewayConfig**: [`PickPartial`](../modules/discordeno_gateway.md#pickpartial)<[`ShardGatewayConfig`](discordeno_gateway.ShardGatewayConfig.md), `"token"`\>

Gateway configuration which is used when creating a Shard.

#### Defined in

[packages/gateway/src/manager/shardManager.ts:105](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/manager/shardManager.ts#L105)

---

### handleMessage

• **handleMessage**: (`shard`: { `bucket`: [`LeakyBucket`](discordeno_gateway.LeakyBucket.md) ; `calculateSafeRequests`: () => `number` ; `close`: (`code`: `number`, `reason`: `string`) => `void` ; `connect`: () => `Promise`<`void`\> ; `events`: [`ShardEvents`](discordeno_gateway.ShardEvents.md) ; `gatewayConfig`: [`ShardGatewayConfig`](discordeno_gateway.ShardGatewayConfig.md) ; `handleClose`: (`close`: `CloseEvent`) => `Promise`<`void`\> ; `handleMessage`: (`message`: `MessageEvent`) => `Promise`<`void`\> ; `heart`: [`ShardHeart`](discordeno_gateway.ShardHeart.md) ; `id`: `number` = options.id; `identify`: () => `Promise`<`void`\> ; `isOpen`: () => `boolean` ; `makePresence`: `undefined` \| (`shardId`: `number`) => [`BotStatusUpdate`](discordeno_gateway.BotStatusUpdate.md) \| `Promise`<[`BotStatusUpdate`](discordeno_gateway.BotStatusUpdate.md)\> = options.makePresence; `maxRequestsPerRateLimitTick`: `number` = MAX_GATEWAY_REQUESTS_PER_INTERVAL; `offlineSendQueue`: (`_?`: `unknown`) => `void`[] ; `previousSequenceNumber`: `null` \| `number` ; `rateLimitResetInterval`: `number` = GATEWAY_RATE_LIMIT_RESET_INTERVAL; `requestIdentify`: () => `Promise`<`void`\> ; `resolves`: `Map`<`"READY"` \| `"RESUMED"` \| `"INVALID_SESSION"`, (`payload`: [`DiscordGatewayPayload`](discordeno_gateway.DiscordGatewayPayload.md)) => `void`\> ; `resume`: () => `Promise`<`void`\> ; `resumeGatewayUrl`: `string` = ''; `send`: (`message`: [`ShardSocketRequest`](discordeno_gateway.ShardSocketRequest.md), `highPriority?`: `boolean`) => `Promise`<`void`\> ; `sessionId`: `undefined` \| `string` ; `shutdown`: () => `Promise`<`void`\> ; `socket`: `undefined` \| `WebSocket` ; `startHeartbeating`: (`interval`: `number`) => `void` ; `state`: [`ShardState`](../enums/discordeno_gateway.ShardState.md) = ShardState.Offline; `stopHeartbeating`: () => `void` ; `totalShards`: `number` = options.totalShards }, `message`: [`DiscordGatewayPayload`](discordeno_gateway.DiscordGatewayPayload.md)) => `unknown`

#### Type declaration

▸ (`shard`, `message`): `unknown`

This function is used when a shard receives any message from Discord.

##### Parameters

| Name                                | Type                                                                                                                                                                         | Default value                       | Description                                                                                                                                                        |
| :---------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `shard`                             | `Object`                                                                                                                                                                     | `undefined`                         | -                                                                                                                                                                  |
| `shard.bucket`                      | [`LeakyBucket`](discordeno_gateway.LeakyBucket.md)                                                                                                                           | `undefined`                         | Internal shard bucket. Only access this if you know what you are doing. Bucket for handling shard request rate limits.                                             |
| `shard.calculateSafeRequests`       | () => `number`                                                                                                                                                               | `undefined`                         | -                                                                                                                                                                  |
| `shard.close`                       | (`code`: `number`, `reason`: `string`) => `void`                                                                                                                             | `undefined`                         | -                                                                                                                                                                  |
| `shard.connect`                     | () => `Promise`<`void`\>                                                                                                                                                     | `undefined`                         | -                                                                                                                                                                  |
| `shard.events`                      | [`ShardEvents`](discordeno_gateway.ShardEvents.md)                                                                                                                           | `undefined`                         | The shard related event handlers.                                                                                                                                  |
| `shard.gatewayConfig`               | [`ShardGatewayConfig`](discordeno_gateway.ShardGatewayConfig.md)                                                                                                             | `undefined`                         | The gateway configuration which is used to connect to Discord.                                                                                                     |
| `shard.handleClose`                 | (`close`: `CloseEvent`) => `Promise`<`void`\>                                                                                                                                | `undefined`                         | -                                                                                                                                                                  |
| `shard.handleMessage`               | (`message`: `MessageEvent`) => `Promise`<`void`\>                                                                                                                            | `undefined`                         | -                                                                                                                                                                  |
| `shard.heart`                       | [`ShardHeart`](discordeno_gateway.ShardHeart.md)                                                                                                                             | `undefined`                         | This contains all the heartbeat information                                                                                                                        |
| `shard.id`                          | `number`                                                                                                                                                                     | `options.id`                        | Id of the shard.                                                                                                                                                   |
| `shard.identify`                    | () => `Promise`<`void`\>                                                                                                                                                     | `undefined`                         | -                                                                                                                                                                  |
| `shard.isOpen`                      | () => `boolean`                                                                                                                                                              | `undefined`                         | -                                                                                                                                                                  |
| `shard.makePresence`                | `undefined` \| (`shardId`: `number`) => [`BotStatusUpdate`](discordeno_gateway.BotStatusUpdate.md) \| `Promise`<[`BotStatusUpdate`](discordeno_gateway.BotStatusUpdate.md)\> | `options.makePresence`              | Function which can be overwritten in order to get the shards presence.                                                                                             |
| `shard.maxRequestsPerRateLimitTick` | `number`                                                                                                                                                                     | `MAX_GATEWAY_REQUESTS_PER_INTERVAL` | The maximum of requests which can be send to discord per rate limit tick. Typically this value should not be changed.                                              |
| `shard.offlineSendQueue`            | (`_?`: `unknown`) => `void`[]                                                                                                                                                | `undefined`                         | Internal state. Only use this if you know what you are doing. Cache for pending gateway requests which should have been send while the gateway went offline.       |
| `shard.previousSequenceNumber`      | `null` \| `number`                                                                                                                                                           | `undefined`                         | The previous payload sequence number.                                                                                                                              |
| `shard.rateLimitResetInterval`      | `number`                                                                                                                                                                     | `GATEWAY_RATE_LIMIT_RESET_INTERVAL` | In which interval (in milliseconds) the gateway resets it's rate limit.                                                                                            |
| `shard.requestIdentify`             | () => `Promise`<`void`\>                                                                                                                                                     | `undefined`                         | -                                                                                                                                                                  |
| `shard.resolves`                    | `Map`<`"READY"` \| `"RESUMED"` \| `"INVALID_SESSION"`, (`payload`: [`DiscordGatewayPayload`](discordeno_gateway.DiscordGatewayPayload.md)) => `void`\>                       | `undefined`                         | Internal shard map. Only use this map if you know what you are doing. This is used to resolve internal waiting states. Mapped by SelectedEvents => ResolveFunction |
| `shard.resume`                      | () => `Promise`<`void`\>                                                                                                                                                     | `undefined`                         | -                                                                                                                                                                  |
| `shard.resumeGatewayUrl`            | `string`                                                                                                                                                                     | `''`                                | -                                                                                                                                                                  |
| `shard.send`                        | (`message`: [`ShardSocketRequest`](discordeno_gateway.ShardSocketRequest.md), `highPriority?`: `boolean`) => `Promise`<`void`\>                                              | `undefined`                         | -                                                                                                                                                                  |
| `shard.sessionId`                   | `undefined` \| `string`                                                                                                                                                      | `undefined`                         | Current session id of the shard if present.                                                                                                                        |
| `shard.shutdown`                    | () => `Promise`<`void`\>                                                                                                                                                     | `undefined`                         | -                                                                                                                                                                  |
| `shard.socket`                      | `undefined` \| `WebSocket`                                                                                                                                                   | `undefined`                         | This contains the WebSocket connection to Discord, if currently connected.                                                                                         |
| `shard.startHeartbeating`           | (`interval`: `number`) => `void`                                                                                                                                             | `undefined`                         | -                                                                                                                                                                  |
| `shard.state`                       | [`ShardState`](../enums/discordeno_gateway.ShardState.md)                                                                                                                    | `ShardState.Offline`                | Current internal state of the shard.                                                                                                                               |
| `shard.stopHeartbeating`            | () => `void`                                                                                                                                                                 | `undefined`                         | -                                                                                                                                                                  |
| `shard.totalShards`                 | `number`                                                                                                                                                                     | `options.totalShards`               | The total amount of shards which are used to communicate with Discord.                                                                                             |
| `message`                           | [`DiscordGatewayPayload`](discordeno_gateway.DiscordGatewayPayload.md)                                                                                                       | `undefined`                         | -                                                                                                                                                                  |

##### Returns

`unknown`

#### Defined in

[packages/gateway/src/manager/shardManager.ts:116](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/manager/shardManager.ts#L116)

---

### requestIdentify

• **requestIdentify**: (`shardId`: `number`) => `Promise`<`void`\>

#### Type declaration

▸ (`shardId`): `Promise`<`void`\>

This function communicates with the parent manager,
in order to know whether this manager is allowed to identify a new shard. #

##### Parameters

| Name      | Type     |
| :-------- | :------- |
| `shardId` | `number` |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/gateway/src/manager/shardManager.ts:121](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/manager/shardManager.ts#L121)

---

### shardIds

• **shardIds**: `number`[]

Ids of the Shards which should be managed.

#### Defined in

[packages/gateway/src/manager/shardManager.ts:107](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/manager/shardManager.ts#L107)

---

### totalShards

• **totalShards**: `number`

Total amount of Shard used by the bot.

#### Defined in

[packages/gateway/src/manager/shardManager.ts:109](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/manager/shardManager.ts#L109)
