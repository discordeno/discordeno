[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordPresenceUpdate

# Interface: DiscordPresenceUpdate

[@discordeno/types](../modules/discordeno_types.md).DiscordPresenceUpdate

https://discord.com/developers/docs/topics/gateway#presence-update

## Table of contents

### Properties

- [activities](discordeno_types.DiscordPresenceUpdate.md#activities)
- [client_status](discordeno_types.DiscordPresenceUpdate.md#client_status)
- [guild_id](discordeno_types.DiscordPresenceUpdate.md#guild_id)
- [status](discordeno_types.DiscordPresenceUpdate.md#status)
- [user](discordeno_types.DiscordPresenceUpdate.md#user)

## Properties

### activities

• **activities**: [`DiscordActivity`](discordeno_types.DiscordActivity.md)[]

User's current activities

#### Defined in

[packages/types/src/discord.ts:802](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L802)

---

### client_status

• **client_status**: [`DiscordClientStatus`](discordeno_types.DiscordClientStatus.md)

User's platform-dependent status

#### Defined in

[packages/types/src/discord.ts:804](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L804)

---

### guild_id

• **guild_id**: `string`

id of the guild

#### Defined in

[packages/types/src/discord.ts:800](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L800)

---

### status

• **status**: `"idle"` \| `"dnd"` \| `"online"` \| `"offline"`

Either "idle", "dnd", "online", or "offline"

#### Defined in

[packages/types/src/discord.ts:796](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L796)

---

### user

• **user**: [`DiscordUser`](discordeno_types.DiscordUser.md)

The user presence is being updated for

#### Defined in

[packages/types/src/discord.ts:798](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L798)
