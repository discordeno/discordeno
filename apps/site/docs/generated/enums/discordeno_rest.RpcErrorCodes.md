[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/rest](../modules/discordeno_rest.md) / RpcErrorCodes

# Enumeration: RpcErrorCodes

[@discordeno/rest](../modules/discordeno_rest.md).RpcErrorCodes

https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc

## Table of contents

### Enumeration Members

- [CaptureShortcutAlreadyListening](discordeno_rest.RpcErrorCodes.md#captureshortcutalreadylistening)
- [GetGuildTimedOut](discordeno_rest.RpcErrorCodes.md#getguildtimedout)
- [InvalidChannel](discordeno_rest.RpcErrorCodes.md#invalidchannel)
- [InvalidClientId](discordeno_rest.RpcErrorCodes.md#invalidclientid)
- [InvalidCommand](discordeno_rest.RpcErrorCodes.md#invalidcommand)
- [InvalidEvent](discordeno_rest.RpcErrorCodes.md#invalidevent)
- [InvalidGuild](discordeno_rest.RpcErrorCodes.md#invalidguild)
- [InvalidOrigin](discordeno_rest.RpcErrorCodes.md#invalidorigin)
- [InvalidPayload](discordeno_rest.RpcErrorCodes.md#invalidpayload)
- [InvalidPermissions](discordeno_rest.RpcErrorCodes.md#invalidpermissions)
- [InvalidToken](discordeno_rest.RpcErrorCodes.md#invalidtoken)
- [InvalidUser](discordeno_rest.RpcErrorCodes.md#invaliduser)
- [OAuth2Error](discordeno_rest.RpcErrorCodes.md#oauth2error)
- [SelectChannelTimedOut](discordeno_rest.RpcErrorCodes.md#selectchanneltimedout)
- [SelectVoiceForceRequired](discordeno_rest.RpcErrorCodes.md#selectvoiceforcerequired)
- [UnknownError](discordeno_rest.RpcErrorCodes.md#unknownerror)

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
