[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/rest](../modules/discordeno_rest.md) / DiscordReady

# Interface: DiscordReady

[@discordeno/rest](../modules/discordeno_rest.md).DiscordReady

https://discord.com/developers/docs/topics/gateway#ready

## Table of contents

### Properties

- [application](discordeno_rest.DiscordReady.md#application)
- [guilds](discordeno_rest.DiscordReady.md#guilds)
- [resume_gateway_url](discordeno_rest.DiscordReady.md#resume_gateway_url)
- [session_id](discordeno_rest.DiscordReady.md#session_id)
- [shard](discordeno_rest.DiscordReady.md#shard)
- [user](discordeno_rest.DiscordReady.md#user)
- [v](discordeno_rest.DiscordReady.md#v)

## Properties

### application

• **application**: `Partial`<[`DiscordApplication`](discordeno_rest.DiscordApplication.md)\> & `Pick`<[`DiscordApplication`](discordeno_rest.DiscordApplication.md), `"id"` \| `"flags"`\>

Contains id and flags

#### Defined in

packages/types/dist/discord.d.ts:1947

---

### guilds

• **guilds**: [`DiscordUnavailableGuild`](discordeno_rest.DiscordUnavailableGuild.md)[]

The guilds the user is in

#### Defined in

packages/types/dist/discord.d.ts:1939

---

### resume_gateway_url

• **resume_gateway_url**: `string`

Gateway url for resuming connections

#### Defined in

packages/types/dist/discord.d.ts:1943

---

### session_id

• **session_id**: `string`

Used for resuming connections

#### Defined in

packages/types/dist/discord.d.ts:1941

---

### shard

• `Optional` **shard**: [`number`, `number`]

The shard information associated with this session, if sent when identifying

#### Defined in

packages/types/dist/discord.d.ts:1945

---

### user

• **user**: [`DiscordUser`](discordeno_rest.DiscordUser.md)

Information about the user including email

#### Defined in

packages/types/dist/discord.d.ts:1937

---

### v

• **v**: `number`

Gateway version

#### Defined in

packages/types/dist/discord.d.ts:1935
