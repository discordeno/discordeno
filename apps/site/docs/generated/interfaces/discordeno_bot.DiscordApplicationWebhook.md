[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordApplicationWebhook

# Interface: DiscordApplicationWebhook

[@discordeno/bot](../modules/discordeno_bot.md).DiscordApplicationWebhook

## Table of contents

### Properties

- [application_id](discordeno_bot.DiscordApplicationWebhook.md#application_id)
- [avatar](discordeno_bot.DiscordApplicationWebhook.md#avatar)
- [channel_id](discordeno_bot.DiscordApplicationWebhook.md#channel_id)
- [guild_id](discordeno_bot.DiscordApplicationWebhook.md#guild_id)
- [id](discordeno_bot.DiscordApplicationWebhook.md#id)
- [name](discordeno_bot.DiscordApplicationWebhook.md#name)
- [source_channel](discordeno_bot.DiscordApplicationWebhook.md#source_channel)
- [source_guild](discordeno_bot.DiscordApplicationWebhook.md#source_guild)
- [token](discordeno_bot.DiscordApplicationWebhook.md#token)
- [type](discordeno_bot.DiscordApplicationWebhook.md#type)
- [url](discordeno_bot.DiscordApplicationWebhook.md#url)
- [user](discordeno_bot.DiscordApplicationWebhook.md#user)

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

• `Optional` **source_channel**: `Partial`<[`DiscordChannel`](discordeno_bot.DiscordChannel.md)\>

The channel that this webhook is following (returned for Channel Follower Webhooks), field will be absent if the webhook creator has since lost access to the guild where the followed channel resides

#### Defined in

packages/types/dist/discord.d.ts:429

---

### source_guild

• `Optional` **source_guild**: `Partial`<[`DiscordGuild`](discordeno_bot.DiscordGuild.md)\>

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

• **type**: [`Application`](../enums/discordeno_bot.WebhookTypes.md#application)

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

• `Optional` **user**: [`DiscordUser`](discordeno_bot.DiscordUser.md)

The user this webhook was created by (not returned when getting a webhook with its token)

#### Defined in

packages/types/dist/discord.d.ts:419
