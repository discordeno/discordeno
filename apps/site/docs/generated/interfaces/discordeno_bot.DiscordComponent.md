[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordComponent

# Interface: DiscordComponent

[@discordeno/bot](../modules/discordeno_bot.md).DiscordComponent

## Table of contents

### Properties

- [components](discordeno_bot.DiscordComponent.md#components)
- [custom_id](discordeno_bot.DiscordComponent.md#custom_id)
- [disabled](discordeno_bot.DiscordComponent.md#disabled)
- [emoji](discordeno_bot.DiscordComponent.md#emoji)
- [label](discordeno_bot.DiscordComponent.md#label)
- [max_length](discordeno_bot.DiscordComponent.md#max_length)
- [max_values](discordeno_bot.DiscordComponent.md#max_values)
- [min_length](discordeno_bot.DiscordComponent.md#min_length)
- [min_values](discordeno_bot.DiscordComponent.md#min_values)
- [options](discordeno_bot.DiscordComponent.md#options)
- [placeholder](discordeno_bot.DiscordComponent.md#placeholder)
- [required](discordeno_bot.DiscordComponent.md#required)
- [style](discordeno_bot.DiscordComponent.md#style)
- [type](discordeno_bot.DiscordComponent.md#type)
- [url](discordeno_bot.DiscordComponent.md#url)
- [value](discordeno_bot.DiscordComponent.md#value)

## Properties

### components

• `Optional` **components**: [`DiscordComponent`](discordeno_bot.DiscordComponent.md)[]

a list of child components

#### Defined in

packages/types/dist/discord.d.ts:1846

---

### custom_id

• `Optional` **custom_id**: `string`

a developer-defined identifier for the component, max 100 characters

#### Defined in

packages/types/dist/discord.d.ts:1813

---

### disabled

• `Optional` **disabled**: `boolean`

whether the component is disabled, default false

#### Defined in

packages/types/dist/discord.d.ts:1815

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

packages/types/dist/discord.d.ts:1823

---

### label

• `Optional` **label**: `string`

text that appears on the button (max 80 characters)

#### Defined in

packages/types/dist/discord.d.ts:1819

---

### max_length

• `Optional` **max_length**: `number`

The maximum input length for a text input. Between 1-4000.

#### Defined in

packages/types/dist/discord.d.ts:1844

---

### max_values

• `Optional` **max_values**: `number`

The maximum number of items that can be selected. Default 1. Between 1-25.

#### Defined in

packages/types/dist/discord.d.ts:1840

---

### min_length

• `Optional` **min_length**: `number`

The minimum input length for a text input. Between 0-4000.

#### Defined in

packages/types/dist/discord.d.ts:1842

---

### min_values

• `Optional` **min_values**: `number`

The minimum number of items that must be selected. Default 1. Between 1-25.

#### Defined in

packages/types/dist/discord.d.ts:1838

---

### options

• `Optional` **options**: [`DiscordSelectOption`](discordeno_bot.DiscordSelectOption.md)[]

The choices! Maximum of 25 items.

#### Defined in

packages/types/dist/discord.d.ts:1834

---

### placeholder

• `Optional` **placeholder**: `string`

A custom placeholder text if nothing is selected. Maximum 150 characters.

#### Defined in

packages/types/dist/discord.d.ts:1836

---

### required

• `Optional` **required**: `boolean`

whether this component is required to be filled, default true

#### Defined in

packages/types/dist/discord.d.ts:1848

---

### style

• `Optional` **style**: [`ButtonStyles`](../enums/discordeno_bot.ButtonStyles.md) \| [`TextStyles`](../enums/discordeno_bot.TextStyles.md)

For different styles/colors of the buttons

#### Defined in

packages/types/dist/discord.d.ts:1817

---

### type

• **type**: [`MessageComponentTypes`](../enums/discordeno_bot.MessageComponentTypes.md)

component type

#### Defined in

packages/types/dist/discord.d.ts:1811

---

### url

• `Optional` **url**: `string`

optional url for link-style buttons that can navigate a user to the web. Only type 5 Link buttons can have a url

#### Defined in

packages/types/dist/discord.d.ts:1832

---

### value

• `Optional` **value**: `string`

the dev-define value of the option, max 100 characters for select or 4000 for input.

#### Defined in

packages/types/dist/discord.d.ts:1821
