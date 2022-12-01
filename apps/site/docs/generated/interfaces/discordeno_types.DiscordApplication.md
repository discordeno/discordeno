[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordApplication

# Interface: DiscordApplication

[@discordeno/types](../modules/discordeno_types.md).DiscordApplication

https://discord.com/developers/docs/topics/oauth2#application-object

## Table of contents

### Properties

- [bot_public](discordeno_types.DiscordApplication.md#bot_public)
- [bot_require_code_grant](discordeno_types.DiscordApplication.md#bot_require_code_grant)
- [cover_image](discordeno_types.DiscordApplication.md#cover_image)
- [custom_install_url](discordeno_types.DiscordApplication.md#custom_install_url)
- [description](discordeno_types.DiscordApplication.md#description)
- [flags](discordeno_types.DiscordApplication.md#flags)
- [guild_id](discordeno_types.DiscordApplication.md#guild_id)
- [icon](discordeno_types.DiscordApplication.md#icon)
- [id](discordeno_types.DiscordApplication.md#id)
- [install_params](discordeno_types.DiscordApplication.md#install_params)
- [name](discordeno_types.DiscordApplication.md#name)
- [owner](discordeno_types.DiscordApplication.md#owner)
- [primary_sku_id](discordeno_types.DiscordApplication.md#primary_sku_id)
- [privacy_policy_url](discordeno_types.DiscordApplication.md#privacy_policy_url)
- [rpc_origins](discordeno_types.DiscordApplication.md#rpc_origins)
- [slug](discordeno_types.DiscordApplication.md#slug)
- [tags](discordeno_types.DiscordApplication.md#tags)
- [team](discordeno_types.DiscordApplication.md#team)
- [terms_of_service_url](discordeno_types.DiscordApplication.md#terms_of_service_url)
- [verify_key](discordeno_types.DiscordApplication.md#verify_key)

## Properties

### bot_public

• **bot_public**: `boolean`

When false only app owner can join the app's bot to guilds

#### Defined in

[packages/types/src/discord.ts:276](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L276)

---

### bot_require_code_grant

• **bot_require_code_grant**: `boolean`

When true the app's bot will only join upon completion of the full oauth2 code grant flow

#### Defined in

[packages/types/src/discord.ts:278](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L278)

---

### cover_image

• `Optional` **cover_image**: `string`

If this application is a game sold on Discord, this field will be the hash of the image on store embeds

#### Defined in

[packages/types/src/discord.ts:286](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L286)

---

### custom_install_url

• `Optional` **custom_install_url**: `string`

the application's default custom authorization link, if enabled

#### Defined in

[packages/types/src/discord.ts:292](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L292)

---

### description

• **description**: `string`

The description of the app

#### Defined in

[packages/types/src/discord.ts:255](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L255)

---

### flags

• `Optional` **flags**: [`ApplicationFlags`](../enums/discordeno_types.ApplicationFlags.md)

The application's public flags

#### Defined in

[packages/types/src/discord.ts:269](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L269)

---

### guild_id

• `Optional` **guild_id**: `string`

If this application is a game sold on Discord, this field will be the guild to which it has been linked

#### Defined in

[packages/types/src/discord.ts:284](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L284)

---

### icon

• **icon**: `null` \| `string`

The icon hash of the app

#### Defined in

[packages/types/src/discord.ts:274](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L274)

---

### id

• **id**: `string`

The id of the app

#### Defined in

[packages/types/src/discord.ts:272](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L272)

---

### install_params

• `Optional` **install_params**: [`DiscordInstallParams`](discordeno_types.DiscordInstallParams.md)

settings for the application's default in-app authorization link, if enabled

#### Defined in

[packages/types/src/discord.ts:290](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L290)

---

### name

• **name**: `string`

The name of the app

#### Defined in

[packages/types/src/discord.ts:253](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L253)

---

### owner

• `Optional` **owner**: `Partial`<[`DiscordUser`](discordeno_types.DiscordUser.md)\>

Partial user object containing info on the owner of the application

#### Defined in

[packages/types/src/discord.ts:280](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L280)

---

### primary_sku_id

• `Optional` **primary_sku_id**: `string`

If this application is a game sold on Discord, this field will be the id of the "Game SKU" that is created, if exists

#### Defined in

[packages/types/src/discord.ts:265](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L265)

---

### privacy_policy_url

• `Optional` **privacy_policy_url**: `string`

The url of the app's privacy policy

#### Defined in

[packages/types/src/discord.ts:261](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L261)

---

### rpc_origins

• `Optional` **rpc_origins**: `string`[]

An array of rpc origin urls, if rpc is enabled

#### Defined in

[packages/types/src/discord.ts:257](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L257)

---

### slug

• `Optional` **slug**: `string`

If this application is a game sold on Discord, this field will be the URL slug that links to the store page

#### Defined in

[packages/types/src/discord.ts:267](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L267)

---

### tags

• `Optional` **tags**: `string`[]

up to 5 tags describing the content and functionality of the application

#### Defined in

[packages/types/src/discord.ts:288](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L288)

---

### team

• **team**: `null` \| [`DiscordTeam`](discordeno_types.DiscordTeam.md)

If the application belongs to a team, this will be a list of the members of that team

#### Defined in

[packages/types/src/discord.ts:282](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L282)

---

### terms_of_service_url

• `Optional` **terms_of_service_url**: `string`

The url of the app's terms of service

#### Defined in

[packages/types/src/discord.ts:259](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L259)

---

### verify_key

• **verify_key**: `string`

The hex encoded key for verification in interactions and the GameSDK's GetTicket

#### Defined in

[packages/types/src/discord.ts:263](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L263)
