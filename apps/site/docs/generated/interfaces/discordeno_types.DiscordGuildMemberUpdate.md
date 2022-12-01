[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordGuildMemberUpdate

# Interface: DiscordGuildMemberUpdate

[@discordeno/types](../modules/discordeno_types.md).DiscordGuildMemberUpdate

https://discord.com/developers/docs/topics/gateway#guild-member-update

## Table of contents

### Properties

- [avatar](discordeno_types.DiscordGuildMemberUpdate.md#avatar)
- [communication_disabled_until](discordeno_types.DiscordGuildMemberUpdate.md#communication_disabled_until)
- [deaf](discordeno_types.DiscordGuildMemberUpdate.md#deaf)
- [guild_id](discordeno_types.DiscordGuildMemberUpdate.md#guild_id)
- [joined_at](discordeno_types.DiscordGuildMemberUpdate.md#joined_at)
- [mute](discordeno_types.DiscordGuildMemberUpdate.md#mute)
- [nick](discordeno_types.DiscordGuildMemberUpdate.md#nick)
- [pending](discordeno_types.DiscordGuildMemberUpdate.md#pending)
- [premium_since](discordeno_types.DiscordGuildMemberUpdate.md#premium_since)
- [roles](discordeno_types.DiscordGuildMemberUpdate.md#roles)
- [user](discordeno_types.DiscordGuildMemberUpdate.md#user)

## Properties

### avatar

• **avatar**: `string`

the member's [guild avatar hash](https://discord.com/developers/docs/reference#image-formatting)

#### Defined in

[packages/types/src/discord.ts:2360](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2360)

---

### communication_disabled_until

• `Optional` **communication_disabled_until**: `string`

when the user's [timeout](https://support.discord.com/hc/en-us/articles/4413305239191-Time-Out-FAQ) will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out. Will throw a 403 error if the user has the ADMINISTRATOR permission or is the owner of the guild

#### Defined in

[packages/types/src/discord.ts:2372](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2372)

---

### deaf

• `Optional` **deaf**: `boolean`

whether the user is deafened in voice channels

#### Defined in

[packages/types/src/discord.ts:2366](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2366)

---

### guild_id

• **guild_id**: `string`

The id of the guild

#### Defined in

[packages/types/src/discord.ts:2352](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2352)

---

### joined_at

• **joined_at**: `string`

When the user joined the guild

#### Defined in

[packages/types/src/discord.ts:2362](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2362)

---

### mute

• `Optional` **mute**: `boolean`

whether the user is muted in voice channels

#### Defined in

[packages/types/src/discord.ts:2368](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2368)

---

### nick

• `Optional` **nick**: `null` \| `string`

Nickname of the user in the guild

#### Defined in

[packages/types/src/discord.ts:2358](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2358)

---

### pending

• `Optional` **pending**: `boolean`

Whether the user has not yet passed the guild's Membership Screening requirements

#### Defined in

[packages/types/src/discord.ts:2370](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2370)

---

### premium_since

• `Optional` **premium_since**: `null` \| `string`

When the user starting boosting the guild

#### Defined in

[packages/types/src/discord.ts:2364](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2364)

---

### roles

• **roles**: `string`[]

User role ids

#### Defined in

[packages/types/src/discord.ts:2354](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2354)

---

### user

• **user**: [`DiscordUser`](discordeno_types.DiscordUser.md)

The user

#### Defined in

[packages/types/src/discord.ts:2356](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2356)
