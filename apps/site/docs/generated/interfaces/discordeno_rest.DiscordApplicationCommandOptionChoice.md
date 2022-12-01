[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/rest](../modules/discordeno_rest.md) / DiscordApplicationCommandOptionChoice

# Interface: DiscordApplicationCommandOptionChoice

[@discordeno/rest](../modules/discordeno_rest.md).DiscordApplicationCommandOptionChoice

https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-choice-structure

## Table of contents

### Properties

- [name](discordeno_rest.DiscordApplicationCommandOptionChoice.md#name)
- [name_localizations](discordeno_rest.DiscordApplicationCommandOptionChoice.md#name_localizations)
- [value](discordeno_rest.DiscordApplicationCommandOptionChoice.md#value)

## Properties

### name

• **name**: `string`

1-100 character choice name

#### Defined in

packages/types/dist/discord.d.ts:1673

---

### name_localizations

• `Optional` **name_localizations**: `null` \| `Partial`<`Record`<[`Locales`](../enums/discordeno_rest.Locales.md), `string`\>\>

Localization object for the `name` field. Values follow the same restrictions as `name`

#### Defined in

packages/types/dist/discord.d.ts:1675

---

### value

• **value**: `string` \| `number`

Value for the choice, up to 100 characters if string

#### Defined in

packages/types/dist/discord.d.ts:1677
