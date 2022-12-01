[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordMessageInteraction

# Interface: DiscordMessageInteraction

[@discordeno/types](../modules/discordeno_types.md).DiscordMessageInteraction

https://discord.com/developers/docs/interactions/receiving-and-responding#message-interaction-object-message-interaction-structure

## Table of contents

### Properties

- [id](discordeno_types.DiscordMessageInteraction.md#id)
- [member](discordeno_types.DiscordMessageInteraction.md#member)
- [name](discordeno_types.DiscordMessageInteraction.md#name)
- [type](discordeno_types.DiscordMessageInteraction.md#type)
- [user](discordeno_types.DiscordMessageInteraction.md#user)

## Properties

### id

• **id**: `string`

Id of the interaction

#### Defined in

[packages/types/src/discord.ts:1157](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1157)

---

### member

• `Optional` **member**: `Partial`<[`DiscordMember`](discordeno_types.DiscordMember.md)\>

The member who invoked the interaction in the guild

#### Defined in

[packages/types/src/discord.ts:1165](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1165)

---

### name

• **name**: `string`

The name of the ApplicationCommand including the name of the subcommand/subcommand group

#### Defined in

[packages/types/src/discord.ts:1161](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1161)

---

### type

• **type**: [`InteractionTypes`](../enums/discordeno_types.InteractionTypes.md)

The type of interaction

#### Defined in

[packages/types/src/discord.ts:1159](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1159)

---

### user

• **user**: [`DiscordUser`](discordeno_types.DiscordUser.md)

The user who invoked the interaction

#### Defined in

[packages/types/src/discord.ts:1163](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1163)
