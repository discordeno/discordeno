[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / DiscordApplicationWebhook

# Interface: DiscordApplicationWebhook

[@discordeno/gateway](../modules/discordeno_gateway.md).DiscordApplicationWebhook

## Table of contents

### Properties

- [application_id](discordeno_gateway.DiscordApplicationWebhook.md#application_id)
- [avatar](discordeno_gateway.DiscordApplicationWebhook.md#avatar)
- [channel_id](discordeno_gateway.DiscordApplicationWebhook.md#channel_id)
- [guild_id](discordeno_gateway.DiscordApplicationWebhook.md#guild_id)
- [id](discordeno_gateway.DiscordApplicationWebhook.md#id)
- [name](discordeno_gateway.DiscordApplicationWebhook.md#name)
- [source_channel](discordeno_gateway.DiscordApplicationWebhook.md#source_channel)
- [source_guild](discordeno_gateway.DiscordApplicationWebhook.md#source_guild)
- [token](discordeno_gateway.DiscordApplicationWebhook.md#token)
- [type](discordeno_gateway.DiscordApplicationWebhook.md#type)
- [url](discordeno_gateway.DiscordApplicationWebhook.md#url)
- [user](discordeno_gateway.DiscordApplicationWebhook.md#user)

## Properties

### application_id

• **application_id**: `null` \| `string`

The bot/OAuth2 application that created this webhook

#### Defined in

packages/types/dist/discord.d.ts:425

---

### avatar

• **avatar**: `null` \| `string`

The default user avatar hash of the webhook

#### Defined in

packages/types/dist/discord.d.ts:423

---

### channel_id

• `Optional` **channel_id**: `null` \| `string`

The channel id this webhook is for

#### Defined in

packages/types/dist/discord.d.ts:417

---

### guild_id

• `Optional` **guild_id**: `null` \| `string`

The guild id this webhook is for

#### Defined in

packages/types/dist/discord.d.ts:415

---

### id

• **id**: `string`

The id of the webhook

#### Defined in

packages/types/dist/discord.d.ts:413

---

### name

• **name**: `null` \| `string`

The default name of the webhook

#### Defined in

packages/types/dist/discord.d.ts:421

---

### source_channel

• `Optional` **source_channel**: `Partial`<[`DiscordChannel`](discordeno_gateway.DiscordChannel.md)\>

The channel that this webhook is following (returned for Channel Follower Webhooks), field will be absent if the webhook creator has since lost access to the guild where the followed channel resides

#### Defined in

packages/types/dist/discord.d.ts:429

---

### source_guild

• `Optional` **source_guild**: `Partial`<[`DiscordGuild`](discordeno_gateway.DiscordGuild.md)\>

The guild of the channel that this webhook is following (returned for Channel Follower Webhooks), field will be absent if the webhook creator has since lost access to the guild where the followed channel resides

#### Defined in

packages/types/dist/discord.d.ts:427

---

### token

• `Optional` **token**: `string`

The secure token of the webhook (returned for Incoming Webhooks)

#### Defined in

packages/types/dist/discord.d.ts:409

---

### type

• **type**: [`Application`](../enums/discordeno_gateway.WebhookTypes.md#application)

The type of the webhook

#### Defined in

packages/types/dist/discord.d.ts:407

---

### url

• `Optional` **url**: `string`

The url used for executing the webhook (returned by the webhooks OAuth2 flow)

#### Defined in

packages/types/dist/discord.d.ts:411

---

### user

• `Optional` **user**: [`DiscordUser`](discordeno_gateway.DiscordUser.md)

The user this webhook was created by (not returned when getting a webhook with its token)

#### Defined in

packages/types/dist/discord.d.ts:419
