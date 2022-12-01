[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordIncomingWebhook

# Interface: DiscordIncomingWebhook

[@discordeno/types](../modules/discordeno_types.md).DiscordIncomingWebhook

## Table of contents

### Properties

- [application_id](discordeno_types.DiscordIncomingWebhook.md#application_id)
- [avatar](discordeno_types.DiscordIncomingWebhook.md#avatar)
- [channel_id](discordeno_types.DiscordIncomingWebhook.md#channel_id)
- [guild_id](discordeno_types.DiscordIncomingWebhook.md#guild_id)
- [id](discordeno_types.DiscordIncomingWebhook.md#id)
- [name](discordeno_types.DiscordIncomingWebhook.md#name)
- [source_channel](discordeno_types.DiscordIncomingWebhook.md#source_channel)
- [source_guild](discordeno_types.DiscordIncomingWebhook.md#source_guild)
- [token](discordeno_types.DiscordIncomingWebhook.md#token)
- [type](discordeno_types.DiscordIncomingWebhook.md#type)
- [url](discordeno_types.DiscordIncomingWebhook.md#url)
- [user](discordeno_types.DiscordIncomingWebhook.md#user)

## Properties

### application_id

• **application_id**: `null` \| `string`

The bot/OAuth2 application that created this webhook

#### Defined in

[packages/types/src/discord.ts:498](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L498)

---

### avatar

• **avatar**: `null` \| `string`

The default user avatar hash of the webhook

#### Defined in

[packages/types/src/discord.ts:496](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L496)

---

### channel_id

• **channel_id**: `string`

The channel id this webhook is for

#### Defined in

[packages/types/src/discord.ts:490](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L490)

---

### guild_id

• `Optional` **guild_id**: `string`

The guild id this webhook is for

#### Defined in

[packages/types/src/discord.ts:488](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L488)

---

### id

• **id**: `string`

The id of the webhook

#### Defined in

[packages/types/src/discord.ts:486](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L486)

---

### name

• **name**: `null` \| `string`

The default name of the webhook

#### Defined in

[packages/types/src/discord.ts:494](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L494)

---

### source_channel

• `Optional` **source_channel**: `Partial`<[`DiscordChannel`](discordeno_types.DiscordChannel.md)\>

The channel that this webhook is following (returned for Channel Follower Webhooks)

#### Defined in

[packages/types/src/discord.ts:502](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L502)

---

### source_guild

• `Optional` **source_guild**: `Partial`<[`DiscordGuild`](discordeno_types.DiscordGuild.md)\>

The guild of the channel that this webhook is following (returned for Channel Follower Webhooks)

#### Defined in

[packages/types/src/discord.ts:500](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L500)

---

### token

• `Optional` **token**: `string`

The secure token of the webhook (returned for Incoming Webhooks)

#### Defined in

[packages/types/src/discord.ts:481](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L481)

---

### type

• **type**: [`WebhookTypes`](../enums/discordeno_types.WebhookTypes.md)

The type of the webhook

#### Defined in

[packages/types/src/discord.ts:479](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L479)

---

### url

• `Optional` **url**: `string`

The url used for executing the webhook (returned by the webhooks OAuth2 flow)

#### Defined in

[packages/types/src/discord.ts:483](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L483)

---

### user

• `Optional` **user**: [`DiscordUser`](discordeno_types.DiscordUser.md)

The user this webhook was created by (not returned when getting a webhook with its token)

#### Defined in

[packages/types/src/discord.ts:492](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L492)
