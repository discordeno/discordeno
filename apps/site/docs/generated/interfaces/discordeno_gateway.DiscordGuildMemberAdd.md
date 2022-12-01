[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / DiscordGuildMemberAdd

# Interface: DiscordGuildMemberAdd

[@discordeno/gateway](../modules/discordeno_gateway.md).DiscordGuildMemberAdd

https://discord.com/developers/docs/topics/gateway#guild-member-add

## Hierarchy

- [`DiscordMemberWithUser`](discordeno_gateway.DiscordMemberWithUser.md)

  ↳ **`DiscordGuildMemberAdd`**

## Table of contents

### Properties

- [avatar](discordeno_gateway.DiscordGuildMemberAdd.md#avatar)
- [communication_disabled_until](discordeno_gateway.DiscordGuildMemberAdd.md#communication_disabled_until)
- [deaf](discordeno_gateway.DiscordGuildMemberAdd.md#deaf)
- [guild_id](discordeno_gateway.DiscordGuildMemberAdd.md#guild_id)
- [joined_at](discordeno_gateway.DiscordGuildMemberAdd.md#joined_at)
- [mute](discordeno_gateway.DiscordGuildMemberAdd.md#mute)
- [nick](discordeno_gateway.DiscordGuildMemberAdd.md#nick)
- [pending](discordeno_gateway.DiscordGuildMemberAdd.md#pending)
- [permissions](discordeno_gateway.DiscordGuildMemberAdd.md#permissions)
- [premium_since](discordeno_gateway.DiscordGuildMemberAdd.md#premium_since)
- [roles](discordeno_gateway.DiscordGuildMemberAdd.md#roles)
- [user](discordeno_gateway.DiscordGuildMemberAdd.md#user)

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

### guild_id

• **guild_id**: `string`

id of the guild

#### Defined in

packages/types/dist/discord.d.ts:1993

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

• `Optional` **permissions**: `string`

The permissions this member has in the guild. Only present on interaction events.

#### Inherited from

[DiscordMemberWithUser](discordeno_gateway.DiscordMemberWithUser.md).[permissions](discordeno_gateway.DiscordMemberWithUser.md#permissions)

#### Defined in

packages/types/dist/discord.d.ts:168

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
