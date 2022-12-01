[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / GetMessagesBefore

# Interface: GetMessagesBefore

[@discordeno/bot](../modules/discordeno_bot.md).GetMessagesBefore

https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params

## Hierarchy

- [`GetMessagesLimit`](discordeno_bot.GetMessagesLimit.md)

  ↳ **`GetMessagesBefore`**

## Table of contents

### Properties

- [before](discordeno_bot.GetMessagesBefore.md#before)
- [limit](discordeno_bot.GetMessagesBefore.md#limit)

## Properties

### before

• `Optional` **before**: [`BigString`](../modules/discordeno_bot.md#bigstring)

Get messages before this message id

#### Defined in

[packages/bot/src/helpers/messages/getMessages.ts:61](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/getMessages.ts#L61)

---

### limit

• `Optional` **limit**: `number`

Max number of messages to return (1-100) default 50

#### Inherited from

[GetMessagesLimit](discordeno_bot.GetMessagesLimit.md).[limit](discordeno_bot.GetMessagesLimit.md#limit)

#### Defined in

[packages/bot/src/helpers/messages/getMessages.ts:49](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/getMessages.ts#L49)
