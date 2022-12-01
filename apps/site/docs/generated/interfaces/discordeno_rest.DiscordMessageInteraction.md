[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/rest](../modules/discordeno_rest.md) / DiscordMessageInteraction

# Interface: DiscordMessageInteraction

[@discordeno/rest](../modules/discordeno_rest.md).DiscordMessageInteraction

https://discord.com/developers/docs/interactions/receiving-and-responding#message-interaction-object-message-interaction-structure

## Table of contents

### Properties

- [id](discordeno_rest.DiscordMessageInteraction.md#id)
- [member](discordeno_rest.DiscordMessageInteraction.md#member)
- [name](discordeno_rest.DiscordMessageInteraction.md#name)
- [type](discordeno_rest.DiscordMessageInteraction.md#type)
- [user](discordeno_rest.DiscordMessageInteraction.md#user)

## Properties

### id

• **id**: `string`

Id of the interaction

#### Defined in

packages/types/dist/discord.d.ts:1022

---

### member

• `Optional` **member**: `Partial`<[`DiscordMember`](discordeno_rest.DiscordMember.md)\>

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

• **type**: [`InteractionTypes`](../enums/discordeno_rest.InteractionTypes.md)

The type of interaction

#### Defined in

packages/types/dist/discord.d.ts:1024

---

### user

• **user**: [`DiscordUser`](discordeno_rest.DiscordUser.md)

The user who invoked the interaction

#### Defined in

packages/types/dist/discord.d.ts:1028
