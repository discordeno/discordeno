[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / CreateForumPostWithMessage

# Interface: CreateForumPostWithMessage

[@discordeno/bot](../modules/discordeno_bot.md).CreateForumPostWithMessage

## Hierarchy

- [`WithReason`](discordeno_bot.WithReason.md)

  ↳ **`CreateForumPostWithMessage`**

## Table of contents

### Properties

- [allowedMentions](discordeno_bot.CreateForumPostWithMessage.md#allowedmentions)
- [autoArchiveDuration](discordeno_bot.CreateForumPostWithMessage.md#autoarchiveduration)
- [components](discordeno_bot.CreateForumPostWithMessage.md#components)
- [content](discordeno_bot.CreateForumPostWithMessage.md#content)
- [embeds](discordeno_bot.CreateForumPostWithMessage.md#embeds)
- [file](discordeno_bot.CreateForumPostWithMessage.md#file)
- [name](discordeno_bot.CreateForumPostWithMessage.md#name)
- [rateLimitPerUser](discordeno_bot.CreateForumPostWithMessage.md#ratelimitperuser)
- [reason](discordeno_bot.CreateForumPostWithMessage.md#reason)

## Properties

### allowedMentions

• `Optional` **allowedMentions**: [`AllowedMentions`](discordeno_bot.AllowedMentions.md)

Allowed mentions for the message

#### Defined in

[packages/bot/src/helpers/channels/forums/createForumThread.ts:69](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/forums/createForumThread.ts#L69)

---

### autoArchiveDuration

• **autoArchiveDuration**: `60` \| `1440` \| `4320` \| `10080`

Duration in minutes to automatically archive the thread after recent activity

#### Defined in

[packages/bot/src/helpers/channels/forums/createForumThread.ts:61](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/forums/createForumThread.ts#L61)

---

### components

• `Optional` **components**: [`MessageComponents`](../modules/discordeno_bot.md#messagecomponents)

The components you would like to have sent in this message

#### Defined in

[packages/bot/src/helpers/channels/forums/createForumThread.ts:73](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/forums/createForumThread.ts#L73)

---

### content

• `Optional` **content**: `string`

The message contents (up to 2000 characters)

#### Defined in

[packages/bot/src/helpers/channels/forums/createForumThread.ts:65](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/forums/createForumThread.ts#L65)

---

### embeds

• `Optional` **embeds**: [`Embed`](discordeno_bot.Embed.md)[]

Embedded `rich` content (up to 6000 characters)

#### Defined in

[packages/bot/src/helpers/channels/forums/createForumThread.ts:67](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/forums/createForumThread.ts#L67)

---

### file

• `Optional` **file**: [`FileContent`](discordeno_bot.FileContent.md) \| [`FileContent`](discordeno_bot.FileContent.md)[]

The contents of the file being sent

#### Defined in

[packages/bot/src/helpers/channels/forums/createForumThread.ts:71](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/forums/createForumThread.ts#L71)

---

### name

• **name**: `string`

1-100 character thread name

#### Defined in

[packages/bot/src/helpers/channels/forums/createForumThread.ts:59](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/forums/createForumThread.ts#L59)

---

### rateLimitPerUser

• `Optional` **rateLimitPerUser**: `null` \| `number`

Amount of seconds a user has to wait before sending another message (0-21600)

#### Defined in

[packages/bot/src/helpers/channels/forums/createForumThread.ts:63](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/forums/createForumThread.ts#L63)

---

### reason

• `Optional` **reason**: `string`

The reason which should be added in the audit logs for doing this action.

#### Inherited from

[WithReason](discordeno_bot.WithReason.md).[reason](discordeno_bot.WithReason.md#reason)

#### Defined in

packages/types/dist/discordeno.d.ts:177
