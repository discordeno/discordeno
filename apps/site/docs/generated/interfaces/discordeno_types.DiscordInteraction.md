[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordInteraction

# Interface: DiscordInteraction

[@discordeno/types](../modules/discordeno_types.md).DiscordInteraction

## Table of contents

### Properties

- [app_permissions](discordeno_types.DiscordInteraction.md#app_permissions)
- [application_id](discordeno_types.DiscordInteraction.md#application_id)
- [channel_id](discordeno_types.DiscordInteraction.md#channel_id)
- [data](discordeno_types.DiscordInteraction.md#data)
- [guild_id](discordeno_types.DiscordInteraction.md#guild_id)
- [guild_locale](discordeno_types.DiscordInteraction.md#guild_locale)
- [id](discordeno_types.DiscordInteraction.md#id)
- [locale](discordeno_types.DiscordInteraction.md#locale)
- [member](discordeno_types.DiscordInteraction.md#member)
- [message](discordeno_types.DiscordInteraction.md#message)
- [token](discordeno_types.DiscordInteraction.md#token)
- [type](discordeno_types.DiscordInteraction.md#type)
- [user](discordeno_types.DiscordInteraction.md#user)
- [version](discordeno_types.DiscordInteraction.md#version)

## Properties

### app_permissions

• **app_permissions**: `string`

The computed permissions for a bot or app in the context of a specific interaction (including channel overwrites)

#### Defined in

[packages/types/src/discord.ts:1326](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1326)

---

### application_id

• **application_id**: `string`

Id of the application this interaction is for

#### Defined in

[packages/types/src/discord.ts:1302](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1302)

---

### channel_id

• `Optional` **channel_id**: `string`

The channel it was sent from

#### Defined in

[packages/types/src/discord.ts:1308](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1308)

---

### data

• `Optional` **data**: [`DiscordInteractionData`](discordeno_types.DiscordInteractionData.md)

the command data payload

#### Defined in

[packages/types/src/discord.ts:1320](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1320)

---

### guild_id

• `Optional` **guild_id**: `string`

The guild it was sent from

#### Defined in

[packages/types/src/discord.ts:1306](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1306)

---

### guild_locale

• `Optional` **guild_locale**: `string`

The guild's preferred locale, if invoked in a guild

#### Defined in

[packages/types/src/discord.ts:1324](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1324)

---

### id

• **id**: `string`

Id of the interaction

#### Defined in

[packages/types/src/discord.ts:1300](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1300)

---

### locale

• `Optional` **locale**: `string`

The selected language of the invoking user

#### Defined in

[packages/types/src/discord.ts:1322](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1322)

---

### member

• `Optional` **member**: [`DiscordInteractionMember`](discordeno_types.DiscordInteractionMember.md)

Guild member data for the invoking user, including permissions

#### Defined in

[packages/types/src/discord.ts:1310](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1310)

---

### message

• `Optional` **message**: [`DiscordMessage`](discordeno_types.DiscordMessage.md)

For the message the button was attached to

#### Defined in

[packages/types/src/discord.ts:1318](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1318)

---

### token

• **token**: `string`

A continuation token for responding to the interaction

#### Defined in

[packages/types/src/discord.ts:1314](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1314)

---

### type

• **type**: [`InteractionTypes`](../enums/discordeno_types.InteractionTypes.md)

The type of interaction

#### Defined in

[packages/types/src/discord.ts:1304](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1304)

---

### user

• `Optional` **user**: [`DiscordUser`](discordeno_types.DiscordUser.md)

User object for the invoking user, if invoked in a DM

#### Defined in

[packages/types/src/discord.ts:1312](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1312)

---

### version

• **version**: `1`

Read-only property, always `1`

#### Defined in

[packages/types/src/discord.ts:1316](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1316)
