[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordVoiceState

# Interface: DiscordVoiceState

[@discordeno/types](../modules/discordeno_types.md).DiscordVoiceState

https://discord.com/developers/docs/resources/voice#voice-state-object-voice-state-structure

## Table of contents

### Properties

- [channel_id](discordeno_types.DiscordVoiceState.md#channel_id)
- [deaf](discordeno_types.DiscordVoiceState.md#deaf)
- [guild_id](discordeno_types.DiscordVoiceState.md#guild_id)
- [member](discordeno_types.DiscordVoiceState.md#member)
- [mute](discordeno_types.DiscordVoiceState.md#mute)
- [request_to_speak_timestamp](discordeno_types.DiscordVoiceState.md#request_to_speak_timestamp)
- [self_deaf](discordeno_types.DiscordVoiceState.md#self_deaf)
- [self_mute](discordeno_types.DiscordVoiceState.md#self_mute)
- [self_stream](discordeno_types.DiscordVoiceState.md#self_stream)
- [self_video](discordeno_types.DiscordVoiceState.md#self_video)
- [session_id](discordeno_types.DiscordVoiceState.md#session_id)
- [suppress](discordeno_types.DiscordVoiceState.md#suppress)
- [user_id](discordeno_types.DiscordVoiceState.md#user_id)

## Properties

### channel_id

• **channel_id**: `null` \| `string`

The channel id this user is connected to

#### Defined in

[packages/types/src/discord.ts:703](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L703)

---

### deaf

• **deaf**: `boolean`

Whether this user is deafened by the server

#### Defined in

[packages/types/src/discord.ts:709](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L709)

---

### guild_id

• `Optional` **guild_id**: `string`

The guild id this voice state is for

#### Defined in

[packages/types/src/discord.ts:701](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L701)

---

### member

• `Optional` **member**: [`DiscordMemberWithUser`](discordeno_types.DiscordMemberWithUser.md)

The guild member this voice state is for

#### Defined in

[packages/types/src/discord.ts:707](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L707)

---

### mute

• **mute**: `boolean`

Whether this user is muted by the server

#### Defined in

[packages/types/src/discord.ts:711](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L711)

---

### request_to_speak_timestamp

• **request_to_speak_timestamp**: `null` \| `string`

The time at which the user requested to speak

#### Defined in

[packages/types/src/discord.ts:723](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L723)

---

### self_deaf

• **self_deaf**: `boolean`

Whether this user is locally deafened

#### Defined in

[packages/types/src/discord.ts:713](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L713)

---

### self_mute

• **self_mute**: `boolean`

Whether this user is locally muted

#### Defined in

[packages/types/src/discord.ts:715](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L715)

---

### self_stream

• `Optional` **self_stream**: `boolean`

Whether this user is streaming using "Go Live"

#### Defined in

[packages/types/src/discord.ts:717](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L717)

---

### self_video

• **self_video**: `boolean`

Whether this user's camera is enabled

#### Defined in

[packages/types/src/discord.ts:719](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L719)

---

### session_id

• **session_id**: `string`

The session id for this voice state

#### Defined in

[packages/types/src/discord.ts:698](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L698)

---

### suppress

• **suppress**: `boolean`

Whether this user is muted by the current user

#### Defined in

[packages/types/src/discord.ts:721](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L721)

---

### user_id

• **user_id**: `string`

The user id this voice state is for

#### Defined in

[packages/types/src/discord.ts:705](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L705)
