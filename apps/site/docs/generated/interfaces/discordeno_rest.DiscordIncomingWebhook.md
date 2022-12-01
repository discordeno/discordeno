[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/rest](../modules/discordeno_rest.md) / DiscordIncomingWebhook

# Interface: DiscordIncomingWebhook

[@discordeno/rest](../modules/discordeno_rest.md).DiscordIncomingWebhook

## Table of contents

### Properties

- [application_id](discordeno_rest.DiscordIncomingWebhook.md#application_id)
- [avatar](discordeno_rest.DiscordIncomingWebhook.md#avatar)
- [channel_id](discordeno_rest.DiscordIncomingWebhook.md#channel_id)
- [guild_id](discordeno_rest.DiscordIncomingWebhook.md#guild_id)
- [id](discordeno_rest.DiscordIncomingWebhook.md#id)
- [name](discordeno_rest.DiscordIncomingWebhook.md#name)
- [source_channel](discordeno_rest.DiscordIncomingWebhook.md#source_channel)
- [source_guild](discordeno_rest.DiscordIncomingWebhook.md#source_guild)
- [token](discordeno_rest.DiscordIncomingWebhook.md#token)
- [type](discordeno_rest.DiscordIncomingWebhook.md#type)
- [url](discordeno_rest.DiscordIncomingWebhook.md#url)
- [user](discordeno_rest.DiscordIncomingWebhook.md#user)

## Properties

### application_id

• **application_id**: `null` \| `string`

The bot/OAuth2 application that created this webhook

#### Defined in

packages/types/dist/discord.d.ts:399

---

### avatar

• **avatar**: `null` \| `string`

The default user avatar hash of the webhook

#### Defined in

packages/types/dist/discord.d.ts:397

---

### channel_id

• **channel_id**: `string`

The channel id this webhook is for

#### Defined in

packages/types/dist/discord.d.ts:391

---

### guild_id

• `Optional` **guild_id**: `string`

The guild id this webhook is for

#### Defined in

packages/types/dist/discord.d.ts:389

---

### id

• **id**: `string`

The id of the webhook

#### Defined in

packages/types/dist/discord.d.ts:387

---

### name

• **name**: `null` \| `string`

The default name of the webhook

#### Defined in

packages/types/dist/discord.d.ts:395

---

### source_channel

• `Optional` **source_channel**: `Partial`<[`DiscordChannel`](discordeno_rest.DiscordChannel.md)\>

The channel that this webhook is following (returned for Channel Follower Webhooks)

#### Defined in

packages/types/dist/discord.d.ts:403

---

### source_guild

• `Optional` **source_guild**: `Partial`<[`DiscordGuild`](discordeno_rest.DiscordGuild.md)\>

The guild of the channel that this webhook is following (returned for Channel Follower Webhooks)

#### Defined in

packages/types/dist/discord.d.ts:401

---

### token

• `Optional` **token**: `string`

The secure token of the webhook (returned for Incoming Webhooks)

#### Defined in

packages/types/dist/discord.d.ts:383

---

### type

• **type**: [`WebhookTypes`](../enums/discordeno_rest.WebhookTypes.md)

The type of the webhook

#### Defined in

packages/types/dist/discord.d.ts:381

---

### url

• `Optional` **url**: `string`

The url used for executing the webhook (returned by the webhooks OAuth2 flow)

#### Defined in

packages/types/dist/discord.d.ts:385

---

### user

• `Optional` **user**: [`DiscordUser`](discordeno_rest.DiscordUser.md)

The user this webhook was created by (not returned when getting a webhook with its token)

#### Defined in

packages/types/dist/discord.d.ts:393
