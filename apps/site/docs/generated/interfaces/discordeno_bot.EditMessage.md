[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / EditMessage

# Interface: EditMessage

[@discordeno/bot](../modules/discordeno_bot.md).EditMessage

https://discord.com/developers/docs/resources/channel#edit-message-json-params

## Table of contents

### Properties

- [allowedMentions](discordeno_bot.EditMessage.md#allowedmentions)
- [attachments](discordeno_bot.EditMessage.md#attachments)
- [components](discordeno_bot.EditMessage.md#components)
- [content](discordeno_bot.EditMessage.md#content)
- [embeds](discordeno_bot.EditMessage.md#embeds)
- [file](discordeno_bot.EditMessage.md#file)
- [flags](discordeno_bot.EditMessage.md#flags)

## Properties

### allowedMentions

• `Optional` **allowedMentions**: [`AllowedMentions`](discordeno_bot.AllowedMentions.md)

Allowed mentions for the message

#### Defined in

[packages/bot/src/helpers/messages/editMessage.ts:61](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/editMessage.ts#L61)

---

### attachments

• `Optional` **attachments**: [`Attachment`](discordeno_bot.Attachment.md)[]

When specified (adding new attachments), attachments which are not provided in this list will be removed.

#### Defined in

[packages/bot/src/helpers/messages/editMessage.ts:63](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/editMessage.ts#L63)

---

### components

• `Optional` **components**: [`MessageComponents`](../modules/discordeno_bot.md#messagecomponents)

The components you would like to have sent in this message

#### Defined in

[packages/bot/src/helpers/messages/editMessage.ts:65](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/editMessage.ts#L65)

---

### content

• `Optional` **content**: `null` \| `string`

The new message contents (up to 2000 characters)

#### Defined in

[packages/bot/src/helpers/messages/editMessage.ts:53](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/editMessage.ts#L53)

---

### embeds

• `Optional` **embeds**: `null` \| [`Embed`](discordeno_bot.Embed.md)[]

Embedded `rich` content (up to 6000 characters)

#### Defined in

[packages/bot/src/helpers/messages/editMessage.ts:55](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/editMessage.ts#L55)

---

### file

• `Optional` **file**: `null` \| [`FileContent`](discordeno_bot.FileContent.md) \| [`FileContent`](discordeno_bot.FileContent.md)[]

The contents of the file being sent/edited

#### Defined in

[packages/bot/src/helpers/messages/editMessage.ts:59](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/editMessage.ts#L59)

---

### flags

• `Optional` **flags**: `null` \| `4`

Edit the flags of the message (only `SUPPRESS_EMBEDS` can currently be set/unset)

#### Defined in

[packages/bot/src/helpers/messages/editMessage.ts:57](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/editMessage.ts#L57)
