[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordInviteCreate

# Interface: DiscordInviteCreate

[@discordeno/types](../modules/discordeno_types.md).DiscordInviteCreate

https://discord.com/developers/docs/topics/gateway#invite-create

## Table of contents

### Properties

- [channel_id](discordeno_types.DiscordInviteCreate.md#channel_id)
- [code](discordeno_types.DiscordInviteCreate.md#code)
- [created_at](discordeno_types.DiscordInviteCreate.md#created_at)
- [guild_id](discordeno_types.DiscordInviteCreate.md#guild_id)
- [inviter](discordeno_types.DiscordInviteCreate.md#inviter)
- [max_age](discordeno_types.DiscordInviteCreate.md#max_age)
- [max_uses](discordeno_types.DiscordInviteCreate.md#max_uses)
- [target_application](discordeno_types.DiscordInviteCreate.md#target_application)
- [target_type](discordeno_types.DiscordInviteCreate.md#target_type)
- [target_user](discordeno_types.DiscordInviteCreate.md#target_user)
- [temporary](discordeno_types.DiscordInviteCreate.md#temporary)
- [uses](discordeno_types.DiscordInviteCreate.md#uses)

## Properties

### channel_id

• **channel_id**: `string`

The channel the invite is for

#### Defined in

[packages/types/src/discord.ts:2169](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2169)

---

### code

• **code**: `string`

The unique invite code

#### Defined in

[packages/types/src/discord.ts:2171](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2171)

---

### created_at

• **created_at**: `string`

The time at which the invite was created

#### Defined in

[packages/types/src/discord.ts:2173](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2173)

---

### guild_id

• `Optional` **guild_id**: `string`

The guild of the invite

#### Defined in

[packages/types/src/discord.ts:2175](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2175)

---

### inviter

• `Optional` **inviter**: [`DiscordUser`](discordeno_types.DiscordUser.md)

The user that created the invite

#### Defined in

[packages/types/src/discord.ts:2177](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2177)

---

### max_age

• **max_age**: `number`

How long the invite is valid for (in seconds)

#### Defined in

[packages/types/src/discord.ts:2179](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2179)

---

### max_uses

• **max_uses**: `number`

The maximum number of times the invite can be used

#### Defined in

[packages/types/src/discord.ts:2181](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2181)

---

### target_application

• `Optional` **target_application**: `Partial`<[`DiscordApplication`](discordeno_types.DiscordApplication.md)\>

The embedded application to open for this voice channel embedded application invite

#### Defined in

[packages/types/src/discord.ts:2187](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2187)

---

### target_type

• **target_type**: [`TargetTypes`](../enums/discordeno_types.TargetTypes.md)

The type of target for this voice channel invite

#### Defined in

[packages/types/src/discord.ts:2183](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2183)

---

### target_user

• `Optional` **target_user**: [`DiscordUser`](discordeno_types.DiscordUser.md)

The target user for this invite

#### Defined in

[packages/types/src/discord.ts:2185](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2185)

---

### temporary

• **temporary**: `boolean`

Whether or not the invite is temporary (invited users will be kicked on disconnect unless they're assigned a role)

#### Defined in

[packages/types/src/discord.ts:2189](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2189)

---

### uses

• **uses**: `number`

How many times the invite has been used (always will be 0)

#### Defined in

[packages/types/src/discord.ts:2191](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2191)
