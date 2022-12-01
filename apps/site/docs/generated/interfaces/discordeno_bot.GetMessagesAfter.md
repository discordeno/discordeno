[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / GetMessagesAfter

# Interface: GetMessagesAfter

[@discordeno/bot](../modules/discordeno_bot.md).GetMessagesAfter

https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params

## Hierarchy

- [`GetMessagesLimit`](discordeno_bot.GetMessagesLimit.md)

  ↳ **`GetMessagesAfter`**

## Table of contents

### Properties

- [after](discordeno_bot.GetMessagesAfter.md#after)
- [limit](discordeno_bot.GetMessagesAfter.md#limit)

## Properties

### after

• `Optional` **after**: [`BigString`](../modules/discordeno_bot.md#bigstring)

Get messages after this message id

#### Defined in

[packages/bot/src/helpers/messages/getMessages.ts:67](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/getMessages.ts#L67)

---

### limit

• `Optional` **limit**: `number`

Max number of messages to return (1-100) default 50

#### Inherited from

[GetMessagesLimit](discordeno_bot.GetMessagesLimit.md).[limit](discordeno_bot.GetMessagesLimit.md#limit)

#### Defined in

[packages/bot/src/helpers/messages/getMessages.ts:49](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/getMessages.ts#L49)
