[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / MemberToggles

# Class: MemberToggles

[@discordeno/bot](../modules/discordeno_bot.md).MemberToggles

## Hierarchy

- [`ToggleBitfield`](discordeno_bot.ToggleBitfield.md)

  ↳ **`MemberToggles`**

## Table of contents

### Constructors

- [constructor](discordeno_bot.MemberToggles.md#constructor)

### Properties

- [bitfield](discordeno_bot.MemberToggles.md#bitfield)

### Accessors

- [deaf](discordeno_bot.MemberToggles.md#deaf)
- [mute](discordeno_bot.MemberToggles.md#mute)
- [pending](discordeno_bot.MemberToggles.md#pending)

### Methods

- [add](discordeno_bot.MemberToggles.md#add)
- [contains](discordeno_bot.MemberToggles.md#contains)
- [has](discordeno_bot.MemberToggles.md#has)
- [list](discordeno_bot.MemberToggles.md#list)
- [remove](discordeno_bot.MemberToggles.md#remove)

## Constructors

### constructor

• **new MemberToggles**(`memberOrTogglesInt`)

#### Parameters

| Name                 | Type                                                                                     |
| :------------------- | :--------------------------------------------------------------------------------------- |
| `memberOrTogglesInt` | `number` \| `Partial`<[`DiscordMember`](../interfaces/discordeno_bot.DiscordMember.md)\> |

#### Overrides

[ToggleBitfield](discordeno_bot.ToggleBitfield.md).[constructor](discordeno_bot.ToggleBitfield.md#constructor)

#### Defined in

[packages/bot/src/transformers/toggles/member.ts:14](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/member.ts#L14)

## Properties

### bitfield

• **bitfield**: `number` = `0`

#### Inherited from

[ToggleBitfield](discordeno_bot.ToggleBitfield.md).[bitfield](discordeno_bot.ToggleBitfield.md#bitfield)

#### Defined in

[packages/bot/src/transformers/toggles/ToggleBitfield.ts:2](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/ToggleBitfield.ts#L2)

## Accessors

### deaf

• `get` **deaf**(): `boolean`

Whether the user belongs to an OAuth2 application

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/member.ts:28](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/member.ts#L28)

---

### mute

• `get` **mute**(): `boolean`

Whether the user is muted in voice channels

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/member.ts:33](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/member.ts#L33)

---

### pending

• `get` **pending**(): `boolean`

Whether the user has not yet passed the guild's Membership Screening requirements

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/member.ts:38](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/member.ts#L38)

## Methods

### add

▸ **add**(`bits`): [`MemberToggles`](discordeno_bot.MemberToggles.md)

Adds some bits to the bitfield.

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `bits` | `number` |

#### Returns

[`MemberToggles`](discordeno_bot.MemberToggles.md)

#### Inherited from

[ToggleBitfield](discordeno_bot.ToggleBitfield.md).[add](discordeno_bot.ToggleBitfield.md#add)

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

#### Inherited from

[ToggleBitfield](discordeno_bot.ToggleBitfield.md).[contains](discordeno_bot.ToggleBitfield.md#contains)

#### Defined in

[packages/bot/src/transformers/toggles/ToggleBitfield.ts:9](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/ToggleBitfield.ts#L9)

---

### has

▸ **has**(`permissions`): `boolean`

Checks whether or not the permissions exist in this

#### Parameters

| Name          | Type                                                                           |
| :------------ | :----------------------------------------------------------------------------- |
| `permissions` | `"deaf"` \| `"mute"` \| `"pending"` \| (`"deaf"` \| `"mute"` \| `"pending"`)[] |

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/member.ts:43](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/member.ts#L43)

---

### list

▸ **list**(): `Record`<`"deaf"` \| `"mute"` \| `"pending"`, `boolean`\>

Lists all the toggles for the role and whether or not each is true or false.

#### Returns

`Record`<`"deaf"` \| `"mute"` \| `"pending"`, `boolean`\>

#### Defined in

[packages/bot/src/transformers/toggles/member.ts:50](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/member.ts#L50)

---

### remove

▸ **remove**(`bits`): [`MemberToggles`](discordeno_bot.MemberToggles.md)

Removes some bits from the bitfield.

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `bits` | `number` |

#### Returns

[`MemberToggles`](discordeno_bot.MemberToggles.md)

#### Inherited from

[ToggleBitfield](discordeno_bot.ToggleBitfield.md).[remove](discordeno_bot.ToggleBitfield.md#remove)

#### Defined in

[packages/bot/src/transformers/toggles/ToggleBitfield.ts:20](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/ToggleBitfield.ts#L20)
