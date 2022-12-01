[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / GatewayCloseEventCodes

# Enumeration: GatewayCloseEventCodes

[@discordeno/bot](../modules/discordeno_bot.md).GatewayCloseEventCodes

https://discord.com/developers/docs/topics/opcodes-and-status-codes#opcodes-and-status-codes

## Table of contents

### Enumeration Members

- [AlreadyAuthenticated](discordeno_bot.GatewayCloseEventCodes.md#alreadyauthenticated)
- [AuthenticationFailed](discordeno_bot.GatewayCloseEventCodes.md#authenticationfailed)
- [DecodeError](discordeno_bot.GatewayCloseEventCodes.md#decodeerror)
- [DisallowedIntents](discordeno_bot.GatewayCloseEventCodes.md#disallowedintents)
- [InvalidApiVersion](discordeno_bot.GatewayCloseEventCodes.md#invalidapiversion)
- [InvalidIntents](discordeno_bot.GatewayCloseEventCodes.md#invalidintents)
- [InvalidSeq](discordeno_bot.GatewayCloseEventCodes.md#invalidseq)
- [InvalidShard](discordeno_bot.GatewayCloseEventCodes.md#invalidshard)
- [NormalClosure](discordeno_bot.GatewayCloseEventCodes.md#normalclosure)
- [NotAuthenticated](discordeno_bot.GatewayCloseEventCodes.md#notauthenticated)
- [RateLimited](discordeno_bot.GatewayCloseEventCodes.md#ratelimited)
- [SessionTimedOut](discordeno_bot.GatewayCloseEventCodes.md#sessiontimedout)
- [ShardingRequired](discordeno_bot.GatewayCloseEventCodes.md#shardingrequired)
- [UnknownError](discordeno_bot.GatewayCloseEventCodes.md#unknownerror)
- [UnknownOpcode](discordeno_bot.GatewayCloseEventCodes.md#unknownopcode)

## Enumeration Members

### AlreadyAuthenticated

• **AlreadyAuthenticated** = `4005`

You sent more than one identify payload. Don't do that!

#### Defined in

packages/types/dist/shared.d.ts:940

---

### AuthenticationFailed

• **AuthenticationFailed** = `4004`

The account token sent with your [identify payload](https://discord.com/developers/docs/topics/gateway#identify) is incorrect.

#### Defined in

packages/types/dist/shared.d.ts:938

---

### DecodeError

• **DecodeError** = `4002`

You sent an invalid [payload](https://discord.com/developers/docs/topics/gateway#sending-payloads) to us. Don't do that!

#### Defined in

packages/types/dist/shared.d.ts:934

---

### DisallowedIntents

• **DisallowedIntents** = `4014`

You sent a disallowed intent for a [Gateway Intent](https://discord.com/developers/docs/topics/gateway#gateway-intents). You may have tried to specify an intent that you [have not enabled or are not approved for](https://discord.com/developers/docs/topics/gateway#privileged-intents).

#### Defined in

packages/types/dist/shared.d.ts:956

---

### InvalidApiVersion

• **InvalidApiVersion** = `4012`

You sent an invalid version for the gateway.

#### Defined in

packages/types/dist/shared.d.ts:952

---

### InvalidIntents

• **InvalidIntents** = `4013`

You sent an invalid intent for a [Gateway Intent](https://discord.com/developers/docs/topics/gateway#gateway-intents). You may have incorrectly calculated the bitwise value.

#### Defined in

packages/types/dist/shared.d.ts:954

---

### InvalidSeq

• **InvalidSeq** = `4007`

The sequence sent when [resuming](https://discord.com/developers/docs/topics/gateway#resume) the session was invalid. Reconnect and start a new session.

#### Defined in

packages/types/dist/shared.d.ts:942

---

### InvalidShard

• **InvalidShard** = `4010`

You sent us an invalid [shard when identifying](https://discord.com/developers/docs/topics/gateway#sharding).

#### Defined in

packages/types/dist/shared.d.ts:948

---

### NormalClosure

• **NormalClosure** = `1000`

A normal closure of the gateway.
You may attempt to reconnect.

#### Defined in

packages/types/dist/shared.d.ts:928

---

### NotAuthenticated

• **NotAuthenticated** = `4003`

You sent us a payload prior to [identifying](https://discord.com/developers/docs/topics/gateway#identify).

#### Defined in

packages/types/dist/shared.d.ts:936

---

### RateLimited

• **RateLimited** = `4008`

Woah nelly! You're sending payloads to us too quickly. Slow it down! You will be disconnected on receiving this.

#### Defined in

packages/types/dist/shared.d.ts:944

---

### SessionTimedOut

• **SessionTimedOut** = `4009`

Your session timed out. Reconnect and start a new one.

#### Defined in

packages/types/dist/shared.d.ts:946

---

### ShardingRequired

• **ShardingRequired** = `4011`

The session would have handled too many guilds - you are required to [shard](https://discord.com/developers/docs/topics/gateway#sharding) your connection in order to connect.

#### Defined in

packages/types/dist/shared.d.ts:950

---

### UnknownError

• **UnknownError** = `4000`

We're not sure what went wrong. Try reconnecting?

#### Defined in

packages/types/dist/shared.d.ts:930

---

### UnknownOpcode

• **UnknownOpcode** = `4001`

You sent an invalid [Gateway opcode](https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes) or an invalid payload for an opcode. Don't do that!

#### Defined in

packages/types/dist/shared.d.ts:932
