[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/rest](../modules/discordeno_rest.md) / DiscordSticker

# Interface: DiscordSticker

[@discordeno/rest](../modules/discordeno_rest.md).DiscordSticker

https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-structure

## Table of contents

### Properties

- [available](discordeno_rest.DiscordSticker.md#available)
- [description](discordeno_rest.DiscordSticker.md#description)
- [format_type](discordeno_rest.DiscordSticker.md#format_type)
- [guild_id](discordeno_rest.DiscordSticker.md#guild_id)
- [id](discordeno_rest.DiscordSticker.md#id)
- [name](discordeno_rest.DiscordSticker.md#name)
- [pack_id](discordeno_rest.DiscordSticker.md#pack_id)
- [sort_value](discordeno_rest.DiscordSticker.md#sort_value)
- [tags](discordeno_rest.DiscordSticker.md#tags)
- [type](discordeno_rest.DiscordSticker.md#type)
- [user](discordeno_rest.DiscordSticker.md#user)

## Properties

### available

• `Optional` **available**: `boolean`

Whether or not the sticker is available

#### Defined in

packages/types/dist/discord.d.ts:1011

---

### description

• **description**: `string`

Description of the sticker

#### Defined in

packages/types/dist/discord.d.ts:1003

---

### format_type

• **format_type**: [`StickerFormatTypes`](../enums/discordeno_rest.StickerFormatTypes.md)

[Type of sticker format](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types)

#### Defined in

packages/types/dist/discord.d.ts:1009

---

### guild_id

• `Optional` **guild_id**: `string`

Id of the guild that owns this sticker

#### Defined in

packages/types/dist/discord.d.ts:1013

---

### id

• **id**: `string`

[Id of the sticker](https://discord.com/developers/docs/reference#image-formatting)

#### Defined in

packages/types/dist/discord.d.ts:997

---

### name

• **name**: `string`

Name of the sticker

#### Defined in

packages/types/dist/discord.d.ts:1001

---

### pack_id

• `Optional` **pack_id**: `string`

Id of the pack the sticker is from

#### Defined in

packages/types/dist/discord.d.ts:999

---

### sort_value

• `Optional` **sort_value**: `number`

A sticker's sort order within a pack

#### Defined in

packages/types/dist/discord.d.ts:1017

---

### tags

• **tags**: `string`

a unicode emoji representing the sticker's expression

#### Defined in

packages/types/dist/discord.d.ts:1005

---

### type

• **type**: [`StickerTypes`](../enums/discordeno_rest.StickerTypes.md)

[type of sticker](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-types)

#### Defined in

packages/types/dist/discord.d.ts:1007

---

### user

• `Optional` **user**: [`DiscordUser`](discordeno_rest.DiscordUser.md)

The user that uploaded the sticker

#### Defined in

packages/types/dist/discord.d.ts:1015
