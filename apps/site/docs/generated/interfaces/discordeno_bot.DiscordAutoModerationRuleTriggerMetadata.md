[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordAutoModerationRuleTriggerMetadata

# Interface: DiscordAutoModerationRuleTriggerMetadata

[@discordeno/bot](../modules/discordeno_bot.md).DiscordAutoModerationRuleTriggerMetadata

## Table of contents

### Properties

- [allow_list](discordeno_bot.DiscordAutoModerationRuleTriggerMetadata.md#allow_list)
- [keyword_filter](discordeno_bot.DiscordAutoModerationRuleTriggerMetadata.md#keyword_filter)
- [mention_total_limit](discordeno_bot.DiscordAutoModerationRuleTriggerMetadata.md#mention_total_limit)
- [presets](discordeno_bot.DiscordAutoModerationRuleTriggerMetadata.md#presets)

## Properties

### allow_list

• **allow_list**: `string`[]

The substrings which will exempt from triggering the preset trigger type. Only present when TriggerType.KeywordPreset

#### Defined in

packages/types/dist/discord.d.ts:1330

---

### keyword_filter

• `Optional` **keyword_filter**: `string`[]

The keywords needed to match. Only present when TriggerType.Keyword

#### Defined in

packages/types/dist/discord.d.ts:1326

---

### mention_total_limit

• **mention_total_limit**: `number`

Total number of mentions (role & user) allowed per message (Maximum of 50)

#### Defined in

packages/types/dist/discord.d.ts:1332

---

### presets

• `Optional` **presets**: [`DiscordAutoModerationRuleTriggerMetadataPresets`](../enums/discordeno_bot.DiscordAutoModerationRuleTriggerMetadataPresets.md)[]

The pre-defined lists of words to match from. Only present when TriggerType.KeywordPreset

#### Defined in

packages/types/dist/discord.d.ts:1328
