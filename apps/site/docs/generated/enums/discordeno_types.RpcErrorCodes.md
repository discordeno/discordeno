[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / RpcErrorCodes

# Enumeration: RpcErrorCodes

[@discordeno/types](../modules/discordeno_types.md).RpcErrorCodes

https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc

## Table of contents

### Enumeration Members

- [CaptureShortcutAlreadyListening](discordeno_types.RpcErrorCodes.md#captureshortcutalreadylistening)
- [GetGuildTimedOut](discordeno_types.RpcErrorCodes.md#getguildtimedout)
- [InvalidChannel](discordeno_types.RpcErrorCodes.md#invalidchannel)
- [InvalidClientId](discordeno_types.RpcErrorCodes.md#invalidclientid)
- [InvalidCommand](discordeno_types.RpcErrorCodes.md#invalidcommand)
- [InvalidEvent](discordeno_types.RpcErrorCodes.md#invalidevent)
- [InvalidGuild](discordeno_types.RpcErrorCodes.md#invalidguild)
- [InvalidOrigin](discordeno_types.RpcErrorCodes.md#invalidorigin)
- [InvalidPayload](discordeno_types.RpcErrorCodes.md#invalidpayload)
- [InvalidPermissions](discordeno_types.RpcErrorCodes.md#invalidpermissions)
- [InvalidToken](discordeno_types.RpcErrorCodes.md#invalidtoken)
- [InvalidUser](discordeno_types.RpcErrorCodes.md#invaliduser)
- [OAuth2Error](discordeno_types.RpcErrorCodes.md#oauth2error)
- [SelectChannelTimedOut](discordeno_types.RpcErrorCodes.md#selectchanneltimedout)
- [SelectVoiceForceRequired](discordeno_types.RpcErrorCodes.md#selectvoiceforcerequired)
- [UnknownError](discordeno_types.RpcErrorCodes.md#unknownerror)

## Enumeration Members

### CaptureShortcutAlreadyListening

• **CaptureShortcutAlreadyListening** = `5004`

You tried to capture more than one shortcut key at once.

#### Defined in

[packages/types/src/shared.ts:755](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L755)

---

### GetGuildTimedOut

• **GetGuildTimedOut** = `5002`

An asynchronous `GET_GUILD` command timed out.

#### Defined in

[packages/types/src/shared.ts:751](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L751)

---

### InvalidChannel

• **InvalidChannel** = `4005`

Invalid channel ID specified.

#### Defined in

[packages/types/src/shared.ts:735](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L735)

---

### InvalidClientId

• **InvalidClientId** = `4007`

An invalid OAuth2 application ID was used to authorize or authenticate with.

#### Defined in

[packages/types/src/shared.ts:739](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L739)

---

### InvalidCommand

• **InvalidCommand** = `4002`

Invalid command name specified.

#### Defined in

[packages/types/src/shared.ts:729](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L729)

---

### InvalidEvent

• **InvalidEvent** = `4004`

Invalid event name specified.

#### Defined in

[packages/types/src/shared.ts:733](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L733)

---

### InvalidGuild

• **InvalidGuild** = `4003`

Invalid guild ID specified.

#### Defined in

[packages/types/src/shared.ts:731](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L731)

---

### InvalidOrigin

• **InvalidOrigin** = `4008`

An invalid OAuth2 application origin was used to authorize or authenticate with.

#### Defined in

[packages/types/src/shared.ts:741](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L741)

---

### InvalidPayload

• **InvalidPayload** = `4000`

You sent an invalid payload.

#### Defined in

[packages/types/src/shared.ts:727](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L727)

---

### InvalidPermissions

• **InvalidPermissions** = `4006`

You lack permissions to access the given resource.

#### Defined in

[packages/types/src/shared.ts:737](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L737)

---

### InvalidToken

• **InvalidToken** = `4009`

An invalid OAuth2 token was used to authorize or authenticate with.

#### Defined in

[packages/types/src/shared.ts:743](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L743)

---

### InvalidUser

• **InvalidUser** = `4010`

The specified user ID was invalid.

#### Defined in

[packages/types/src/shared.ts:745](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L745)

---

### OAuth2Error

• **OAuth2Error** = `5000`

A standard OAuth2 error occurred; check the data object for the OAuth2 error details.

#### Defined in

[packages/types/src/shared.ts:747](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L747)

---

### SelectChannelTimedOut

• **SelectChannelTimedOut** = `5001`

An asynchronous `SELECT_TEXT_CHANNEL`/`SELECT_VOICE_CHANNEL` command timed out.

#### Defined in

[packages/types/src/shared.ts:749](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L749)

---

### SelectVoiceForceRequired

• **SelectVoiceForceRequired** = `5003`

You tried to join a user to a voice channel but the user was already in one.

#### Defined in

[packages/types/src/shared.ts:753](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L753)

---

### UnknownError

• **UnknownError** = `1000`

An unknown error occurred.

#### Defined in

[packages/types/src/shared.ts:725](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L725)
