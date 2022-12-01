[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / AutoModerationRule

# Interface: AutoModerationRule

[@discordeno/bot](../modules/discordeno_bot.md).AutoModerationRule

## Hierarchy

- `ReturnType`<typeof `transformAutoModerationRule`\>

  ↳ **`AutoModerationRule`**

## Table of contents

### Properties

- [actions](discordeno_bot.AutoModerationRule.md#actions)
- [creatorId](discordeno_bot.AutoModerationRule.md#creatorid)
- [enabled](discordeno_bot.AutoModerationRule.md#enabled)
- [eventType](discordeno_bot.AutoModerationRule.md#eventtype)
- [exemptChannels](discordeno_bot.AutoModerationRule.md#exemptchannels)
- [exemptRoles](discordeno_bot.AutoModerationRule.md#exemptroles)
- [guildId](discordeno_bot.AutoModerationRule.md#guildid)
- [id](discordeno_bot.AutoModerationRule.md#id)
- [name](discordeno_bot.AutoModerationRule.md#name)
- [triggerMetadata](discordeno_bot.AutoModerationRule.md#triggermetadata)
- [triggerType](discordeno_bot.AutoModerationRule.md#triggertype)

## Properties

### actions

• **actions**: { `metadata`: `undefined` \| { `channelId`: `undefined` \| `bigint` ; `durationSeconds`: `undefined` \| `number` = action.metadata.duration_seconds } ; `type`: [`AutoModerationActionType`](../enums/discordeno_bot.AutoModerationActionType.md) = action.type }[]

#### Inherited from

ReturnType.actions

---

### creatorId

• **creatorId**: `bigint`

#### Inherited from

ReturnType.creatorId

---

### enabled

• **enabled**: `boolean`

#### Inherited from

ReturnType.enabled

---

### eventType

• **eventType**: [`MessageSend`](../enums/discordeno_bot.AutoModerationEventTypes.md#messagesend)

#### Inherited from

ReturnType.eventType

---

### exemptChannels

• **exemptChannels**: `bigint`[]

#### Inherited from

ReturnType.exemptChannels

---

### exemptRoles

• **exemptRoles**: `bigint`[]

#### Inherited from

ReturnType.exemptRoles

---

### guildId

• **guildId**: `bigint`

#### Inherited from

ReturnType.guildId

---

### id

• **id**: `bigint`

#### Inherited from

ReturnType.id

---

### name

• **name**: `string`

#### Inherited from

ReturnType.name

---

### triggerMetadata

• **triggerMetadata**: `undefined` \| { `allowList`: `string`[] ; `keywordFilter`: `undefined` \| `string`[] ; `mentionTotalLimit`: `number` ; `presets`: `undefined` \| [`DiscordAutoModerationRuleTriggerMetadataPresets`](../enums/discordeno_bot.DiscordAutoModerationRuleTriggerMetadataPresets.md)[] }

#### Inherited from

ReturnType.triggerMetadata

---

### triggerType

• **triggerType**: [`AutoModerationTriggerTypes`](../enums/discordeno_bot.AutoModerationTriggerTypes.md)

#### Inherited from

ReturnType.triggerType
