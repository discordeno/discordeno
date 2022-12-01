[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordInteraction

# Interface: DiscordInteraction

[@discordeno/bot](../modules/discordeno_bot.md).DiscordInteraction

## Table of contents

### Properties

- [app_permissions](discordeno_bot.DiscordInteraction.md#app_permissions)
- [application_id](discordeno_bot.DiscordInteraction.md#application_id)
- [channel_id](discordeno_bot.DiscordInteraction.md#channel_id)
- [data](discordeno_bot.DiscordInteraction.md#data)
- [guild_id](discordeno_bot.DiscordInteraction.md#guild_id)
- [guild_locale](discordeno_bot.DiscordInteraction.md#guild_locale)
- [id](discordeno_bot.DiscordInteraction.md#id)
- [locale](discordeno_bot.DiscordInteraction.md#locale)
- [member](discordeno_bot.DiscordInteraction.md#member)
- [message](discordeno_bot.DiscordInteraction.md#message)
- [token](discordeno_bot.DiscordInteraction.md#token)
- [type](discordeno_bot.DiscordInteraction.md#type)
- [user](discordeno_bot.DiscordInteraction.md#user)
- [version](discordeno_bot.DiscordInteraction.md#version)

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

• `Optional` **data**: [`DiscordInteractionData`](discordeno_bot.DiscordInteractionData.md)

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

• `Optional` **member**: [`DiscordInteractionMember`](discordeno_bot.DiscordInteractionMember.md)

Guild member data for the invoking user, including permissions

#### Defined in

packages/types/dist/discord.d.ts:1161

---

### message

• `Optional` **message**: [`DiscordMessage`](discordeno_bot.DiscordMessage.md)

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

• **type**: [`InteractionTypes`](../enums/discordeno_bot.InteractionTypes.md)

The type of interaction

#### Defined in

packages/types/dist/discord.d.ts:1155

---

### user

• `Optional` **user**: [`DiscordUser`](discordeno_bot.DiscordUser.md)

User object for the invoking user, if invoked in a DM

#### Defined in

packages/types/dist/discord.d.ts:1163

---

### version

• **version**: `1`

Read-only property, always `1`

#### Defined in

packages/types/dist/discord.d.ts:1167
