[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/rest](../modules/discordeno_rest.md) / DiscordMember

# Interface: DiscordMember

[@discordeno/rest](../modules/discordeno_rest.md).DiscordMember

https://discord.com/developers/docs/resources/guild#guild-member-object

## Hierarchy

- **`DiscordMember`**

  ↳ [`DiscordMemberWithUser`](discordeno_rest.DiscordMemberWithUser.md)

## Table of contents

### Properties

- [avatar](discordeno_rest.DiscordMember.md#avatar)
- [communication_disabled_until](discordeno_rest.DiscordMember.md#communication_disabled_until)
- [deaf](discordeno_rest.DiscordMember.md#deaf)
- [joined_at](discordeno_rest.DiscordMember.md#joined_at)
- [mute](discordeno_rest.DiscordMember.md#mute)
- [nick](discordeno_rest.DiscordMember.md#nick)
- [pending](discordeno_rest.DiscordMember.md#pending)
- [permissions](discordeno_rest.DiscordMember.md#permissions)
- [premium_since](discordeno_rest.DiscordMember.md#premium_since)
- [roles](discordeno_rest.DiscordMember.md#roles)
- [user](discordeno_rest.DiscordMember.md#user)

## Properties

### avatar

• `Optional` **avatar**: `string`

The members custom avatar for this server.

#### Defined in

packages/types/dist/discord.d.ts:160

---

### communication_disabled_until

• `Optional` **communication_disabled_until**: `null` \| `string`

when the user's timeout will expire and the user will be able to communicate in the guild again (set null to remove timeout), null or a time in the past if the user is not timed out

#### Defined in

packages/types/dist/discord.d.ts:170

---

### deaf

• `Optional` **deaf**: `boolean`

Whether the user is deafened in voice channels

#### Defined in

packages/types/dist/discord.d.ts:150

---

### joined_at

• **joined_at**: `string`

When the user joined the guild

#### Defined in

packages/types/dist/discord.d.ts:164

---

### mute

• `Optional` **mute**: `boolean`

Whether the user is muted in voice channels

#### Defined in

packages/types/dist/discord.d.ts:152

---

### nick

• `Optional` **nick**: `null` \| `string`

This users guild nickname

#### Defined in

packages/types/dist/discord.d.ts:158

---

### pending

• `Optional` **pending**: `boolean`

Whether the user has not yet passed the guild's Membership Screening requirements

#### Defined in

packages/types/dist/discord.d.ts:154

---

### permissions

• `Optional` **permissions**: `string`

The permissions this member has in the guild. Only present on interaction events.

#### Defined in

packages/types/dist/discord.d.ts:168

---

### premium_since

• `Optional` **premium_since**: `null` \| `string`

When the user started boosting the guild

#### Defined in

packages/types/dist/discord.d.ts:166

---

### roles

• **roles**: `string`[]

Array of role object ids

#### Defined in

packages/types/dist/discord.d.ts:162

---

### user

• `Optional` **user**: [`DiscordUser`](discordeno_rest.DiscordUser.md)

The user this guild member represents

#### Defined in

packages/types/dist/discord.d.ts:156
