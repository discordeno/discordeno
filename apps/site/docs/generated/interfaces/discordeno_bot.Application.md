[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / Application

# Interface: Application

[@discordeno/bot](../modules/discordeno_bot.md).Application

## Hierarchy

- `ReturnType`<typeof `transformApplication`\>

  ↳ **`Application`**

## Table of contents

### Properties

- [botPublic](discordeno_bot.Application.md#botpublic)
- [botRequireCodeGrant](discordeno_bot.Application.md#botrequirecodegrant)
- [coverImage](discordeno_bot.Application.md#coverimage)
- [description](discordeno_bot.Application.md#description)
- [flags](discordeno_bot.Application.md#flags)
- [guildId](discordeno_bot.Application.md#guildid)
- [icon](discordeno_bot.Application.md#icon)
- [id](discordeno_bot.Application.md#id)
- [name](discordeno_bot.Application.md#name)
- [owner](discordeno_bot.Application.md#owner)
- [primarySkuId](discordeno_bot.Application.md#primaryskuid)
- [privacyPolicyUrl](discordeno_bot.Application.md#privacypolicyurl)
- [rpcOrigins](discordeno_bot.Application.md#rpcorigins)
- [slug](discordeno_bot.Application.md#slug)
- [team](discordeno_bot.Application.md#team)
- [termsOfServiceUrl](discordeno_bot.Application.md#termsofserviceurl)
- [verifyKey](discordeno_bot.Application.md#verifykey)

## Properties

### botPublic

• **botPublic**: `boolean`

#### Inherited from

ReturnType.botPublic

---

### botRequireCodeGrant

• **botRequireCodeGrant**: `boolean`

#### Inherited from

ReturnType.botRequireCodeGrant

---

### coverImage

• **coverImage**: `undefined` \| `bigint`

#### Inherited from

ReturnType.coverImage

---

### description

• **description**: `string`

#### Inherited from

ReturnType.description

---

### flags

• **flags**: `undefined` \| [`ApplicationFlags`](../enums/discordeno_bot.ApplicationFlags.md)

#### Inherited from

ReturnType.flags

---

### guildId

• **guildId**: `undefined` \| `bigint`

#### Inherited from

ReturnType.guildId

---

### icon

• **icon**: `undefined` \| `bigint`

#### Inherited from

ReturnType.icon

---

### id

• **id**: `bigint`

#### Inherited from

ReturnType.id

---

### name

• **name**: `string`

#### Inherited from

ReturnType.name

---

### owner

• **owner**: `undefined` \| { `avatar`: `undefined` \| `bigint` ; `discriminator`: `string` ; `email`: `undefined` \| `string` ; `flags`: `undefined` \| [`UserFlags`](../enums/discordeno_bot.UserFlags.md) ; `id`: `bigint` ; `locale`: `undefined` \| `string` ; `premiumType`: `undefined` \| [`PremiumTypes`](../enums/discordeno_bot.PremiumTypes.md) ; `publicFlags`: `undefined` \| [`UserFlags`](../enums/discordeno_bot.UserFlags.md) ; `toggles`: [`UserToggles`](../classes/discordeno_bot.UserToggles.md) ; `username`: `string` }

#### Inherited from

ReturnType.owner

---

### primarySkuId

• **primarySkuId**: `undefined` \| `string`

#### Inherited from

ReturnType.primarySkuId

---

### privacyPolicyUrl

• **privacyPolicyUrl**: `undefined` \| `string`

#### Inherited from

ReturnType.privacyPolicyUrl

---

### rpcOrigins

• **rpcOrigins**: `undefined` \| `string`[]

#### Inherited from

ReturnType.rpcOrigins

---

### slug

• **slug**: `undefined` \| `string`

#### Inherited from

ReturnType.slug

---

### team

• **team**: `undefined` \| { `icon`: `undefined` \| `bigint` ; `id`: `bigint` ; `members`: { `membershipState`: [`TeamMembershipStates`](../enums/discordeno_bot.TeamMembershipStates.md) = member.membership_state; `permissions`: `"*"`[] = member.permissions; `teamId`: `bigint` = id; `user`: [`User`](discordeno_bot.User.md) }[] ; `name`: `string` ; `ownerUserId`: `bigint` }

#### Inherited from

ReturnType.team

---

### termsOfServiceUrl

• **termsOfServiceUrl**: `undefined` \| `string`

#### Inherited from

ReturnType.termsOfServiceUrl

---

### verifyKey

• **verifyKey**: `string`

#### Inherited from

ReturnType.verifyKey
