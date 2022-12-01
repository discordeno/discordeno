[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / ButtonComponent

# Interface: ButtonComponent

[@discordeno/bot](../modules/discordeno_bot.md).ButtonComponent

https://discord.com/developers/docs/interactions/message-components#button-object-button-structure

## Table of contents

### Properties

- [customId](discordeno_bot.ButtonComponent.md#customid)
- [disabled](discordeno_bot.ButtonComponent.md#disabled)
- [emoji](discordeno_bot.ButtonComponent.md#emoji)
- [label](discordeno_bot.ButtonComponent.md#label)
- [style](discordeno_bot.ButtonComponent.md#style)
- [type](discordeno_bot.ButtonComponent.md#type)
- [url](discordeno_bot.ButtonComponent.md#url)

## Properties

### customId

• `Optional` **customId**: `string`

a dev-defined unique string sent on click (max 100 characters). type 5 Link buttons can not have a custom_id

#### Defined in

packages/types/dist/discordeno.d.ts:19

---

### disabled

• `Optional` **disabled**: `boolean`

Whether or not this button is disabled

#### Defined in

packages/types/dist/discordeno.d.ts:34

---

### emoji

• `Optional` **emoji**: `Object`

Emoji object that includes fields of name, id, and animated supporting unicode and custom emojis.

#### Type declaration

| Name        | Type      | Description                    |
| :---------- | :-------- | :----------------------------- |
| `animated?` | `boolean` | Whether this emoji is animated |
| `id?`       | `bigint`  | Emoji id                       |
| `name?`     | `string`  | Emoji name                     |

#### Defined in

packages/types/dist/discordeno.d.ts:23

---

### label

• **label**: `string`

for what the button says (max 80 characters)

#### Defined in

packages/types/dist/discordeno.d.ts:17

---

### style

• **style**: `ButtonStyles`

For different styles/colors of the buttons

#### Defined in

packages/types/dist/discordeno.d.ts:21

---

### type

• **type**: `Button`

All button components have type 2

#### Defined in

packages/types/dist/discordeno.d.ts:15

---

### url

• `Optional` **url**: `string`

optional url for link-style buttons that can navigate a user to the web. Only type 5 Link buttons can have a url

#### Defined in

packages/types/dist/discordeno.d.ts:32
