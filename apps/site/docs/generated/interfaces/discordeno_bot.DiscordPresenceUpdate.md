[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordPresenceUpdate

# Interface: DiscordPresenceUpdate

[@discordeno/bot](../modules/discordeno_bot.md).DiscordPresenceUpdate

https://discord.com/developers/docs/topics/gateway#presence-update

## Table of contents

### Properties

- [activities](discordeno_bot.DiscordPresenceUpdate.md#activities)
- [client_status](discordeno_bot.DiscordPresenceUpdate.md#client_status)
- [guild_id](discordeno_bot.DiscordPresenceUpdate.md#guild_id)
- [status](discordeno_bot.DiscordPresenceUpdate.md#status)
- [user](discordeno_bot.DiscordPresenceUpdate.md#user)

## Properties

### activities

• **activities**: [`DiscordActivity`](discordeno_bot.DiscordActivity.md)[]

User's current activities

#### Defined in

packages/types/dist/discord.d.ts:688

---

### client_status

• **client_status**: [`DiscordClientStatus`](discordeno_bot.DiscordClientStatus.md)

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

• **status**: `"idle"` \| `"dnd"` \| `"online"` \| `"offline"`

Either "idle", "dnd", "online", or "offline"

#### Defined in

packages/types/dist/discord.d.ts:682

---

### user

• **user**: [`DiscordUser`](discordeno_bot.DiscordUser.md)

The user presence is being updated for

#### Defined in

packages/types/dist/discord.d.ts:684
