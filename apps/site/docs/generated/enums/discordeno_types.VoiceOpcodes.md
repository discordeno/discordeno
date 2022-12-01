[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / VoiceOpcodes

# Enumeration: VoiceOpcodes

[@discordeno/types](../modules/discordeno_types.md).VoiceOpcodes

https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice

## Table of contents

### Enumeration Members

- [ClientDisconnect](discordeno_types.VoiceOpcodes.md#clientdisconnect)
- [Heartbeat](discordeno_types.VoiceOpcodes.md#heartbeat)
- [HeartbeatACK](discordeno_types.VoiceOpcodes.md#heartbeatack)
- [Hello](discordeno_types.VoiceOpcodes.md#hello)
- [Identify](discordeno_types.VoiceOpcodes.md#identify)
- [Ready](discordeno_types.VoiceOpcodes.md#ready)
- [Resume](discordeno_types.VoiceOpcodes.md#resume)
- [Resumed](discordeno_types.VoiceOpcodes.md#resumed)
- [SelectProtocol](discordeno_types.VoiceOpcodes.md#selectprotocol)
- [SessionDescription](discordeno_types.VoiceOpcodes.md#sessiondescription)
- [Speaking](discordeno_types.VoiceOpcodes.md#speaking)

## Enumeration Members

### ClientDisconnect

• **ClientDisconnect** = `13`

A client has disconnected from the voice channel

#### Defined in

[packages/types/src/shared.ts:691](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L691)

---

### Heartbeat

• **Heartbeat** = `3`

Keep the websocket connection alive.

#### Defined in

[packages/types/src/shared.ts:677](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L677)

---

### HeartbeatACK

• **HeartbeatACK** = `6`

Sent to acknowledge a received client heartbeat.

#### Defined in

[packages/types/src/shared.ts:683](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L683)

---

### Hello

• **Hello** = `8`

Time to wait between sending heartbeats in milliseconds.

#### Defined in

[packages/types/src/shared.ts:687](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L687)

---

### Identify

• **Identify** = `0`

Begin a voice websocket connection.

#### Defined in

[packages/types/src/shared.ts:671](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L671)

---

### Ready

• **Ready** = `2`

Complete the websocket handshake.

#### Defined in

[packages/types/src/shared.ts:675](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L675)

---

### Resume

• **Resume** = `7`

Resume a connection.

#### Defined in

[packages/types/src/shared.ts:685](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L685)

---

### Resumed

• **Resumed** = `9`

Acknowledge a successful session resume.

#### Defined in

[packages/types/src/shared.ts:689](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L689)

---

### SelectProtocol

• **SelectProtocol** = `1`

Select the voice protocol.

#### Defined in

[packages/types/src/shared.ts:673](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L673)

---

### SessionDescription

• **SessionDescription** = `4`

Describe the session.

#### Defined in

[packages/types/src/shared.ts:679](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L679)

---

### Speaking

• **Speaking** = `5`

Indicate which users are speaking.

#### Defined in

[packages/types/src/shared.ts:681](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L681)
