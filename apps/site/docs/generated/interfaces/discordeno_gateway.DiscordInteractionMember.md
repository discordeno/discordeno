[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / DiscordInteractionMember

# Interface: DiscordInteractionMember

[@discordeno/gateway](../modules/discordeno_gateway.md).DiscordInteractionMember

https://discord.com/developers/docs/resources/guild#guild-member-object

## Hierarchy

- [`DiscordMemberWithUser`](discordeno_gateway.DiscordMemberWithUser.md)

  ↳ **`DiscordInteractionMember`**

## Table of contents

### Properties

- [avatar](discordeno_gateway.DiscordInteractionMember.md#avatar)
- [communication_disabled_until](discordeno_gateway.DiscordInteractionMember.md#communication_disabled_until)
- [deaf](discordeno_gateway.DiscordInteractionMember.md#deaf)
- [joined_at](discordeno_gateway.DiscordInteractionMember.md#joined_at)
- [mute](discordeno_gateway.DiscordInteractionMember.md#mute)
- [nick](discordeno_gateway.DiscordInteractionMember.md#nick)
- [pending](discordeno_gateway.DiscordInteractionMember.md#pending)
- [permissions](discordeno_gateway.DiscordInteractionMember.md#permissions)
- [premium_since](discordeno_gateway.DiscordInteractionMember.md#premium_since)
- [roles](discordeno_gateway.DiscordInteractionMember.md#roles)
- [user](discordeno_gateway.DiscordInteractionMember.md#user)

## Properties

### avatar

• `Optional` **avatar**: `string`

The members custom avatar for this server.

#### Inherited from

[DiscordMemberWithUser](discordeno_gateway.DiscordMemberWithUser.md).[avatar](discordeno_gateway.DiscordMemberWithUser.md#avatar)

#### Defined in

packages/types/dist/discord.d.ts:160

---

### communication_disabled_until

• `Optional` **communication_disabled_until**: `null` \| `string`

when the user's timeout will expire and the user will be able to communicate in the guild again (set null to remove timeout), null or a time in the past if the user is not timed out

#### Inherited from

[DiscordMemberWithUser](discordeno_gateway.DiscordMemberWithUser.md).[communication_disabled_until](discordeno_gateway.DiscordMemberWithUser.md#communication_disabled_until)

#### Defined in

packages/types/dist/discord.d.ts:170

---

### deaf

• `Optional` **deaf**: `boolean`

Whether the user is deafened in voice channels

#### Inherited from

[DiscordMemberWithUser](discordeno_gateway.DiscordMemberWithUser.md).[deaf](discordeno_gateway.DiscordMemberWithUser.md#deaf)

#### Defined in

packages/types/dist/discord.d.ts:150

---

### joined_at

• **joined_at**: `string`

When the user joined the guild

#### Inherited from

[DiscordMemberWithUser](discordeno_gateway.DiscordMemberWithUser.md).[joined_at](discordeno_gateway.DiscordMemberWithUser.md#joined_at)

#### Defined in

packages/types/dist/discord.d.ts:164

---

### mute

• `Optional` **mute**: `boolean`

Whether the user is muted in voice channels

#### Inherited from

[DiscordMemberWithUser](discordeno_gateway.DiscordMemberWithUser.md).[mute](discordeno_gateway.DiscordMemberWithUser.md#mute)

#### Defined in

packages/types/dist/discord.d.ts:152

---

### nick

• `Optional` **nick**: `null` \| `string`

This users guild nickname

#### Inherited from

[DiscordMemberWithUser](discordeno_gateway.DiscordMemberWithUser.md).[nick](discordeno_gateway.DiscordMemberWithUser.md#nick)

#### Defined in

packages/types/dist/discord.d.ts:158

---

### pending

• `Optional` **pending**: `boolean`

Whether the user has not yet passed the guild's Membership Screening requirements

#### Inherited from

[DiscordMemberWithUser](discordeno_gateway.DiscordMemberWithUser.md).[pending](discordeno_gateway.DiscordMemberWithUser.md#pending)

#### Defined in

packages/types/dist/discord.d.ts:154

---

### permissions

• **permissions**: `string`

Total permissions of the member in the channel, including overwrites, returned when in the interaction object

#### Overrides

[DiscordMemberWithUser](discordeno_gateway.DiscordMemberWithUser.md).[permissions](discordeno_gateway.DiscordMemberWithUser.md#permissions)

#### Defined in

packages/types/dist/discord.d.ts:1182

---

### premium_since

• `Optional` **premium_since**: `null` \| `string`

When the user started boosting the guild

#### Inherited from

[DiscordMemberWithUser](discordeno_gateway.DiscordMemberWithUser.md).[premium_since](discordeno_gateway.DiscordMemberWithUser.md#premium_since)

#### Defined in

packages/types/dist/discord.d.ts:166

---

### roles

• **roles**: `string`[]

Array of role object ids

#### Inherited from

[DiscordMemberWithUser](discordeno_gateway.DiscordMemberWithUser.md).[roles](discordeno_gateway.DiscordMemberWithUser.md#roles)

#### Defined in

packages/types/dist/discord.d.ts:162

---

### user

• **user**: [`DiscordUser`](discordeno_gateway.DiscordUser.md)

The user object for this member

#### Inherited from

[DiscordMemberWithUser](discordeno_gateway.DiscordMemberWithUser.md).[user](discordeno_gateway.DiscordMemberWithUser.md#user)

#### Defined in

packages/types/dist/discord.d.ts:861
