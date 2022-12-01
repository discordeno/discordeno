[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordVoiceRegion

# Interface: DiscordVoiceRegion

[@discordeno/types](../modules/discordeno_types.md).DiscordVoiceRegion

https://discord.com/developers/docs/resources/voice#voice-region-object-voice-region-structure

## Table of contents

### Properties

- [custom](discordeno_types.DiscordVoiceRegion.md#custom)
- [deprecated](discordeno_types.DiscordVoiceRegion.md#deprecated)
- [id](discordeno_types.DiscordVoiceRegion.md#id)
- [name](discordeno_types.DiscordVoiceRegion.md#name)
- [optimal](discordeno_types.DiscordVoiceRegion.md#optimal)

## Properties

### custom

• **custom**: `boolean`

Whether this is a custom voice region (used for events/etc)

#### Defined in

[packages/types/src/discord.ts:2454](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2454)

---

### deprecated

• **deprecated**: `boolean`

Whether this is a deprecated voice region (avoid switching to these)

#### Defined in

[packages/types/src/discord.ts:2452](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2452)

---

### id

• **id**: `string`

Unique Id for the region

#### Defined in

[packages/types/src/discord.ts:2446](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2446)

---

### name

• **name**: `string`

Name of the region

#### Defined in

[packages/types/src/discord.ts:2448](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2448)

---

### optimal

• **optimal**: `boolean`

true for a single server that is closest to the current user's client

#### Defined in

[packages/types/src/discord.ts:2450](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2450)
