[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / InputTextComponent

# Interface: InputTextComponent

[@discordeno/gateway](../modules/discordeno_gateway.md).InputTextComponent

https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-structure

## Table of contents

### Properties

- [customId](discordeno_gateway.InputTextComponent.md#customid)
- [label](discordeno_gateway.InputTextComponent.md#label)
- [maxLength](discordeno_gateway.InputTextComponent.md#maxlength)
- [minLength](discordeno_gateway.InputTextComponent.md#minlength)
- [placeholder](discordeno_gateway.InputTextComponent.md#placeholder)
- [required](discordeno_gateway.InputTextComponent.md#required)
- [style](discordeno_gateway.InputTextComponent.md#style)
- [type](discordeno_gateway.InputTextComponent.md#type)
- [value](discordeno_gateway.InputTextComponent.md#value)

## Properties

### customId

• **customId**: `string`

The customId of the InputText

#### Defined in

packages/types/dist/discordeno.d.ts:137

---

### label

• **label**: `string`

The label of the InputText. Maximum 45 characters

#### Defined in

packages/types/dist/discordeno.d.ts:139

---

### maxLength

• `Optional` **maxLength**: `number`

The maximum length of the text the user has to provide

#### Defined in

packages/types/dist/discordeno.d.ts:145

---

### minLength

• `Optional` **minLength**: `number`

The minimum length of the text the user has to provide

#### Defined in

packages/types/dist/discordeno.d.ts:143

---

### placeholder

• `Optional` **placeholder**: `string`

The placeholder of the InputText

#### Defined in

packages/types/dist/discordeno.d.ts:141

---

### required

• `Optional` **required**: `boolean`

Whether or not this input is required.

#### Defined in

packages/types/dist/discordeno.d.ts:147

---

### style

• **style**: `TextStyles`

The style of the InputText

#### Defined in

packages/types/dist/discordeno.d.ts:135

---

### type

• **type**: `InputText`

InputText Component is of type 4

#### Defined in

packages/types/dist/discordeno.d.ts:133

---

### value

• `Optional` **value**: `string`

Pre-filled value for input text.

#### Defined in

packages/types/dist/discordeno.d.ts:149
