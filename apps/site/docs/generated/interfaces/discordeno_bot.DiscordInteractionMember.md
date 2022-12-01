[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordInteractionMember

# Interface: DiscordInteractionMember

[@discordeno/bot](../modules/discordeno_bot.md).DiscordInteractionMember

https://discord.com/developers/docs/resources/guild#guild-member-object

## Hierarchy

- [`DiscordMemberWithUser`](discordeno_bot.DiscordMemberWithUser.md)

  ↳ **`DiscordInteractionMember`**

## Table of contents

### Properties

- [avatar](discordeno_bot.DiscordInteractionMember.md#avatar)
- [communication_disabled_until](discordeno_bot.DiscordInteractionMember.md#communication_disabled_until)
- [deaf](discordeno_bot.DiscordInteractionMember.md#deaf)
- [joined_at](discordeno_bot.DiscordInteractionMember.md#joined_at)
- [mute](discordeno_bot.DiscordInteractionMember.md#mute)
- [nick](discordeno_bot.DiscordInteractionMember.md#nick)
- [pending](discordeno_bot.DiscordInteractionMember.md#pending)
- [permissions](discordeno_bot.DiscordInteractionMember.md#permissions)
- [premium_since](discordeno_bot.DiscordInteractionMember.md#premium_since)
- [roles](discordeno_bot.DiscordInteractionMember.md#roles)
- [user](discordeno_bot.DiscordInteractionMember.md#user)

## Properties

### avatar

• `Optional` **avatar**: `string`

The members custom avatar for this server.

#### Inherited from

[DiscordMemberWithUser](discordeno_bot.DiscordMemberWithUser.md).[avatar](discordeno_bot.DiscordMemberWithUser.md#avatar)

#### Defined in

packages/types/dist/discord.d.ts:160

---

### communication_disabled_until

• `Optional` **communication_disabled_until**: `null` \| `string`

when the user's timeout will expire and the user will be able to communicate in the guild again (set null to remove timeout), null or a time in the past if the user is not timed out

#### Inherited from

[DiscordMemberWithUser](discordeno_bot.DiscordMemberWithUser.md).[communication_disabled_until](discordeno_bot.DiscordMemberWithUser.md#communication_disabled_until)

#### Defined in

packages/types/dist/discord.d.ts:170

---

### deaf

• `Optional` **deaf**: `boolean`

Whether the user is deafened in voice channels

#### Inherited from

[DiscordMemberWithUser](discordeno_bot.DiscordMemberWithUser.md).[deaf](discordeno_bot.DiscordMemberWithUser.md#deaf)

#### Defined in

packages/types/dist/discord.d.ts:150

---

### joined_at

• **joined_at**: `string`

When the user joined the guild

#### Inherited from

[DiscordMemberWithUser](discordeno_bot.DiscordMemberWithUser.md).[joined_at](discordeno_bot.DiscordMemberWithUser.md#joined_at)

#### Defined in

packages/types/dist/discord.d.ts:164

---

### mute

• `Optional` **mute**: `boolean`

Whether the user is muted in voice channels

#### Inherited from

[DiscordMemberWithUser](discordeno_bot.DiscordMemberWithUser.md).[mute](discordeno_bot.DiscordMemberWithUser.md#mute)

#### Defined in

packages/types/dist/discord.d.ts:152

---

### nick

• `Optional` **nick**: `null` \| `string`

This users guild nickname

#### Inherited from

[DiscordMemberWithUser](discordeno_bot.DiscordMemberWithUser.md).[nick](discordeno_bot.DiscordMemberWithUser.md#nick)

#### Defined in

packages/types/dist/discord.d.ts:158

---

### pending

• `Optional` **pending**: `boolean`

Whether the user has not yet passed the guild's Membership Screening requirements

#### Inherited from

[DiscordMemberWithUser](discordeno_bot.DiscordMemberWithUser.md).[pending](discordeno_bot.DiscordMemberWithUser.md#pending)

#### Defined in

packages/types/dist/discord.d.ts:154

---

### permissions

• **permissions**: `string`

Total permissions of the member in the channel, including overwrites, returned when in the interaction object

#### Overrides

[DiscordMemberWithUser](discordeno_bot.DiscordMemberWithUser.md).[permissions](discordeno_bot.DiscordMemberWithUser.md#permissions)

#### Defined in

packages/types/dist/discord.d.ts:1182

---

### premium_since

• `Optional` **premium_since**: `null` \| `string`

When the user started boosting the guild

#### Inherited from

[DiscordMemberWithUser](discordeno_bot.DiscordMemberWithUser.md).[premium_since](discordeno_bot.DiscordMemberWithUser.md#premium_since)

#### Defined in

packages/types/dist/discord.d.ts:166

---

### roles

• **roles**: `string`[]

Array of role object ids

#### Inherited from

[DiscordMemberWithUser](discordeno_bot.DiscordMemberWithUser.md).[roles](discordeno_bot.DiscordMemberWithUser.md#roles)

#### Defined in

packages/types/dist/discord.d.ts:162

---

### user

• **user**: [`DiscordUser`](discordeno_bot.DiscordUser.md)

The user object for this member

#### Inherited from

[DiscordMemberWithUser](discordeno_bot.DiscordMemberWithUser.md).[user](discordeno_bot.DiscordMemberWithUser.md#user)

#### Defined in

packages/types/dist/discord.d.ts:861
