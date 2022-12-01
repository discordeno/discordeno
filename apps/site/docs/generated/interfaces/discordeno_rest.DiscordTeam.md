[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/rest](../modules/discordeno_rest.md) / DiscordTeam

# Interface: DiscordTeam

[@discordeno/rest](../modules/discordeno_rest.md).DiscordTeam

https://discord.com/developers/docs/topics/teams#data-models-team-object

## Table of contents

### Properties

- [icon](discordeno_rest.DiscordTeam.md#icon)
- [id](discordeno_rest.DiscordTeam.md#id)
- [members](discordeno_rest.DiscordTeam.md#members)
- [name](discordeno_rest.DiscordTeam.md#name)
- [owner_user_id](discordeno_rest.DiscordTeam.md#owner_user_id)

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

• **members**: [`DiscordTeamMember`](discordeno_rest.DiscordTeamMember.md)[]

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
