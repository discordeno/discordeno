[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordGuildPreview

# Interface: DiscordGuildPreview

[@discordeno/types](../modules/discordeno_types.md).DiscordGuildPreview

https://discord.com/developers/docs/resources/guild#guild-preview-object

## Table of contents

### Properties

- [approximate_member_count](discordeno_types.DiscordGuildPreview.md#approximate_member_count)
- [approximate_presence_count](discordeno_types.DiscordGuildPreview.md#approximate_presence_count)
- [description](discordeno_types.DiscordGuildPreview.md#description)
- [discovery_splash](discordeno_types.DiscordGuildPreview.md#discovery_splash)
- [emojis](discordeno_types.DiscordGuildPreview.md#emojis)
- [features](discordeno_types.DiscordGuildPreview.md#features)
- [icon](discordeno_types.DiscordGuildPreview.md#icon)
- [id](discordeno_types.DiscordGuildPreview.md#id)
- [name](discordeno_types.DiscordGuildPreview.md#name)
- [splash](discordeno_types.DiscordGuildPreview.md#splash)
- [stickers](discordeno_types.DiscordGuildPreview.md#stickers)

## Properties

### approximate_member_count

• **approximate_member_count**: `number`

Approximate number of members in this guild

#### Defined in

[packages/types/src/discord.ts:1989](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1989)

---

### approximate_presence_count

• **approximate_presence_count**: `number`

Approximate number of online members in this guild

#### Defined in

[packages/types/src/discord.ts:1991](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1991)

---

### description

• **description**: `null` \| `string`

The description for the guild, if the guild is discoverable

#### Defined in

[packages/types/src/discord.ts:1993](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1993)

---

### discovery_splash

• **discovery_splash**: `null` \| `string`

Discovery splash hash

#### Defined in

[packages/types/src/discord.ts:1983](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1983)

---

### emojis

• **emojis**: [`DiscordEmoji`](discordeno_types.DiscordEmoji.md)[]

Custom guild emojis

#### Defined in

[packages/types/src/discord.ts:1985](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1985)

---

### features

• **features**: [`GuildFeatures`](../enums/discordeno_types.GuildFeatures.md)[]

Enabled guild features

#### Defined in

[packages/types/src/discord.ts:1987](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1987)

---

### icon

• **icon**: `null` \| `string`

Icon hash

#### Defined in

[packages/types/src/discord.ts:1979](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1979)

---

### id

• **id**: `string`

Guild id

#### Defined in

[packages/types/src/discord.ts:1975](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1975)

---

### name

• **name**: `string`

Guild name (2-100 characters)

#### Defined in

[packages/types/src/discord.ts:1977](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1977)

---

### splash

• **splash**: `null` \| `string`

Splash hash

#### Defined in

[packages/types/src/discord.ts:1981](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1981)

---

### stickers

• **stickers**: [`DiscordSticker`](discordeno_types.DiscordSticker.md)[]

Custom guild stickers

#### Defined in

[packages/types/src/discord.ts:1995](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1995)
