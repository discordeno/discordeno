[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / SelectMenuUsersAndRolesComponent

# Interface: SelectMenuUsersAndRolesComponent

[@discordeno/types](../modules/discordeno_types.md).SelectMenuUsersAndRolesComponent

## Table of contents

### Properties

- [customId](discordeno_types.SelectMenuUsersAndRolesComponent.md#customid)
- [disabled](discordeno_types.SelectMenuUsersAndRolesComponent.md#disabled)
- [maxValues](discordeno_types.SelectMenuUsersAndRolesComponent.md#maxvalues)
- [minValues](discordeno_types.SelectMenuUsersAndRolesComponent.md#minvalues)
- [options](discordeno_types.SelectMenuUsersAndRolesComponent.md#options)
- [placeholder](discordeno_types.SelectMenuUsersAndRolesComponent.md#placeholder)
- [type](discordeno_types.SelectMenuUsersAndRolesComponent.md#type)

## Properties

### customId

• **customId**: `string`

A custom identifier for this component. Maximum 100 characters.

#### Defined in

[packages/types/src/discordeno.ts:108](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L108)

---

### disabled

• `Optional` **disabled**: `boolean`

Whether or not this select is disabled

#### Defined in

[packages/types/src/discordeno.ts:118](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L118)

---

### maxValues

• `Optional` **maxValues**: `number`

The maximum number of items that can be selected. Default 1. Between 1-25.

#### Defined in

[packages/types/src/discordeno.ts:114](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L114)

---

### minValues

• `Optional` **minValues**: `number`

The minimum number of items that must be selected. Default 1. Between 1-25.

#### Defined in

[packages/types/src/discordeno.ts:112](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L112)

---

### options

• **options**: [`SelectOption`](discordeno_types.SelectOption.md)[]

The choices! Maximum of 25 items.

#### Defined in

[packages/types/src/discordeno.ts:116](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L116)

---

### placeholder

• `Optional` **placeholder**: `string`

A custom placeholder text if nothing is selected. Maximum 150 characters.

#### Defined in

[packages/types/src/discordeno.ts:110](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L110)

---

### type

• **type**: [`SelectMenuUsersAndRoles`](../enums/discordeno_types.MessageComponentTypes.md#selectmenuusersandroles)

SelectMenuChannels Component is of type 7

#### Defined in

[packages/types/src/discordeno.ts:106](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L106)
