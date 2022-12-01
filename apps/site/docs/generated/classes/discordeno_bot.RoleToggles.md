[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / RoleToggles

# Class: RoleToggles

[@discordeno/bot](../modules/discordeno_bot.md).RoleToggles

## Hierarchy

- [`ToggleBitfield`](discordeno_bot.ToggleBitfield.md)

  ↳ **`RoleToggles`**

## Table of contents

### Constructors

- [constructor](discordeno_bot.RoleToggles.md#constructor)

### Properties

- [bitfield](discordeno_bot.RoleToggles.md#bitfield)

### Accessors

- [hoist](discordeno_bot.RoleToggles.md#hoist)
- [managed](discordeno_bot.RoleToggles.md#managed)
- [mentionable](discordeno_bot.RoleToggles.md#mentionable)
- [premiumSubscriber](discordeno_bot.RoleToggles.md#premiumsubscriber)

### Methods

- [add](discordeno_bot.RoleToggles.md#add)
- [contains](discordeno_bot.RoleToggles.md#contains)
- [has](discordeno_bot.RoleToggles.md#has)
- [list](discordeno_bot.RoleToggles.md#list)
- [remove](discordeno_bot.RoleToggles.md#remove)

## Constructors

### constructor

• **new RoleToggles**(`roleOrTogglesInt`)

#### Parameters

| Name               | Type                                                                     |
| :----------------- | :----------------------------------------------------------------------- |
| `roleOrTogglesInt` | `number` \| [`DiscordRole`](../interfaces/discordeno_bot.DiscordRole.md) |

#### Overrides

[ToggleBitfield](discordeno_bot.ToggleBitfield.md).[constructor](discordeno_bot.ToggleBitfield.md#constructor)

#### Defined in

[packages/bot/src/transformers/toggles/role.ts:16](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/role.ts#L16)

## Properties

### bitfield

• **bitfield**: `number` = `0`

#### Inherited from

[ToggleBitfield](discordeno_bot.ToggleBitfield.md).[bitfield](discordeno_bot.ToggleBitfield.md#bitfield)

#### Defined in

[packages/bot/src/transformers/toggles/ToggleBitfield.ts:2](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/ToggleBitfield.ts#L2)

## Accessors

### hoist

• `get` **hoist**(): `boolean`

If this role is showed separately in the user listing

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/role.ts:31](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/role.ts#L31)

---

### managed

• `get` **managed**(): `boolean`

Whether this role is managed by an integration

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/role.ts:36](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/role.ts#L36)

---

### mentionable

• `get` **mentionable**(): `boolean`

Whether this role is mentionable

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/role.ts:41](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/role.ts#L41)

---

### premiumSubscriber

• `get` **premiumSubscriber**(): `boolean`

Whether this is the guilds premium subscriber role

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/role.ts:46](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/role.ts#L46)

## Methods

### add

▸ **add**(`bits`): [`RoleToggles`](discordeno_bot.RoleToggles.md)

Adds some bits to the bitfield.

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `bits` | `number` |

#### Returns

[`RoleToggles`](discordeno_bot.RoleToggles.md)

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

| Name          | Type                                                                                                                                             |
| :------------ | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| `permissions` | `"managed"` \| `"hoist"` \| `"mentionable"` \| `"premiumSubscriber"` \| (`"managed"` \| `"hoist"` \| `"mentionable"` \| `"premiumSubscriber"`)[] |

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/role.ts:51](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/role.ts#L51)

---

### list

▸ **list**(): `Record`<`"managed"` \| `"hoist"` \| `"mentionable"` \| `"premiumSubscriber"`, `boolean`\>

Lists all the toggles for the role and whether or not each is true or false.

#### Returns

`Record`<`"managed"` \| `"hoist"` \| `"mentionable"` \| `"premiumSubscriber"`, `boolean`\>

#### Defined in

[packages/bot/src/transformers/toggles/role.ts:58](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/role.ts#L58)

---

### remove

▸ **remove**(`bits`): [`RoleToggles`](discordeno_bot.RoleToggles.md)

Removes some bits from the bitfield.

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `bits` | `number` |

#### Returns

[`RoleToggles`](discordeno_bot.RoleToggles.md)

#### Inherited from

[ToggleBitfield](discordeno_bot.ToggleBitfield.md).[remove](discordeno_bot.ToggleBitfield.md#remove)

#### Defined in

[packages/bot/src/transformers/toggles/ToggleBitfield.ts:20](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/ToggleBitfield.ts#L20)
