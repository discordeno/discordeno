[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / GetMessagesLimit

# Interface: GetMessagesLimit

[@discordeno/bot](../modules/discordeno_bot.md).GetMessagesLimit

https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params

## Hierarchy

- **`GetMessagesLimit`**

  ↳ [`GetMessagesAround`](discordeno_bot.GetMessagesAround.md)

  ↳ [`GetMessagesBefore`](discordeno_bot.GetMessagesBefore.md)

  ↳ [`GetMessagesAfter`](discordeno_bot.GetMessagesAfter.md)

## Table of contents

### Properties

- [limit](discordeno_bot.GetMessagesLimit.md#limit)

## Properties

### limit

• `Optional` **limit**: `number`

Max number of messages to return (1-100) default 50

#### Defined in

[packages/bot/src/helpers/messages/getMessages.ts:49](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/getMessages.ts#L49)
