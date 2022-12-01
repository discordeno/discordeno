[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordTemplate

# Interface: DiscordTemplate

[@discordeno/types](../modules/discordeno_types.md).DiscordTemplate

https://discord.com/developers/docs/resources/template#template-object-template-structure

## Table of contents

### Properties

- [code](discordeno_types.DiscordTemplate.md#code)
- [created_at](discordeno_types.DiscordTemplate.md#created_at)
- [creator](discordeno_types.DiscordTemplate.md#creator)
- [creator_id](discordeno_types.DiscordTemplate.md#creator_id)
- [description](discordeno_types.DiscordTemplate.md#description)
- [is_dirty](discordeno_types.DiscordTemplate.md#is_dirty)
- [name](discordeno_types.DiscordTemplate.md#name)
- [serialized_source_guild](discordeno_types.DiscordTemplate.md#serialized_source_guild)
- [source_guild_id](discordeno_types.DiscordTemplate.md#source_guild_id)
- [updated_at](discordeno_types.DiscordTemplate.md#updated_at)
- [usage_count](discordeno_types.DiscordTemplate.md#usage_count)

## Properties

### code

• **code**: `string`

The template code (unique Id)

#### Defined in

[packages/types/src/discord.ts:2234](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2234)

---

### created_at

• **created_at**: `string`

When this template was created

#### Defined in

[packages/types/src/discord.ts:2246](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2246)

---

### creator

• **creator**: [`DiscordUser`](discordeno_types.DiscordUser.md)

The user who created the template

#### Defined in

[packages/types/src/discord.ts:2244](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2244)

---

### creator_id

• **creator_id**: `string`

The Id of the user who created the template

#### Defined in

[packages/types/src/discord.ts:2242](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2242)

---

### description

• **description**: `null` \| `string`

The description for the template

#### Defined in

[packages/types/src/discord.ts:2238](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2238)

---

### is_dirty

• **is_dirty**: `null` \| `boolean`

Whether the template has un-synced changes

#### Defined in

[packages/types/src/discord.ts:2281](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2281)

---

### name

• **name**: `string`

Template name

#### Defined in

[packages/types/src/discord.ts:2236](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2236)

---

### serialized_source_guild

• **serialized_source_guild**: `Omit`<[`PickPartial`](../modules/discordeno_types.md#pickpartial)<[`DiscordGuild`](discordeno_types.DiscordGuild.md), `"name"` \| `"description"` \| `"preferred_locale"` \| `"afk_channel_id"` \| `"system_channel_id"` \| `"afk_timeout"` \| `"verification_level"` \| `"explicit_content_filter"` \| `"default_message_notifications"` \| `"system_channel_flags"` \| `"channels"`\>, `"roles"`\> & { `roles`: `Omit`<[`PickPartial`](../modules/discordeno_types.md#pickpartial)<[`DiscordRole`](discordeno_types.DiscordRole.md), `"name"` \| `"permissions"` \| `"color"` \| `"hoist"` \| `"mentionable"` \| `"icon"` \| `"unicode_emoji"`\>, `"id"`\> & { `id`: `number` }[] }

The guild snapshot this template contains

#### Defined in

[packages/types/src/discord.ts:2252](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2252)

---

### source_guild_id

• **source_guild_id**: `string`

The Id of the guild this template is based on

#### Defined in

[packages/types/src/discord.ts:2250](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2250)

---

### updated_at

• **updated_at**: `string`

When this template was last synced to the source guild

#### Defined in

[packages/types/src/discord.ts:2248](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2248)

---

### usage_count

• **usage_count**: `number`

Number of times this template has been used

#### Defined in

[packages/types/src/discord.ts:2240](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2240)
