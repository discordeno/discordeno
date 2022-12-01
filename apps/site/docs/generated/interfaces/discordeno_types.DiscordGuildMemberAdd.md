[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordGuildMemberAdd

# Interface: DiscordGuildMemberAdd

[@discordeno/types](../modules/discordeno_types.md).DiscordGuildMemberAdd

https://discord.com/developers/docs/topics/gateway#guild-member-add

## Hierarchy

- [`DiscordMemberWithUser`](discordeno_types.DiscordMemberWithUser.md)

  ↳ **`DiscordGuildMemberAdd`**

## Table of contents

### Properties

- [avatar](discordeno_types.DiscordGuildMemberAdd.md#avatar)
- [communication_disabled_until](discordeno_types.DiscordGuildMemberAdd.md#communication_disabled_until)
- [deaf](discordeno_types.DiscordGuildMemberAdd.md#deaf)
- [guild_id](discordeno_types.DiscordGuildMemberAdd.md#guild_id)
- [joined_at](discordeno_types.DiscordGuildMemberAdd.md#joined_at)
- [mute](discordeno_types.DiscordGuildMemberAdd.md#mute)
- [nick](discordeno_types.DiscordGuildMemberAdd.md#nick)
- [pending](discordeno_types.DiscordGuildMemberAdd.md#pending)
- [permissions](discordeno_types.DiscordGuildMemberAdd.md#permissions)
- [premium_since](discordeno_types.DiscordGuildMemberAdd.md#premium_since)
- [roles](discordeno_types.DiscordGuildMemberAdd.md#roles)
- [user](discordeno_types.DiscordGuildMemberAdd.md#user)

## Properties

### avatar

• `Optional` **avatar**: `string`

The members custom avatar for this server.

#### Inherited from

[DiscordMemberWithUser](discordeno_types.DiscordMemberWithUser.md).[avatar](discordeno_types.DiscordMemberWithUser.md#avatar)

#### Defined in

[packages/types/src/discord.ts:237](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L237)

---

### communication_disabled_until

• `Optional` **communication_disabled_until**: `null` \| `string`

when the user's timeout will expire and the user will be able to communicate in the guild again (set null to remove timeout), null or a time in the past if the user is not timed out

#### Inherited from

[DiscordMemberWithUser](discordeno_types.DiscordMemberWithUser.md).[communication_disabled_until](discordeno_types.DiscordMemberWithUser.md#communication_disabled_until)

#### Defined in

[packages/types/src/discord.ts:247](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L247)

---

### deaf

• `Optional` **deaf**: `boolean`

Whether the user is deafened in voice channels

#### Inherited from

[DiscordMemberWithUser](discordeno_types.DiscordMemberWithUser.md).[deaf](discordeno_types.DiscordMemberWithUser.md#deaf)

#### Defined in

[packages/types/src/discord.ts:226](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L226)

---

### guild_id

• **guild_id**: `string`

id of the guild

#### Defined in

[packages/types/src/discord.ts:2287](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2287)

---

### joined_at

• **joined_at**: `string`

When the user joined the guild

#### Inherited from

[DiscordMemberWithUser](discordeno_types.DiscordMemberWithUser.md).[joined_at](discordeno_types.DiscordMemberWithUser.md#joined_at)

#### Defined in

[packages/types/src/discord.ts:241](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L241)

---

### mute

• `Optional` **mute**: `boolean`

Whether the user is muted in voice channels

#### Inherited from

[DiscordMemberWithUser](discordeno_types.DiscordMemberWithUser.md).[mute](discordeno_types.DiscordMemberWithUser.md#mute)

#### Defined in

[packages/types/src/discord.ts:228](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L228)

---

### nick

• `Optional` **nick**: `null` \| `string`

This users guild nickname

#### Inherited from

[DiscordMemberWithUser](discordeno_types.DiscordMemberWithUser.md).[nick](discordeno_types.DiscordMemberWithUser.md#nick)

#### Defined in

[packages/types/src/discord.ts:235](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L235)

---

### pending

• `Optional` **pending**: `boolean`

Whether the user has not yet passed the guild's Membership Screening requirements

#### Inherited from

[DiscordMemberWithUser](discordeno_types.DiscordMemberWithUser.md).[pending](discordeno_types.DiscordMemberWithUser.md#pending)

#### Defined in

[packages/types/src/discord.ts:230](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L230)

---

### permissions

• `Optional` **permissions**: `string`

The permissions this member has in the guild. Only present on interaction events.

#### Inherited from

[DiscordMemberWithUser](discordeno_types.DiscordMemberWithUser.md).[permissions](discordeno_types.DiscordMemberWithUser.md#permissions)

#### Defined in

[packages/types/src/discord.ts:245](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L245)

---

### premium_since

• `Optional` **premium_since**: `null` \| `string`

When the user started boosting the guild

#### Inherited from

[DiscordMemberWithUser](discordeno_types.DiscordMemberWithUser.md).[premium_since](discordeno_types.DiscordMemberWithUser.md#premium_since)

#### Defined in

[packages/types/src/discord.ts:243](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L243)

---

### roles

• **roles**: `string`[]

Array of role object ids

#### Inherited from

[DiscordMemberWithUser](discordeno_types.DiscordMemberWithUser.md).[roles](discordeno_types.DiscordMemberWithUser.md#roles)

#### Defined in

[packages/types/src/discord.ts:239](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L239)

---

### user

• **user**: [`DiscordUser`](discordeno_types.DiscordUser.md)

The user object for this member

#### Inherited from

[DiscordMemberWithUser](discordeno_types.DiscordMemberWithUser.md).[user](discordeno_types.DiscordMemberWithUser.md#user)

#### Defined in

[packages/types/src/discord.ts:993](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L993)
