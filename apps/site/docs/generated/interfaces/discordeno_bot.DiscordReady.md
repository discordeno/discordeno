[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordReady

# Interface: DiscordReady

[@discordeno/bot](../modules/discordeno_bot.md).DiscordReady

https://discord.com/developers/docs/topics/gateway#ready

## Table of contents

### Properties

- [application](discordeno_bot.DiscordReady.md#application)
- [guilds](discordeno_bot.DiscordReady.md#guilds)
- [resume_gateway_url](discordeno_bot.DiscordReady.md#resume_gateway_url)
- [session_id](discordeno_bot.DiscordReady.md#session_id)
- [shard](discordeno_bot.DiscordReady.md#shard)
- [user](discordeno_bot.DiscordReady.md#user)
- [v](discordeno_bot.DiscordReady.md#v)

## Properties

### application

• **application**: `Partial`<[`DiscordApplication`](discordeno_bot.DiscordApplication.md)\> & `Pick`<[`DiscordApplication`](discordeno_bot.DiscordApplication.md), `"id"` \| `"flags"`\>

Contains id and flags

#### Defined in

packages/types/dist/discord.d.ts:1947

---

### guilds

• **guilds**: [`DiscordUnavailableGuild`](discordeno_bot.DiscordUnavailableGuild.md)[]

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

• **user**: [`DiscordUser`](discordeno_bot.DiscordUser.md)

Information about the user including email

#### Defined in

packages/types/dist/discord.d.ts:1937

---

### v

• **v**: `number`

Gateway version

#### Defined in

packages/types/dist/discord.d.ts:1935
