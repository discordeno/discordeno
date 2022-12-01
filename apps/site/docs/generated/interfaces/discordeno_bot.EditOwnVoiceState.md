[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / EditOwnVoiceState

# Interface: EditOwnVoiceState

[@discordeno/bot](../modules/discordeno_bot.md).EditOwnVoiceState

https://discord.com/developers/docs/resources/guild#update-current-user-voice-state

## Table of contents

### Properties

- [channelId](discordeno_bot.EditOwnVoiceState.md#channelid)
- [requestToSpeakTimestamp](discordeno_bot.EditOwnVoiceState.md#requesttospeaktimestamp)
- [suppress](discordeno_bot.EditOwnVoiceState.md#suppress)

## Properties

### channelId

• **channelId**: [`BigString`](../modules/discordeno_bot.md#bigstring)

The id of the channel the user is currently in

#### Defined in

[packages/bot/src/helpers/guilds/voice/editVoiceState.ts:66](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/voice/editVoiceState.ts#L66)

---

### requestToSpeakTimestamp

• `Optional` **requestToSpeakTimestamp**: `null` \| `number`

Sets the user's request to speak

#### Defined in

[packages/bot/src/helpers/guilds/voice/editVoiceState.ts:70](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/voice/editVoiceState.ts#L70)

---

### suppress

• `Optional` **suppress**: `boolean`

Toggles the user's suppress state

#### Defined in

[packages/bot/src/helpers/guilds/voice/editVoiceState.ts:68](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/voice/editVoiceState.ts#L68)
