[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / ToggleBitfieldBigint

# Class: ToggleBitfieldBigint

[@discordeno/bot](../modules/discordeno_bot.md).ToggleBitfieldBigint

## Hierarchy

- **`ToggleBitfieldBigint`**

  ↳ [`GuildToggles`](discordeno_bot.GuildToggles.md)

## Table of contents

### Constructors

- [constructor](discordeno_bot.ToggleBitfieldBigint.md#constructor)

### Properties

- [bitfield](discordeno_bot.ToggleBitfieldBigint.md#bitfield)

### Methods

- [add](discordeno_bot.ToggleBitfieldBigint.md#add)
- [contains](discordeno_bot.ToggleBitfieldBigint.md#contains)
- [remove](discordeno_bot.ToggleBitfieldBigint.md#remove)

## Constructors

### constructor

• **new ToggleBitfieldBigint**(`bitfield?`)

#### Parameters

| Name        | Type     |
| :---------- | :------- |
| `bitfield?` | `bigint` |

#### Defined in

[packages/bot/src/transformers/toggles/ToggleBitfield.ts:29](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/ToggleBitfield.ts#L29)

## Properties

### bitfield

• **bitfield**: `bigint`

#### Defined in

[packages/bot/src/transformers/toggles/ToggleBitfield.ts:27](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/ToggleBitfield.ts#L27)

## Methods

### add

▸ **add**(`bits`): [`ToggleBitfieldBigint`](discordeno_bot.ToggleBitfieldBigint.md)

Adds some bits to the bitfield.

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `bits` | `bigint` |

#### Returns

[`ToggleBitfieldBigint`](discordeno_bot.ToggleBitfieldBigint.md)

#### Defined in

[packages/bot/src/transformers/toggles/ToggleBitfield.ts:39](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/ToggleBitfield.ts#L39)

---

### contains

▸ **contains**(`bits`): `boolean`

Tests whether or not this bitfield has the permission requested.

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `bits` | `bigint` |

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/ToggleBitfield.ts:34](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/ToggleBitfield.ts#L34)

---

### remove

▸ **remove**(`bits`): [`ToggleBitfieldBigint`](discordeno_bot.ToggleBitfieldBigint.md)

Removes some bits from the bitfield.

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `bits` | `bigint` |

#### Returns

[`ToggleBitfieldBigint`](discordeno_bot.ToggleBitfieldBigint.md)

#### Defined in

[packages/bot/src/transformers/toggles/ToggleBitfield.ts:45](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/ToggleBitfield.ts#L45)
