[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / GetInvite

# Interface: GetInvite

[@discordeno/bot](../modules/discordeno_bot.md).GetInvite

https://discord.com/developers/docs/resources/invite#get-invite

## Table of contents

### Properties

- [scheduledEventId](discordeno_bot.GetInvite.md#scheduledeventid)
- [withCounts](discordeno_bot.GetInvite.md#withcounts)
- [withExpiration](discordeno_bot.GetInvite.md#withexpiration)

## Properties

### scheduledEventId

• `Optional` **scheduledEventId**: [`BigString`](../modules/discordeno_bot.md#bigstring)

the guild scheduled event to include with the invite

#### Defined in

[packages/bot/src/helpers/guilds/invites/getInvite.ts:69](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/invites/getInvite.ts#L69)

---

### withCounts

• `Optional` **withCounts**: `boolean`

Whether the invite should contain approximate member counts

#### Defined in

[packages/bot/src/helpers/guilds/invites/getInvite.ts:65](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/invites/getInvite.ts#L65)

---

### withExpiration

• `Optional` **withExpiration**: `boolean`

Whether the invite should contain the expiration date

#### Defined in

[packages/bot/src/helpers/guilds/invites/getInvite.ts:67](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/invites/getInvite.ts#L67)
