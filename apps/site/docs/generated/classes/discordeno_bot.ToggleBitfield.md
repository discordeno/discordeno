[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / ToggleBitfield

# Class: ToggleBitfield

[@discordeno/bot](../modules/discordeno_bot.md).ToggleBitfield

## Hierarchy

- **`ToggleBitfield`**

  ↳ [`EmojiToggles`](discordeno_bot.EmojiToggles.md)

  ↳ [`MemberToggles`](discordeno_bot.MemberToggles.md)

  ↳ [`RoleToggles`](discordeno_bot.RoleToggles.md)

  ↳ [`UserToggles`](discordeno_bot.UserToggles.md)

  ↳ [`VoiceStateToggles`](discordeno_bot.VoiceStateToggles.md)

## Table of contents

### Constructors

- [constructor](discordeno_bot.ToggleBitfield.md#constructor)

### Properties

- [bitfield](discordeno_bot.ToggleBitfield.md#bitfield)

### Methods

- [add](discordeno_bot.ToggleBitfield.md#add)
- [contains](discordeno_bot.ToggleBitfield.md#contains)
- [remove](discordeno_bot.ToggleBitfield.md#remove)

## Constructors

### constructor

• **new ToggleBitfield**(`bitfield?`)

#### Parameters

| Name        | Type     |
| :---------- | :------- |
| `bitfield?` | `number` |

#### Defined in

[packages/bot/src/transformers/toggles/ToggleBitfield.ts:4](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/ToggleBitfield.ts#L4)

## Properties

### bitfield

• **bitfield**: `number` = `0`

#### Defined in

[packages/bot/src/transformers/toggles/ToggleBitfield.ts:2](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/ToggleBitfield.ts#L2)

## Methods

### add

▸ **add**(`bits`): [`ToggleBitfield`](discordeno_bot.ToggleBitfield.md)

Adds some bits to the bitfield.

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `bits` | `number` |

#### Returns

[`ToggleBitfield`](discordeno_bot.ToggleBitfield.md)

#### Defined in

[packages/bot/src/transformers/toggles/ToggleBitfield.ts:14](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/ToggleBitfield.ts#L14)

---

### contains

▸ **contains**(`bits`): `boolean`

Tests whether or not this bitfield has the permission requested.

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `bits` | `number` |

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/ToggleBitfield.ts:9](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/ToggleBitfield.ts#L9)

---

### remove

▸ **remove**(`bits`): [`ToggleBitfield`](discordeno_bot.ToggleBitfield.md)

Removes some bits from the bitfield.

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `bits` | `number` |

#### Returns

[`ToggleBitfield`](discordeno_bot.ToggleBitfield.md)

#### Defined in

[packages/bot/src/transformers/toggles/ToggleBitfield.ts:20](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/ToggleBitfield.ts#L20)
