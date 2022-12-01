[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordMember

# Interface: DiscordMember

[@discordeno/types](../modules/discordeno_types.md).DiscordMember

https://discord.com/developers/docs/resources/guild#guild-member-object

## Hierarchy

- **`DiscordMember`**

  ↳ [`DiscordMemberWithUser`](discordeno_types.DiscordMemberWithUser.md)

## Table of contents

### Properties

- [avatar](discordeno_types.DiscordMember.md#avatar)
- [communication_disabled_until](discordeno_types.DiscordMember.md#communication_disabled_until)
- [deaf](discordeno_types.DiscordMember.md#deaf)
- [joined_at](discordeno_types.DiscordMember.md#joined_at)
- [mute](discordeno_types.DiscordMember.md#mute)
- [nick](discordeno_types.DiscordMember.md#nick)
- [pending](discordeno_types.DiscordMember.md#pending)
- [permissions](discordeno_types.DiscordMember.md#permissions)
- [premium_since](discordeno_types.DiscordMember.md#premium_since)
- [roles](discordeno_types.DiscordMember.md#roles)
- [user](discordeno_types.DiscordMember.md#user)

## Properties

### avatar

• `Optional` **avatar**: `string`

The members custom avatar for this server.

#### Defined in

[packages/types/src/discord.ts:237](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L237)

---

### communication_disabled_until

• `Optional` **communication_disabled_until**: `null` \| `string`

when the user's timeout will expire and the user will be able to communicate in the guild again (set null to remove timeout), null or a time in the past if the user is not timed out

#### Defined in

[packages/types/src/discord.ts:247](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L247)

---

### deaf

• `Optional` **deaf**: `boolean`

Whether the user is deafened in voice channels

#### Defined in

[packages/types/src/discord.ts:226](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L226)

---

### joined_at

• **joined_at**: `string`

When the user joined the guild

#### Defined in

[packages/types/src/discord.ts:241](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L241)

---

### mute

• `Optional` **mute**: `boolean`

Whether the user is muted in voice channels

#### Defined in

[packages/types/src/discord.ts:228](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L228)

---

### nick

• `Optional` **nick**: `null` \| `string`

This users guild nickname

#### Defined in

[packages/types/src/discord.ts:235](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L235)

---

### pending

• `Optional` **pending**: `boolean`

Whether the user has not yet passed the guild's Membership Screening requirements

#### Defined in

[packages/types/src/discord.ts:230](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L230)

---

### permissions

• `Optional` **permissions**: `string`

The permissions this member has in the guild. Only present on interaction events.

#### Defined in

[packages/types/src/discord.ts:245](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L245)

---

### premium_since

• `Optional` **premium_since**: `null` \| `string`

When the user started boosting the guild

#### Defined in

[packages/types/src/discord.ts:243](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L243)

---

### roles

• **roles**: `string`[]

Array of role object ids

#### Defined in

[packages/types/src/discord.ts:239](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L239)

---

### user

• `Optional` **user**: [`DiscordUser`](discordeno_types.DiscordUser.md)

The user this guild member represents

#### Defined in

[packages/types/src/discord.ts:233](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L233)
