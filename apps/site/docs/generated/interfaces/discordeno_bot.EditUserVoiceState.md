[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / EditUserVoiceState

# Interface: EditUserVoiceState

[@discordeno/bot](../modules/discordeno_bot.md).EditUserVoiceState

https://discord.com/developers/docs/resources/guild#update-user-voice-state

## Table of contents

### Properties

- [channelId](discordeno_bot.EditUserVoiceState.md#channelid)
- [suppress](discordeno_bot.EditUserVoiceState.md#suppress)
- [userId](discordeno_bot.EditUserVoiceState.md#userid)

## Properties

### channelId

• **channelId**: [`BigString`](../modules/discordeno_bot.md#bigstring)

The id of the channel the user is currently in

#### Defined in

[packages/bot/src/helpers/guilds/voice/editVoiceState.ts:76](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/voice/editVoiceState.ts#L76)

---

### suppress

• `Optional` **suppress**: `boolean`

Toggles the user's suppress state

#### Defined in

[packages/bot/src/helpers/guilds/voice/editVoiceState.ts:78](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/voice/editVoiceState.ts#L78)

---

### userId

• **userId**: [`BigString`](../modules/discordeno_bot.md#bigstring)

The user id to target

#### Defined in

[packages/bot/src/helpers/guilds/voice/editVoiceState.ts:80](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/voice/editVoiceState.ts#L80)
