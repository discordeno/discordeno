[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordSticker

# Interface: DiscordSticker

[@discordeno/types](../modules/discordeno_types.md).DiscordSticker

https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-structure

## Table of contents

### Properties

- [available](discordeno_types.DiscordSticker.md#available)
- [description](discordeno_types.DiscordSticker.md#description)
- [format_type](discordeno_types.DiscordSticker.md#format_type)
- [guild_id](discordeno_types.DiscordSticker.md#guild_id)
- [id](discordeno_types.DiscordSticker.md#id)
- [name](discordeno_types.DiscordSticker.md#name)
- [pack_id](discordeno_types.DiscordSticker.md#pack_id)
- [sort_value](discordeno_types.DiscordSticker.md#sort_value)
- [tags](discordeno_types.DiscordSticker.md#tags)
- [type](discordeno_types.DiscordSticker.md#type)
- [user](discordeno_types.DiscordSticker.md#user)

## Properties

### available

• `Optional` **available**: `boolean`

Whether or not the sticker is available

#### Defined in

[packages/types/src/discord.ts:1145](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1145)

---

### description

• **description**: `string`

Description of the sticker

#### Defined in

[packages/types/src/discord.ts:1137](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1137)

---

### format_type

• **format_type**: [`StickerFormatTypes`](../enums/discordeno_types.StickerFormatTypes.md)

[Type of sticker format](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types)

#### Defined in

[packages/types/src/discord.ts:1143](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1143)

---

### guild_id

• `Optional` **guild_id**: `string`

Id of the guild that owns this sticker

#### Defined in

[packages/types/src/discord.ts:1147](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1147)

---

### id

• **id**: `string`

[Id of the sticker](https://discord.com/developers/docs/reference#image-formatting)

#### Defined in

[packages/types/src/discord.ts:1131](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1131)

---

### name

• **name**: `string`

Name of the sticker

#### Defined in

[packages/types/src/discord.ts:1135](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1135)

---

### pack_id

• `Optional` **pack_id**: `string`

Id of the pack the sticker is from

#### Defined in

[packages/types/src/discord.ts:1133](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1133)

---

### sort_value

• `Optional` **sort_value**: `number`

A sticker's sort order within a pack

#### Defined in

[packages/types/src/discord.ts:1151](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1151)

---

### tags

• **tags**: `string`

a unicode emoji representing the sticker's expression

#### Defined in

[packages/types/src/discord.ts:1139](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1139)

---

### type

• **type**: [`StickerTypes`](../enums/discordeno_types.StickerTypes.md)

[type of sticker](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-types)

#### Defined in

[packages/types/src/discord.ts:1141](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1141)

---

### user

• `Optional` **user**: [`DiscordUser`](discordeno_types.DiscordUser.md)

The user that uploaded the sticker

#### Defined in

[packages/types/src/discord.ts:1149](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1149)
