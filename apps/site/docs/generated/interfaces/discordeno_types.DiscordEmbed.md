[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordEmbed

# Interface: DiscordEmbed

[@discordeno/types](../modules/discordeno_types.md).DiscordEmbed

https://discord.com/developers/docs/resources/channel#embed-object

## Table of contents

### Properties

- [author](discordeno_types.DiscordEmbed.md#author)
- [color](discordeno_types.DiscordEmbed.md#color)
- [description](discordeno_types.DiscordEmbed.md#description)
- [fields](discordeno_types.DiscordEmbed.md#fields)
- [footer](discordeno_types.DiscordEmbed.md#footer)
- [image](discordeno_types.DiscordEmbed.md#image)
- [provider](discordeno_types.DiscordEmbed.md#provider)
- [thumbnail](discordeno_types.DiscordEmbed.md#thumbnail)
- [timestamp](discordeno_types.DiscordEmbed.md#timestamp)
- [title](discordeno_types.DiscordEmbed.md#title)
- [type](discordeno_types.DiscordEmbed.md#type)
- [url](discordeno_types.DiscordEmbed.md#url)
- [video](discordeno_types.DiscordEmbed.md#video)

## Properties

### author

• `Optional` **author**: [`DiscordEmbedAuthor`](discordeno_types.DiscordEmbedAuthor.md)

Author information

#### Defined in

[packages/types/src/discord.ts:369](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L369)

---

### color

• `Optional` **color**: `number`

Color code of the embed

#### Defined in

[packages/types/src/discord.ts:354](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L354)

---

### description

• `Optional` **description**: `string`

Description of embed

#### Defined in

[packages/types/src/discord.ts:350](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L350)

---

### fields

• `Optional` **fields**: [`DiscordEmbedField`](discordeno_types.DiscordEmbedField.md)[]

Fields information

#### Defined in

[packages/types/src/discord.ts:371](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L371)

---

### footer

• `Optional` **footer**: [`DiscordEmbedFooter`](discordeno_types.DiscordEmbedFooter.md)

Footer information

#### Defined in

[packages/types/src/discord.ts:359](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L359)

---

### image

• `Optional` **image**: [`DiscordEmbedImage`](discordeno_types.DiscordEmbedImage.md)

Image information

#### Defined in

[packages/types/src/discord.ts:361](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L361)

---

### provider

• `Optional` **provider**: [`DiscordEmbedProvider`](discordeno_types.DiscordEmbedProvider.md)

Provider information

#### Defined in

[packages/types/src/discord.ts:367](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L367)

---

### thumbnail

• `Optional` **thumbnail**: [`DiscordEmbedThumbnail`](discordeno_types.DiscordEmbedThumbnail.md)

Thumbnail information

#### Defined in

[packages/types/src/discord.ts:363](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L363)

---

### timestamp

• `Optional` **timestamp**: `string`

Timestamp of embed content

#### Defined in

[packages/types/src/discord.ts:357](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L357)

---

### title

• `Optional` **title**: `string`

Title of embed

#### Defined in

[packages/types/src/discord.ts:346](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L346)

---

### type

• `Optional` **type**: [`EmbedTypes`](../modules/discordeno_types.md#embedtypes)

Type of embed (always "rich" for webhook embeds)

#### Defined in

[packages/types/src/discord.ts:348](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L348)

---

### url

• `Optional` **url**: `string`

Url of embed

#### Defined in

[packages/types/src/discord.ts:352](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L352)

---

### video

• `Optional` **video**: [`DiscordEmbedVideo`](discordeno_types.DiscordEmbedVideo.md)

Video information

#### Defined in

[packages/types/src/discord.ts:365](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L365)
