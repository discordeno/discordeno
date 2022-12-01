[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / UpdateVoiceState

# Interface: UpdateVoiceState

[@discordeno/bot](../modules/discordeno_bot.md).UpdateVoiceState

https://discord.com/developers/docs/topics/gateway#update-voice-state

## Table of contents

### Properties

- [channelId](discordeno_bot.UpdateVoiceState.md#channelid)
- [guildId](discordeno_bot.UpdateVoiceState.md#guildid)
- [selfDeaf](discordeno_bot.UpdateVoiceState.md#selfdeaf)
- [selfMute](discordeno_bot.UpdateVoiceState.md#selfmute)

## Properties

### channelId

• **channelId**: `null` \| `string`

id of the voice channel client wants to join (null if disconnecting)

#### Defined in

[packages/bot/src/helpers/guilds/voice/connectToVoiceChannel.ts:47](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/voice/connectToVoiceChannel.ts#L47)

---

### guildId

• **guildId**: `string`

id of the guild

#### Defined in

[packages/bot/src/helpers/guilds/voice/connectToVoiceChannel.ts:45](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/voice/connectToVoiceChannel.ts#L45)

---

### selfDeaf

• **selfDeaf**: `boolean`

Is the client deafened

#### Defined in

[packages/bot/src/helpers/guilds/voice/connectToVoiceChannel.ts:51](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/voice/connectToVoiceChannel.ts#L51)

---

### selfMute

• **selfMute**: `boolean`

Is the client muted

#### Defined in

[packages/bot/src/helpers/guilds/voice/connectToVoiceChannel.ts:49](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/voice/connectToVoiceChannel.ts#L49)
