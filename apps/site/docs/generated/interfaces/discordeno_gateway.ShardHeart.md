[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / ShardHeart

# Interface: ShardHeart

[@discordeno/gateway](../modules/discordeno_gateway.md).ShardHeart

## Table of contents

### Properties

- [acknowledged](discordeno_gateway.ShardHeart.md#acknowledged)
- [interval](discordeno_gateway.ShardHeart.md#interval)
- [intervalId](discordeno_gateway.ShardHeart.md#intervalid)
- [lastAck](discordeno_gateway.ShardHeart.md#lastack)
- [lastBeat](discordeno_gateway.ShardHeart.md#lastbeat)
- [rtt](discordeno_gateway.ShardHeart.md#rtt)
- [timeoutId](discordeno_gateway.ShardHeart.md#timeoutid)

## Properties

### acknowledged

• **acknowledged**: `boolean`

Whether or not the heartbeat was acknowledged by Discord in time.

#### Defined in

[packages/gateway/src/shard/types.ts:78](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/shard/types.ts#L78)

---

### interval

• **interval**: `number`

Interval between heartbeats requested by Discord.

#### Defined in

[packages/gateway/src/shard/types.ts:80](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/shard/types.ts#L80)

---

### intervalId

• `Optional` **intervalId**: `Timer`

Id of the interval, which is used for sending the heartbeats.

#### Defined in

[packages/gateway/src/shard/types.ts:82](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/shard/types.ts#L82)

---

### lastAck

• `Optional` **lastAck**: `number`

Unix (in milliseconds) timestamp when the last heartbeat ACK was received from Discord.

#### Defined in

[packages/gateway/src/shard/types.ts:84](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/shard/types.ts#L84)

---

### lastBeat

• `Optional` **lastBeat**: `number`

Unix timestamp (in milliseconds) when the last heartbeat was sent.

#### Defined in

[packages/gateway/src/shard/types.ts:86](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/shard/types.ts#L86)

---

### rtt

• `Optional` **rtt**: `number`

Round trip time (in milliseconds) from Shard to Discord and back.
Calculated using the heartbeat system.
Note: this value is undefined until the first heartbeat to Discord has happened.

#### Defined in

[packages/gateway/src/shard/types.ts:91](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/shard/types.ts#L91)

---

### timeoutId

• `Optional` **timeoutId**: `Timeout`

Id of the timeout which is used for sending the first heartbeat to Discord since it's "special".

#### Defined in

[packages/gateway/src/shard/types.ts:93](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/shard/types.ts#L93)
