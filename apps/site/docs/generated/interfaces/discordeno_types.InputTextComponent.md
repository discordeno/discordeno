[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / InputTextComponent

# Interface: InputTextComponent

[@discordeno/types](../modules/discordeno_types.md).InputTextComponent

https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-structure

## Table of contents

### Properties

- [customId](discordeno_types.InputTextComponent.md#customid)
- [label](discordeno_types.InputTextComponent.md#label)
- [maxLength](discordeno_types.InputTextComponent.md#maxlength)
- [minLength](discordeno_types.InputTextComponent.md#minlength)
- [placeholder](discordeno_types.InputTextComponent.md#placeholder)
- [required](discordeno_types.InputTextComponent.md#required)
- [style](discordeno_types.InputTextComponent.md#style)
- [type](discordeno_types.InputTextComponent.md#type)
- [value](discordeno_types.InputTextComponent.md#value)

## Properties

### customId

• **customId**: `string`

The customId of the InputText

#### Defined in

[packages/types/src/discordeno.ts:163](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L163)

---

### label

• **label**: `string`

The label of the InputText. Maximum 45 characters

#### Defined in

[packages/types/src/discordeno.ts:165](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L165)

---

### maxLength

• `Optional` **maxLength**: `number`

The maximum length of the text the user has to provide

#### Defined in

[packages/types/src/discordeno.ts:171](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L171)

---

### minLength

• `Optional` **minLength**: `number`

The minimum length of the text the user has to provide

#### Defined in

[packages/types/src/discordeno.ts:169](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L169)

---

### placeholder

• `Optional` **placeholder**: `string`

The placeholder of the InputText

#### Defined in

[packages/types/src/discordeno.ts:167](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L167)

---

### required

• `Optional` **required**: `boolean`

Whether or not this input is required.

#### Defined in

[packages/types/src/discordeno.ts:173](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L173)

---

### style

• **style**: [`TextStyles`](../enums/discordeno_types.TextStyles.md)

The style of the InputText

#### Defined in

[packages/types/src/discordeno.ts:161](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L161)

---

### type

• **type**: [`InputText`](../enums/discordeno_types.MessageComponentTypes.md#inputtext)

InputText Component is of type 4

#### Defined in

[packages/types/src/discordeno.ts:159](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L159)

---

### value

• `Optional` **value**: `string`

Pre-filled value for input text.

#### Defined in

[packages/types/src/discordeno.ts:175](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L175)
