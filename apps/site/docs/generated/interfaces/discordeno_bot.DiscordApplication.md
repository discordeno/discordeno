[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordApplication

# Interface: DiscordApplication

[@discordeno/bot](../modules/discordeno_bot.md).DiscordApplication

https://discord.com/developers/docs/topics/oauth2#application-object

## Table of contents

### Properties

- [bot_public](discordeno_bot.DiscordApplication.md#bot_public)
- [bot_require_code_grant](discordeno_bot.DiscordApplication.md#bot_require_code_grant)
- [cover_image](discordeno_bot.DiscordApplication.md#cover_image)
- [custom_install_url](discordeno_bot.DiscordApplication.md#custom_install_url)
- [description](discordeno_bot.DiscordApplication.md#description)
- [flags](discordeno_bot.DiscordApplication.md#flags)
- [guild_id](discordeno_bot.DiscordApplication.md#guild_id)
- [icon](discordeno_bot.DiscordApplication.md#icon)
- [id](discordeno_bot.DiscordApplication.md#id)
- [install_params](discordeno_bot.DiscordApplication.md#install_params)
- [name](discordeno_bot.DiscordApplication.md#name)
- [owner](discordeno_bot.DiscordApplication.md#owner)
- [primary_sku_id](discordeno_bot.DiscordApplication.md#primary_sku_id)
- [privacy_policy_url](discordeno_bot.DiscordApplication.md#privacy_policy_url)
- [rpc_origins](discordeno_bot.DiscordApplication.md#rpc_origins)
- [slug](discordeno_bot.DiscordApplication.md#slug)
- [tags](discordeno_bot.DiscordApplication.md#tags)
- [team](discordeno_bot.DiscordApplication.md#team)
- [terms_of_service_url](discordeno_bot.DiscordApplication.md#terms_of_service_url)
- [verify_key](discordeno_bot.DiscordApplication.md#verify_key)

## Properties

### bot_public

• **bot_public**: `boolean`

When false only app owner can join the app's bot to guilds

#### Defined in

packages/types/dist/discord.d.ts:197

---

### bot_require_code_grant

• **bot_require_code_grant**: `boolean`

When true the app's bot will only join upon completion of the full oauth2 code grant flow

#### Defined in

packages/types/dist/discord.d.ts:199

---

### cover_image

• `Optional` **cover_image**: `string`

If this application is a game sold on Discord, this field will be the hash of the image on store embeds

#### Defined in

packages/types/dist/discord.d.ts:207

---

### custom_install_url

• `Optional` **custom_install_url**: `string`

the application's default custom authorization link, if enabled

#### Defined in

packages/types/dist/discord.d.ts:213

---

### description

• **description**: `string`

The description of the app

#### Defined in

packages/types/dist/discord.d.ts:177

---

### flags

• `Optional` **flags**: [`ApplicationFlags`](../enums/discordeno_bot.ApplicationFlags.md)

The application's public flags

#### Defined in

packages/types/dist/discord.d.ts:191

---

### guild_id

• `Optional` **guild_id**: `string`

If this application is a game sold on Discord, this field will be the guild to which it has been linked

#### Defined in

packages/types/dist/discord.d.ts:205

---

### icon

• **icon**: `null` \| `string`

The icon hash of the app

#### Defined in

packages/types/dist/discord.d.ts:195

---

### id

• **id**: `string`

The id of the app

#### Defined in

packages/types/dist/discord.d.ts:193

---

### install_params

• `Optional` **install_params**: [`DiscordInstallParams`](discordeno_bot.DiscordInstallParams.md)

settings for the application's default in-app authorization link, if enabled

#### Defined in

packages/types/dist/discord.d.ts:211

---

### name

• **name**: `string`

The name of the app

#### Defined in

packages/types/dist/discord.d.ts:175

---

### owner

• `Optional` **owner**: `Partial`<[`DiscordUser`](discordeno_bot.DiscordUser.md)\>

Partial user object containing info on the owner of the application

#### Defined in

packages/types/dist/discord.d.ts:201

---

### primary_sku_id

• `Optional` **primary_sku_id**: `string`

If this application is a game sold on Discord, this field will be the id of the "Game SKU" that is created, if exists

#### Defined in

packages/types/dist/discord.d.ts:187

---

### privacy_policy_url

• `Optional` **privacy_policy_url**: `string`

The url of the app's privacy policy

#### Defined in

packages/types/dist/discord.d.ts:183

---

### rpc_origins

• `Optional` **rpc_origins**: `string`[]

An array of rpc origin urls, if rpc is enabled

#### Defined in

packages/types/dist/discord.d.ts:179

---

### slug

• `Optional` **slug**: `string`

If this application is a game sold on Discord, this field will be the URL slug that links to the store page

#### Defined in

packages/types/dist/discord.d.ts:189

---

### tags

• `Optional` **tags**: `string`[]

up to 5 tags describing the content and functionality of the application

#### Defined in

packages/types/dist/discord.d.ts:209

---

### team

• **team**: `null` \| [`DiscordTeam`](discordeno_bot.DiscordTeam.md)

If the application belongs to a team, this will be a list of the members of that team

#### Defined in

packages/types/dist/discord.d.ts:203

---

### terms_of_service_url

• `Optional` **terms_of_service_url**: `string`

The url of the app's terms of service

#### Defined in

packages/types/dist/discord.d.ts:181

---

### verify_key

• **verify_key**: `string`

The hex encoded key for verification in interactions and the GameSDK's GetTicket

#### Defined in

packages/types/dist/discord.d.ts:185
