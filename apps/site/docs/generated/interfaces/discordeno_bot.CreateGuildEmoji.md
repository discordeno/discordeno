[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / CreateGuildEmoji

# Interface: CreateGuildEmoji

[@discordeno/bot](../modules/discordeno_bot.md).CreateGuildEmoji

https://discord.com/developers/docs/resources/emoji#create-guild-emoji

## Hierarchy

- [`WithReason`](discordeno_bot.WithReason.md)

  ↳ **`CreateGuildEmoji`**

## Table of contents

### Properties

- [image](discordeno_bot.CreateGuildEmoji.md#image)
- [name](discordeno_bot.CreateGuildEmoji.md#name)
- [reason](discordeno_bot.CreateGuildEmoji.md#reason)
- [roles](discordeno_bot.CreateGuildEmoji.md#roles)

## Properties

### image

• **image**: `string`

The 128x128 emoji image. Emojis and animated emojis have a maximum file size of 256kb. Attempting to upload an emoji larger than this limit will fail and return 400 Bad Request and an error message, but not a JSON status code. If a URL is provided to the image parameter, Discordeno will automatically convert it to a base64 string internally.

#### Defined in

[packages/bot/src/helpers/emojis/createEmoji.ts:48](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/emojis/createEmoji.ts#L48)

---

### name

• **name**: `string`

Name of the emoji

#### Defined in

[packages/bot/src/helpers/emojis/createEmoji.ts:46](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/emojis/createEmoji.ts#L46)

---

### reason

• `Optional` **reason**: `string`

The reason which should be added in the audit logs for doing this action.

#### Inherited from

[WithReason](discordeno_bot.WithReason.md).[reason](discordeno_bot.WithReason.md#reason)

#### Defined in

packages/types/dist/discordeno.d.ts:177

---

### roles

• `Optional` **roles**: [`BigString`](../modules/discordeno_bot.md#bigstring)[]

Roles allowed to use this emoji

#### Defined in

[packages/bot/src/helpers/emojis/createEmoji.ts:50](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/emojis/createEmoji.ts#L50)
