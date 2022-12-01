[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / ApplicationCommandOption

# Interface: ApplicationCommandOption

[@discordeno/bot](../modules/discordeno_bot.md).ApplicationCommandOption

## Table of contents

### Properties

- [autocomplete](discordeno_bot.ApplicationCommandOption.md#autocomplete)
- [channelTypes](discordeno_bot.ApplicationCommandOption.md#channeltypes)
- [choices](discordeno_bot.ApplicationCommandOption.md#choices)
- [description](discordeno_bot.ApplicationCommandOption.md#description)
- [descriptionLocalizations](discordeno_bot.ApplicationCommandOption.md#descriptionlocalizations)
- [maxLength](discordeno_bot.ApplicationCommandOption.md#maxlength)
- [maxValue](discordeno_bot.ApplicationCommandOption.md#maxvalue)
- [minLength](discordeno_bot.ApplicationCommandOption.md#minlength)
- [minValue](discordeno_bot.ApplicationCommandOption.md#minvalue)
- [name](discordeno_bot.ApplicationCommandOption.md#name)
- [nameLocalizations](discordeno_bot.ApplicationCommandOption.md#namelocalizations)
- [options](discordeno_bot.ApplicationCommandOption.md#options)
- [required](discordeno_bot.ApplicationCommandOption.md#required)
- [type](discordeno_bot.ApplicationCommandOption.md#type)

## Properties

### autocomplete

• `Optional` **autocomplete**: `boolean`

if autocomplete interactions are enabled for this `String`, `Integer`, or `Number` type option

#### Defined in

[packages/bot/src/transformers/applicationCommandOption.ts:57](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/applicationCommandOption.ts#L57)

---

### channelTypes

• `Optional` **channelTypes**: [`ChannelTypes`](../enums/discordeno_bot.ChannelTypes.md)[]

If the option is a channel type, the channels shown will be restricted to these types

#### Defined in

[packages/bot/src/transformers/applicationCommandOption.ts:47](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/applicationCommandOption.ts#L47)

---

### choices

• `Optional` **choices**: [`ApplicationCommandOptionChoice`](discordeno_bot.ApplicationCommandOptionChoice.md)[]

Choices for `string` and `int` types for the user to pick from

#### Defined in

[packages/bot/src/transformers/applicationCommandOption.ts:43](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/applicationCommandOption.ts#L43)

---

### description

• **description**: `string`

1-100 character description

#### Defined in

[packages/bot/src/transformers/applicationCommandOption.ts:37](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/applicationCommandOption.ts#L37)

---

### descriptionLocalizations

• `Optional` **descriptionLocalizations**: `Partial`<`Record`<[`Locales`](../enums/discordeno_bot.Locales.md), `string`\>\>

Localization object for the `description` field. Values follow the same restrictions as `description`

#### Defined in

[packages/bot/src/transformers/applicationCommandOption.ts:39](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/applicationCommandOption.ts#L39)

---

### maxLength

• `Optional` **maxLength**: `number`

Maximum length desired.

#### Defined in

[packages/bot/src/transformers/applicationCommandOption.ts:55](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/applicationCommandOption.ts#L55)

---

### maxValue

• `Optional` **maxValue**: `number`

Maximum number desired.

#### Defined in

[packages/bot/src/transformers/applicationCommandOption.ts:51](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/applicationCommandOption.ts#L51)

---

### minLength

• `Optional` **minLength**: `number`

Minimum length desired.

#### Defined in

[packages/bot/src/transformers/applicationCommandOption.ts:53](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/applicationCommandOption.ts#L53)

---

### minValue

• `Optional` **minValue**: `number`

Minimum number desired.

#### Defined in

[packages/bot/src/transformers/applicationCommandOption.ts:49](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/applicationCommandOption.ts#L49)

---

### name

• **name**: `string`

1-32 character name matching lowercase `^[\w-]{1,32}$`

#### Defined in

[packages/bot/src/transformers/applicationCommandOption.ts:33](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/applicationCommandOption.ts#L33)

---

### nameLocalizations

• `Optional` **nameLocalizations**: `Partial`<`Record`<[`Locales`](../enums/discordeno_bot.Locales.md), `string`\>\>

Localization object for the `name` field. Values follow the same restrictions as `name`

#### Defined in

[packages/bot/src/transformers/applicationCommandOption.ts:35](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/applicationCommandOption.ts#L35)

---

### options

• `Optional` **options**: [`ApplicationCommandOption`](discordeno_bot.ApplicationCommandOption.md)[]

If the option is a subcommand or subcommand group type, this nested options will be the parameters

#### Defined in

[packages/bot/src/transformers/applicationCommandOption.ts:45](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/applicationCommandOption.ts#L45)

---

### required

• `Optional` **required**: `boolean`

If the parameter is required or optional--default `false`

#### Defined in

[packages/bot/src/transformers/applicationCommandOption.ts:41](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/applicationCommandOption.ts#L41)

---

### type

• **type**: [`ApplicationCommandOptionTypes`](../enums/discordeno_bot.ApplicationCommandOptionTypes.md)

Value of Application Command Option Type

#### Defined in

[packages/bot/src/transformers/applicationCommandOption.ts:31](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/applicationCommandOption.ts#L31)
