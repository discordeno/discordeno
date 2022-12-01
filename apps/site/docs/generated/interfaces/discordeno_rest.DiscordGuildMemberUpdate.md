[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/rest](../modules/discordeno_rest.md) / DiscordGuildMemberUpdate

# Interface: DiscordGuildMemberUpdate

[@discordeno/rest](../modules/discordeno_rest.md).DiscordGuildMemberUpdate

https://discord.com/developers/docs/topics/gateway#guild-member-update

## Table of contents

### Properties

- [avatar](discordeno_rest.DiscordGuildMemberUpdate.md#avatar)
- [communication_disabled_until](discordeno_rest.DiscordGuildMemberUpdate.md#communication_disabled_until)
- [deaf](discordeno_rest.DiscordGuildMemberUpdate.md#deaf)
- [guild_id](discordeno_rest.DiscordGuildMemberUpdate.md#guild_id)
- [joined_at](discordeno_rest.DiscordGuildMemberUpdate.md#joined_at)
- [mute](discordeno_rest.DiscordGuildMemberUpdate.md#mute)
- [nick](discordeno_rest.DiscordGuildMemberUpdate.md#nick)
- [pending](discordeno_rest.DiscordGuildMemberUpdate.md#pending)
- [premium_since](discordeno_rest.DiscordGuildMemberUpdate.md#premium_since)
- [roles](discordeno_rest.DiscordGuildMemberUpdate.md#roles)
- [user](discordeno_rest.DiscordGuildMemberUpdate.md#user)

## Properties

### avatar

• **avatar**: `string`

the member's [guild avatar hash](https://discord.com/developers/docs/reference#image-formatting)

#### Defined in

packages/types/dist/discord.d.ts:2059

---

### communication_disabled_until

• `Optional` **communication_disabled_until**: `string`

when the user's [timeout](https://support.discord.com/hc/en-us/articles/4413305239191-Time-Out-FAQ) will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out. Will throw a 403 error if the user has the ADMINISTRATOR permission or is the owner of the guild

#### Defined in

packages/types/dist/discord.d.ts:2071

---

### deaf

• `Optional` **deaf**: `boolean`

whether the user is deafened in voice channels

#### Defined in

packages/types/dist/discord.d.ts:2065

---

### guild_id

• **guild_id**: `string`

The id of the guild

#### Defined in

packages/types/dist/discord.d.ts:2051

---

### joined_at

• **joined_at**: `string`

When the user joined the guild

#### Defined in

packages/types/dist/discord.d.ts:2061

---

### mute

• `Optional` **mute**: `boolean`

whether the user is muted in voice channels

#### Defined in

packages/types/dist/discord.d.ts:2067

---

### nick

• `Optional` **nick**: `null` \| `string`

Nickname of the user in the guild

#### Defined in

packages/types/dist/discord.d.ts:2057

---

### pending

• `Optional` **pending**: `boolean`

Whether the user has not yet passed the guild's Membership Screening requirements

#### Defined in

packages/types/dist/discord.d.ts:2069

---

### premium_since

• `Optional` **premium_since**: `null` \| `string`

When the user starting boosting the guild

#### Defined in

packages/types/dist/discord.d.ts:2063

---

### roles

• **roles**: `string`[]

User role ids

#### Defined in

packages/types/dist/discord.d.ts:2053

---

### user

• **user**: [`DiscordUser`](discordeno_rest.DiscordUser.md)

The user

#### Defined in

packages/types/dist/discord.d.ts:2055
