[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordTemplate

# Interface: DiscordTemplate

[@discordeno/bot](../modules/discordeno_bot.md).DiscordTemplate

https://discord.com/developers/docs/resources/template#template-object-template-structure

## Table of contents

### Properties

- [code](discordeno_bot.DiscordTemplate.md#code)
- [created_at](discordeno_bot.DiscordTemplate.md#created_at)
- [creator](discordeno_bot.DiscordTemplate.md#creator)
- [creator_id](discordeno_bot.DiscordTemplate.md#creator_id)
- [description](discordeno_bot.DiscordTemplate.md#description)
- [is_dirty](discordeno_bot.DiscordTemplate.md#is_dirty)
- [name](discordeno_bot.DiscordTemplate.md#name)
- [serialized_source_guild](discordeno_bot.DiscordTemplate.md#serialized_source_guild)
- [source_guild_id](discordeno_bot.DiscordTemplate.md#source_guild_id)
- [updated_at](discordeno_bot.DiscordTemplate.md#updated_at)
- [usage_count](discordeno_bot.DiscordTemplate.md#usage_count)

## Properties

### code

• **code**: `string`

The template code (unique Id)

#### Defined in

packages/types/dist/discord.d.ts:1964

---

### created_at

• **created_at**: `string`

When this template was created

#### Defined in

packages/types/dist/discord.d.ts:1976

---

### creator

• **creator**: [`DiscordUser`](discordeno_bot.DiscordUser.md)

The user who created the template

#### Defined in

packages/types/dist/discord.d.ts:1974

---

### creator_id

• **creator_id**: `string`

The Id of the user who created the template

#### Defined in

packages/types/dist/discord.d.ts:1972

---

### description

• **description**: `null` \| `string`

The description for the template

#### Defined in

packages/types/dist/discord.d.ts:1968

---

### is_dirty

• **is_dirty**: `null` \| `boolean`

Whether the template has un-synced changes

#### Defined in

packages/types/dist/discord.d.ts:1988

---

### name

• **name**: `string`

Template name

#### Defined in

packages/types/dist/discord.d.ts:1966

---

### serialized_source_guild

• **serialized_source_guild**: `Omit`<[`PickPartial`](../modules/discordeno_bot.md#pickpartial)<[`DiscordGuild`](discordeno_bot.DiscordGuild.md), `"name"` \| `"description"` \| `"preferred_locale"` \| `"afk_channel_id"` \| `"system_channel_id"` \| `"afk_timeout"` \| `"verification_level"` \| `"explicit_content_filter"` \| `"default_message_notifications"` \| `"channels"` \| `"system_channel_flags"`\>, `"roles"`\> & { `roles`: `Omit`<[`PickPartial`](../modules/discordeno_bot.md#pickpartial)<[`DiscordRole`](discordeno_bot.DiscordRole.md), `"name"` \| `"permissions"` \| `"icon"` \| `"color"` \| `"hoist"` \| `"mentionable"` \| `"unicode_emoji"`\>, `"id"`\> & { `id`: `number` }[] }

The guild snapshot this template contains

#### Defined in

packages/types/dist/discord.d.ts:1982

---

### source_guild_id

• **source_guild_id**: `string`

The Id of the guild this template is based on

#### Defined in

packages/types/dist/discord.d.ts:1980

---

### updated_at

• **updated_at**: `string`

When this template was last synced to the source guild

#### Defined in

packages/types/dist/discord.d.ts:1978

---

### usage_count

• **usage_count**: `number`

Number of times this template has been used

#### Defined in

packages/types/dist/discord.d.ts:1970
