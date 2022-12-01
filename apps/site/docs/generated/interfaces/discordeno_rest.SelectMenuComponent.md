[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/rest](../modules/discordeno_rest.md) / SelectMenuComponent

# Interface: SelectMenuComponent

[@discordeno/rest](../modules/discordeno_rest.md).SelectMenuComponent

https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-menu-structure

## Table of contents

### Properties

- [customId](discordeno_rest.SelectMenuComponent.md#customid)
- [disabled](discordeno_rest.SelectMenuComponent.md#disabled)
- [maxValues](discordeno_rest.SelectMenuComponent.md#maxvalues)
- [minValues](discordeno_rest.SelectMenuComponent.md#minvalues)
- [options](discordeno_rest.SelectMenuComponent.md#options)
- [placeholder](discordeno_rest.SelectMenuComponent.md#placeholder)
- [type](discordeno_rest.SelectMenuComponent.md#type)

## Properties

### customId

• **customId**: `string`

A custom identifier for this component. Maximum 100 characters.

#### Defined in

packages/types/dist/discordeno.d.ts:41

---

### disabled

• `Optional` **disabled**: `boolean`

Whether or not this select is disabled

#### Defined in

packages/types/dist/discordeno.d.ts:51

---

### maxValues

• `Optional` **maxValues**: `number`

The maximum number of items that can be selected. Default 1. Between 1-25.

#### Defined in

packages/types/dist/discordeno.d.ts:47

---

### minValues

• `Optional` **minValues**: `number`

The minimum number of items that must be selected. Default 1. Between 1-25.

#### Defined in

packages/types/dist/discordeno.d.ts:45

---

### options

• **options**: [`SelectOption`](discordeno_rest.SelectOption.md)[]

The choices! Maximum of 25 items.

#### Defined in

packages/types/dist/discordeno.d.ts:49

---

### placeholder

• `Optional` **placeholder**: `string`

A custom placeholder text if nothing is selected. Maximum 150 characters.

#### Defined in

packages/types/dist/discordeno.d.ts:43

---

### type

• **type**: `SelectMenu`

SelectMenu Component is of type 3

#### Defined in

packages/types/dist/discordeno.d.ts:39
