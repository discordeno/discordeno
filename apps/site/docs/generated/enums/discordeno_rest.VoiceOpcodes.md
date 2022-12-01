[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/rest](../modules/discordeno_rest.md) / VoiceOpcodes

# Enumeration: VoiceOpcodes

[@discordeno/rest](../modules/discordeno_rest.md).VoiceOpcodes

https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice

## Table of contents

### Enumeration Members

- [ClientDisconnect](discordeno_rest.VoiceOpcodes.md#clientdisconnect)
- [Heartbeat](discordeno_rest.VoiceOpcodes.md#heartbeat)
- [HeartbeatACK](discordeno_rest.VoiceOpcodes.md#heartbeatack)
- [Hello](discordeno_rest.VoiceOpcodes.md#hello)
- [Identify](discordeno_rest.VoiceOpcodes.md#identify)
- [Ready](discordeno_rest.VoiceOpcodes.md#ready)
- [Resume](discordeno_rest.VoiceOpcodes.md#resume)
- [Resumed](discordeno_rest.VoiceOpcodes.md#resumed)
- [SelectProtocol](discordeno_rest.VoiceOpcodes.md#selectprotocol)
- [SessionDescription](discordeno_rest.VoiceOpcodes.md#sessiondescription)
- [Speaking](discordeno_rest.VoiceOpcodes.md#speaking)

## Enumeration Members

### ClientDisconnect

• **ClientDisconnect** = `13`

A client has disconnected from the voice channel

#### Defined in

packages/types/dist/shared.d.ts:644

---

### Heartbeat

• **Heartbeat** = `3`

Keep the websocket connection alive.

#### Defined in

packages/types/dist/shared.d.ts:630

---

### HeartbeatACK

• **HeartbeatACK** = `6`

Sent to acknowledge a received client heartbeat.

#### Defined in

packages/types/dist/shared.d.ts:636

---

### Hello

• **Hello** = `8`

Time to wait between sending heartbeats in milliseconds.

#### Defined in

packages/types/dist/shared.d.ts:640

---

### Identify

• **Identify** = `0`

Begin a voice websocket connection.

#### Defined in

packages/types/dist/shared.d.ts:624

---

### Ready

• **Ready** = `2`

Complete the websocket handshake.

#### Defined in

packages/types/dist/shared.d.ts:628

---

### Resume

• **Resume** = `7`

Resume a connection.

#### Defined in

packages/types/dist/shared.d.ts:638

---

### Resumed

• **Resumed** = `9`

Acknowledge a successful session resume.

#### Defined in

packages/types/dist/shared.d.ts:642

---

### SelectProtocol

• **SelectProtocol** = `1`

Select the voice protocol.

#### Defined in

packages/types/dist/shared.d.ts:626

---

### SessionDescription

• **SessionDescription** = `4`

Describe the session.

#### Defined in

packages/types/dist/shared.d.ts:632

---

### Speaking

• **Speaking** = `5`

Indicate which users are speaking.

#### Defined in

packages/types/dist/shared.d.ts:634
