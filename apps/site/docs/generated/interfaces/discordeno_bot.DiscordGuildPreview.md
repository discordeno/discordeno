[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordGuildPreview

# Interface: DiscordGuildPreview

[@discordeno/bot](../modules/discordeno_bot.md).DiscordGuildPreview

https://discord.com/developers/docs/resources/guild#guild-preview-object

## Table of contents

### Properties

- [approximate_member_count](discordeno_bot.DiscordGuildPreview.md#approximate_member_count)
- [approximate_presence_count](discordeno_bot.DiscordGuildPreview.md#approximate_presence_count)
- [description](discordeno_bot.DiscordGuildPreview.md#description)
- [discovery_splash](discordeno_bot.DiscordGuildPreview.md#discovery_splash)
- [emojis](discordeno_bot.DiscordGuildPreview.md#emojis)
- [features](discordeno_bot.DiscordGuildPreview.md#features)
- [icon](discordeno_bot.DiscordGuildPreview.md#icon)
- [id](discordeno_bot.DiscordGuildPreview.md#id)
- [name](discordeno_bot.DiscordGuildPreview.md#name)
- [splash](discordeno_bot.DiscordGuildPreview.md#splash)
- [stickers](discordeno_bot.DiscordGuildPreview.md#stickers)

## Properties

### approximate_member_count

• **approximate_member_count**: `number`

Approximate number of members in this guild

#### Defined in

packages/types/dist/discord.d.ts:1736

---

### approximate_presence_count

• **approximate_presence_count**: `number`

Approximate number of online members in this guild

#### Defined in

packages/types/dist/discord.d.ts:1738

---

### description

• **description**: `null` \| `string`

The description for the guild, if the guild is discoverable

#### Defined in

packages/types/dist/discord.d.ts:1740

---

### discovery_splash

• **discovery_splash**: `null` \| `string`

Discovery splash hash

#### Defined in

packages/types/dist/discord.d.ts:1730

---

### emojis

• **emojis**: [`DiscordEmoji`](discordeno_bot.DiscordEmoji.md)[]

Custom guild emojis

#### Defined in

packages/types/dist/discord.d.ts:1732

---

### features

• **features**: [`GuildFeatures`](../enums/discordeno_bot.GuildFeatures.md)[]

Enabled guild features

#### Defined in

packages/types/dist/discord.d.ts:1734

---

### icon

• **icon**: `null` \| `string`

Icon hash

#### Defined in

packages/types/dist/discord.d.ts:1726

---

### id

• **id**: `string`

Guild id

#### Defined in

packages/types/dist/discord.d.ts:1722

---

### name

• **name**: `string`

Guild name (2-100 characters)

#### Defined in

packages/types/dist/discord.d.ts:1724

---

### splash

• **splash**: `null` \| `string`

Splash hash

#### Defined in

packages/types/dist/discord.d.ts:1728

---

### stickers

• **stickers**: [`DiscordSticker`](discordeno_bot.DiscordSticker.md)[]

Custom guild stickers

#### Defined in

packages/types/dist/discord.d.ts:1742
