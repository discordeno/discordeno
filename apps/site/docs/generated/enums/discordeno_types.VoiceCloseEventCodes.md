[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / VoiceCloseEventCodes

# Enumeration: VoiceCloseEventCodes

[@discordeno/types](../modules/discordeno_types.md).VoiceCloseEventCodes

https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice

## Table of contents

### Enumeration Members

- [AlreadyAuthenticated](discordeno_types.VoiceCloseEventCodes.md#alreadyauthenticated)
- [AuthenticationFailed](discordeno_types.VoiceCloseEventCodes.md#authenticationfailed)
- [Disconnect](discordeno_types.VoiceCloseEventCodes.md#disconnect)
- [FailedToDecodePayload](discordeno_types.VoiceCloseEventCodes.md#failedtodecodepayload)
- [NotAuthenticated](discordeno_types.VoiceCloseEventCodes.md#notauthenticated)
- [ServerNotFound](discordeno_types.VoiceCloseEventCodes.md#servernotfound)
- [SessionNoLongerValid](discordeno_types.VoiceCloseEventCodes.md#sessionnolongervalid)
- [SessionTimedOut](discordeno_types.VoiceCloseEventCodes.md#sessiontimedout)
- [UnknownEncryptionMode](discordeno_types.VoiceCloseEventCodes.md#unknownencryptionmode)
- [UnknownOpcode](discordeno_types.VoiceCloseEventCodes.md#unknownopcode)
- [UnknownProtocol](discordeno_types.VoiceCloseEventCodes.md#unknownprotocol)
- [VoiceServerCrashed](discordeno_types.VoiceCloseEventCodes.md#voiceservercrashed)

## Enumeration Members

### AlreadyAuthenticated

• **AlreadyAuthenticated** = `4005`

You sent more than one [identify](https://discord.com/developers/docs/topics/gateway#identify) payload. Stahp.

#### Defined in

[packages/types/src/shared.ts:705](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L705)

---

### AuthenticationFailed

• **AuthenticationFailed** = `4004`

The token you sent in your [identify](https://discord.com/developers/docs/topics/gateway#identify) payload is incorrect.

#### Defined in

[packages/types/src/shared.ts:703](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L703)

---

### Disconnect

• **Disconnect** = `4014`

Channel was deleted, you were kicked, voice server changed, or the main gateway session was dropped. Should not reconnect.

#### Defined in

[packages/types/src/shared.ts:715](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L715)

---

### FailedToDecodePayload

• **FailedToDecodePayload** = `4002`

You sent a invalid payload in your [identifying](https://discord.com/developers/docs/topics/gateway#identify) to the Gateway.

#### Defined in

[packages/types/src/shared.ts:699](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L699)

---

### NotAuthenticated

• **NotAuthenticated** = `4003`

You sent a payload before [identifying](https://discord.com/developers/docs/topics/gateway#identify) with the Gateway.

#### Defined in

[packages/types/src/shared.ts:701](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L701)

---

### ServerNotFound

• **ServerNotFound** = `4011`

We can't find the server you're trying to connect to.

#### Defined in

[packages/types/src/shared.ts:711](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L711)

---

### SessionNoLongerValid

• **SessionNoLongerValid** = `4006`

Your session is no longer valid.

#### Defined in

[packages/types/src/shared.ts:707](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L707)

---

### SessionTimedOut

• **SessionTimedOut** = `4009`

Your session has timed out.

#### Defined in

[packages/types/src/shared.ts:709](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L709)

---

### UnknownEncryptionMode

• **UnknownEncryptionMode** = `4016`

We didn't recognize your [encryption](https://discord.com/developers/docs/topics/voice-connections#encrypting-and-sending-voice).

#### Defined in

[packages/types/src/shared.ts:719](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L719)

---

### UnknownOpcode

• **UnknownOpcode** = `4001`

You sent an invalid [opcode](https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice-voice-opcodes).

#### Defined in

[packages/types/src/shared.ts:697](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L697)

---

### UnknownProtocol

• **UnknownProtocol** = `4012`

We didn't recognize the [protocol](https://discord.com/developers/docs/topics/voice-connections#establishing-a-voice-udp-connection-example-select-protocol-payload) you sent.

#### Defined in

[packages/types/src/shared.ts:713](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L713)

---

### VoiceServerCrashed

• **VoiceServerCrashed** = `4015`

The server crashed. Our bad! Try [resuming](https://discord.com/developers/docs/topics/voice-connections#resuming-voice-connection).

#### Defined in

[packages/types/src/shared.ts:717](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L717)
