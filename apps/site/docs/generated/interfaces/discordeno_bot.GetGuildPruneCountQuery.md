[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / GetGuildPruneCountQuery

# Interface: GetGuildPruneCountQuery

[@discordeno/bot](../modules/discordeno_bot.md).GetGuildPruneCountQuery

https://discord.com/developers/docs/resources/guild#get-guild-prune-count

## Table of contents

### Properties

- [days](discordeno_bot.GetGuildPruneCountQuery.md#days)
- [includeRoles](discordeno_bot.GetGuildPruneCountQuery.md#includeroles)

## Properties

### days

• `Optional` **days**: `number`

Number of days to count prune for (1 or more), default: 7

#### Defined in

[packages/bot/src/helpers/guilds/getPruneCount.ts:37](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/getPruneCount.ts#L37)

---

### includeRoles

• `Optional` **includeRoles**: `string` \| `string`[]

Role(s) to include, default: none

#### Defined in

[packages/bot/src/helpers/guilds/getPruneCount.ts:39](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/getPruneCount.ts#L39)
