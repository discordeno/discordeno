[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / SelectMenuUsersAndRolesComponent

# Interface: SelectMenuUsersAndRolesComponent

[@discordeno/gateway](../modules/discordeno_gateway.md).SelectMenuUsersAndRolesComponent

## Table of contents

### Properties

- [customId](discordeno_gateway.SelectMenuUsersAndRolesComponent.md#customid)
- [disabled](discordeno_gateway.SelectMenuUsersAndRolesComponent.md#disabled)
- [maxValues](discordeno_gateway.SelectMenuUsersAndRolesComponent.md#maxvalues)
- [minValues](discordeno_gateway.SelectMenuUsersAndRolesComponent.md#minvalues)
- [options](discordeno_gateway.SelectMenuUsersAndRolesComponent.md#options)
- [placeholder](discordeno_gateway.SelectMenuUsersAndRolesComponent.md#placeholder)
- [type](discordeno_gateway.SelectMenuUsersAndRolesComponent.md#type)

## Properties

### customId

• **customId**: `string`

A custom identifier for this component. Maximum 100 characters.

#### Defined in

packages/types/dist/discordeno.d.ts:85

---

### disabled

• `Optional` **disabled**: `boolean`

Whether or not this select is disabled

#### Defined in

packages/types/dist/discordeno.d.ts:95

---

### maxValues

• `Optional` **maxValues**: `number`

The maximum number of items that can be selected. Default 1. Between 1-25.

#### Defined in

packages/types/dist/discordeno.d.ts:91

---

### minValues

• `Optional` **minValues**: `number`

The minimum number of items that must be selected. Default 1. Between 1-25.

#### Defined in

packages/types/dist/discordeno.d.ts:89

---

### options

• **options**: [`SelectOption`](discordeno_gateway.SelectOption.md)[]

The choices! Maximum of 25 items.

#### Defined in

packages/types/dist/discordeno.d.ts:93

---

### placeholder

• `Optional` **placeholder**: `string`

A custom placeholder text if nothing is selected. Maximum 150 characters.

#### Defined in

packages/types/dist/discordeno.d.ts:87

---

### type

• **type**: `SelectMenuUsersAndRoles`

SelectMenuChannels Component is of type 7

#### Defined in

packages/types/dist/discordeno.d.ts:83
