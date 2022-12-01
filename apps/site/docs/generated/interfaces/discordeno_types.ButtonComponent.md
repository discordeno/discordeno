[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / ButtonComponent

# Interface: ButtonComponent

[@discordeno/types](../modules/discordeno_types.md).ButtonComponent

https://discord.com/developers/docs/interactions/message-components#button-object-button-structure

## Table of contents

### Properties

- [customId](discordeno_types.ButtonComponent.md#customid)
- [disabled](discordeno_types.ButtonComponent.md#disabled)
- [emoji](discordeno_types.ButtonComponent.md#emoji)
- [label](discordeno_types.ButtonComponent.md#label)
- [style](discordeno_types.ButtonComponent.md#style)
- [type](discordeno_types.ButtonComponent.md#type)
- [url](discordeno_types.ButtonComponent.md#url)

## Properties

### customId

• `Optional` **customId**: `string`

a dev-defined unique string sent on click (max 100 characters). type 5 Link buttons can not have a custom_id

#### Defined in

[packages/types/src/discordeno.ts:38](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L38)

---

### disabled

• `Optional` **disabled**: `boolean`

Whether or not this button is disabled

#### Defined in

[packages/types/src/discordeno.ts:53](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L53)

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

[packages/types/src/discordeno.ts:42](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L42)

---

### label

• **label**: `string`

for what the button says (max 80 characters)

#### Defined in

[packages/types/src/discordeno.ts:36](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L36)

---

### style

• **style**: [`ButtonStyles`](../enums/discordeno_types.ButtonStyles.md)

For different styles/colors of the buttons

#### Defined in

[packages/types/src/discordeno.ts:40](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L40)

---

### type

• **type**: [`Button`](../enums/discordeno_types.MessageComponentTypes.md#button)

All button components have type 2

#### Defined in

[packages/types/src/discordeno.ts:34](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L34)

---

### url

• `Optional` **url**: `string`

optional url for link-style buttons that can navigate a user to the web. Only type 5 Link buttons can have a url

#### Defined in

[packages/types/src/discordeno.ts:51](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L51)
