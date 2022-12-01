[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / AutoModerationActionExecution

# Interface: AutoModerationActionExecution

[@discordeno/bot](../modules/discordeno_bot.md).AutoModerationActionExecution

## Hierarchy

- `ReturnType`<typeof `transformAutoModerationActionExecution`\>

  ↳ **`AutoModerationActionExecution`**

## Table of contents

### Properties

- [action](discordeno_bot.AutoModerationActionExecution.md#action)
- [alertSystemMessageId](discordeno_bot.AutoModerationActionExecution.md#alertsystemmessageid)
- [channelId](discordeno_bot.AutoModerationActionExecution.md#channelid)
- [content](discordeno_bot.AutoModerationActionExecution.md#content)
- [guildId](discordeno_bot.AutoModerationActionExecution.md#guildid)
- [matchedContent](discordeno_bot.AutoModerationActionExecution.md#matchedcontent)
- [matchedKeyword](discordeno_bot.AutoModerationActionExecution.md#matchedkeyword)
- [messageId](discordeno_bot.AutoModerationActionExecution.md#messageid)
- [ruleId](discordeno_bot.AutoModerationActionExecution.md#ruleid)
- [ruleTriggerType](discordeno_bot.AutoModerationActionExecution.md#ruletriggertype)
- [userId](discordeno_bot.AutoModerationActionExecution.md#userid)

## Properties

### action

• **action**: `Object`

#### Type declaration

| Name       | Type                                                                              |
| :--------- | :-------------------------------------------------------------------------------- |
| `metadata` | { channelId?: bigint \| undefined; durationSeconds?: number \| undefined; }       |
| `type`     | [`AutoModerationActionType`](../enums/discordeno_bot.AutoModerationActionType.md) |

#### Inherited from

ReturnType.action

---

### alertSystemMessageId

• **alertSystemMessageId**: `undefined` \| `bigint`

#### Inherited from

ReturnType.alertSystemMessageId

---

### channelId

• **channelId**: `undefined` \| `bigint`

#### Inherited from

ReturnType.channelId

---

### content

• **content**: `string`

#### Inherited from

ReturnType.content

---

### guildId

• **guildId**: `bigint`

#### Inherited from

ReturnType.guildId

---

### matchedContent

• **matchedContent**: `string`

#### Inherited from

ReturnType.matchedContent

---

### matchedKeyword

• **matchedKeyword**: `string`

#### Inherited from

ReturnType.matchedKeyword

---

### messageId

• **messageId**: `undefined` \| `bigint`

#### Inherited from

ReturnType.messageId

---

### ruleId

• **ruleId**: `bigint`

#### Inherited from

ReturnType.ruleId

---

### ruleTriggerType

• **ruleTriggerType**: [`AutoModerationTriggerTypes`](../enums/discordeno_bot.AutoModerationTriggerTypes.md)

#### Inherited from

ReturnType.ruleTriggerType

---

### userId

• **userId**: `bigint`

#### Inherited from

ReturnType.userId
