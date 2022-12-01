[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / SelectMenuRolesComponent

# Interface: SelectMenuRolesComponent

[@discordeno/types](../modules/discordeno_types.md).SelectMenuRolesComponent

## Table of contents

### Properties

- [customId](discordeno_types.SelectMenuRolesComponent.md#customid)
- [disabled](discordeno_types.SelectMenuRolesComponent.md#disabled)
- [maxValues](discordeno_types.SelectMenuRolesComponent.md#maxvalues)
- [minValues](discordeno_types.SelectMenuRolesComponent.md#minvalues)
- [placeholder](discordeno_types.SelectMenuRolesComponent.md#placeholder)
- [type](discordeno_types.SelectMenuRolesComponent.md#type)

## Properties

### customId

• **customId**: `string`

A custom identifier for this component. Maximum 100 characters.

#### Defined in

[packages/types/src/discordeno.ts:93](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L93)

---

### disabled

• `Optional` **disabled**: `boolean`

Whether or not this select is disabled

#### Defined in

[packages/types/src/discordeno.ts:101](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L101)

---

### maxValues

• `Optional` **maxValues**: `number`

The maximum number of items that can be selected. Default 1. Between 1-25.

#### Defined in

[packages/types/src/discordeno.ts:99](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L99)

---

### minValues

• `Optional` **minValues**: `number`

The minimum number of items that must be selected. Default 1. Between 1-25.

#### Defined in

[packages/types/src/discordeno.ts:97](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L97)

---

### placeholder

• `Optional` **placeholder**: `string`

A custom placeholder text if nothing is selected. Maximum 150 characters.

#### Defined in

[packages/types/src/discordeno.ts:95](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L95)

---

### type

• **type**: [`SelectMenuRoles`](../enums/discordeno_types.MessageComponentTypes.md#selectmenuroles)

SelectMenuChannels Component is of type 6

#### Defined in

[packages/types/src/discordeno.ts:91](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L91)
