[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordTeam

# Interface: DiscordTeam

[@discordeno/types](../modules/discordeno_types.md).DiscordTeam

https://discord.com/developers/docs/topics/teams#data-models-team-object

## Table of contents

### Properties

- [icon](discordeno_types.DiscordTeam.md#icon)
- [id](discordeno_types.DiscordTeam.md#id)
- [members](discordeno_types.DiscordTeam.md#members)
- [name](discordeno_types.DiscordTeam.md#name)
- [owner_user_id](discordeno_types.DiscordTeam.md#owner_user_id)

## Properties

### icon

• **icon**: `null` \| `string`

A hash of the image of the team's icon

#### Defined in

[packages/types/src/discord.ts:298](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L298)

---

### id

• **id**: `string`

The unique id of the team

#### Defined in

[packages/types/src/discord.ts:300](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L300)

---

### members

• **members**: [`DiscordTeamMember`](discordeno_types.DiscordTeamMember.md)[]

The members of the team

#### Defined in

[packages/types/src/discord.ts:302](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L302)

---

### name

• **name**: `string`

The name of the team

#### Defined in

[packages/types/src/discord.ts:306](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L306)

---

### owner_user_id

• **owner_user_id**: `string`

The user id of the current team owner

#### Defined in

[packages/types/src/discord.ts:304](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L304)
