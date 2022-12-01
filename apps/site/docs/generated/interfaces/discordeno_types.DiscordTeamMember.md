[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordTeamMember

# Interface: DiscordTeamMember

[@discordeno/types](../modules/discordeno_types.md).DiscordTeamMember

https://discord.com/developers/docs/topics/teams#data-models-team-members-object

## Table of contents

### Properties

- [membership_state](discordeno_types.DiscordTeamMember.md#membership_state)
- [permissions](discordeno_types.DiscordTeamMember.md#permissions)
- [team_id](discordeno_types.DiscordTeamMember.md#team_id)
- [user](discordeno_types.DiscordTeamMember.md#user)

## Properties

### membership_state

• **membership_state**: [`TeamMembershipStates`](../enums/discordeno_types.TeamMembershipStates.md)

The user's membership state on the team

#### Defined in

[packages/types/src/discord.ts:312](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L312)

---

### permissions

• **permissions**: `"*"`[]

Will always be `["*"]`

#### Defined in

[packages/types/src/discord.ts:314](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L314)

---

### team_id

• **team_id**: `string`

The id of the parent team of which they are a member

#### Defined in

[packages/types/src/discord.ts:317](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L317)

---

### user

• **user**: `Partial`<[`DiscordUser`](discordeno_types.DiscordUser.md)\> & `Pick`<[`DiscordUser`](discordeno_types.DiscordUser.md), `"avatar"` \| `"discriminator"` \| `"id"` \| `"username"`\>

The avatar, discriminator, id, and username of the user

#### Defined in

[packages/types/src/discord.ts:319](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L319)
