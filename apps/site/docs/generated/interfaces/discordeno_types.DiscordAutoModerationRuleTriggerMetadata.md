[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordAutoModerationRuleTriggerMetadata

# Interface: DiscordAutoModerationRuleTriggerMetadata

[@discordeno/types](../modules/discordeno_types.md).DiscordAutoModerationRuleTriggerMetadata

## Table of contents

### Properties

- [allow_list](discordeno_types.DiscordAutoModerationRuleTriggerMetadata.md#allow_list)
- [keyword_filter](discordeno_types.DiscordAutoModerationRuleTriggerMetadata.md#keyword_filter)
- [mention_total_limit](discordeno_types.DiscordAutoModerationRuleTriggerMetadata.md#mention_total_limit)
- [presets](discordeno_types.DiscordAutoModerationRuleTriggerMetadata.md#presets)

## Properties

### allow_list

• **allow_list**: `string`[]

The substrings which will exempt from triggering the preset trigger type. Only present when TriggerType.KeywordPreset

#### Defined in

[packages/types/src/discord.ts:1492](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1492)

---

### keyword_filter

• `Optional` **keyword_filter**: `string`[]

The keywords needed to match. Only present when TriggerType.Keyword

#### Defined in

[packages/types/src/discord.ts:1488](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1488)

---

### mention_total_limit

• **mention_total_limit**: `number`

Total number of mentions (role & user) allowed per message (Maximum of 50)

#### Defined in

[packages/types/src/discord.ts:1494](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1494)

---

### presets

• `Optional` **presets**: [`DiscordAutoModerationRuleTriggerMetadataPresets`](../enums/discordeno_types.DiscordAutoModerationRuleTriggerMetadataPresets.md)[]

The pre-defined lists of words to match from. Only present when TriggerType.KeywordPreset

#### Defined in

[packages/types/src/discord.ts:1490](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1490)
