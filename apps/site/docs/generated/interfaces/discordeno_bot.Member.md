[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / Member

# Interface: Member

[@discordeno/bot](../modules/discordeno_bot.md).Member

## Hierarchy

- `ReturnType`<typeof [`transformMember`](../modules/discordeno_bot.md#transformmember)\>

  ↳ **`Member`**

## Table of contents

### Properties

- [avatar](discordeno_bot.Member.md#avatar)
- [communicationDisabledUntil](discordeno_bot.Member.md#communicationdisableduntil)
- [guildId](discordeno_bot.Member.md#guildid)
- [id](discordeno_bot.Member.md#id)
- [joinedAt](discordeno_bot.Member.md#joinedat)
- [nick](discordeno_bot.Member.md#nick)
- [permissions](discordeno_bot.Member.md#permissions)
- [premiumSince](discordeno_bot.Member.md#premiumsince)
- [roles](discordeno_bot.Member.md#roles)
- [toggles](discordeno_bot.Member.md#toggles)
- [user](discordeno_bot.Member.md#user)

## Properties

### avatar

• **avatar**: `undefined` \| `bigint`

#### Inherited from

ReturnType.avatar

---

### communicationDisabledUntil

• **communicationDisabledUntil**: `undefined` \| `number`

#### Inherited from

ReturnType.communicationDisabledUntil

---

### guildId

• **guildId**: `bigint`

#### Inherited from

ReturnType.guildId

---

### id

• **id**: `bigint`

#### Inherited from

ReturnType.id

---

### joinedAt

• **joinedAt**: `number`

#### Inherited from

ReturnType.joinedAt

---

### nick

• **nick**: `undefined` \| `string`

#### Inherited from

ReturnType.nick

---

### permissions

• **permissions**: `undefined` \| `bigint`

#### Inherited from

ReturnType.permissions

---

### premiumSince

• **premiumSince**: `undefined` \| `number`

#### Inherited from

ReturnType.premiumSince

---

### roles

• **roles**: `bigint`[]

#### Inherited from

ReturnType.roles

---

### toggles

• **toggles**: [`MemberToggles`](../classes/discordeno_bot.MemberToggles.md)

#### Inherited from

ReturnType.toggles

---

### user

• **user**: `undefined` \| { `avatar`: `undefined` \| `bigint` ; `discriminator`: `string` ; `email`: `undefined` \| `string` ; `flags`: `undefined` \| [`UserFlags`](../enums/discordeno_bot.UserFlags.md) ; `id`: `bigint` ; `locale`: `undefined` \| `string` ; `premiumType`: `undefined` \| [`PremiumTypes`](../enums/discordeno_bot.PremiumTypes.md) ; `publicFlags`: `undefined` \| [`UserFlags`](../enums/discordeno_bot.UserFlags.md) ; `toggles`: [`UserToggles`](../classes/discordeno_bot.UserToggles.md) ; `username`: `string` }

#### Inherited from

ReturnType.user
