[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordTeamMember

# Interface: DiscordTeamMember

[@discordeno/bot](../modules/discordeno_bot.md).DiscordTeamMember

https://discord.com/developers/docs/topics/teams#data-models-team-members-object

## Table of contents

### Properties

- [membership_state](discordeno_bot.DiscordTeamMember.md#membership_state)
- [permissions](discordeno_bot.DiscordTeamMember.md#permissions)
- [team_id](discordeno_bot.DiscordTeamMember.md#team_id)
- [user](discordeno_bot.DiscordTeamMember.md#user)

## Properties

### membership_state

• **membership_state**: [`TeamMembershipStates`](../enums/discordeno_bot.TeamMembershipStates.md)

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

• **user**: `Partial`<[`DiscordUser`](discordeno_bot.DiscordUser.md)\> & `Pick`<[`DiscordUser`](discordeno_bot.DiscordUser.md), `"id"` \| `"username"` \| `"discriminator"` \| `"avatar"`\>

The avatar, discriminator, id, and username of the user

#### Defined in

packages/types/dist/discord.d.ts:237
