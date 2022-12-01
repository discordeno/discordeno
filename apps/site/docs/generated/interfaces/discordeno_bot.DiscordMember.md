[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordMember

# Interface: DiscordMember

[@discordeno/bot](../modules/discordeno_bot.md).DiscordMember

https://discord.com/developers/docs/resources/guild#guild-member-object

## Hierarchy

- **`DiscordMember`**

  ↳ [`DiscordMemberWithUser`](discordeno_bot.DiscordMemberWithUser.md)

## Table of contents

### Properties

- [avatar](discordeno_bot.DiscordMember.md#avatar)
- [communication_disabled_until](discordeno_bot.DiscordMember.md#communication_disabled_until)
- [deaf](discordeno_bot.DiscordMember.md#deaf)
- [joined_at](discordeno_bot.DiscordMember.md#joined_at)
- [mute](discordeno_bot.DiscordMember.md#mute)
- [nick](discordeno_bot.DiscordMember.md#nick)
- [pending](discordeno_bot.DiscordMember.md#pending)
- [permissions](discordeno_bot.DiscordMember.md#permissions)
- [premium_since](discordeno_bot.DiscordMember.md#premium_since)
- [roles](discordeno_bot.DiscordMember.md#roles)
- [user](discordeno_bot.DiscordMember.md#user)

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

• `Optional` **user**: [`DiscordUser`](discordeno_bot.DiscordUser.md)

The user this guild member represents

#### Defined in

packages/types/dist/discord.d.ts:156
