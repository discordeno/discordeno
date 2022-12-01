[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / InteractionCallbackData

# Interface: InteractionCallbackData

[@discordeno/bot](../modules/discordeno_bot.md).InteractionCallbackData

https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionapplicationcommandcallbackdata

## Table of contents

### Properties

- [allowedMentions](discordeno_bot.InteractionCallbackData.md#allowedmentions)
- [choices](discordeno_bot.InteractionCallbackData.md#choices)
- [components](discordeno_bot.InteractionCallbackData.md#components)
- [content](discordeno_bot.InteractionCallbackData.md#content)
- [customId](discordeno_bot.InteractionCallbackData.md#customid)
- [embeds](discordeno_bot.InteractionCallbackData.md#embeds)
- [file](discordeno_bot.InteractionCallbackData.md#file)
- [flags](discordeno_bot.InteractionCallbackData.md#flags)
- [title](discordeno_bot.InteractionCallbackData.md#title)
- [tts](discordeno_bot.InteractionCallbackData.md#tts)

## Properties

### allowedMentions

• `Optional` **allowedMentions**: [`AllowedMentions`](discordeno_bot.AllowedMentions.md)

Allowed mentions for the message

#### Defined in

[packages/bot/src/types.ts:59](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/types.ts#L59)

---

### choices

• `Optional` **choices**: [`ApplicationCommandOptionChoice`](discordeno_bot.ApplicationCommandOptionChoice.md)[]

Autocomplete choices (max of 25 choices)

#### Defined in

[packages/bot/src/types.ts:71](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/types.ts#L71)

---

### components

• `Optional` **components**: [`MessageComponents`](../modules/discordeno_bot.md#messagecomponents)

The components you would like to have sent in this message

#### Defined in

[packages/bot/src/types.ts:67](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/types.ts#L67)

---

### content

• `Optional` **content**: `string`

The message contents (up to 2000 characters)

#### Defined in

[packages/bot/src/types.ts:53](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/types.ts#L53)

---

### customId

• `Optional` **customId**: `string`

The customId you want to use for this modal response.

#### Defined in

[packages/bot/src/types.ts:63](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/types.ts#L63)

---

### embeds

• `Optional` **embeds**: [`Embed`](discordeno_bot.Embed.md)[]

Embedded `rich` content (up to 6000 characters)

#### Defined in

[packages/bot/src/types.ts:57](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/types.ts#L57)

---

### file

• `Optional` **file**: [`FileContent`](discordeno_bot.FileContent.md) \| [`FileContent`](discordeno_bot.FileContent.md)[]

The contents of the file being sent

#### Defined in

[packages/bot/src/types.ts:61](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/types.ts#L61)

---

### flags

• `Optional` **flags**: `number`

Message flags combined as a bit field (only SUPPRESS_EMBEDS and EPHEMERAL can be set)

#### Defined in

[packages/bot/src/types.ts:69](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/types.ts#L69)

---

### title

• `Optional` **title**: `string`

The title you want to use for this modal response.

#### Defined in

[packages/bot/src/types.ts:65](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/types.ts#L65)

---

### tts

• `Optional` **tts**: `boolean`

True if this is a TTS message

#### Defined in

[packages/bot/src/types.ts:55](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/types.ts#L55)
