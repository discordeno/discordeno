[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / DiscordPresenceUpdate

# Interface: DiscordPresenceUpdate

[@discordeno/gateway](../modules/discordeno_gateway.md).DiscordPresenceUpdate

https://discord.com/developers/docs/topics/gateway#presence-update

## Table of contents

### Properties

- [activities](discordeno_gateway.DiscordPresenceUpdate.md#activities)
- [client_status](discordeno_gateway.DiscordPresenceUpdate.md#client_status)
- [guild_id](discordeno_gateway.DiscordPresenceUpdate.md#guild_id)
- [status](discordeno_gateway.DiscordPresenceUpdate.md#status)
- [user](discordeno_gateway.DiscordPresenceUpdate.md#user)

## Properties

### activities

• **activities**: [`DiscordActivity`](discordeno_gateway.DiscordActivity.md)[]

User's current activities

#### Defined in

packages/types/dist/discord.d.ts:688

---

### client_status

• **client_status**: [`DiscordClientStatus`](discordeno_gateway.DiscordClientStatus.md)

User's platform-dependent status

#### Defined in

packages/types/dist/discord.d.ts:690

---

### guild_id

• **guild_id**: `string`

id of the guild

#### Defined in

packages/types/dist/discord.d.ts:686

---

### status

• **status**: `"online"` \| `"dnd"` \| `"idle"` \| `"offline"`

Either "idle", "dnd", "online", or "offline"

#### Defined in

packages/types/dist/discord.d.ts:682

---

### user

• **user**: [`DiscordUser`](discordeno_gateway.DiscordUser.md)

The user presence is being updated for

#### Defined in

packages/types/dist/discord.d.ts:684
