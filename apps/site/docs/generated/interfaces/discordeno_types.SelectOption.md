[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / SelectOption

# Interface: SelectOption

[@discordeno/types](../modules/discordeno_types.md).SelectOption

## Table of contents

### Properties

- [default](discordeno_types.SelectOption.md#default)
- [description](discordeno_types.SelectOption.md#description)
- [emoji](discordeno_types.SelectOption.md#emoji)
- [label](discordeno_types.SelectOption.md#label)
- [value](discordeno_types.SelectOption.md#value)

## Properties

### default

• `Optional` **default**: `boolean`

Will render this option as already-selected by default.

#### Defined in

[packages/types/src/discordeno.ts:153](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L153)

---

### description

• `Optional` **description**: `string`

An additional description of the option. Maximum 50 characters.

#### Defined in

[packages/types/src/discordeno.ts:142](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L142)

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

[packages/types/src/discordeno.ts:144](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L144)

---

### label

• **label**: `string`

The user-facing name of the option. Maximum 25 characters.

#### Defined in

[packages/types/src/discordeno.ts:138](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L138)

---

### value

• **value**: `string`

The dev-defined value of the option. Maximum 100 characters.

#### Defined in

[packages/types/src/discordeno.ts:140](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L140)
