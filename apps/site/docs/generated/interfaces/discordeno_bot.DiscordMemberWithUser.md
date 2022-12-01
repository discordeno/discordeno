[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordMemberWithUser

# Interface: DiscordMemberWithUser

[@discordeno/bot](../modules/discordeno_bot.md).DiscordMemberWithUser

https://discord.com/developers/docs/resources/guild#guild-member-object

## Hierarchy

- [`DiscordMember`](discordeno_bot.DiscordMember.md)

  ↳ **`DiscordMemberWithUser`**

  ↳↳ [`DiscordInteractionMember`](discordeno_bot.DiscordInteractionMember.md)

  ↳↳ [`DiscordGuildMemberAdd`](discordeno_bot.DiscordGuildMemberAdd.md)

## Table of contents

### Properties

- [avatar](discordeno_bot.DiscordMemberWithUser.md#avatar)
- [communication_disabled_until](discordeno_bot.DiscordMemberWithUser.md#communication_disabled_until)
- [deaf](discordeno_bot.DiscordMemberWithUser.md#deaf)
- [joined_at](discordeno_bot.DiscordMemberWithUser.md#joined_at)
- [mute](discordeno_bot.DiscordMemberWithUser.md#mute)
- [nick](discordeno_bot.DiscordMemberWithUser.md#nick)
- [pending](discordeno_bot.DiscordMemberWithUser.md#pending)
- [permissions](discordeno_bot.DiscordMemberWithUser.md#permissions)
- [premium_since](discordeno_bot.DiscordMemberWithUser.md#premium_since)
- [roles](discordeno_bot.DiscordMemberWithUser.md#roles)
- [user](discordeno_bot.DiscordMemberWithUser.md#user)

## Properties

### avatar

• `Optional` **avatar**: `string`

The members custom avatar for this server.

#### Inherited from

[DiscordMember](discordeno_bot.DiscordMember.md).[avatar](discordeno_bot.DiscordMember.md#avatar)

#### Defined in

packages/types/dist/discord.d.ts:160

---

### communication_disabled_until

• `Optional` **communication_disabled_until**: `null` \| `string`

when the user's timeout will expire and the user will be able to communicate in the guild again (set null to remove timeout), null or a time in the past if the user is not timed out

#### Inherited from

[DiscordMember](discordeno_bot.DiscordMember.md).[communication_disabled_until](discordeno_bot.DiscordMember.md#communication_disabled_until)

#### Defined in

packages/types/dist/discord.d.ts:170

---

### deaf

• `Optional` **deaf**: `boolean`

Whether the user is deafened in voice channels

#### Inherited from

[DiscordMember](discordeno_bot.DiscordMember.md).[deaf](discordeno_bot.DiscordMember.md#deaf)

#### Defined in

packages/types/dist/discord.d.ts:150

---

### joined_at

• **joined_at**: `string`

When the user joined the guild

#### Inherited from

[DiscordMember](discordeno_bot.DiscordMember.md).[joined_at](discordeno_bot.DiscordMember.md#joined_at)

#### Defined in

packages/types/dist/discord.d.ts:164

---

### mute

• `Optional` **mute**: `boolean`

Whether the user is muted in voice channels

#### Inherited from

[DiscordMember](discordeno_bot.DiscordMember.md).[mute](discordeno_bot.DiscordMember.md#mute)

#### Defined in

packages/types/dist/discord.d.ts:152

---

### nick

• `Optional` **nick**: `null` \| `string`

This users guild nickname

#### Inherited from

[DiscordMember](discordeno_bot.DiscordMember.md).[nick](discordeno_bot.DiscordMember.md#nick)

#### Defined in

packages/types/dist/discord.d.ts:158

---

### pending

• `Optional` **pending**: `boolean`

Whether the user has not yet passed the guild's Membership Screening requirements

#### Inherited from

[DiscordMember](discordeno_bot.DiscordMember.md).[pending](discordeno_bot.DiscordMember.md#pending)

#### Defined in

packages/types/dist/discord.d.ts:154

---

### permissions

• `Optional` **permissions**: `string`

The permissions this member has in the guild. Only present on interaction events.

#### Inherited from

[DiscordMember](discordeno_bot.DiscordMember.md).[permissions](discordeno_bot.DiscordMember.md#permissions)

#### Defined in

packages/types/dist/discord.d.ts:168

---

### premium_since

• `Optional` **premium_since**: `null` \| `string`

When the user started boosting the guild

#### Inherited from

[DiscordMember](discordeno_bot.DiscordMember.md).[premium_since](discordeno_bot.DiscordMember.md#premium_since)

#### Defined in

packages/types/dist/discord.d.ts:166

---

### roles

• **roles**: `string`[]

Array of role object ids

#### Inherited from

[DiscordMember](discordeno_bot.DiscordMember.md).[roles](discordeno_bot.DiscordMember.md#roles)

#### Defined in

packages/types/dist/discord.d.ts:162

---

### user

• **user**: [`DiscordUser`](discordeno_bot.DiscordUser.md)

The user object for this member

#### Overrides

[DiscordMember](discordeno_bot.DiscordMember.md).[user](discordeno_bot.DiscordMember.md#user)

#### Defined in

packages/types/dist/discord.d.ts:861
