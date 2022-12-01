[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / UserToggles

# Class: UserToggles

[@discordeno/bot](../modules/discordeno_bot.md).UserToggles

## Hierarchy

- [`ToggleBitfield`](discordeno_bot.ToggleBitfield.md)

  ↳ **`UserToggles`**

## Table of contents

### Constructors

- [constructor](discordeno_bot.UserToggles.md#constructor)

### Properties

- [bitfield](discordeno_bot.UserToggles.md#bitfield)

### Accessors

- [bot](discordeno_bot.UserToggles.md#bot)
- [mfaEnabled](discordeno_bot.UserToggles.md#mfaenabled)
- [system](discordeno_bot.UserToggles.md#system)
- [verified](discordeno_bot.UserToggles.md#verified)

### Methods

- [add](discordeno_bot.UserToggles.md#add)
- [contains](discordeno_bot.UserToggles.md#contains)
- [has](discordeno_bot.UserToggles.md#has)
- [list](discordeno_bot.UserToggles.md#list)
- [remove](discordeno_bot.UserToggles.md#remove)

## Constructors

### constructor

• **new UserToggles**(`userOrTogglesInt`)

#### Parameters

| Name               | Type                                                                     |
| :----------------- | :----------------------------------------------------------------------- |
| `userOrTogglesInt` | `number` \| [`DiscordUser`](../interfaces/discordeno_bot.DiscordUser.md) |

#### Overrides

[ToggleBitfield](discordeno_bot.ToggleBitfield.md).[constructor](discordeno_bot.ToggleBitfield.md#constructor)

#### Defined in

[packages/bot/src/transformers/toggles/user.ts:16](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/user.ts#L16)

## Properties

### bitfield

• **bitfield**: `number` = `0`

#### Inherited from

[ToggleBitfield](discordeno_bot.ToggleBitfield.md).[bitfield](discordeno_bot.ToggleBitfield.md#bitfield)

#### Defined in

[packages/bot/src/transformers/toggles/ToggleBitfield.ts:2](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/ToggleBitfield.ts#L2)

## Accessors

### bot

• `get` **bot**(): `boolean`

Whether the user belongs to an OAuth2 application

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/user.ts:31](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/user.ts#L31)

---

### mfaEnabled

• `get` **mfaEnabled**(): `boolean`

Whether the user has two factor enabled on their account

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/user.ts:41](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/user.ts#L41)

---

### system

• `get` **system**(): `boolean`

Whether the user is an Official Discord System user (part of the urgent message system)

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/user.ts:36](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/user.ts#L36)

---

### verified

• `get` **verified**(): `boolean`

Whether the email on this account has been verified

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/user.ts:46](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/user.ts#L46)

## Methods

### add

▸ **add**(`bits`): [`UserToggles`](discordeno_bot.UserToggles.md)

Adds some bits to the bitfield.

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `bits` | `number` |

#### Returns

[`UserToggles`](discordeno_bot.UserToggles.md)

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

| Name          | Type                                                                                                                   |
| :------------ | :--------------------------------------------------------------------------------------------------------------------- |
| `permissions` | `"bot"` \| `"system"` \| `"verified"` \| `"mfaEnabled"` \| (`"bot"` \| `"system"` \| `"verified"` \| `"mfaEnabled"`)[] |

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/user.ts:51](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/user.ts#L51)

---

### list

▸ **list**(): `Record`<`"bot"` \| `"system"` \| `"verified"` \| `"mfaEnabled"`, `boolean`\>

Lists all the toggles for the role and whether or not each is true or false.

#### Returns

`Record`<`"bot"` \| `"system"` \| `"verified"` \| `"mfaEnabled"`, `boolean`\>

#### Defined in

[packages/bot/src/transformers/toggles/user.ts:58](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/user.ts#L58)

---

### remove

▸ **remove**(`bits`): [`UserToggles`](discordeno_bot.UserToggles.md)

Removes some bits from the bitfield.

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `bits` | `number` |

#### Returns

[`UserToggles`](discordeno_bot.UserToggles.md)

#### Inherited from

[ToggleBitfield](discordeno_bot.ToggleBitfield.md).[remove](discordeno_bot.ToggleBitfield.md#remove)

#### Defined in

[packages/bot/src/transformers/toggles/ToggleBitfield.ts:20](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/ToggleBitfield.ts#L20)
