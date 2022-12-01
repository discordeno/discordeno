[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / DiscordInteraction

# Interface: DiscordInteraction

[@discordeno/gateway](../modules/discordeno_gateway.md).DiscordInteraction

## Table of contents

### Properties

- [app_permissions](discordeno_gateway.DiscordInteraction.md#app_permissions)
- [application_id](discordeno_gateway.DiscordInteraction.md#application_id)
- [channel_id](discordeno_gateway.DiscordInteraction.md#channel_id)
- [data](discordeno_gateway.DiscordInteraction.md#data)
- [guild_id](discordeno_gateway.DiscordInteraction.md#guild_id)
- [guild_locale](discordeno_gateway.DiscordInteraction.md#guild_locale)
- [id](discordeno_gateway.DiscordInteraction.md#id)
- [locale](discordeno_gateway.DiscordInteraction.md#locale)
- [member](discordeno_gateway.DiscordInteraction.md#member)
- [message](discordeno_gateway.DiscordInteraction.md#message)
- [token](discordeno_gateway.DiscordInteraction.md#token)
- [type](discordeno_gateway.DiscordInteraction.md#type)
- [user](discordeno_gateway.DiscordInteraction.md#user)
- [version](discordeno_gateway.DiscordInteraction.md#version)

## Properties

### app_permissions

• **app_permissions**: `string`

The computed permissions for a bot or app in the context of a specific interaction (including channel overwrites)

#### Defined in

packages/types/dist/discord.d.ts:1177

---

### application_id

• **application_id**: `string`

Id of the application this interaction is for

#### Defined in

packages/types/dist/discord.d.ts:1153

---

### channel_id

• `Optional` **channel_id**: `string`

The channel it was sent from

#### Defined in

packages/types/dist/discord.d.ts:1159

---

### data

• `Optional` **data**: [`DiscordInteractionData`](discordeno_gateway.DiscordInteractionData.md)

the command data payload

#### Defined in

packages/types/dist/discord.d.ts:1171

---

### guild_id

• `Optional` **guild_id**: `string`

The guild it was sent from

#### Defined in

packages/types/dist/discord.d.ts:1157

---

### guild_locale

• `Optional` **guild_locale**: `string`

The guild's preferred locale, if invoked in a guild

#### Defined in

packages/types/dist/discord.d.ts:1175

---

### id

• **id**: `string`

Id of the interaction

#### Defined in

packages/types/dist/discord.d.ts:1151

---

### locale

• `Optional` **locale**: `string`

The selected language of the invoking user

#### Defined in

packages/types/dist/discord.d.ts:1173

---

### member

• `Optional` **member**: [`DiscordInteractionMember`](discordeno_gateway.DiscordInteractionMember.md)

Guild member data for the invoking user, including permissions

#### Defined in

packages/types/dist/discord.d.ts:1161

---

### message

• `Optional` **message**: [`DiscordMessage`](discordeno_gateway.DiscordMessage.md)

For the message the button was attached to

#### Defined in

packages/types/dist/discord.d.ts:1169

---

### token

• **token**: `string`

A continuation token for responding to the interaction

#### Defined in

packages/types/dist/discord.d.ts:1165

---

### type

• **type**: [`InteractionTypes`](../enums/discordeno_gateway.InteractionTypes.md)

The type of interaction

#### Defined in

packages/types/dist/discord.d.ts:1155

---

### user

• `Optional` **user**: [`DiscordUser`](discordeno_gateway.DiscordUser.md)

User object for the invoking user, if invoked in a DM

#### Defined in

packages/types/dist/discord.d.ts:1163

---

### version

• **version**: `1`

Read-only property, always `1`

#### Defined in

packages/types/dist/discord.d.ts:1167
