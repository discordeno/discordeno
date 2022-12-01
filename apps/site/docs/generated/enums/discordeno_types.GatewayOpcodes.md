[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / GatewayOpcodes

# Enumeration: GatewayOpcodes

[@discordeno/types](../modules/discordeno_types.md).GatewayOpcodes

https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes

## Table of contents

### Enumeration Members

- [Dispatch](discordeno_types.GatewayOpcodes.md#dispatch)
- [Heartbeat](discordeno_types.GatewayOpcodes.md#heartbeat)
- [HeartbeatACK](discordeno_types.GatewayOpcodes.md#heartbeatack)
- [Hello](discordeno_types.GatewayOpcodes.md#hello)
- [Identify](discordeno_types.GatewayOpcodes.md#identify)
- [InvalidSession](discordeno_types.GatewayOpcodes.md#invalidsession)
- [PresenceUpdate](discordeno_types.GatewayOpcodes.md#presenceupdate)
- [Reconnect](discordeno_types.GatewayOpcodes.md#reconnect)
- [RequestGuildMembers](discordeno_types.GatewayOpcodes.md#requestguildmembers)
- [Resume](discordeno_types.GatewayOpcodes.md#resume)
- [VoiceStateUpdate](discordeno_types.GatewayOpcodes.md#voicestateupdate)

## Enumeration Members

### Dispatch

• **Dispatch** = `0`

An event was dispatched.

#### Defined in

[packages/types/src/shared.ts:1021](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1021)

---

### Heartbeat

• **Heartbeat** = `1`

Fired periodically by the client to keep the connection alive.

#### Defined in

[packages/types/src/shared.ts:1023](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1023)

---

### HeartbeatACK

• **HeartbeatACK** = `11`

Sent in response to receiving a heartbeat to acknowledge that it has been received.

#### Defined in

[packages/types/src/shared.ts:1042](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1042)

---

### Hello

• **Hello** = `10`

Sent immediately after connecting, contains the `heartbeat_interval` to use.

#### Defined in

[packages/types/src/shared.ts:1040](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1040)

---

### Identify

• **Identify** = `2`

Starts a new session during the initial handshake.

#### Defined in

[packages/types/src/shared.ts:1025](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1025)

---

### InvalidSession

• **InvalidSession** = `9`

The session has been invalidated. You should reconnect and identify/resume accordingly.

#### Defined in

[packages/types/src/shared.ts:1038](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1038)

---

### PresenceUpdate

• **PresenceUpdate** = `3`

Update the client's presence.

#### Defined in

[packages/types/src/shared.ts:1027](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1027)

---

### Reconnect

• **Reconnect** = `7`

You should attempt to reconnect and resume immediately.

#### Defined in

[packages/types/src/shared.ts:1034](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1034)

---

### RequestGuildMembers

• **RequestGuildMembers** = `8`

Request information about offline guild members in a large guild.

#### Defined in

[packages/types/src/shared.ts:1036](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1036)

---

### Resume

• **Resume** = `6`

Resume a previous session that was disconnected.

#### Defined in

[packages/types/src/shared.ts:1032](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1032)

---

### VoiceStateUpdate

• **VoiceStateUpdate** = `4`

Used to join/leave or move between voice channels.

#### Defined in

[packages/types/src/shared.ts:1030](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1030)
