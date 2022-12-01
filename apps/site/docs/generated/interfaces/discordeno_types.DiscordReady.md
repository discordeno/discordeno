[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordReady

# Interface: DiscordReady

[@discordeno/types](../modules/discordeno_types.md).DiscordReady

https://discord.com/developers/docs/topics/gateway#ready

## Table of contents

### Properties

- [application](discordeno_types.DiscordReady.md#application)
- [guilds](discordeno_types.DiscordReady.md#guilds)
- [resume_gateway_url](discordeno_types.DiscordReady.md#resume_gateway_url)
- [session_id](discordeno_types.DiscordReady.md#session_id)
- [shard](discordeno_types.DiscordReady.md#shard)
- [user](discordeno_types.DiscordReady.md#user)
- [v](discordeno_types.DiscordReady.md#v)

## Properties

### application

• **application**: `Partial`<[`DiscordApplication`](discordeno_types.DiscordApplication.md)\> & `Pick`<[`DiscordApplication`](discordeno_types.DiscordApplication.md), `"id"` \| `"flags"`\>

Contains id and flags

#### Defined in

[packages/types/src/discord.ts:2215](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2215)

---

### guilds

• **guilds**: [`DiscordUnavailableGuild`](discordeno_types.DiscordUnavailableGuild.md)[]

The guilds the user is in

#### Defined in

[packages/types/src/discord.ts:2207](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2207)

---

### resume_gateway_url

• **resume_gateway_url**: `string`

Gateway url for resuming connections

#### Defined in

[packages/types/src/discord.ts:2211](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2211)

---

### session_id

• **session_id**: `string`

Used for resuming connections

#### Defined in

[packages/types/src/discord.ts:2209](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2209)

---

### shard

• `Optional` **shard**: [`number`, `number`]

The shard information associated with this session, if sent when identifying

#### Defined in

[packages/types/src/discord.ts:2213](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2213)

---

### user

• **user**: [`DiscordUser`](discordeno_types.DiscordUser.md)

Information about the user including email

#### Defined in

[packages/types/src/discord.ts:2205](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2205)

---

### v

• **v**: `number`

Gateway version

#### Defined in

[packages/types/src/discord.ts:2203](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2203)
