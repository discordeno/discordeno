[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / VoiceCloseEventCodes

# Enumeration: VoiceCloseEventCodes

[@discordeno/gateway](../modules/discordeno_gateway.md).VoiceCloseEventCodes

https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice

## Table of contents

### Enumeration Members

- [AlreadyAuthenticated](discordeno_gateway.VoiceCloseEventCodes.md#alreadyauthenticated)
- [AuthenticationFailed](discordeno_gateway.VoiceCloseEventCodes.md#authenticationfailed)
- [Disconnect](discordeno_gateway.VoiceCloseEventCodes.md#disconnect)
- [FailedToDecodePayload](discordeno_gateway.VoiceCloseEventCodes.md#failedtodecodepayload)
- [NotAuthenticated](discordeno_gateway.VoiceCloseEventCodes.md#notauthenticated)
- [ServerNotFound](discordeno_gateway.VoiceCloseEventCodes.md#servernotfound)
- [SessionNoLongerValid](discordeno_gateway.VoiceCloseEventCodes.md#sessionnolongervalid)
- [SessionTimedOut](discordeno_gateway.VoiceCloseEventCodes.md#sessiontimedout)
- [UnknownEncryptionMode](discordeno_gateway.VoiceCloseEventCodes.md#unknownencryptionmode)
- [UnknownOpcode](discordeno_gateway.VoiceCloseEventCodes.md#unknownopcode)
- [UnknownProtocol](discordeno_gateway.VoiceCloseEventCodes.md#unknownprotocol)
- [VoiceServerCrashed](discordeno_gateway.VoiceCloseEventCodes.md#voiceservercrashed)

## Enumeration Members

### AlreadyAuthenticated

• **AlreadyAuthenticated** = `4005`

You sent more than one [identify](https://discord.com/developers/docs/topics/gateway#identify) payload. Stahp.

#### Defined in

packages/types/dist/shared.d.ts:657

---

### AuthenticationFailed

• **AuthenticationFailed** = `4004`

The token you sent in your [identify](https://discord.com/developers/docs/topics/gateway#identify) payload is incorrect.

#### Defined in

packages/types/dist/shared.d.ts:655

---

### Disconnect

• **Disconnect** = `4014`

Channel was deleted, you were kicked, voice server changed, or the main gateway session was dropped. Should not reconnect.

#### Defined in

packages/types/dist/shared.d.ts:667

---

### FailedToDecodePayload

• **FailedToDecodePayload** = `4002`

You sent a invalid payload in your [identifying](https://discord.com/developers/docs/topics/gateway#identify) to the Gateway.

#### Defined in

packages/types/dist/shared.d.ts:651

---

### NotAuthenticated

• **NotAuthenticated** = `4003`

You sent a payload before [identifying](https://discord.com/developers/docs/topics/gateway#identify) with the Gateway.

#### Defined in

packages/types/dist/shared.d.ts:653

---

### ServerNotFound

• **ServerNotFound** = `4011`

We can't find the server you're trying to connect to.

#### Defined in

packages/types/dist/shared.d.ts:663

---

### SessionNoLongerValid

• **SessionNoLongerValid** = `4006`

Your session is no longer valid.

#### Defined in

packages/types/dist/shared.d.ts:659

---

### SessionTimedOut

• **SessionTimedOut** = `4009`

Your session has timed out.

#### Defined in

packages/types/dist/shared.d.ts:661

---

### UnknownEncryptionMode

• **UnknownEncryptionMode** = `4016`

We didn't recognize your [encryption](https://discord.com/developers/docs/topics/voice-connections#encrypting-and-sending-voice).

#### Defined in

packages/types/dist/shared.d.ts:671

---

### UnknownOpcode

• **UnknownOpcode** = `4001`

You sent an invalid [opcode](https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice-voice-opcodes).

#### Defined in

packages/types/dist/shared.d.ts:649

---

### UnknownProtocol

• **UnknownProtocol** = `4012`

We didn't recognize the [protocol](https://discord.com/developers/docs/topics/voice-connections#establishing-a-voice-udp-connection-example-select-protocol-payload) you sent.

#### Defined in

packages/types/dist/shared.d.ts:665

---

### VoiceServerCrashed

• **VoiceServerCrashed** = `4015`

The server crashed. Our bad! Try [resuming](https://discord.com/developers/docs/topics/voice-connections#resuming-voice-connection).

#### Defined in

packages/types/dist/shared.d.ts:669
