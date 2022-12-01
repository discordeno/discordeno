[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordActivity

# Interface: DiscordActivity

[@discordeno/bot](../modules/discordeno_bot.md).DiscordActivity

https://discord.com/developers/docs/topics/gateway#activity-object

## Table of contents

### Properties

- [application_id](discordeno_bot.DiscordActivity.md#application_id)
- [assets](discordeno_bot.DiscordActivity.md#assets)
- [buttons](discordeno_bot.DiscordActivity.md#buttons)
- [created_at](discordeno_bot.DiscordActivity.md#created_at)
- [details](discordeno_bot.DiscordActivity.md#details)
- [emoji](discordeno_bot.DiscordActivity.md#emoji)
- [flags](discordeno_bot.DiscordActivity.md#flags)
- [instance](discordeno_bot.DiscordActivity.md#instance)
- [name](discordeno_bot.DiscordActivity.md#name)
- [party](discordeno_bot.DiscordActivity.md#party)
- [secrets](discordeno_bot.DiscordActivity.md#secrets)
- [state](discordeno_bot.DiscordActivity.md#state)
- [timestamps](discordeno_bot.DiscordActivity.md#timestamps)
- [type](discordeno_bot.DiscordActivity.md#type)
- [url](discordeno_bot.DiscordActivity.md#url)

## Properties

### application_id

• `Optional` **application_id**: `string`

Application id for the game

#### Defined in

packages/types/dist/discord.d.ts:778

---

### assets

• `Optional` **assets**: [`DiscordActivityAssets`](discordeno_bot.DiscordActivityAssets.md)

Images for the presence and their hover texts

#### Defined in

packages/types/dist/discord.d.ts:784

---

### buttons

• `Optional` **buttons**: [`DiscordActivityButton`](discordeno_bot.DiscordActivityButton.md)[]

The custom buttons shown in the Rich Presence (max 2)

#### Defined in

packages/types/dist/discord.d.ts:788

---

### created_at

• **created_at**: `number`

Unix timestamp of when the activity was added to the user's session

#### Defined in

packages/types/dist/discord.d.ts:766

---

### details

• `Optional` **details**: `null` \| `string`

What the player is currently doing

#### Defined in

packages/types/dist/discord.d.ts:768

---

### emoji

• `Optional` **emoji**: `null` \| [`DiscordActivityEmoji`](discordeno_bot.DiscordActivityEmoji.md)

The emoji used for a custom status

#### Defined in

packages/types/dist/discord.d.ts:780

---

### flags

• `Optional` **flags**: `number`

Activity flags `OR`d together, describes what the payload includes

#### Defined in

packages/types/dist/discord.d.ts:774

---

### instance

• `Optional` **instance**: `boolean`

Whether or not the activity is an instanced game session

#### Defined in

packages/types/dist/discord.d.ts:772

---

### name

• **name**: `string`

The activity's name

#### Defined in

packages/types/dist/discord.d.ts:760

---

### party

• `Optional` **party**: [`DiscordActivityParty`](discordeno_bot.DiscordActivityParty.md)

Information for the current party of the player

#### Defined in

packages/types/dist/discord.d.ts:782

---

### secrets

• `Optional` **secrets**: [`DiscordActivitySecrets`](discordeno_bot.DiscordActivitySecrets.md)

Secrets for Rich Presence joining and spectating

#### Defined in

packages/types/dist/discord.d.ts:786

---

### state

• `Optional` **state**: `null` \| `string`

The user's current party status

#### Defined in

packages/types/dist/discord.d.ts:770

---

### timestamps

• `Optional` **timestamps**: [`DiscordActivityTimestamps`](discordeno_bot.DiscordActivityTimestamps.md)

Unix timestamps for start and/or end of the game

#### Defined in

packages/types/dist/discord.d.ts:776

---

### type

• **type**: [`ActivityTypes`](../enums/discordeno_bot.ActivityTypes.md)

Activity type

#### Defined in

packages/types/dist/discord.d.ts:762

---

### url

• `Optional` **url**: `null` \| `string`

Stream url, is validated when type is 1

#### Defined in

packages/types/dist/discord.d.ts:764
