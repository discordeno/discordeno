[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / GatewayOpcodes

# Enumeration: GatewayOpcodes

[@discordeno/gateway](../modules/discordeno_gateway.md).GatewayOpcodes

https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes

## Table of contents

### Enumeration Members

- [Dispatch](discordeno_gateway.GatewayOpcodes.md#dispatch)
- [Heartbeat](discordeno_gateway.GatewayOpcodes.md#heartbeat)
- [HeartbeatACK](discordeno_gateway.GatewayOpcodes.md#heartbeatack)
- [Hello](discordeno_gateway.GatewayOpcodes.md#hello)
- [Identify](discordeno_gateway.GatewayOpcodes.md#identify)
- [InvalidSession](discordeno_gateway.GatewayOpcodes.md#invalidsession)
- [PresenceUpdate](discordeno_gateway.GatewayOpcodes.md#presenceupdate)
- [Reconnect](discordeno_gateway.GatewayOpcodes.md#reconnect)
- [RequestGuildMembers](discordeno_gateway.GatewayOpcodes.md#requestguildmembers)
- [Resume](discordeno_gateway.GatewayOpcodes.md#resume)
- [VoiceStateUpdate](discordeno_gateway.GatewayOpcodes.md#voicestateupdate)

## Enumeration Members

### Dispatch

• **Dispatch** = `0`

An event was dispatched.

#### Defined in

packages/types/dist/shared.d.ts:966

---

### Heartbeat

• **Heartbeat** = `1`

Fired periodically by the client to keep the connection alive.

#### Defined in

packages/types/dist/shared.d.ts:968

---

### HeartbeatACK

• **HeartbeatACK** = `11`

Sent in response to receiving a heartbeat to acknowledge that it has been received.

#### Defined in

packages/types/dist/shared.d.ts:986

---

### Hello

• **Hello** = `10`

Sent immediately after connecting, contains the `heartbeat_interval` to use.

#### Defined in

packages/types/dist/shared.d.ts:984

---

### Identify

• **Identify** = `2`

Starts a new session during the initial handshake.

#### Defined in

packages/types/dist/shared.d.ts:970

---

### InvalidSession

• **InvalidSession** = `9`

The session has been invalidated. You should reconnect and identify/resume accordingly.

#### Defined in

packages/types/dist/shared.d.ts:982

---

### PresenceUpdate

• **PresenceUpdate** = `3`

Update the client's presence.

#### Defined in

packages/types/dist/shared.d.ts:972

---

### Reconnect

• **Reconnect** = `7`

You should attempt to reconnect and resume immediately.

#### Defined in

packages/types/dist/shared.d.ts:978

---

### RequestGuildMembers

• **RequestGuildMembers** = `8`

Request information about offline guild members in a large guild.

#### Defined in

packages/types/dist/shared.d.ts:980

---

### Resume

• **Resume** = `6`

Resume a previous session that was disconnected.

#### Defined in

packages/types/dist/shared.d.ts:976

---

### VoiceStateUpdate

• **VoiceStateUpdate** = `4`

Used to join/leave or move between voice channels.

#### Defined in

packages/types/dist/shared.d.ts:974
