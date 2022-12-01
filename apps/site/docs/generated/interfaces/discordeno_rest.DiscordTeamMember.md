[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/rest](../modules/discordeno_rest.md) / DiscordTeamMember

# Interface: DiscordTeamMember

[@discordeno/rest](../modules/discordeno_rest.md).DiscordTeamMember

https://discord.com/developers/docs/topics/teams#data-models-team-members-object

## Table of contents

### Properties

- [membership_state](discordeno_rest.DiscordTeamMember.md#membership_state)
- [permissions](discordeno_rest.DiscordTeamMember.md#permissions)
- [team_id](discordeno_rest.DiscordTeamMember.md#team_id)
- [user](discordeno_rest.DiscordTeamMember.md#user)

## Properties

### membership_state

• **membership_state**: [`TeamMembershipStates`](../enums/discordeno_rest.TeamMembershipStates.md)

The user's membership state on the team

#### Defined in

packages/types/dist/discord.d.ts:231

---

### permissions

• **permissions**: `"*"`[]

Will always be `["*"]`

#### Defined in

packages/types/dist/discord.d.ts:233

---

### team_id

• **team_id**: `string`

The id of the parent team of which they are a member

#### Defined in

packages/types/dist/discord.d.ts:235

---

### user

• **user**: `Partial`<[`DiscordUser`](discordeno_rest.DiscordUser.md)\> & `Pick`<[`DiscordUser`](discordeno_rest.DiscordUser.md), `"avatar"` \| `"discriminator"` \| `"id"` \| `"username"`\>

The avatar, discriminator, id, and username of the user

#### Defined in

packages/types/dist/discord.d.ts:237
