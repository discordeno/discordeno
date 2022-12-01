[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / DiscordTeam

# Interface: DiscordTeam

[@discordeno/gateway](../modules/discordeno_gateway.md).DiscordTeam

https://discord.com/developers/docs/topics/teams#data-models-team-object

## Table of contents

### Properties

- [icon](discordeno_gateway.DiscordTeam.md#icon)
- [id](discordeno_gateway.DiscordTeam.md#id)
- [members](discordeno_gateway.DiscordTeam.md#members)
- [name](discordeno_gateway.DiscordTeam.md#name)
- [owner_user_id](discordeno_gateway.DiscordTeam.md#owner_user_id)

## Properties

### icon

• **icon**: `null` \| `string`

A hash of the image of the team's icon

#### Defined in

packages/types/dist/discord.d.ts:218

---

### id

• **id**: `string`

The unique id of the team

#### Defined in

packages/types/dist/discord.d.ts:220

---

### members

• **members**: [`DiscordTeamMember`](discordeno_gateway.DiscordTeamMember.md)[]

The members of the team

#### Defined in

packages/types/dist/discord.d.ts:222

---

### name

• **name**: `string`

The name of the team

#### Defined in

packages/types/dist/discord.d.ts:226

---

### owner_user_id

• **owner_user_id**: `string`

The user id of the current team owner

#### Defined in

packages/types/dist/discord.d.ts:224
