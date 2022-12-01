[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordApplicationWebhook

# Interface: DiscordApplicationWebhook

[@discordeno/types](../modules/discordeno_types.md).DiscordApplicationWebhook

## Table of contents

### Properties

- [application_id](discordeno_types.DiscordApplicationWebhook.md#application_id)
- [avatar](discordeno_types.DiscordApplicationWebhook.md#avatar)
- [channel_id](discordeno_types.DiscordApplicationWebhook.md#channel_id)
- [guild_id](discordeno_types.DiscordApplicationWebhook.md#guild_id)
- [id](discordeno_types.DiscordApplicationWebhook.md#id)
- [name](discordeno_types.DiscordApplicationWebhook.md#name)
- [source_channel](discordeno_types.DiscordApplicationWebhook.md#source_channel)
- [source_guild](discordeno_types.DiscordApplicationWebhook.md#source_guild)
- [token](discordeno_types.DiscordApplicationWebhook.md#token)
- [type](discordeno_types.DiscordApplicationWebhook.md#type)
- [url](discordeno_types.DiscordApplicationWebhook.md#url)
- [user](discordeno_types.DiscordApplicationWebhook.md#user)

## Properties

### application_id

• **application_id**: `null` \| `string`

The bot/OAuth2 application that created this webhook

#### Defined in

[packages/types/src/discord.ts:526](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L526)

---

### avatar

• **avatar**: `null` \| `string`

The default user avatar hash of the webhook

#### Defined in

[packages/types/src/discord.ts:524](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L524)

---

### channel_id

• `Optional` **channel_id**: `null` \| `string`

The channel id this webhook is for

#### Defined in

[packages/types/src/discord.ts:518](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L518)

---

### guild_id

• `Optional` **guild_id**: `null` \| `string`

The guild id this webhook is for

#### Defined in

[packages/types/src/discord.ts:516](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L516)

---

### id

• **id**: `string`

The id of the webhook

#### Defined in

[packages/types/src/discord.ts:514](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L514)

---

### name

• **name**: `null` \| `string`

The default name of the webhook

#### Defined in

[packages/types/src/discord.ts:522](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L522)

---

### source_channel

• `Optional` **source_channel**: `Partial`<[`DiscordChannel`](discordeno_types.DiscordChannel.md)\>

The channel that this webhook is following (returned for Channel Follower Webhooks), field will be absent if the webhook creator has since lost access to the guild where the followed channel resides

#### Defined in

[packages/types/src/discord.ts:530](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L530)

---

### source_guild

• `Optional` **source_guild**: `Partial`<[`DiscordGuild`](discordeno_types.DiscordGuild.md)\>

The guild of the channel that this webhook is following (returned for Channel Follower Webhooks), field will be absent if the webhook creator has since lost access to the guild where the followed channel resides

#### Defined in

[packages/types/src/discord.ts:528](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L528)

---

### token

• `Optional` **token**: `string`

The secure token of the webhook (returned for Incoming Webhooks)

#### Defined in

[packages/types/src/discord.ts:509](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L509)

---

### type

• **type**: [`Application`](../enums/discordeno_types.WebhookTypes.md#application)

The type of the webhook

#### Defined in

[packages/types/src/discord.ts:507](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L507)

---

### url

• `Optional` **url**: `string`

The url used for executing the webhook (returned by the webhooks OAuth2 flow)

#### Defined in

[packages/types/src/discord.ts:511](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L511)

---

### user

• `Optional` **user**: [`DiscordUser`](discordeno_types.DiscordUser.md)

The user this webhook was created by (not returned when getting a webhook with its token)

#### Defined in

[packages/types/src/discord.ts:520](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L520)
