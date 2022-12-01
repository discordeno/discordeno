[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / CreateMessage

# Interface: CreateMessage

[@discordeno/bot](../modules/discordeno_bot.md).CreateMessage

## Table of contents

### Properties

- [allowedMentions](discordeno_bot.CreateMessage.md#allowedmentions)
- [components](discordeno_bot.CreateMessage.md#components)
- [content](discordeno_bot.CreateMessage.md#content)
- [embeds](discordeno_bot.CreateMessage.md#embeds)
- [file](discordeno_bot.CreateMessage.md#file)
- [messageReference](discordeno_bot.CreateMessage.md#messagereference)
- [nonce](discordeno_bot.CreateMessage.md#nonce)
- [stickerIds](discordeno_bot.CreateMessage.md#stickerids)
- [tts](discordeno_bot.CreateMessage.md#tts)

## Properties

### allowedMentions

• `Optional` **allowedMentions**: [`AllowedMentions`](discordeno_bot.AllowedMentions.md)

Allowed mentions for the message

#### Defined in

[packages/bot/src/helpers/messages/sendMessage.ts:151](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/sendMessage.ts#L151)

---

### components

• `Optional` **components**: [`MessageComponents`](../modules/discordeno_bot.md#messagecomponents)

The components you would like to have sent in this message

#### Defined in

[packages/bot/src/helpers/messages/sendMessage.ts:169](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/sendMessage.ts#L169)

---

### content

• `Optional` **content**: `string`

The message contents (up to 2000 characters)

#### Defined in

[packages/bot/src/helpers/messages/sendMessage.ts:143](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/sendMessage.ts#L143)

---

### embeds

• `Optional` **embeds**: [`Embed`](discordeno_bot.Embed.md)[]

Embedded `rich` content (up to 6000 characters)

#### Defined in

[packages/bot/src/helpers/messages/sendMessage.ts:149](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/sendMessage.ts#L149)

---

### file

• `Optional` **file**: [`FileContent`](discordeno_bot.FileContent.md) \| [`FileContent`](discordeno_bot.FileContent.md)[]

The contents of the file being sent

#### Defined in

[packages/bot/src/helpers/messages/sendMessage.ts:167](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/sendMessage.ts#L167)

---

### messageReference

• `Optional` **messageReference**: `Object`

Include to make your message a reply

#### Type declaration

| Name              | Type                                                  | Description                                                                                                                                                                              |
| :---------------- | :---------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `channelId?`      | [`BigString`](../modules/discordeno_bot.md#bigstring) | id of the originating message's channel Note: `channel_id` is optional when creating a reply, but will always be present when receiving an event/response that includes this data model. |
| `failIfNotExists` | `boolean`                                             | When sending, whether to error if the referenced message doesn't exist instead of sending as a normal (non-reply) message, default true                                                  |
| `guildId?`        | [`BigString`](../modules/discordeno_bot.md#bigstring) | id of the originating message's guild                                                                                                                                                    |
| `messageId?`      | [`BigString`](../modules/discordeno_bot.md#bigstring) | id of the originating message                                                                                                                                                            |

#### Defined in

[packages/bot/src/helpers/messages/sendMessage.ts:153](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/sendMessage.ts#L153)

---

### nonce

• `Optional` **nonce**: `string` \| `number`

Can be used to verify a message was sent (up to 25 characters). Value will appear in the Message Create event.

#### Defined in

[packages/bot/src/helpers/messages/sendMessage.ts:145](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/sendMessage.ts#L145)

---

### stickerIds

• `Optional` **stickerIds**: [`bigint`] \| [`bigint`, `bigint`] \| [`bigint`, `bigint`, `bigint`]

IDs of up to 3 stickers in the server to send in the message

#### Defined in

[packages/bot/src/helpers/messages/sendMessage.ts:171](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/sendMessage.ts#L171)

---

### tts

• `Optional` **tts**: `boolean`

true if this is a TTS message

#### Defined in

[packages/bot/src/helpers/messages/sendMessage.ts:147](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/sendMessage.ts#L147)
