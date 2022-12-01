[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / Emoji

# Interface: Emoji

[@discordeno/bot](../modules/discordeno_bot.md).Emoji

## Hierarchy

- `ReturnType`<typeof [`transformEmoji`](../modules/discordeno_bot.md#transformemoji)\>

  ↳ **`Emoji`**

## Table of contents

### Properties

- [id](discordeno_bot.Emoji.md#id)
- [name](discordeno_bot.Emoji.md#name)
- [roles](discordeno_bot.Emoji.md#roles)
- [toggles](discordeno_bot.Emoji.md#toggles)
- [user](discordeno_bot.Emoji.md#user)

## Properties

### id

• **id**: `undefined` \| `bigint`

#### Inherited from

ReturnType.id

---

### name

• **name**: `undefined` \| `string`

#### Inherited from

ReturnType.name

---

### roles

• **roles**: `undefined` \| `bigint`[]

#### Inherited from

ReturnType.roles

---

### toggles

• **toggles**: [`EmojiToggles`](../classes/discordeno_bot.EmojiToggles.md)

#### Inherited from

ReturnType.toggles

---

### user

• **user**: `undefined` \| { `avatar`: `undefined` \| `bigint` ; `discriminator`: `string` ; `email`: `undefined` \| `string` ; `flags`: `undefined` \| [`UserFlags`](../enums/discordeno_bot.UserFlags.md) ; `id`: `bigint` ; `locale`: `undefined` \| `string` ; `premiumType`: `undefined` \| [`PremiumTypes`](../enums/discordeno_bot.PremiumTypes.md) ; `publicFlags`: `undefined` \| [`UserFlags`](../enums/discordeno_bot.UserFlags.md) ; `toggles`: [`UserToggles`](../classes/discordeno_bot.UserToggles.md) ; `username`: `string` }

#### Inherited from

ReturnType.user
