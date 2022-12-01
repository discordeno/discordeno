[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / DiscordVoiceState

# Interface: DiscordVoiceState

[@discordeno/gateway](../modules/discordeno_gateway.md).DiscordVoiceState

https://discord.com/developers/docs/resources/voice#voice-state-object-voice-state-structure

## Table of contents

### Properties

- [channel_id](discordeno_gateway.DiscordVoiceState.md#channel_id)
- [deaf](discordeno_gateway.DiscordVoiceState.md#deaf)
- [guild_id](discordeno_gateway.DiscordVoiceState.md#guild_id)
- [member](discordeno_gateway.DiscordVoiceState.md#member)
- [mute](discordeno_gateway.DiscordVoiceState.md#mute)
- [request_to_speak_timestamp](discordeno_gateway.DiscordVoiceState.md#request_to_speak_timestamp)
- [self_deaf](discordeno_gateway.DiscordVoiceState.md#self_deaf)
- [self_mute](discordeno_gateway.DiscordVoiceState.md#self_mute)
- [self_stream](discordeno_gateway.DiscordVoiceState.md#self_stream)
- [self_video](discordeno_gateway.DiscordVoiceState.md#self_video)
- [session_id](discordeno_gateway.DiscordVoiceState.md#session_id)
- [suppress](discordeno_gateway.DiscordVoiceState.md#suppress)
- [user_id](discordeno_gateway.DiscordVoiceState.md#user_id)

## Properties

### channel_id

• **channel_id**: `null` \| `string`

The channel id this user is connected to

#### Defined in

packages/types/dist/discord.d.ts:592

---

### deaf

• **deaf**: `boolean`

Whether this user is deafened by the server

#### Defined in

packages/types/dist/discord.d.ts:598

---

### guild_id

• `Optional` **guild_id**: `string`

The guild id this voice state is for

#### Defined in

packages/types/dist/discord.d.ts:590

---

### member

• `Optional` **member**: [`DiscordMemberWithUser`](discordeno_gateway.DiscordMemberWithUser.md)

The guild member this voice state is for

#### Defined in

packages/types/dist/discord.d.ts:596

---

### mute

• **mute**: `boolean`

Whether this user is muted by the server

#### Defined in

packages/types/dist/discord.d.ts:600

---

### request_to_speak_timestamp

• **request_to_speak_timestamp**: `null` \| `string`

The time at which the user requested to speak

#### Defined in

packages/types/dist/discord.d.ts:612

---

### self_deaf

• **self_deaf**: `boolean`

Whether this user is locally deafened

#### Defined in

packages/types/dist/discord.d.ts:602

---

### self_mute

• **self_mute**: `boolean`

Whether this user is locally muted

#### Defined in

packages/types/dist/discord.d.ts:604

---

### self_stream

• `Optional` **self_stream**: `boolean`

Whether this user is streaming using "Go Live"

#### Defined in

packages/types/dist/discord.d.ts:606

---

### self_video

• **self_video**: `boolean`

Whether this user's camera is enabled

#### Defined in

packages/types/dist/discord.d.ts:608

---

### session_id

• **session_id**: `string`

The session id for this voice state

#### Defined in

packages/types/dist/discord.d.ts:588

---

### suppress

• **suppress**: `boolean`

Whether this user is muted by the current user

#### Defined in

packages/types/dist/discord.d.ts:610

---

### user_id

• **user_id**: `string`

The user id this voice state is for

#### Defined in

packages/types/dist/discord.d.ts:594
