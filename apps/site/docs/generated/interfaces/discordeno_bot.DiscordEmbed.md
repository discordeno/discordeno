[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordEmbed

# Interface: DiscordEmbed

[@discordeno/bot](../modules/discordeno_bot.md).DiscordEmbed

https://discord.com/developers/docs/resources/channel#embed-object

## Table of contents

### Properties

- [author](discordeno_bot.DiscordEmbed.md#author)
- [color](discordeno_bot.DiscordEmbed.md#color)
- [description](discordeno_bot.DiscordEmbed.md#description)
- [fields](discordeno_bot.DiscordEmbed.md#fields)
- [footer](discordeno_bot.DiscordEmbed.md#footer)
- [image](discordeno_bot.DiscordEmbed.md#image)
- [provider](discordeno_bot.DiscordEmbed.md#provider)
- [thumbnail](discordeno_bot.DiscordEmbed.md#thumbnail)
- [timestamp](discordeno_bot.DiscordEmbed.md#timestamp)
- [title](discordeno_bot.DiscordEmbed.md#title)
- [type](discordeno_bot.DiscordEmbed.md#type)
- [url](discordeno_bot.DiscordEmbed.md#url)
- [video](discordeno_bot.DiscordEmbed.md#video)

## Properties

### author

• `Optional` **author**: [`DiscordEmbedAuthor`](discordeno_bot.DiscordEmbedAuthor.md)

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

• `Optional` **fields**: [`DiscordEmbedField`](discordeno_bot.DiscordEmbedField.md)[]

Fields information

#### Defined in

packages/types/dist/discord.d.ts:284

---

### footer

• `Optional` **footer**: [`DiscordEmbedFooter`](discordeno_bot.DiscordEmbedFooter.md)

Footer information

#### Defined in

packages/types/dist/discord.d.ts:272

---

### image

• `Optional` **image**: [`DiscordEmbedImage`](discordeno_bot.DiscordEmbedImage.md)

Image information

#### Defined in

packages/types/dist/discord.d.ts:274

---

### provider

• `Optional` **provider**: [`DiscordEmbedProvider`](discordeno_bot.DiscordEmbedProvider.md)

Provider information

#### Defined in

packages/types/dist/discord.d.ts:280

---

### thumbnail

• `Optional` **thumbnail**: [`DiscordEmbedThumbnail`](discordeno_bot.DiscordEmbedThumbnail.md)

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

• `Optional` **type**: [`EmbedTypes`](../modules/discordeno_bot.md#embedtypes)

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

• `Optional` **video**: [`DiscordEmbedVideo`](discordeno_bot.DiscordEmbedVideo.md)

Video information

#### Defined in

packages/types/dist/discord.d.ts:278
