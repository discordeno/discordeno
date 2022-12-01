[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / ListGuildMembers

# Interface: ListGuildMembers

[@discordeno/bot](../modules/discordeno_bot.md).ListGuildMembers

https://discord.com/developers/docs/resources/guild#list-guild-members

## Table of contents

### Properties

- [after](discordeno_bot.ListGuildMembers.md#after)
- [limit](discordeno_bot.ListGuildMembers.md#limit)

## Properties

### after

• `Optional` **after**: `string`

The highest user id in the previous page. Default: 0

#### Defined in

[packages/bot/src/helpers/members/getMembers.ts:53](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/members/getMembers.ts#L53)

---

### limit

• `Optional` **limit**: `number`

Max number of members to return (1-1000). Default: 1000

#### Defined in

[packages/bot/src/helpers/members/getMembers.ts:51](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/members/getMembers.ts#L51)
