[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / SelectOption

# Interface: SelectOption

[@discordeno/bot](../modules/discordeno_bot.md).SelectOption

## Table of contents

### Properties

- [default](discordeno_bot.SelectOption.md#default)
- [description](discordeno_bot.SelectOption.md#description)
- [emoji](discordeno_bot.SelectOption.md#emoji)
- [label](discordeno_bot.SelectOption.md#label)
- [value](discordeno_bot.SelectOption.md#value)

## Properties

### default

• `Optional` **default**: `boolean`

Will render this option as already-selected by default.

#### Defined in

packages/types/dist/discordeno.d.ts:128

---

### description

• `Optional` **description**: `string`

An additional description of the option. Maximum 50 characters.

#### Defined in

packages/types/dist/discordeno.d.ts:117

---

### emoji

• `Optional` **emoji**: `Object`

The id, name, and animated properties of an emoji.

#### Type declaration

| Name        | Type      | Description                    |
| :---------- | :-------- | :----------------------------- |
| `animated?` | `boolean` | Whether this emoji is animated |
| `id?`       | `bigint`  | Emoji id                       |
| `name?`     | `string`  | Emoji name                     |

#### Defined in

packages/types/dist/discordeno.d.ts:119

---

### label

• **label**: `string`

The user-facing name of the option. Maximum 25 characters.

#### Defined in

packages/types/dist/discordeno.d.ts:113

---

### value

• **value**: `string`

The dev-defined value of the option. Maximum 100 characters.

#### Defined in

packages/types/dist/discordeno.d.ts:115
