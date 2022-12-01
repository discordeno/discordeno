[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/rest](../modules/discordeno_rest.md) / DiscordAttachment

# Interface: DiscordAttachment

[@discordeno/rest](../modules/discordeno_rest.md).DiscordAttachment

https://discord.com/developers/docs/resources/channel#attachment-object

## Table of contents

### Properties

- [content_type](discordeno_rest.DiscordAttachment.md#content_type)
- [description](discordeno_rest.DiscordAttachment.md#description)
- [ephemeral](discordeno_rest.DiscordAttachment.md#ephemeral)
- [filename](discordeno_rest.DiscordAttachment.md#filename)
- [height](discordeno_rest.DiscordAttachment.md#height)
- [id](discordeno_rest.DiscordAttachment.md#id)
- [proxy_url](discordeno_rest.DiscordAttachment.md#proxy_url)
- [size](discordeno_rest.DiscordAttachment.md#size)
- [url](discordeno_rest.DiscordAttachment.md#url)
- [width](discordeno_rest.DiscordAttachment.md#width)

## Properties

### content_type

• `Optional` **content_type**: `string`

The attachment's [media type](https://en.wikipedia.org/wiki/Media_type)

#### Defined in

packages/types/dist/discord.d.ts:359

---

### description

• `Optional` **description**: `string`

description for the file (max 1024 characters)

#### Defined in

packages/types/dist/discord.d.ts:369

---

### ephemeral

• `Optional` **ephemeral**: `boolean`

whether this attachment is ephemeral. Ephemeral attachments will automatically be removed after a set period of time. Ephemeral attachments on messages are guaranteed to be available as long as the message itself exists.

#### Defined in

packages/types/dist/discord.d.ts:375

---

### filename

• **filename**: `string`

Name of file attached

#### Defined in

packages/types/dist/discord.d.ts:357

---

### height

• `Optional` **height**: `null` \| `number`

Height of file (if image)

#### Defined in

packages/types/dist/discord.d.ts:371

---

### id

• **id**: `string`

Attachment id

#### Defined in

packages/types/dist/discord.d.ts:367

---

### proxy_url

• **proxy_url**: `string`

A proxied url of file

#### Defined in

packages/types/dist/discord.d.ts:365

---

### size

• **size**: `number`

Size of file in bytes

#### Defined in

packages/types/dist/discord.d.ts:361

---

### url

• **url**: `string`

Source url of file

#### Defined in

packages/types/dist/discord.d.ts:363

---

### width

• `Optional` **width**: `null` \| `number`

Width of file (if image)

#### Defined in

packages/types/dist/discord.d.ts:373
