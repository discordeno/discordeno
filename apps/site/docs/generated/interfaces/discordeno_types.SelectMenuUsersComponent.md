[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / SelectMenuUsersComponent

# Interface: SelectMenuUsersComponent

[@discordeno/types](../modules/discordeno_types.md).SelectMenuUsersComponent

## Table of contents

### Properties

- [customId](discordeno_types.SelectMenuUsersComponent.md#customid)
- [disabled](discordeno_types.SelectMenuUsersComponent.md#disabled)
- [maxValues](discordeno_types.SelectMenuUsersComponent.md#maxvalues)
- [minValues](discordeno_types.SelectMenuUsersComponent.md#minvalues)
- [placeholder](discordeno_types.SelectMenuUsersComponent.md#placeholder)
- [type](discordeno_types.SelectMenuUsersComponent.md#type)

## Properties

### customId

• **customId**: `string`

A custom identifier for this component. Maximum 100 characters.

#### Defined in

[packages/types/src/discordeno.ts:78](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L78)

---

### disabled

• `Optional` **disabled**: `boolean`

Whether or not this select is disabled

#### Defined in

[packages/types/src/discordeno.ts:86](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L86)

---

### maxValues

• `Optional` **maxValues**: `number`

The maximum number of items that can be selected. Default 1. Between 1-25.

#### Defined in

[packages/types/src/discordeno.ts:84](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L84)

---

### minValues

• `Optional` **minValues**: `number`

The minimum number of items that must be selected. Default 1. Between 1-25.

#### Defined in

[packages/types/src/discordeno.ts:82](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L82)

---

### placeholder

• `Optional` **placeholder**: `string`

A custom placeholder text if nothing is selected. Maximum 150 characters.

#### Defined in

[packages/types/src/discordeno.ts:80](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L80)

---

### type

• **type**: [`SelectMenuUsers`](../enums/discordeno_types.MessageComponentTypes.md#selectmenuusers)

SelectMenuChannels Component is of type 5

#### Defined in

[packages/types/src/discordeno.ts:76](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L76)
