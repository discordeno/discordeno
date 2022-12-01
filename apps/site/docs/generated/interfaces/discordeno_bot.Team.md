[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / Team

# Interface: Team

[@discordeno/bot](../modules/discordeno_bot.md).Team

## Hierarchy

- `ReturnType`<typeof [`transformTeam`](../modules/discordeno_bot.md#transformteam)\>

  ↳ **`Team`**

## Table of contents

### Properties

- [icon](discordeno_bot.Team.md#icon)
- [id](discordeno_bot.Team.md#id)
- [members](discordeno_bot.Team.md#members)
- [name](discordeno_bot.Team.md#name)
- [ownerUserId](discordeno_bot.Team.md#owneruserid)

## Properties

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

### members

• **members**: { `membershipState`: [`TeamMembershipStates`](../enums/discordeno_bot.TeamMembershipStates.md) = member.membership_state; `permissions`: `"*"`[] = member.permissions; `teamId`: `bigint` = id; `user`: [`User`](discordeno_bot.User.md) }[]

#### Inherited from

ReturnType.members

---

### name

• **name**: `string`

#### Inherited from

ReturnType.name

---

### ownerUserId

• **ownerUserId**: `bigint`

#### Inherited from

ReturnType.ownerUserId
