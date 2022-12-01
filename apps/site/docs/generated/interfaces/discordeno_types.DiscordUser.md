[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordUser

# Interface: DiscordUser

[@discordeno/types](../modules/discordeno_types.md).DiscordUser

https://discord.com/developers/docs/resources/user#user-object

## Table of contents

### Properties

- [accent_color](discordeno_types.DiscordUser.md#accent_color)
- [avatar](discordeno_types.DiscordUser.md#avatar)
- [banner](discordeno_types.DiscordUser.md#banner)
- [bot](discordeno_types.DiscordUser.md#bot)
- [discriminator](discordeno_types.DiscordUser.md#discriminator)
- [email](discordeno_types.DiscordUser.md#email)
- [flags](discordeno_types.DiscordUser.md#flags)
- [id](discordeno_types.DiscordUser.md#id)
- [locale](discordeno_types.DiscordUser.md#locale)
- [mfa_enabled](discordeno_types.DiscordUser.md#mfa_enabled)
- [premium_type](discordeno_types.DiscordUser.md#premium_type)
- [public_flags](discordeno_types.DiscordUser.md#public_flags)
- [system](discordeno_types.DiscordUser.md#system)
- [username](discordeno_types.DiscordUser.md#username)
- [verified](discordeno_types.DiscordUser.md#verified)

## Properties

### accent_color

• `Optional` **accent_color**: `number`

the user's banner color encoded as an integer representation of hexadecimal color code

#### Defined in

[packages/types/src/discord.ts:60](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L60)

---

### avatar

• **avatar**: `null` \| `string`

The user's avatar hash

#### Defined in

[packages/types/src/discord.ts:67](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L67)

---

### banner

• `Optional` **banner**: `string`

the user's banner, or null if unset

#### Defined in

[packages/types/src/discord.ts:79](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L79)

---

### bot

• `Optional` **bot**: `boolean`

Whether the user belongs to an OAuth2 application

#### Defined in

[packages/types/src/discord.ts:69](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L69)

---

### discriminator

• **discriminator**: `string`

The user's 4-digit discord-tag

#### Defined in

[packages/types/src/discord.ts:65](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L65)

---

### email

• `Optional` **email**: `null` \| `string`

The user's email

#### Defined in

[packages/types/src/discord.ts:77](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L77)

---

### flags

• `Optional` **flags**: [`UserFlags`](../enums/discordeno_types.UserFlags.md)

The flags on a user's account

#### Defined in

[packages/types/src/discord.ts:54](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L54)

---

### id

• **id**: `string`

The user's id

#### Defined in

[packages/types/src/discord.ts:63](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L63)

---

### locale

• `Optional` **locale**: `string`

The user's chosen language option

#### Defined in

[packages/types/src/discord.ts:52](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L52)

---

### mfa_enabled

• `Optional` **mfa_enabled**: `boolean`

Whether the user has two factor enabled on their account

#### Defined in

[packages/types/src/discord.ts:73](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L73)

---

### premium_type

• `Optional` **premium_type**: [`PremiumTypes`](../enums/discordeno_types.PremiumTypes.md)

The type of Nitro subscription on a user's account

#### Defined in

[packages/types/src/discord.ts:56](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L56)

---

### public_flags

• `Optional` **public_flags**: [`UserFlags`](../enums/discordeno_types.UserFlags.md)

The public flags on a user's account

#### Defined in

[packages/types/src/discord.ts:58](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L58)

---

### system

• `Optional` **system**: `boolean`

Whether the user is an Official Discord System user (part of the urgent message system)

#### Defined in

[packages/types/src/discord.ts:71](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L71)

---

### username

• **username**: `string`

The user's username, not unique across the platform

#### Defined in

[packages/types/src/discord.ts:50](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L50)

---

### verified

• `Optional` **verified**: `boolean`

Whether the email on this account has been verified

#### Defined in

[packages/types/src/discord.ts:75](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L75)
