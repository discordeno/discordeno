[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / Invite

# Interface: Invite

[@discordeno/bot](../modules/discordeno_bot.md).Invite

## Hierarchy

- `ReturnType`<typeof [`transformInvite`](../modules/discordeno_bot.md#transforminvite)\>

  ↳ **`Invite`**

## Table of contents

### Properties

- [channelId](discordeno_bot.Invite.md#channelid)
- [code](discordeno_bot.Invite.md#code)
- [createdAt](discordeno_bot.Invite.md#createdat)
- [guildId](discordeno_bot.Invite.md#guildid)
- [inviter](discordeno_bot.Invite.md#inviter)
- [maxAge](discordeno_bot.Invite.md#maxage)
- [maxUses](discordeno_bot.Invite.md#maxuses)
- [targetApplication](discordeno_bot.Invite.md#targetapplication)
- [targetType](discordeno_bot.Invite.md#targettype)
- [targetUser](discordeno_bot.Invite.md#targetuser)
- [temporary](discordeno_bot.Invite.md#temporary)
- [uses](discordeno_bot.Invite.md#uses)

## Properties

### channelId

• **channelId**: `bigint`

#### Inherited from

ReturnType.channelId

---

### code

• **code**: `string`

#### Inherited from

ReturnType.code

---

### createdAt

• **createdAt**: `number`

#### Inherited from

ReturnType.createdAt

---

### guildId

• **guildId**: `undefined` \| `bigint`

#### Inherited from

ReturnType.guildId

---

### inviter

• **inviter**: `undefined` \| { `avatar`: `undefined` \| `bigint` ; `discriminator`: `string` ; `email`: `undefined` \| `string` ; `flags`: `undefined` \| [`UserFlags`](../enums/discordeno_bot.UserFlags.md) ; `id`: `bigint` ; `locale`: `undefined` \| `string` ; `premiumType`: `undefined` \| [`PremiumTypes`](../enums/discordeno_bot.PremiumTypes.md) ; `publicFlags`: `undefined` \| [`UserFlags`](../enums/discordeno_bot.UserFlags.md) ; `toggles`: [`UserToggles`](../classes/discordeno_bot.UserToggles.md) ; `username`: `string` }

#### Inherited from

ReturnType.inviter

---

### maxAge

• **maxAge**: `number`

#### Inherited from

ReturnType.maxAge

---

### maxUses

• **maxUses**: `number`

#### Inherited from

ReturnType.maxUses

---

### targetApplication

• **targetApplication**: `undefined` \| { `botPublic`: `boolean` ; `botRequireCodeGrant`: `boolean` ; `coverImage`: `undefined` \| `bigint` ; `description`: `string` ; `flags`: `undefined` \| [`ApplicationFlags`](../enums/discordeno_bot.ApplicationFlags.md) ; `guildId`: `undefined` \| `bigint` ; `icon`: `undefined` \| `bigint` ; `id`: `bigint` ; `name`: `string` ; `owner`: `undefined` \| { flags?: UserFlags \| undefined; avatar?: bigint \| undefined; locale?: string \| undefined; email?: string \| undefined; premiumType?: PremiumTypes \| undefined; ... 4 more ...; toggles: UserToggles; } ; `primarySkuId`: `undefined` \| `string` ; `privacyPolicyUrl`: `undefined` \| `string` ; `rpcOrigins`: `undefined` \| `string`[] ; `slug`: `undefined` \| `string` ; `team`: `undefined` \| { icon?: bigint \| undefined; name: string; id: bigint; ownerUserId: bigint; members: { membershipState: TeamMembershipStates; permissions: "\*"[]; teamId: bigint; user: User; }[]; } ; `termsOfServiceUrl`: `undefined` \| `string` ; `verifyKey`: `string` }

#### Inherited from

ReturnType.targetApplication

---

### targetType

• **targetType**: [`TargetTypes`](../enums/discordeno_bot.TargetTypes.md)

#### Inherited from

ReturnType.targetType

---

### targetUser

• **targetUser**: `undefined` \| { `avatar`: `undefined` \| `bigint` ; `discriminator`: `string` ; `email`: `undefined` \| `string` ; `flags`: `undefined` \| [`UserFlags`](../enums/discordeno_bot.UserFlags.md) ; `id`: `bigint` ; `locale`: `undefined` \| `string` ; `premiumType`: `undefined` \| [`PremiumTypes`](../enums/discordeno_bot.PremiumTypes.md) ; `publicFlags`: `undefined` \| [`UserFlags`](../enums/discordeno_bot.UserFlags.md) ; `toggles`: [`UserToggles`](../classes/discordeno_bot.UserToggles.md) ; `username`: `string` }

#### Inherited from

ReturnType.targetUser

---

### temporary

• **temporary**: `boolean`

#### Inherited from

ReturnType.temporary

---

### uses

• **uses**: `number`

#### Inherited from

ReturnType.uses
