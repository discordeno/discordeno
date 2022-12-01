[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordVoiceRegion

# Interface: DiscordVoiceRegion

[@discordeno/bot](../modules/discordeno_bot.md).DiscordVoiceRegion

https://discord.com/developers/docs/resources/voice#voice-region-object-voice-region-structure

## Table of contents

### Properties

- [custom](discordeno_bot.DiscordVoiceRegion.md#custom)
- [deprecated](discordeno_bot.DiscordVoiceRegion.md#deprecated)
- [id](discordeno_bot.DiscordVoiceRegion.md#id)
- [name](discordeno_bot.DiscordVoiceRegion.md#name)
- [optimal](discordeno_bot.DiscordVoiceRegion.md#optimal)

## Properties

### custom

• **custom**: `boolean`

Whether this is a custom voice region (used for events/etc)

#### Defined in

packages/types/dist/discord.d.ts:2139

---

### deprecated

• **deprecated**: `boolean`

Whether this is a deprecated voice region (avoid switching to these)

#### Defined in

packages/types/dist/discord.d.ts:2137

---

### id

• **id**: `string`

Unique Id for the region

#### Defined in

packages/types/dist/discord.d.ts:2131

---

### name

• **name**: `string`

Name of the region

#### Defined in

packages/types/dist/discord.d.ts:2133

---

### optimal

• **optimal**: `boolean`

true for a single server that is closest to the current user's client

#### Defined in

packages/types/dist/discord.d.ts:2135
