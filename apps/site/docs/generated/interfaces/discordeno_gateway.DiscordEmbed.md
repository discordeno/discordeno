[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / DiscordEmbed

# Interface: DiscordEmbed

[@discordeno/gateway](../modules/discordeno_gateway.md).DiscordEmbed

https://discord.com/developers/docs/resources/channel#embed-object

## Table of contents

### Properties

- [author](discordeno_gateway.DiscordEmbed.md#author)
- [color](discordeno_gateway.DiscordEmbed.md#color)
- [description](discordeno_gateway.DiscordEmbed.md#description)
- [fields](discordeno_gateway.DiscordEmbed.md#fields)
- [footer](discordeno_gateway.DiscordEmbed.md#footer)
- [image](discordeno_gateway.DiscordEmbed.md#image)
- [provider](discordeno_gateway.DiscordEmbed.md#provider)
- [thumbnail](discordeno_gateway.DiscordEmbed.md#thumbnail)
- [timestamp](discordeno_gateway.DiscordEmbed.md#timestamp)
- [title](discordeno_gateway.DiscordEmbed.md#title)
- [type](discordeno_gateway.DiscordEmbed.md#type)
- [url](discordeno_gateway.DiscordEmbed.md#url)
- [video](discordeno_gateway.DiscordEmbed.md#video)

## Properties

### author

• `Optional` **author**: [`DiscordEmbedAuthor`](discordeno_gateway.DiscordEmbedAuthor.md)

Author information

#### Defined in

packages/types/dist/discord.d.ts:282

---

### color

• `Optional` **color**: `number`

Color code of the embed

#### Defined in

packages/types/dist/discord.d.ts:268

---

### description

• `Optional` **description**: `string`

Description of embed

#### Defined in

packages/types/dist/discord.d.ts:264

---

### fields

• `Optional` **fields**: [`DiscordEmbedField`](discordeno_gateway.DiscordEmbedField.md)[]

Fields information

#### Defined in

packages/types/dist/discord.d.ts:284

---

### footer

• `Optional` **footer**: [`DiscordEmbedFooter`](discordeno_gateway.DiscordEmbedFooter.md)

Footer information

#### Defined in

packages/types/dist/discord.d.ts:272

---

### image

• `Optional` **image**: [`DiscordEmbedImage`](discordeno_gateway.DiscordEmbedImage.md)

Image information

#### Defined in

packages/types/dist/discord.d.ts:274

---

### provider

• `Optional` **provider**: [`DiscordEmbedProvider`](discordeno_gateway.DiscordEmbedProvider.md)

Provider information

#### Defined in

packages/types/dist/discord.d.ts:280

---

### thumbnail

• `Optional` **thumbnail**: [`DiscordEmbedThumbnail`](discordeno_gateway.DiscordEmbedThumbnail.md)

Thumbnail information

#### Defined in

packages/types/dist/discord.d.ts:276

---

### timestamp

• `Optional` **timestamp**: `string`

Timestamp of embed content

#### Defined in

packages/types/dist/discord.d.ts:270

---

### title

• `Optional` **title**: `string`

Title of embed

#### Defined in

packages/types/dist/discord.d.ts:260

---

### type

• `Optional` **type**: [`EmbedTypes`](../modules/discordeno_gateway.md#embedtypes)

Type of embed (always "rich" for webhook embeds)

#### Defined in

packages/types/dist/discord.d.ts:262

---

### url

• `Optional` **url**: `string`

Url of embed

#### Defined in

packages/types/dist/discord.d.ts:266

---

### video

• `Optional` **video**: [`DiscordEmbedVideo`](discordeno_gateway.DiscordEmbedVideo.md)

Video information

#### Defined in

packages/types/dist/discord.d.ts:278
