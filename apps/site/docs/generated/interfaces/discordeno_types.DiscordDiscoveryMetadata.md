[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordDiscoveryMetadata

# Interface: DiscordDiscoveryMetadata

[@discordeno/types](../modules/discordeno_types.md).DiscordDiscoveryMetadata

## Table of contents

### Properties

- [category_ids](discordeno_types.DiscordDiscoveryMetadata.md#category_ids)
- [emoji_discoverability_enabled](discordeno_types.DiscordDiscoveryMetadata.md#emoji_discoverability_enabled)
- [guild_id](discordeno_types.DiscordDiscoveryMetadata.md#guild_id)
- [keywords](discordeno_types.DiscordDiscoveryMetadata.md#keywords)
- [partner_actioned_timestamp](discordeno_types.DiscordDiscoveryMetadata.md#partner_actioned_timestamp)
- [partner_application_timestamp](discordeno_types.DiscordDiscoveryMetadata.md#partner_application_timestamp)
- [primary_category_id](discordeno_types.DiscordDiscoveryMetadata.md#primary_category_id)

## Properties

### category_ids

• **category_ids**: `number`[]

Ids of up to 5 discovery subcategories set for this guild

#### Defined in

[packages/types/src/discord.ts:2028](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2028)

---

### emoji_discoverability_enabled

• **emoji_discoverability_enabled**: `boolean`

Whether guild info is shown when custom emojis from this guild are clicked

#### Defined in

[packages/types/src/discord.ts:2022](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2022)

---

### guild_id

• **guild_id**: `string`

The guild Id

#### Defined in

[packages/types/src/discord.ts:2016](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2016)

---

### keywords

• **keywords**: `null` \| `string`[]

Up to 10 discovery search keywords set for this guild

#### Defined in

[packages/types/src/discord.ts:2020](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2020)

---

### partner_actioned_timestamp

• **partner_actioned_timestamp**: `null` \| `string`

When the server's partner application was accepted or denied, for applications via Server Settings

#### Defined in

[packages/types/src/discord.ts:2024](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2024)

---

### partner_application_timestamp

• **partner_application_timestamp**: `null` \| `string`

When the server applied for partnership, if it has a pending application

#### Defined in

[packages/types/src/discord.ts:2026](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2026)

---

### primary_category_id

• **primary_category_id**: `number`

The id of the primary discovery category set for this guild

#### Defined in

[packages/types/src/discord.ts:2018](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2018)
