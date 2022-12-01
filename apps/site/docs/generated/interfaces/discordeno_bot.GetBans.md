[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / GetBans

# Interface: GetBans

[@discordeno/bot](../modules/discordeno_bot.md).GetBans

## Table of contents

### Properties

- [after](discordeno_bot.GetBans.md#after)
- [before](discordeno_bot.GetBans.md#before)
- [limit](discordeno_bot.GetBans.md#limit)

## Properties

### after

• `Optional` **after**: [`BigString`](../modules/discordeno_bot.md#bigstring)

Consider only users after given user id

#### Defined in

[packages/bot/src/helpers/guilds/getBans.ts:48](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/getBans.ts#L48)

---

### before

• `Optional` **before**: [`BigString`](../modules/discordeno_bot.md#bigstring)

Consider only users before given user id

#### Defined in

[packages/bot/src/helpers/guilds/getBans.ts:46](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/getBans.ts#L46)

---

### limit

• `Optional` **limit**: `number`

Number of users to return (up to maximum 1000). Default: 1000

#### Defined in

[packages/bot/src/helpers/guilds/getBans.ts:44](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/getBans.ts#L44)
