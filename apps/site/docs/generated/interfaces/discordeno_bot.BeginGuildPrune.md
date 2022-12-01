[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / BeginGuildPrune

# Interface: BeginGuildPrune

[@discordeno/bot](../modules/discordeno_bot.md).BeginGuildPrune

https://discord.com/developers/docs/resources/guild#begin-guild-prune

## Table of contents

### Properties

- [computePruneCount](discordeno_bot.BeginGuildPrune.md#computeprunecount)
- [days](discordeno_bot.BeginGuildPrune.md#days)
- [includeRoles](discordeno_bot.BeginGuildPrune.md#includeroles)

## Properties

### computePruneCount

• `Optional` **computePruneCount**: `boolean`

Whether 'pruned' is returned, discouraged for large guilds, default: true

#### Defined in

[packages/bot/src/helpers/members/pruneMembers.ts:50](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/members/pruneMembers.ts#L50)

---

### days

• `Optional` **days**: `number`

Number of days to prune (1 or more), default: 7

#### Defined in

[packages/bot/src/helpers/members/pruneMembers.ts:48](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/members/pruneMembers.ts#L48)

---

### includeRoles

• `Optional` **includeRoles**: `string`[]

Role(s) ro include, default: none

#### Defined in

[packages/bot/src/helpers/members/pruneMembers.ts:52](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/members/pruneMembers.ts#L52)
