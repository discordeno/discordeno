[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / EditAutoModerationRuleOptions

# Interface: EditAutoModerationRuleOptions

[@discordeno/bot](../modules/discordeno_bot.md).EditAutoModerationRuleOptions

## Hierarchy

- [`WithReason`](discordeno_bot.WithReason.md)

  ↳ **`EditAutoModerationRuleOptions`**

## Table of contents

### Properties

- [actions](discordeno_bot.EditAutoModerationRuleOptions.md#actions)
- [enabled](discordeno_bot.EditAutoModerationRuleOptions.md#enabled)
- [eventType](discordeno_bot.EditAutoModerationRuleOptions.md#eventtype)
- [exemptChannels](discordeno_bot.EditAutoModerationRuleOptions.md#exemptchannels)
- [exemptRoles](discordeno_bot.EditAutoModerationRuleOptions.md#exemptroles)
- [name](discordeno_bot.EditAutoModerationRuleOptions.md#name)
- [reason](discordeno_bot.EditAutoModerationRuleOptions.md#reason)
- [triggerMetadata](discordeno_bot.EditAutoModerationRuleOptions.md#triggermetadata)

## Properties

### actions

• **actions**: { `metadata`: { `channelId?`: [`BigString`](../modules/discordeno_bot.md#bigstring) ; `durationSeconds?`: `number` } ; `type`: [`AutoModerationActionType`](../enums/discordeno_bot.AutoModerationActionType.md) }[]

The actions that will trigger for this rule

#### Defined in

[packages/bot/src/helpers/guilds/automod/editAutomodRule.ts:83](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/automod/editAutomodRule.ts#L83)

---

### enabled

• `Optional` **enabled**: `boolean`

Whether the rule should be enabled.

#### Defined in

[packages/bot/src/helpers/guilds/automod/editAutomodRule.ts:95](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/automod/editAutomodRule.ts#L95)

---

### eventType

• **eventType**: [`MessageSend`](../enums/discordeno_bot.AutoModerationEventTypes.md#messagesend)

The type of event to trigger the rule on.

#### Defined in

[packages/bot/src/helpers/guilds/automod/editAutomodRule.ts:69](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/automod/editAutomodRule.ts#L69)

---

### exemptChannels

• `Optional` **exemptChannels**: [`BigString`](../modules/discordeno_bot.md#bigstring)[]

The channel ids that should not be effected by the rule.

#### Defined in

[packages/bot/src/helpers/guilds/automod/editAutomodRule.ts:99](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/automod/editAutomodRule.ts#L99)

---

### exemptRoles

• `Optional` **exemptRoles**: [`BigString`](../modules/discordeno_bot.md#bigstring)[]

The role ids that should not be effected by the rule

#### Defined in

[packages/bot/src/helpers/guilds/automod/editAutomodRule.ts:97](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/automod/editAutomodRule.ts#L97)

---

### name

• **name**: `string`

The name of the rule.

#### Defined in

[packages/bot/src/helpers/guilds/automod/editAutomodRule.ts:67](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/automod/editAutomodRule.ts#L67)

---

### reason

• `Optional` **reason**: `string`

The reason which should be added in the audit logs for doing this action.

#### Inherited from

[WithReason](discordeno_bot.WithReason.md).[reason](discordeno_bot.WithReason.md#reason)

#### Defined in

packages/types/dist/discordeno.d.ts:177

---

### triggerMetadata

• **triggerMetadata**: `Object`

The metadata to use for the trigger.

#### Type declaration

| Name                | Type                                                                                                                              | Description                                                                                                           |
| :------------------ | :-------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| `allowList?`        | `string`[]                                                                                                                        | The substrings which will exempt from triggering the preset trigger type. Only present when TriggerType.KeywordPreset |
| `keywordFilter?`    | `string`[]                                                                                                                        | The keywords needed to match. Only present when TriggerType.Keyword                                                   |
| `mentionTotalLimit` | `number`                                                                                                                          | Total number of mentions (role & user) allowed per message (Maximum of 50)                                            |
| `presets?`          | [`DiscordAutoModerationRuleTriggerMetadataPresets`](../enums/discordeno_bot.DiscordAutoModerationRuleTriggerMetadataPresets.md)[] | The pre-defined lists of words to match from. Only present when TriggerType.KeywordPreset                             |

#### Defined in

[packages/bot/src/helpers/guilds/automod/editAutomodRule.ts:71](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/automod/editAutomodRule.ts#L71)
