[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / Component

# Interface: Component

[@discordeno/bot](../modules/discordeno_bot.md).Component

## Table of contents

### Properties

- [components](discordeno_bot.Component.md#components)
- [customId](discordeno_bot.Component.md#customid)
- [disabled](discordeno_bot.Component.md#disabled)
- [emoji](discordeno_bot.Component.md#emoji)
- [label](discordeno_bot.Component.md#label)
- [maxLength](discordeno_bot.Component.md#maxlength)
- [maxValues](discordeno_bot.Component.md#maxvalues)
- [minLength](discordeno_bot.Component.md#minlength)
- [minValues](discordeno_bot.Component.md#minvalues)
- [options](discordeno_bot.Component.md#options)
- [placeholder](discordeno_bot.Component.md#placeholder)
- [required](discordeno_bot.Component.md#required)
- [style](discordeno_bot.Component.md#style)
- [type](discordeno_bot.Component.md#type)
- [url](discordeno_bot.Component.md#url)
- [value](discordeno_bot.Component.md#value)

## Properties

### components

• `Optional` **components**: [`Component`](discordeno_bot.Component.md)[]

a list of child components

#### Defined in

[packages/bot/src/transformers/component.ts:84](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/component.ts#L84)

---

### customId

• `Optional` **customId**: `string`

a developer-defined identifier for the component, max 100 characters

#### Defined in

[packages/bot/src/transformers/component.ts:49](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/component.ts#L49)

---

### disabled

• `Optional` **disabled**: `boolean`

whether the component is disabled, default false

#### Defined in

[packages/bot/src/transformers/component.ts:53](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/component.ts#L53)

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

[packages/bot/src/transformers/component.ts:61](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/component.ts#L61)

---

### label

• `Optional` **label**: `string`

text that appears on the button (max 80 characters)

#### Defined in

[packages/bot/src/transformers/component.ts:57](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/component.ts#L57)

---

### maxLength

• `Optional` **maxLength**: `number`

The maximum input length for a text input. Between 1-4000.

#### Defined in

[packages/bot/src/transformers/component.ts:82](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/component.ts#L82)

---

### maxValues

• `Optional` **maxValues**: `number`

The maximum number of items that can be selected. Default 1. Between 1-25.

#### Defined in

[packages/bot/src/transformers/component.ts:78](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/component.ts#L78)

---

### minLength

• `Optional` **minLength**: `number`

The minimum input length for a text input. Between 0-4000.

#### Defined in

[packages/bot/src/transformers/component.ts:80](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/component.ts#L80)

---

### minValues

• `Optional` **minValues**: `number`

The minimum number of items that must be selected. Default 1. Between 1-25.

#### Defined in

[packages/bot/src/transformers/component.ts:76](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/component.ts#L76)

---

### options

• `Optional` **options**: [`SelectOption`](discordeno_bot.SelectOption.md)[]

The choices! Maximum of 25 items.

#### Defined in

[packages/bot/src/transformers/component.ts:72](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/component.ts#L72)

---

### placeholder

• `Optional` **placeholder**: `string`

A custom placeholder text if nothing is selected. Maximum 150 characters.

#### Defined in

[packages/bot/src/transformers/component.ts:74](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/component.ts#L74)

---

### required

• `Optional` **required**: `boolean`

whether this component is required to be filled, default true

#### Defined in

[packages/bot/src/transformers/component.ts:51](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/component.ts#L51)

---

### style

• `Optional` **style**: [`ButtonStyles`](../enums/discordeno_bot.ButtonStyles.md) \| [`TextStyles`](../enums/discordeno_bot.TextStyles.md)

For different styles/colors of the buttons

#### Defined in

[packages/bot/src/transformers/component.ts:55](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/component.ts#L55)

---

### type

• **type**: [`MessageComponentTypes`](../enums/discordeno_bot.MessageComponentTypes.md)

component type

#### Defined in

[packages/bot/src/transformers/component.ts:47](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/component.ts#L47)

---

### url

• `Optional` **url**: `string`

optional url for link-style buttons that can navigate a user to the web. Only type 5 Link buttons can have a url

#### Defined in

[packages/bot/src/transformers/component.ts:70](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/component.ts#L70)

---

### value

• `Optional` **value**: `string`

the dev-define value of the option, max 100 characters for select or 4000 for input.

#### Defined in

[packages/bot/src/transformers/component.ts:59](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/component.ts#L59)
