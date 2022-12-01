[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordApplicationCommandOptionChoice

# Interface: DiscordApplicationCommandOptionChoice

[@discordeno/types](../modules/discordeno_types.md).DiscordApplicationCommandOptionChoice

https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-choice-structure

## Table of contents

### Properties

- [name](discordeno_types.DiscordApplicationCommandOptionChoice.md#name)
- [name_localizations](discordeno_types.DiscordApplicationCommandOptionChoice.md#name_localizations)
- [value](discordeno_types.DiscordApplicationCommandOptionChoice.md#value)

## Properties

### name

• **name**: `string`

1-100 character choice name

#### Defined in

[packages/types/src/discord.ts:1922](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1922)

---

### name_localizations

• `Optional` **name_localizations**: `null` \| `Partial`<`Record`<[`Locales`](../enums/discordeno_types.Locales.md), `string`\>\>

Localization object for the `name` field. Values follow the same restrictions as `name`

#### Defined in

[packages/types/src/discord.ts:1924](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1924)

---

### value

• **value**: `string` \| `number`

Value for the choice, up to 100 characters if string

#### Defined in

[packages/types/src/discord.ts:1926](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1926)
