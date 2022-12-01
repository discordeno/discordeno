[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / GatewayCloseEventCodes

# Enumeration: GatewayCloseEventCodes

[@discordeno/types](../modules/discordeno_types.md).GatewayCloseEventCodes

https://discord.com/developers/docs/topics/opcodes-and-status-codes#opcodes-and-status-codes

## Table of contents

### Enumeration Members

- [AlreadyAuthenticated](discordeno_types.GatewayCloseEventCodes.md#alreadyauthenticated)
- [AuthenticationFailed](discordeno_types.GatewayCloseEventCodes.md#authenticationfailed)
- [DecodeError](discordeno_types.GatewayCloseEventCodes.md#decodeerror)
- [DisallowedIntents](discordeno_types.GatewayCloseEventCodes.md#disallowedintents)
- [InvalidApiVersion](discordeno_types.GatewayCloseEventCodes.md#invalidapiversion)
- [InvalidIntents](discordeno_types.GatewayCloseEventCodes.md#invalidintents)
- [InvalidSeq](discordeno_types.GatewayCloseEventCodes.md#invalidseq)
- [InvalidShard](discordeno_types.GatewayCloseEventCodes.md#invalidshard)
- [NormalClosure](discordeno_types.GatewayCloseEventCodes.md#normalclosure)
- [NotAuthenticated](discordeno_types.GatewayCloseEventCodes.md#notauthenticated)
- [RateLimited](discordeno_types.GatewayCloseEventCodes.md#ratelimited)
- [SessionTimedOut](discordeno_types.GatewayCloseEventCodes.md#sessiontimedout)
- [ShardingRequired](discordeno_types.GatewayCloseEventCodes.md#shardingrequired)
- [UnknownError](discordeno_types.GatewayCloseEventCodes.md#unknownerror)
- [UnknownOpcode](discordeno_types.GatewayCloseEventCodes.md#unknownopcode)

## Enumeration Members

### AlreadyAuthenticated

• **AlreadyAuthenticated** = `4005`

You sent more than one identify payload. Don't do that!

#### Defined in

[packages/types/src/shared.ts:993](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L993)

---

### AuthenticationFailed

• **AuthenticationFailed** = `4004`

The account token sent with your [identify payload](https://discord.com/developers/docs/topics/gateway#identify) is incorrect.

#### Defined in

[packages/types/src/shared.ts:991](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L991)

---

### DecodeError

• **DecodeError** = `4002`

You sent an invalid [payload](https://discord.com/developers/docs/topics/gateway#sending-payloads) to us. Don't do that!

#### Defined in

[packages/types/src/shared.ts:987](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L987)

---

### DisallowedIntents

• **DisallowedIntents** = `4014`

You sent a disallowed intent for a [Gateway Intent](https://discord.com/developers/docs/topics/gateway#gateway-intents). You may have tried to specify an intent that you [have not enabled or are not approved for](https://discord.com/developers/docs/topics/gateway#privileged-intents).

#### Defined in

[packages/types/src/shared.ts:1009](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1009)

---

### InvalidApiVersion

• **InvalidApiVersion** = `4012`

You sent an invalid version for the gateway.

#### Defined in

[packages/types/src/shared.ts:1005](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1005)

---

### InvalidIntents

• **InvalidIntents** = `4013`

You sent an invalid intent for a [Gateway Intent](https://discord.com/developers/docs/topics/gateway#gateway-intents). You may have incorrectly calculated the bitwise value.

#### Defined in

[packages/types/src/shared.ts:1007](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1007)

---

### InvalidSeq

• **InvalidSeq** = `4007`

The sequence sent when [resuming](https://discord.com/developers/docs/topics/gateway#resume) the session was invalid. Reconnect and start a new session.

#### Defined in

[packages/types/src/shared.ts:995](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L995)

---

### InvalidShard

• **InvalidShard** = `4010`

You sent us an invalid [shard when identifying](https://discord.com/developers/docs/topics/gateway#sharding).

#### Defined in

[packages/types/src/shared.ts:1001](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1001)

---

### NormalClosure

• **NormalClosure** = `1000`

A normal closure of the gateway.
You may attempt to reconnect.

#### Defined in

[packages/types/src/shared.ts:981](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L981)

---

### NotAuthenticated

• **NotAuthenticated** = `4003`

You sent us a payload prior to [identifying](https://discord.com/developers/docs/topics/gateway#identify).

#### Defined in

[packages/types/src/shared.ts:989](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L989)

---

### RateLimited

• **RateLimited** = `4008`

Woah nelly! You're sending payloads to us too quickly. Slow it down! You will be disconnected on receiving this.

#### Defined in

[packages/types/src/shared.ts:997](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L997)

---

### SessionTimedOut

• **SessionTimedOut** = `4009`

Your session timed out. Reconnect and start a new one.

#### Defined in

[packages/types/src/shared.ts:999](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L999)

---

### ShardingRequired

• **ShardingRequired** = `4011`

The session would have handled too many guilds - you are required to [shard](https://discord.com/developers/docs/topics/gateway#sharding) your connection in order to connect.

#### Defined in

[packages/types/src/shared.ts:1003](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1003)

---

### UnknownError

• **UnknownError** = `4000`

We're not sure what went wrong. Try reconnecting?

#### Defined in

[packages/types/src/shared.ts:983](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L983)

---

### UnknownOpcode

• **UnknownOpcode** = `4001`

You sent an invalid [Gateway opcode](https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes) or an invalid payload for an opcode. Don't do that!

#### Defined in

[packages/types/src/shared.ts:985](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L985)
