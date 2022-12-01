[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / SelectMenuComponent

# Interface: SelectMenuComponent

[@discordeno/types](../modules/discordeno_types.md).SelectMenuComponent

https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-menu-structure

## Table of contents

### Properties

- [customId](discordeno_types.SelectMenuComponent.md#customid)
- [disabled](discordeno_types.SelectMenuComponent.md#disabled)
- [maxValues](discordeno_types.SelectMenuComponent.md#maxvalues)
- [minValues](discordeno_types.SelectMenuComponent.md#minvalues)
- [options](discordeno_types.SelectMenuComponent.md#options)
- [placeholder](discordeno_types.SelectMenuComponent.md#placeholder)
- [type](discordeno_types.SelectMenuComponent.md#type)

## Properties

### customId

• **customId**: `string`

A custom identifier for this component. Maximum 100 characters.

#### Defined in

[packages/types/src/discordeno.ts:61](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L61)

---

### disabled

• `Optional` **disabled**: `boolean`

Whether or not this select is disabled

#### Defined in

[packages/types/src/discordeno.ts:71](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L71)

---

### maxValues

• `Optional` **maxValues**: `number`

The maximum number of items that can be selected. Default 1. Between 1-25.

#### Defined in

[packages/types/src/discordeno.ts:67](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L67)

---

### minValues

• `Optional` **minValues**: `number`

The minimum number of items that must be selected. Default 1. Between 1-25.

#### Defined in

[packages/types/src/discordeno.ts:65](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L65)

---

### options

• **options**: [`SelectOption`](discordeno_types.SelectOption.md)[]

The choices! Maximum of 25 items.

#### Defined in

[packages/types/src/discordeno.ts:69](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L69)

---

### placeholder

• `Optional` **placeholder**: `string`

A custom placeholder text if nothing is selected. Maximum 150 characters.

#### Defined in

[packages/types/src/discordeno.ts:63](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L63)

---

### type

• **type**: [`SelectMenu`](../enums/discordeno_types.MessageComponentTypes.md#selectmenu)

SelectMenu Component is of type 3

#### Defined in

[packages/types/src/discordeno.ts:59](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L59)
