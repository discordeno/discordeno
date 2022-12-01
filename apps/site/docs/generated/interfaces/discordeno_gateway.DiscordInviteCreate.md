[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / DiscordInviteCreate

# Interface: DiscordInviteCreate

[@discordeno/gateway](../modules/discordeno_gateway.md).DiscordInviteCreate

https://discord.com/developers/docs/topics/gateway#invite-create

## Table of contents

### Properties

- [channel_id](discordeno_gateway.DiscordInviteCreate.md#channel_id)
- [code](discordeno_gateway.DiscordInviteCreate.md#code)
- [created_at](discordeno_gateway.DiscordInviteCreate.md#created_at)
- [guild_id](discordeno_gateway.DiscordInviteCreate.md#guild_id)
- [inviter](discordeno_gateway.DiscordInviteCreate.md#inviter)
- [max_age](discordeno_gateway.DiscordInviteCreate.md#max_age)
- [max_uses](discordeno_gateway.DiscordInviteCreate.md#max_uses)
- [target_application](discordeno_gateway.DiscordInviteCreate.md#target_application)
- [target_type](discordeno_gateway.DiscordInviteCreate.md#target_type)
- [target_user](discordeno_gateway.DiscordInviteCreate.md#target_user)
- [temporary](discordeno_gateway.DiscordInviteCreate.md#temporary)
- [uses](discordeno_gateway.DiscordInviteCreate.md#uses)

## Properties

### channel_id

• **channel_id**: `string`

The channel the invite is for

#### Defined in

packages/types/dist/discord.d.ts:1903

---

### code

• **code**: `string`

The unique invite code

#### Defined in

packages/types/dist/discord.d.ts:1905

---

### created_at

• **created_at**: `string`

The time at which the invite was created

#### Defined in

packages/types/dist/discord.d.ts:1907

---

### guild_id

• `Optional` **guild_id**: `string`

The guild of the invite

#### Defined in

packages/types/dist/discord.d.ts:1909

---

### inviter

• `Optional` **inviter**: [`DiscordUser`](discordeno_gateway.DiscordUser.md)

The user that created the invite

#### Defined in

packages/types/dist/discord.d.ts:1911

---

### max_age

• **max_age**: `number`

How long the invite is valid for (in seconds)

#### Defined in

packages/types/dist/discord.d.ts:1913

---

### max_uses

• **max_uses**: `number`

The maximum number of times the invite can be used

#### Defined in

packages/types/dist/discord.d.ts:1915

---

### target_application

• `Optional` **target_application**: `Partial`<[`DiscordApplication`](discordeno_gateway.DiscordApplication.md)\>

The embedded application to open for this voice channel embedded application invite

#### Defined in

packages/types/dist/discord.d.ts:1921

---

### target_type

• **target_type**: [`TargetTypes`](../enums/discordeno_gateway.TargetTypes.md)

The type of target for this voice channel invite

#### Defined in

packages/types/dist/discord.d.ts:1917

---

### target_user

• `Optional` **target_user**: [`DiscordUser`](discordeno_gateway.DiscordUser.md)

The target user for this invite

#### Defined in

packages/types/dist/discord.d.ts:1919

---

### temporary

• **temporary**: `boolean`

Whether or not the invite is temporary (invited users will be kicked on disconnect unless they're assigned a role)

#### Defined in

packages/types/dist/discord.d.ts:1923

---

### uses

• **uses**: `number`

How many times the invite has been used (always will be 0)

#### Defined in

packages/types/dist/discord.d.ts:1925
