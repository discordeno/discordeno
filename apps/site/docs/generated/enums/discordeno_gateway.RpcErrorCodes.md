[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / RpcErrorCodes

# Enumeration: RpcErrorCodes

[@discordeno/gateway](../modules/discordeno_gateway.md).RpcErrorCodes

https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc

## Table of contents

### Enumeration Members

- [CaptureShortcutAlreadyListening](discordeno_gateway.RpcErrorCodes.md#captureshortcutalreadylistening)
- [GetGuildTimedOut](discordeno_gateway.RpcErrorCodes.md#getguildtimedout)
- [InvalidChannel](discordeno_gateway.RpcErrorCodes.md#invalidchannel)
- [InvalidClientId](discordeno_gateway.RpcErrorCodes.md#invalidclientid)
- [InvalidCommand](discordeno_gateway.RpcErrorCodes.md#invalidcommand)
- [InvalidEvent](discordeno_gateway.RpcErrorCodes.md#invalidevent)
- [InvalidGuild](discordeno_gateway.RpcErrorCodes.md#invalidguild)
- [InvalidOrigin](discordeno_gateway.RpcErrorCodes.md#invalidorigin)
- [InvalidPayload](discordeno_gateway.RpcErrorCodes.md#invalidpayload)
- [InvalidPermissions](discordeno_gateway.RpcErrorCodes.md#invalidpermissions)
- [InvalidToken](discordeno_gateway.RpcErrorCodes.md#invalidtoken)
- [InvalidUser](discordeno_gateway.RpcErrorCodes.md#invaliduser)
- [OAuth2Error](discordeno_gateway.RpcErrorCodes.md#oauth2error)
- [SelectChannelTimedOut](discordeno_gateway.RpcErrorCodes.md#selectchanneltimedout)
- [SelectVoiceForceRequired](discordeno_gateway.RpcErrorCodes.md#selectvoiceforcerequired)
- [UnknownError](discordeno_gateway.RpcErrorCodes.md#unknownerror)

## Enumeration Members

### CaptureShortcutAlreadyListening

• **CaptureShortcutAlreadyListening** = `5004`

You tried to capture more than one shortcut key at once.

#### Defined in

packages/types/dist/shared.d.ts:706

---

### GetGuildTimedOut

• **GetGuildTimedOut** = `5002`

An asynchronous `GET_GUILD` command timed out.

#### Defined in

packages/types/dist/shared.d.ts:702

---

### InvalidChannel

• **InvalidChannel** = `4005`

Invalid channel ID specified.

#### Defined in

packages/types/dist/shared.d.ts:686

---

### InvalidClientId

• **InvalidClientId** = `4007`

An invalid OAuth2 application ID was used to authorize or authenticate with.

#### Defined in

packages/types/dist/shared.d.ts:690

---

### InvalidCommand

• **InvalidCommand** = `4002`

Invalid command name specified.

#### Defined in

packages/types/dist/shared.d.ts:680

---

### InvalidEvent

• **InvalidEvent** = `4004`

Invalid event name specified.

#### Defined in

packages/types/dist/shared.d.ts:684

---

### InvalidGuild

• **InvalidGuild** = `4003`

Invalid guild ID specified.

#### Defined in

packages/types/dist/shared.d.ts:682

---

### InvalidOrigin

• **InvalidOrigin** = `4008`

An invalid OAuth2 application origin was used to authorize or authenticate with.

#### Defined in

packages/types/dist/shared.d.ts:692

---

### InvalidPayload

• **InvalidPayload** = `4000`

You sent an invalid payload.

#### Defined in

packages/types/dist/shared.d.ts:678

---

### InvalidPermissions

• **InvalidPermissions** = `4006`

You lack permissions to access the given resource.

#### Defined in

packages/types/dist/shared.d.ts:688

---

### InvalidToken

• **InvalidToken** = `4009`

An invalid OAuth2 token was used to authorize or authenticate with.

#### Defined in

packages/types/dist/shared.d.ts:694

---

### InvalidUser

• **InvalidUser** = `4010`

The specified user ID was invalid.

#### Defined in

packages/types/dist/shared.d.ts:696

---

### OAuth2Error

• **OAuth2Error** = `5000`

A standard OAuth2 error occurred; check the data object for the OAuth2 error details.

#### Defined in

packages/types/dist/shared.d.ts:698

---

### SelectChannelTimedOut

• **SelectChannelTimedOut** = `5001`

An asynchronous `SELECT_TEXT_CHANNEL`/`SELECT_VOICE_CHANNEL` command timed out.

#### Defined in

packages/types/dist/shared.d.ts:700

---

### SelectVoiceForceRequired

• **SelectVoiceForceRequired** = `5003`

You tried to join a user to a voice channel but the user was already in one.

#### Defined in

packages/types/dist/shared.d.ts:704

---

### UnknownError

• **UnknownError** = `1000`

An unknown error occurred.

#### Defined in

packages/types/dist/shared.d.ts:676
