[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / GuildWidget

# Interface: GuildWidget

[@discordeno/bot](../modules/discordeno_bot.md).GuildWidget

## Hierarchy

- `ReturnType`<typeof `transformWidget`\>

  ↳ **`GuildWidget`**

## Table of contents

### Properties

- [channels](discordeno_bot.GuildWidget.md#channels)
- [id](discordeno_bot.GuildWidget.md#id)
- [instant_invite](discordeno_bot.GuildWidget.md#instant_invite)
- [members](discordeno_bot.GuildWidget.md#members)
- [name](discordeno_bot.GuildWidget.md#name)
- [presenceCount](discordeno_bot.GuildWidget.md#presencecount)

## Properties

### channels

• **channels**: { `id`: `bigint` ; `name`: `string` = channel.name; `position`: `number` = channel.position }[]

#### Inherited from

ReturnType.channels

---

### id

• **id**: `bigint`

#### Inherited from

ReturnType.id

---

### instant_invite

• **instant_invite**: `string`

#### Inherited from

ReturnType.instant_invite

---

### members

• **members**: { `avatar`: `undefined` \| `bigint` ; `avatarUrl`: `string` = member.avatar_url; `discriminator`: `string` = member.discriminator; `id`: `bigint` ; `status`: `string` = member.status; `username`: `string` = member.username }[]

#### Inherited from

ReturnType.members

---

### name

• **name**: `string`

#### Inherited from

ReturnType.name

---

### presenceCount

• **presenceCount**: `number`

#### Inherited from

ReturnType.presenceCount
