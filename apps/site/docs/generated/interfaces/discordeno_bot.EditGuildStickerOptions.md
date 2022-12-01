[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / EditGuildStickerOptions

# Interface: EditGuildStickerOptions

[@discordeno/bot](../modules/discordeno_bot.md).EditGuildStickerOptions

## Hierarchy

- [`WithReason`](discordeno_bot.WithReason.md)

  ↳ **`EditGuildStickerOptions`**

## Table of contents

### Properties

- [description](discordeno_bot.EditGuildStickerOptions.md#description)
- [name](discordeno_bot.EditGuildStickerOptions.md#name)
- [reason](discordeno_bot.EditGuildStickerOptions.md#reason)
- [tags](discordeno_bot.EditGuildStickerOptions.md#tags)

## Properties

### description

• `Optional` **description**: `null` \| `string`

Description of the sticker (empty or 2-100 characters)

#### Defined in

[packages/bot/src/helpers/stickers/editGuildSticker.ts:37](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/stickers/editGuildSticker.ts#L37)

---

### name

• `Optional` **name**: `string`

Name of the sticker (2-30 characters)

#### Defined in

[packages/bot/src/helpers/stickers/editGuildSticker.ts:35](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/stickers/editGuildSticker.ts#L35)

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

• `Optional` **tags**: `string`

Autocomplete/suggestion tags for the sticker (max 200 characters)

#### Defined in

[packages/bot/src/helpers/stickers/editGuildSticker.ts:39](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/stickers/editGuildSticker.ts#L39)
