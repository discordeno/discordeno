[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / GetScheduledEventUsers

# Interface: GetScheduledEventUsers

[@discordeno/bot](../modules/discordeno_bot.md).GetScheduledEventUsers

## Table of contents

### Properties

- [after](discordeno_bot.GetScheduledEventUsers.md#after)
- [before](discordeno_bot.GetScheduledEventUsers.md#before)
- [limit](discordeno_bot.GetScheduledEventUsers.md#limit)
- [withMember](discordeno_bot.GetScheduledEventUsers.md#withmember)

## Properties

### after

• `Optional` **after**: [`BigString`](../modules/discordeno_bot.md#bigstring)

consider only users after given user id. If both before and after are provided, only before is respected. Fetching users in-between before and after is not supported.

#### Defined in

[packages/bot/src/helpers/guilds/events/getScheduledEventUsers.ts:91](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/events/getScheduledEventUsers.ts#L91)

---

### before

• `Optional` **before**: [`BigString`](../modules/discordeno_bot.md#bigstring)

consider only users before given user id

#### Defined in

[packages/bot/src/helpers/guilds/events/getScheduledEventUsers.ts:89](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/events/getScheduledEventUsers.ts#L89)

---

### limit

• `Optional` **limit**: `number`

number of users to return (up to maximum 100), defaults to 100

#### Defined in

[packages/bot/src/helpers/guilds/events/getScheduledEventUsers.ts:85](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/events/getScheduledEventUsers.ts#L85)

---

### withMember

• `Optional` **withMember**: `boolean`

whether to also have member objects provided, defaults to false

#### Defined in

[packages/bot/src/helpers/guilds/events/getScheduledEventUsers.ts:87](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/events/getScheduledEventUsers.ts#L87)
