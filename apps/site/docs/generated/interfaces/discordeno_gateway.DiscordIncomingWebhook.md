[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / DiscordIncomingWebhook

# Interface: DiscordIncomingWebhook

[@discordeno/gateway](../modules/discordeno_gateway.md).DiscordIncomingWebhook

## Table of contents

### Properties

- [application_id](discordeno_gateway.DiscordIncomingWebhook.md#application_id)
- [avatar](discordeno_gateway.DiscordIncomingWebhook.md#avatar)
- [channel_id](discordeno_gateway.DiscordIncomingWebhook.md#channel_id)
- [guild_id](discordeno_gateway.DiscordIncomingWebhook.md#guild_id)
- [id](discordeno_gateway.DiscordIncomingWebhook.md#id)
- [name](discordeno_gateway.DiscordIncomingWebhook.md#name)
- [source_channel](discordeno_gateway.DiscordIncomingWebhook.md#source_channel)
- [source_guild](discordeno_gateway.DiscordIncomingWebhook.md#source_guild)
- [token](discordeno_gateway.DiscordIncomingWebhook.md#token)
- [type](discordeno_gateway.DiscordIncomingWebhook.md#type)
- [url](discordeno_gateway.DiscordIncomingWebhook.md#url)
- [user](discordeno_gateway.DiscordIncomingWebhook.md#user)

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

• `Optional` **source_channel**: `Partial`<[`DiscordChannel`](discordeno_gateway.DiscordChannel.md)\>

The channel that this webhook is following (returned for Channel Follower Webhooks)

#### Defined in

packages/types/dist/discord.d.ts:403

---

### source_guild

• `Optional` **source_guild**: `Partial`<[`DiscordGuild`](discordeno_gateway.DiscordGuild.md)\>

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

• **type**: [`WebhookTypes`](../enums/discordeno_gateway.WebhookTypes.md)

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

• `Optional` **user**: [`DiscordUser`](discordeno_gateway.DiscordUser.md)

The user this webhook was created by (not returned when getting a webhook with its token)

#### Defined in

packages/types/dist/discord.d.ts:393
