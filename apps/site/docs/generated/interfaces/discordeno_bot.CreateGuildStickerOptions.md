[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / CreateGuildStickerOptions

# Interface: CreateGuildStickerOptions

[@discordeno/bot](../modules/discordeno_bot.md).CreateGuildStickerOptions

## Hierarchy

- [`WithReason`](discordeno_bot.WithReason.md)

  ↳ **`CreateGuildStickerOptions`**

## Table of contents

### Properties

- [description](discordeno_bot.CreateGuildStickerOptions.md#description)
- [file](discordeno_bot.CreateGuildStickerOptions.md#file)
- [name](discordeno_bot.CreateGuildStickerOptions.md#name)
- [reason](discordeno_bot.CreateGuildStickerOptions.md#reason)
- [tags](discordeno_bot.CreateGuildStickerOptions.md#tags)

## Properties

### description

• **description**: `string`

Description of the sticker (empty or 2-100 characters)

#### Defined in

[packages/bot/src/helpers/stickers/createGuildSticker.ts:39](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/stickers/createGuildSticker.ts#L39)

---

### file

• **file**: [`FileContent`](discordeno_bot.FileContent.md)

The sticker file to upload, must be a PNG, APNG, or Lottie JSON file, max 500 KB

#### Defined in

[packages/bot/src/helpers/stickers/createGuildSticker.ts:43](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/stickers/createGuildSticker.ts#L43)

---

### name

• **name**: `string`

Name of the sticker (2-30 characters)

#### Defined in

[packages/bot/src/helpers/stickers/createGuildSticker.ts:37](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/stickers/createGuildSticker.ts#L37)

---

### reason

• `Optional` **reason**: `string`

The reason which should be added in the audit logs for doing this action.

#### Inherited from

[WithReason](discordeno_bot.WithReason.md).[reason](discordeno_bot.WithReason.md#reason)

#### Defined in

packages/types/dist/discordeno.d.ts:177

---

### tags

• **tags**: `string`

Autocomplete/suggestion tags for the sticker (max 200 characters)

#### Defined in

[packages/bot/src/helpers/stickers/createGuildSticker.ts:41](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/stickers/createGuildSticker.ts#L41)
