[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordStickerPack

# Interface: DiscordStickerPack

[@discordeno/types](../modules/discordeno_types.md).DiscordStickerPack

https://discord.com/developers/docs/resources/sticker#sticker-pack-object-sticker-pack-structure

## Table of contents

### Properties

- [banner_asset_id](discordeno_types.DiscordStickerPack.md#banner_asset_id)
- [cover_sticker_id](discordeno_types.DiscordStickerPack.md#cover_sticker_id)
- [description](discordeno_types.DiscordStickerPack.md#description)
- [id](discordeno_types.DiscordStickerPack.md#id)
- [name](discordeno_types.DiscordStickerPack.md#name)
- [sku_id](discordeno_types.DiscordStickerPack.md#sku_id)
- [stickers](discordeno_types.DiscordStickerPack.md#stickers)

## Properties

### banner_asset_id

• `Optional` **banner_asset_id**: `string`

id of the sticker pack's [banner image](https://discord.com/developers/docs/reference#image-formatting)

#### Defined in

[packages/types/src/discord.ts:1295](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1295)

---

### cover_sticker_id

• `Optional` **cover_sticker_id**: `string`

id of a sticker in the pack which is shown as the pack's icon

#### Defined in

[packages/types/src/discord.ts:1291](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1291)

---

### description

• **description**: `string`

description of the sticker pack

#### Defined in

[packages/types/src/discord.ts:1293](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1293)

---

### id

• **id**: `string`

id of the sticker pack

#### Defined in

[packages/types/src/discord.ts:1283](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1283)

---

### name

• **name**: `string`

name of the sticker pack

#### Defined in

[packages/types/src/discord.ts:1287](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1287)

---

### sku_id

• **sku_id**: `string`

id of the pack's SKU

#### Defined in

[packages/types/src/discord.ts:1289](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1289)

---

### stickers

• **stickers**: [`DiscordSticker`](discordeno_types.DiscordSticker.md)[]

the stickers in the pack

#### Defined in

[packages/types/src/discord.ts:1285](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1285)
