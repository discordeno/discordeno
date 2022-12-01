[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordMemberWithUser

# Interface: DiscordMemberWithUser

[@discordeno/types](../modules/discordeno_types.md).DiscordMemberWithUser

https://discord.com/developers/docs/resources/guild#guild-member-object

## Hierarchy

- [`DiscordMember`](discordeno_types.DiscordMember.md)

  ↳ **`DiscordMemberWithUser`**

  ↳↳ [`DiscordInteractionMember`](discordeno_types.DiscordInteractionMember.md)

  ↳↳ [`DiscordGuildMemberAdd`](discordeno_types.DiscordGuildMemberAdd.md)

## Table of contents

### Properties

- [avatar](discordeno_types.DiscordMemberWithUser.md#avatar)
- [communication_disabled_until](discordeno_types.DiscordMemberWithUser.md#communication_disabled_until)
- [deaf](discordeno_types.DiscordMemberWithUser.md#deaf)
- [joined_at](discordeno_types.DiscordMemberWithUser.md#joined_at)
- [mute](discordeno_types.DiscordMemberWithUser.md#mute)
- [nick](discordeno_types.DiscordMemberWithUser.md#nick)
- [pending](discordeno_types.DiscordMemberWithUser.md#pending)
- [permissions](discordeno_types.DiscordMemberWithUser.md#permissions)
- [premium_since](discordeno_types.DiscordMemberWithUser.md#premium_since)
- [roles](discordeno_types.DiscordMemberWithUser.md#roles)
- [user](discordeno_types.DiscordMemberWithUser.md#user)

## Properties

### avatar

• `Optional` **avatar**: `string`

The members custom avatar for this server.

#### Inherited from

[DiscordMember](discordeno_types.DiscordMember.md).[avatar](discordeno_types.DiscordMember.md#avatar)

#### Defined in

[packages/types/src/discord.ts:237](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L237)

---

### communication_disabled_until

• `Optional` **communication_disabled_until**: `null` \| `string`

when the user's timeout will expire and the user will be able to communicate in the guild again (set null to remove timeout), null or a time in the past if the user is not timed out

#### Inherited from

[DiscordMember](discordeno_types.DiscordMember.md).[communication_disabled_until](discordeno_types.DiscordMember.md#communication_disabled_until)

#### Defined in

[packages/types/src/discord.ts:247](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L247)

---

### deaf

• `Optional` **deaf**: `boolean`

Whether the user is deafened in voice channels

#### Inherited from

[DiscordMember](discordeno_types.DiscordMember.md).[deaf](discordeno_types.DiscordMember.md#deaf)

#### Defined in

[packages/types/src/discord.ts:226](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L226)

---

### joined_at

• **joined_at**: `string`

When the user joined the guild

#### Inherited from

[DiscordMember](discordeno_types.DiscordMember.md).[joined_at](discordeno_types.DiscordMember.md#joined_at)

#### Defined in

[packages/types/src/discord.ts:241](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L241)

---

### mute

• `Optional` **mute**: `boolean`

Whether the user is muted in voice channels

#### Inherited from

[DiscordMember](discordeno_types.DiscordMember.md).[mute](discordeno_types.DiscordMember.md#mute)

#### Defined in

[packages/types/src/discord.ts:228](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L228)

---

### nick

• `Optional` **nick**: `null` \| `string`

This users guild nickname

#### Inherited from

[DiscordMember](discordeno_types.DiscordMember.md).[nick](discordeno_types.DiscordMember.md#nick)

#### Defined in

[packages/types/src/discord.ts:235](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L235)

---

### pending

• `Optional` **pending**: `boolean`

Whether the user has not yet passed the guild's Membership Screening requirements

#### Inherited from

[DiscordMember](discordeno_types.DiscordMember.md).[pending](discordeno_types.DiscordMember.md#pending)

#### Defined in

[packages/types/src/discord.ts:230](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L230)

---

### permissions

• `Optional` **permissions**: `string`

The permissions this member has in the guild. Only present on interaction events.

#### Inherited from

[DiscordMember](discordeno_types.DiscordMember.md).[permissions](discordeno_types.DiscordMember.md#permissions)

#### Defined in

[packages/types/src/discord.ts:245](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L245)

---

### premium_since

• `Optional` **premium_since**: `null` \| `string`

When the user started boosting the guild

#### Inherited from

[DiscordMember](discordeno_types.DiscordMember.md).[premium_since](discordeno_types.DiscordMember.md#premium_since)

#### Defined in

[packages/types/src/discord.ts:243](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L243)

---

### roles

• **roles**: `string`[]

Array of role object ids

#### Inherited from

[DiscordMember](discordeno_types.DiscordMember.md).[roles](discordeno_types.DiscordMember.md#roles)

#### Defined in

[packages/types/src/discord.ts:239](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L239)

---

### user

• **user**: [`DiscordUser`](discordeno_types.DiscordUser.md)

The user object for this member

#### Overrides

[DiscordMember](discordeno_types.DiscordMember.md).[user](discordeno_types.DiscordMember.md#user)

#### Defined in

[packages/types/src/discord.ts:993](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L993)
