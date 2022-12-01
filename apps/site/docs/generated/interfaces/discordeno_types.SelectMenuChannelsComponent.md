[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / SelectMenuChannelsComponent

# Interface: SelectMenuChannelsComponent

[@discordeno/types](../modules/discordeno_types.md).SelectMenuChannelsComponent

## Table of contents

### Properties

- [customId](discordeno_types.SelectMenuChannelsComponent.md#customid)
- [disabled](discordeno_types.SelectMenuChannelsComponent.md#disabled)
- [maxValues](discordeno_types.SelectMenuChannelsComponent.md#maxvalues)
- [minValues](discordeno_types.SelectMenuChannelsComponent.md#minvalues)
- [placeholder](discordeno_types.SelectMenuChannelsComponent.md#placeholder)
- [type](discordeno_types.SelectMenuChannelsComponent.md#type)

## Properties

### customId

• **customId**: `string`

A custom identifier for this component. Maximum 100 characters.

#### Defined in

[packages/types/src/discordeno.ts:125](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L125)

---

### disabled

• `Optional` **disabled**: `boolean`

Whether or not this select is disabled

#### Defined in

[packages/types/src/discordeno.ts:133](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L133)

---

### maxValues

• `Optional` **maxValues**: `number`

The maximum number of items that can be selected. Default 1. Between 1-25.

#### Defined in

[packages/types/src/discordeno.ts:131](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L131)

---

### minValues

• `Optional` **minValues**: `number`

The minimum number of items that must be selected. Default 1. Between 1-25.

#### Defined in

[packages/types/src/discordeno.ts:129](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L129)

---

### placeholder

• `Optional` **placeholder**: `string`

A custom placeholder text if nothing is selected. Maximum 150 characters.

#### Defined in

[packages/types/src/discordeno.ts:127](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L127)

---

### type

• **type**: [`SelectMenuChannels`](../enums/discordeno_types.MessageComponentTypes.md#selectmenuchannels)

SelectMenuChannels Component is of type 8

#### Defined in

[packages/types/src/discordeno.ts:123](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L123)
