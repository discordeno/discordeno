[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/rest](../modules/discordeno_rest.md) / DiscordMemberWithUser

# Interface: DiscordMemberWithUser

[@discordeno/rest](../modules/discordeno_rest.md).DiscordMemberWithUser

https://discord.com/developers/docs/resources/guild#guild-member-object

## Hierarchy

- [`DiscordMember`](discordeno_rest.DiscordMember.md)

  ↳ **`DiscordMemberWithUser`**

  ↳↳ [`DiscordInteractionMember`](discordeno_rest.DiscordInteractionMember.md)

  ↳↳ [`DiscordGuildMemberAdd`](discordeno_rest.DiscordGuildMemberAdd.md)

## Table of contents

### Properties

- [avatar](discordeno_rest.DiscordMemberWithUser.md#avatar)
- [communication_disabled_until](discordeno_rest.DiscordMemberWithUser.md#communication_disabled_until)
- [deaf](discordeno_rest.DiscordMemberWithUser.md#deaf)
- [joined_at](discordeno_rest.DiscordMemberWithUser.md#joined_at)
- [mute](discordeno_rest.DiscordMemberWithUser.md#mute)
- [nick](discordeno_rest.DiscordMemberWithUser.md#nick)
- [pending](discordeno_rest.DiscordMemberWithUser.md#pending)
- [permissions](discordeno_rest.DiscordMemberWithUser.md#permissions)
- [premium_since](discordeno_rest.DiscordMemberWithUser.md#premium_since)
- [roles](discordeno_rest.DiscordMemberWithUser.md#roles)
- [user](discordeno_rest.DiscordMemberWithUser.md#user)

## Properties

### avatar

• `Optional` **avatar**: `string`

The members custom avatar for this server.

#### Inherited from

[DiscordMember](discordeno_rest.DiscordMember.md).[avatar](discordeno_rest.DiscordMember.md#avatar)

#### Defined in

packages/types/dist/discord.d.ts:160

---

### communication_disabled_until

• `Optional` **communication_disabled_until**: `null` \| `string`

when the user's timeout will expire and the user will be able to communicate in the guild again (set null to remove timeout), null or a time in the past if the user is not timed out

#### Inherited from

[DiscordMember](discordeno_rest.DiscordMember.md).[communication_disabled_until](discordeno_rest.DiscordMember.md#communication_disabled_until)

#### Defined in

packages/types/dist/discord.d.ts:170

---

### deaf

• `Optional` **deaf**: `boolean`

Whether the user is deafened in voice channels

#### Inherited from

[DiscordMember](discordeno_rest.DiscordMember.md).[deaf](discordeno_rest.DiscordMember.md#deaf)

#### Defined in

packages/types/dist/discord.d.ts:150

---

### joined_at

• **joined_at**: `string`

When the user joined the guild

#### Inherited from

[DiscordMember](discordeno_rest.DiscordMember.md).[joined_at](discordeno_rest.DiscordMember.md#joined_at)

#### Defined in

packages/types/dist/discord.d.ts:164

---

### mute

• `Optional` **mute**: `boolean`

Whether the user is muted in voice channels

#### Inherited from

[DiscordMember](discordeno_rest.DiscordMember.md).[mute](discordeno_rest.DiscordMember.md#mute)

#### Defined in

packages/types/dist/discord.d.ts:152

---

### nick

• `Optional` **nick**: `null` \| `string`

This users guild nickname

#### Inherited from

[DiscordMember](discordeno_rest.DiscordMember.md).[nick](discordeno_rest.DiscordMember.md#nick)

#### Defined in

packages/types/dist/discord.d.ts:158

---

### pending

• `Optional` **pending**: `boolean`

Whether the user has not yet passed the guild's Membership Screening requirements

#### Inherited from

[DiscordMember](discordeno_rest.DiscordMember.md).[pending](discordeno_rest.DiscordMember.md#pending)

#### Defined in

packages/types/dist/discord.d.ts:154

---

### permissions

• `Optional` **permissions**: `string`

The permissions this member has in the guild. Only present on interaction events.

#### Inherited from

[DiscordMember](discordeno_rest.DiscordMember.md).[permissions](discordeno_rest.DiscordMember.md#permissions)

#### Defined in

packages/types/dist/discord.d.ts:168

---

### premium_since

• `Optional` **premium_since**: `null` \| `string`

When the user started boosting the guild

#### Inherited from

[DiscordMember](discordeno_rest.DiscordMember.md).[premium_since](discordeno_rest.DiscordMember.md#premium_since)

#### Defined in

packages/types/dist/discord.d.ts:166

---

### roles

• **roles**: `string`[]

Array of role object ids

#### Inherited from

[DiscordMember](discordeno_rest.DiscordMember.md).[roles](discordeno_rest.DiscordMember.md#roles)

#### Defined in

packages/types/dist/discord.d.ts:162

---

### user

• **user**: [`DiscordUser`](discordeno_rest.DiscordUser.md)

The user object for this member

#### Overrides

[DiscordMember](discordeno_rest.DiscordMember.md).[user](discordeno_rest.DiscordMember.md#user)

#### Defined in

packages/types/dist/discord.d.ts:861
