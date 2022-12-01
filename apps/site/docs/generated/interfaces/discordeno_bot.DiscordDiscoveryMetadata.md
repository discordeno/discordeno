[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordDiscoveryMetadata

# Interface: DiscordDiscoveryMetadata

[@discordeno/bot](../modules/discordeno_bot.md).DiscordDiscoveryMetadata

## Table of contents

### Properties

- [category_ids](discordeno_bot.DiscordDiscoveryMetadata.md#category_ids)
- [emoji_discoverability_enabled](discordeno_bot.DiscordDiscoveryMetadata.md#emoji_discoverability_enabled)
- [guild_id](discordeno_bot.DiscordDiscoveryMetadata.md#guild_id)
- [keywords](discordeno_bot.DiscordDiscoveryMetadata.md#keywords)
- [partner_actioned_timestamp](discordeno_bot.DiscordDiscoveryMetadata.md#partner_actioned_timestamp)
- [partner_application_timestamp](discordeno_bot.DiscordDiscoveryMetadata.md#partner_application_timestamp)
- [primary_category_id](discordeno_bot.DiscordDiscoveryMetadata.md#primary_category_id)

## Properties

### category_ids

• **category_ids**: `number`[]

Ids of up to 5 discovery subcategories set for this guild

#### Defined in

packages/types/dist/discord.d.ts:1772

---

### emoji_discoverability_enabled

• **emoji_discoverability_enabled**: `boolean`

Whether guild info is shown when custom emojis from this guild are clicked

#### Defined in

packages/types/dist/discord.d.ts:1766

---

### guild_id

• **guild_id**: `string`

The guild Id

#### Defined in

packages/types/dist/discord.d.ts:1760

---

### keywords

• **keywords**: `null` \| `string`[]

Up to 10 discovery search keywords set for this guild

#### Defined in

packages/types/dist/discord.d.ts:1764

---

### partner_actioned_timestamp

• **partner_actioned_timestamp**: `null` \| `string`

When the server's partner application was accepted or denied, for applications via Server Settings

#### Defined in

packages/types/dist/discord.d.ts:1768

---

### partner_application_timestamp

• **partner_application_timestamp**: `null` \| `string`

When the server applied for partnership, if it has a pending application

#### Defined in

packages/types/dist/discord.d.ts:1770

---

### primary_category_id

• **primary_category_id**: `number`

The id of the primary discovery category set for this guild

#### Defined in

packages/types/dist/discord.d.ts:1762
