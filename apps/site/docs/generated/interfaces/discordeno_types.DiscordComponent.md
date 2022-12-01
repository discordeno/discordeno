[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordComponent

# Interface: DiscordComponent

[@discordeno/types](../modules/discordeno_types.md).DiscordComponent

## Table of contents

### Properties

- [components](discordeno_types.DiscordComponent.md#components)
- [custom_id](discordeno_types.DiscordComponent.md#custom_id)
- [disabled](discordeno_types.DiscordComponent.md#disabled)
- [emoji](discordeno_types.DiscordComponent.md#emoji)
- [label](discordeno_types.DiscordComponent.md#label)
- [max_length](discordeno_types.DiscordComponent.md#max_length)
- [max_values](discordeno_types.DiscordComponent.md#max_values)
- [min_length](discordeno_types.DiscordComponent.md#min_length)
- [min_values](discordeno_types.DiscordComponent.md#min_values)
- [options](discordeno_types.DiscordComponent.md#options)
- [placeholder](discordeno_types.DiscordComponent.md#placeholder)
- [required](discordeno_types.DiscordComponent.md#required)
- [style](discordeno_types.DiscordComponent.md#style)
- [type](discordeno_types.DiscordComponent.md#type)
- [url](discordeno_types.DiscordComponent.md#url)
- [value](discordeno_types.DiscordComponent.md#value)

## Properties

### components

• `Optional` **components**: [`DiscordComponent`](discordeno_types.DiscordComponent.md)[]

a list of child components

#### Defined in

[packages/types/src/discord.ts:2106](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2106)

---

### custom_id

• `Optional` **custom_id**: `string`

a developer-defined identifier for the component, max 100 characters

#### Defined in

[packages/types/src/discord.ts:2073](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2073)

---

### disabled

• `Optional` **disabled**: `boolean`

whether the component is disabled, default false

#### Defined in

[packages/types/src/discord.ts:2075](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2075)

---

### emoji

• `Optional` **emoji**: `Object`

Emoji object that includes fields of name, id, and animated supporting unicode and custom emojis.

#### Type declaration

| Name        | Type      | Description                    |
| :---------- | :-------- | :----------------------------- |
| `animated?` | `boolean` | Whether this emoji is animated |
| `id?`       | `string`  | Emoji id                       |
| `name?`     | `string`  | Emoji name                     |

#### Defined in

[packages/types/src/discord.ts:2083](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2083)

---

### label

• `Optional` **label**: `string`

text that appears on the button (max 80 characters)

#### Defined in

[packages/types/src/discord.ts:2079](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2079)

---

### max_length

• `Optional` **max_length**: `number`

The maximum input length for a text input. Between 1-4000.

#### Defined in

[packages/types/src/discord.ts:2104](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2104)

---

### max_values

• `Optional` **max_values**: `number`

The maximum number of items that can be selected. Default 1. Between 1-25.

#### Defined in

[packages/types/src/discord.ts:2100](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2100)

---

### min_length

• `Optional` **min_length**: `number`

The minimum input length for a text input. Between 0-4000.

#### Defined in

[packages/types/src/discord.ts:2102](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2102)

---

### min_values

• `Optional` **min_values**: `number`

The minimum number of items that must be selected. Default 1. Between 1-25.

#### Defined in

[packages/types/src/discord.ts:2098](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2098)

---

### options

• `Optional` **options**: [`DiscordSelectOption`](discordeno_types.DiscordSelectOption.md)[]

The choices! Maximum of 25 items.

#### Defined in

[packages/types/src/discord.ts:2094](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2094)

---

### placeholder

• `Optional` **placeholder**: `string`

A custom placeholder text if nothing is selected. Maximum 150 characters.

#### Defined in

[packages/types/src/discord.ts:2096](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2096)

---

### required

• `Optional` **required**: `boolean`

whether this component is required to be filled, default true

#### Defined in

[packages/types/src/discord.ts:2108](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2108)

---

### style

• `Optional` **style**: [`ButtonStyles`](../enums/discordeno_types.ButtonStyles.md) \| [`TextStyles`](../enums/discordeno_types.TextStyles.md)

For different styles/colors of the buttons

#### Defined in

[packages/types/src/discord.ts:2077](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2077)

---

### type

• **type**: [`MessageComponentTypes`](../enums/discordeno_types.MessageComponentTypes.md)

component type

#### Defined in

[packages/types/src/discord.ts:2071](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2071)

---

### url

• `Optional` **url**: `string`

optional url for link-style buttons that can navigate a user to the web. Only type 5 Link buttons can have a url

#### Defined in

[packages/types/src/discord.ts:2092](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2092)

---

### value

• `Optional` **value**: `string`

the dev-define value of the option, max 100 characters for select or 4000 for input.

#### Defined in

[packages/types/src/discord.ts:2081](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2081)
