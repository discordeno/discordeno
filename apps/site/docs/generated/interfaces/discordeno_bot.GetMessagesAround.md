[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / GetMessagesAround

# Interface: GetMessagesAround

[@discordeno/bot](../modules/discordeno_bot.md).GetMessagesAround

https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params

## Hierarchy

- [`GetMessagesLimit`](discordeno_bot.GetMessagesLimit.md)

  ↳ **`GetMessagesAround`**

## Table of contents

### Properties

- [around](discordeno_bot.GetMessagesAround.md#around)
- [limit](discordeno_bot.GetMessagesAround.md#limit)

## Properties

### around

• `Optional` **around**: [`BigString`](../modules/discordeno_bot.md#bigstring)

Get messages around this message id

#### Defined in

[packages/bot/src/helpers/messages/getMessages.ts:55](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/getMessages.ts#L55)

---

### limit

• `Optional` **limit**: `number`

Max number of messages to return (1-100) default 50

#### Inherited from

[GetMessagesLimit](discordeno_bot.GetMessagesLimit.md).[limit](discordeno_bot.GetMessagesLimit.md#limit)

#### Defined in

[packages/bot/src/helpers/messages/getMessages.ts:49](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/getMessages.ts#L49)
