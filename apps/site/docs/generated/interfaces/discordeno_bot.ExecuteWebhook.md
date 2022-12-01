[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / ExecuteWebhook

# Interface: ExecuteWebhook

[@discordeno/bot](../modules/discordeno_bot.md).ExecuteWebhook

https://discord.com/developers/docs/resources/webhook#execute-webhook

## Table of contents

### Properties

- [allowedMentions](discordeno_bot.ExecuteWebhook.md#allowedmentions)
- [avatarUrl](discordeno_bot.ExecuteWebhook.md#avatarurl)
- [components](discordeno_bot.ExecuteWebhook.md#components)
- [content](discordeno_bot.ExecuteWebhook.md#content)
- [embeds](discordeno_bot.ExecuteWebhook.md#embeds)
- [file](discordeno_bot.ExecuteWebhook.md#file)
- [threadId](discordeno_bot.ExecuteWebhook.md#threadid)
- [threadName](discordeno_bot.ExecuteWebhook.md#threadname)
- [tts](discordeno_bot.ExecuteWebhook.md#tts)
- [username](discordeno_bot.ExecuteWebhook.md#username)
- [wait](discordeno_bot.ExecuteWebhook.md#wait)

## Properties

### allowedMentions

• `Optional` **allowedMentions**: [`AllowedMentions`](discordeno_bot.AllowedMentions.md)

Allowed mentions for the message

#### Defined in

[packages/bot/src/helpers/webhooks/executeWebhook.ts:81](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/webhooks/executeWebhook.ts#L81)

---

### avatarUrl

• `Optional` **avatarUrl**: `string`

Override the default avatar of the webhook

#### Defined in

[packages/bot/src/helpers/webhooks/executeWebhook.ts:73](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/webhooks/executeWebhook.ts#L73)

---

### components

• `Optional` **components**: [`MessageComponents`](../modules/discordeno_bot.md#messagecomponents)

the components to include with the message

#### Defined in

[packages/bot/src/helpers/webhooks/executeWebhook.ts:83](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/webhooks/executeWebhook.ts#L83)

---

### content

• `Optional` **content**: `string`

The message contents (up to 2000 characters)

#### Defined in

[packages/bot/src/helpers/webhooks/executeWebhook.ts:69](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/webhooks/executeWebhook.ts#L69)

---

### embeds

• `Optional` **embeds**: [`Embed`](discordeno_bot.Embed.md)[]

Embedded `rich` content

#### Defined in

[packages/bot/src/helpers/webhooks/executeWebhook.ts:79](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/webhooks/executeWebhook.ts#L79)

---

### file

• `Optional` **file**: [`FileContent`](discordeno_bot.FileContent.md) \| [`FileContent`](discordeno_bot.FileContent.md)[]

The contents of the file being sent

#### Defined in

[packages/bot/src/helpers/webhooks/executeWebhook.ts:77](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/webhooks/executeWebhook.ts#L77)

---

### threadId

• `Optional` **threadId**: [`BigString`](../modules/discordeno_bot.md#bigstring)

Send a message to the specified thread within a webhook's channel. The thread will automatically be unarchived.

#### Defined in

[packages/bot/src/helpers/webhooks/executeWebhook.ts:65](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/webhooks/executeWebhook.ts#L65)

---

### threadName

• `Optional` **threadName**: `string`

Name of the thread to create (target channel has to be type of forum channel)

#### Defined in

[packages/bot/src/helpers/webhooks/executeWebhook.ts:67](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/webhooks/executeWebhook.ts#L67)

---

### tts

• `Optional` **tts**: `boolean`

True if this is a TTS message

#### Defined in

[packages/bot/src/helpers/webhooks/executeWebhook.ts:75](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/webhooks/executeWebhook.ts#L75)

---

### username

• `Optional` **username**: `string`

Override the default username of the webhook

#### Defined in

[packages/bot/src/helpers/webhooks/executeWebhook.ts:71](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/webhooks/executeWebhook.ts#L71)

---

### wait

• `Optional` **wait**: `boolean`

Waits for server confirmation of message send before response, and returns the created message body (defaults to `false`; when `false` a message that is not saved does not return an error)

#### Defined in

[packages/bot/src/helpers/webhooks/executeWebhook.ts:63](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/webhooks/executeWebhook.ts#L63)
