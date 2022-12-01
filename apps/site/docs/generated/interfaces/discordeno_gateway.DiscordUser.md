[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / DiscordUser

# Interface: DiscordUser

[@discordeno/gateway](../modules/discordeno_gateway.md).DiscordUser

https://discord.com/developers/docs/resources/user#user-object

## Table of contents

### Properties

- [accent_color](discordeno_gateway.DiscordUser.md#accent_color)
- [avatar](discordeno_gateway.DiscordUser.md#avatar)
- [banner](discordeno_gateway.DiscordUser.md#banner)
- [bot](discordeno_gateway.DiscordUser.md#bot)
- [discriminator](discordeno_gateway.DiscordUser.md#discriminator)
- [email](discordeno_gateway.DiscordUser.md#email)
- [flags](discordeno_gateway.DiscordUser.md#flags)
- [id](discordeno_gateway.DiscordUser.md#id)
- [locale](discordeno_gateway.DiscordUser.md#locale)
- [mfa_enabled](discordeno_gateway.DiscordUser.md#mfa_enabled)
- [premium_type](discordeno_gateway.DiscordUser.md#premium_type)
- [public_flags](discordeno_gateway.DiscordUser.md#public_flags)
- [system](discordeno_gateway.DiscordUser.md#system)
- [username](discordeno_gateway.DiscordUser.md#username)
- [verified](discordeno_gateway.DiscordUser.md#verified)

## Properties

### accent_color

• `Optional` **accent_color**: `number`

the user's banner color encoded as an integer representation of hexadecimal color code

#### Defined in

packages/types/dist/discord.d.ts:15

---

### avatar

• **avatar**: `null` \| `string`

The user's avatar hash

#### Defined in

packages/types/dist/discord.d.ts:21

---

### banner

• `Optional` **banner**: `string`

the user's banner, or null if unset

#### Defined in

packages/types/dist/discord.d.ts:33

---

### bot

• `Optional` **bot**: `boolean`

Whether the user belongs to an OAuth2 application

#### Defined in

packages/types/dist/discord.d.ts:23

---

### discriminator

• **discriminator**: `string`

The user's 4-digit discord-tag

#### Defined in

packages/types/dist/discord.d.ts:19

---

### email

• `Optional` **email**: `null` \| `string`

The user's email

#### Defined in

packages/types/dist/discord.d.ts:31

---

### flags

• `Optional` **flags**: [`UserFlags`](../enums/discordeno_gateway.UserFlags.md)

The flags on a user's account

#### Defined in

packages/types/dist/discord.d.ts:9

---

### id

• **id**: `string`

The user's id

#### Defined in

packages/types/dist/discord.d.ts:17

---

### locale

• `Optional` **locale**: `string`

The user's chosen language option

#### Defined in

packages/types/dist/discord.d.ts:7

---

### mfa_enabled

• `Optional` **mfa_enabled**: `boolean`

Whether the user has two factor enabled on their account

#### Defined in

packages/types/dist/discord.d.ts:27

---

### premium_type

• `Optional` **premium_type**: [`PremiumTypes`](../enums/discordeno_gateway.PremiumTypes.md)

The type of Nitro subscription on a user's account

#### Defined in

packages/types/dist/discord.d.ts:11

---

### public_flags

• `Optional` **public_flags**: [`UserFlags`](../enums/discordeno_gateway.UserFlags.md)

The public flags on a user's account

#### Defined in

packages/types/dist/discord.d.ts:13

---

### system

• `Optional` **system**: `boolean`

Whether the user is an Official Discord System user (part of the urgent message system)

#### Defined in

packages/types/dist/discord.d.ts:25

---

### username

• **username**: `string`

The user's username, not unique across the platform

#### Defined in

packages/types/dist/discord.d.ts:5

---

### verified

• `Optional` **verified**: `boolean`

Whether the email on this account has been verified

#### Defined in

packages/types/dist/discord.d.ts:29
