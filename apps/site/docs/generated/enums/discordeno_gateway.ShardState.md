[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / ShardState

# Enumeration: ShardState

[@discordeno/gateway](../modules/discordeno_gateway.md).ShardState

## Table of contents

### Enumeration Members

- [Connected](discordeno_gateway.ShardState.md#connected)
- [Connecting](discordeno_gateway.ShardState.md#connecting)
- [Disconnected](discordeno_gateway.ShardState.md#disconnected)
- [Identifying](discordeno_gateway.ShardState.md#identifying)
- [Offline](discordeno_gateway.ShardState.md#offline)
- [Resuming](discordeno_gateway.ShardState.md#resuming)
- [Unidentified](discordeno_gateway.ShardState.md#unidentified)

## Enumeration Members

### Connected

• **Connected** = `0`

Shard is fully connected to the gateway and receiving events from Discord.

#### Defined in

[packages/gateway/src/shard/types.ts:14](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/shard/types.ts#L14)

---

### Connecting

• **Connecting** = `1`

Shard started to connect to the gateway.
This is only used if the shard is not currently trying to identify or resume.

#### Defined in

[packages/gateway/src/shard/types.ts:18](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/shard/types.ts#L18)

---

### Disconnected

• **Disconnected** = `2`

Shard got disconnected and reconnection actions have been started.

#### Defined in

[packages/gateway/src/shard/types.ts:20](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/shard/types.ts#L20)

---

### Identifying

• **Identifying** = `4`

Shard is trying to identify with the gateway to create a new session.

#### Defined in

[packages/gateway/src/shard/types.ts:26](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/shard/types.ts#L26)

---

### Offline

• **Offline** = `6`

Shard got shut down studied or due to a not (self) fixable error and may not attempt to reconnect on its own.

#### Defined in

[packages/gateway/src/shard/types.ts:30](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/shard/types.ts#L30)

---

### Resuming

• **Resuming** = `5`

Shard is trying to resume a session with the gateway.

#### Defined in

[packages/gateway/src/shard/types.ts:28](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/shard/types.ts#L28)

---

### Unidentified

• **Unidentified** = `3`

The shard is connected to the gateway but only heartbeating.
At this state the shard has not been identified with discord.

#### Defined in

[packages/gateway/src/shard/types.ts:24](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/shard/types.ts#L24)
