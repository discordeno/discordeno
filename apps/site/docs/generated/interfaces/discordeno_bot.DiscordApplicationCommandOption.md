[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordApplicationCommandOption

# Interface: DiscordApplicationCommandOption

[@discordeno/bot](../modules/discordeno_bot.md).DiscordApplicationCommandOption

https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure

## Table of contents

### Properties

- [autocomplete](discordeno_bot.DiscordApplicationCommandOption.md#autocomplete)
- [channel_types](discordeno_bot.DiscordApplicationCommandOption.md#channel_types)
- [choices](discordeno_bot.DiscordApplicationCommandOption.md#choices)
- [description](discordeno_bot.DiscordApplicationCommandOption.md#description)
- [description_localizations](discordeno_bot.DiscordApplicationCommandOption.md#description_localizations)
- [max_length](discordeno_bot.DiscordApplicationCommandOption.md#max_length)
- [max_value](discordeno_bot.DiscordApplicationCommandOption.md#max_value)
- [min_length](discordeno_bot.DiscordApplicationCommandOption.md#min_length)
- [min_value](discordeno_bot.DiscordApplicationCommandOption.md#min_value)
- [name](discordeno_bot.DiscordApplicationCommandOption.md#name)
- [name_localizations](discordeno_bot.DiscordApplicationCommandOption.md#name_localizations)
- [options](discordeno_bot.DiscordApplicationCommandOption.md#options)
- [required](discordeno_bot.DiscordApplicationCommandOption.md#required)
- [type](discordeno_bot.DiscordApplicationCommandOption.md#type)

## Properties

### autocomplete

• `Optional` **autocomplete**: `boolean`

If autocomplete interactions are enabled for this option.

Only available for `ApplicationCommandOptionTypes.String`, `ApplicationCommandOptionTypes.Integer` and `ApplicationCommandOptionTypes.Number` option types

#### Defined in

packages/types/dist/discord.d.ts:1658

---

### channel_types

• `Optional` **channel_types**: [`ChannelTypes`](../enums/discordeno_bot.ChannelTypes.md)[]

If the option is a channel type, the channels shown will be restricted to these types

#### Defined in

packages/types/dist/discord.d.ts:1660

---

### choices

• `Optional` **choices**: [`DiscordApplicationCommandOptionChoice`](discordeno_bot.DiscordApplicationCommandOptionChoice.md)[]

Choices for the option types `ApplicationCommandOptionTypes.String`, `ApplicationCommandOptionTypes.Integer`, and `ApplicationCommandOptionTypes.Number`, from which the user can choose, max 25

#### Defined in

packages/types/dist/discord.d.ts:1650

---

### description

• **description**: `string`

1-100 character description

#### Defined in

packages/types/dist/discord.d.ts:1644

---

### description_localizations

• `Optional` **description_localizations**: `null` \| `Partial`<`Record`<[`Locales`](../enums/discordeno_bot.Locales.md), `string`\>\>

Localization object for the `description` field. Values follow the same restrictions as `description`

#### Defined in

packages/types/dist/discord.d.ts:1646

---

### max_length

• `Optional` **max_length**: `number`

If the option type is `ApplicationCommandOptionTypes.String`, the maximum permitted length

#### Defined in

packages/types/dist/discord.d.ts:1668

---

### max_value

• `Optional` **max_value**: `number`

If the option type is `ApplicationCommandOptionTypes.Integer` or `ApplicationCommandOptionTypes.Number`, the maximum permitted value

#### Defined in

packages/types/dist/discord.d.ts:1664

---

### min_length

• `Optional` **min_length**: `number`

If the option type is `ApplicationCommandOptionTypes.String`, the minimum permitted length

#### Defined in

packages/types/dist/discord.d.ts:1666

---

### min_value

• `Optional` **min_value**: `number`

If the option type is `ApplicationCommandOptionTypes.Integer` or `ApplicationCommandOptionTypes.Number`, the minimum permitted value

#### Defined in

packages/types/dist/discord.d.ts:1662

---

### name

• **name**: `string`

Name of command, 1-32 characters.
`ApplicationCommandTypes.ChatInput` command names must match the following regex `^[-_\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$` with the unicode flag set.
If there is a lowercase variant of any letters used, you must use those.
Characters with no lowercase variants and/or uncased letters are still allowed.
ApplicationCommandTypes.User`and`ApplicationCommandTypes.Message` commands may be mixed case and can include spaces.

#### Defined in

packages/types/dist/discord.d.ts:1640

---

### name_localizations

• `Optional` **name_localizations**: `null` \| `Partial`<`Record`<[`Locales`](../enums/discordeno_bot.Locales.md), `string`\>\>

Localization object for the `name` field. Values follow the same restrictions as `name`

#### Defined in

packages/types/dist/discord.d.ts:1642

---

### options

• `Optional` **options**: [`DiscordApplicationCommandOption`](discordeno_bot.DiscordApplicationCommandOption.md)[]

If the option is a subcommand or subcommand group type, these nested options will be the parameters

#### Defined in

packages/types/dist/discord.d.ts:1652

---

### required

• `Optional` **required**: `boolean`

If the parameter is required or optional--default `false`

#### Defined in

packages/types/dist/discord.d.ts:1648

---

### type

• **type**: [`ApplicationCommandOptionTypes`](../enums/discordeno_bot.ApplicationCommandOptionTypes.md)

Type of option

#### Defined in

packages/types/dist/discord.d.ts:1632
