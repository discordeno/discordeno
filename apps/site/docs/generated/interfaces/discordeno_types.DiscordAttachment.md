[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordAttachment

# Interface: DiscordAttachment

[@discordeno/types](../modules/discordeno_types.md).DiscordAttachment

https://discord.com/developers/docs/resources/channel#attachment-object

## Table of contents

### Properties

- [content_type](discordeno_types.DiscordAttachment.md#content_type)
- [description](discordeno_types.DiscordAttachment.md#description)
- [ephemeral](discordeno_types.DiscordAttachment.md#ephemeral)
- [filename](discordeno_types.DiscordAttachment.md#filename)
- [height](discordeno_types.DiscordAttachment.md#height)
- [id](discordeno_types.DiscordAttachment.md#id)
- [proxy_url](discordeno_types.DiscordAttachment.md#proxy_url)
- [size](discordeno_types.DiscordAttachment.md#size)
- [url](discordeno_types.DiscordAttachment.md#url)
- [width](discordeno_types.DiscordAttachment.md#width)

## Properties

### content_type

• `Optional` **content_type**: `string`

The attachment's [media type](https://en.wikipedia.org/wiki/Media_type)

#### Defined in

[packages/types/src/discord.ts:454](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L454)

---

### description

• `Optional` **description**: `string`

description for the file (max 1024 characters)

#### Defined in

[packages/types/src/discord.ts:465](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L465)

---

### ephemeral

• `Optional` **ephemeral**: `boolean`

whether this attachment is ephemeral. Ephemeral attachments will automatically be removed after a set period of time. Ephemeral attachments on messages are guaranteed to be available as long as the message itself exists.

#### Defined in

[packages/types/src/discord.ts:471](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L471)

---

### filename

• **filename**: `string`

Name of file attached

#### Defined in

[packages/types/src/discord.ts:452](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L452)

---

### height

• `Optional` **height**: `null` \| `number`

Height of file (if image)

#### Defined in

[packages/types/src/discord.ts:467](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L467)

---

### id

• **id**: `string`

Attachment id

#### Defined in

[packages/types/src/discord.ts:463](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L463)

---

### proxy_url

• **proxy_url**: `string`

A proxied url of file

#### Defined in

[packages/types/src/discord.ts:460](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L460)

---

### size

• **size**: `number`

Size of file in bytes

#### Defined in

[packages/types/src/discord.ts:456](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L456)

---

### url

• **url**: `string`

Source url of file

#### Defined in

[packages/types/src/discord.ts:458](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L458)

---

### width

• `Optional` **width**: `null` \| `number`

Width of file (if image)

#### Defined in

[packages/types/src/discord.ts:469](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L469)
