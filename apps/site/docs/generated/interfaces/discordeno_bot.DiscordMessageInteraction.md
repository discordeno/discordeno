[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordMessageInteraction

# Interface: DiscordMessageInteraction

[@discordeno/bot](../modules/discordeno_bot.md).DiscordMessageInteraction

https://discord.com/developers/docs/interactions/receiving-and-responding#message-interaction-object-message-interaction-structure

## Table of contents

### Properties

- [id](discordeno_bot.DiscordMessageInteraction.md#id)
- [member](discordeno_bot.DiscordMessageInteraction.md#member)
- [name](discordeno_bot.DiscordMessageInteraction.md#name)
- [type](discordeno_bot.DiscordMessageInteraction.md#type)
- [user](discordeno_bot.DiscordMessageInteraction.md#user)

## Properties

### id

• **id**: `string`

Id of the interaction

#### Defined in

packages/types/dist/discord.d.ts:1022

---

### member

• `Optional` **member**: `Partial`<[`DiscordMember`](discordeno_bot.DiscordMember.md)\>

The member who invoked the interaction in the guild

#### Defined in

packages/types/dist/discord.d.ts:1030

---

### name

• **name**: `string`

The name of the ApplicationCommand including the name of the subcommand/subcommand group

#### Defined in

packages/types/dist/discord.d.ts:1026

---

### type

• **type**: [`InteractionTypes`](../enums/discordeno_bot.InteractionTypes.md)

The type of interaction

#### Defined in

packages/types/dist/discord.d.ts:1024

---

### user

• **user**: [`DiscordUser`](discordeno_bot.DiscordUser.md)

The user who invoked the interaction

#### Defined in

packages/types/dist/discord.d.ts:1028
