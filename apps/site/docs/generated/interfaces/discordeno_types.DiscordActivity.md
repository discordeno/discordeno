[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordActivity

# Interface: DiscordActivity

[@discordeno/types](../modules/discordeno_types.md).DiscordActivity

https://discord.com/developers/docs/topics/gateway#activity-object

## Table of contents

### Properties

- [application_id](discordeno_types.DiscordActivity.md#application_id)
- [assets](discordeno_types.DiscordActivity.md#assets)
- [buttons](discordeno_types.DiscordActivity.md#buttons)
- [created_at](discordeno_types.DiscordActivity.md#created_at)
- [details](discordeno_types.DiscordActivity.md#details)
- [emoji](discordeno_types.DiscordActivity.md#emoji)
- [flags](discordeno_types.DiscordActivity.md#flags)
- [instance](discordeno_types.DiscordActivity.md#instance)
- [name](discordeno_types.DiscordActivity.md#name)
- [party](discordeno_types.DiscordActivity.md#party)
- [secrets](discordeno_types.DiscordActivity.md#secrets)
- [state](discordeno_types.DiscordActivity.md#state)
- [timestamps](discordeno_types.DiscordActivity.md#timestamps)
- [type](discordeno_types.DiscordActivity.md#type)
- [url](discordeno_types.DiscordActivity.md#url)

## Properties

### application_id

• `Optional` **application_id**: `string`

Application id for the game

#### Defined in

[packages/types/src/discord.ts:901](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L901)

---

### assets

• `Optional` **assets**: [`DiscordActivityAssets`](discordeno_types.DiscordActivityAssets.md)

Images for the presence and their hover texts

#### Defined in

[packages/types/src/discord.ts:907](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L907)

---

### buttons

• `Optional` **buttons**: [`DiscordActivityButton`](discordeno_types.DiscordActivityButton.md)[]

The custom buttons shown in the Rich Presence (max 2)

#### Defined in

[packages/types/src/discord.ts:911](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L911)

---

### created_at

• **created_at**: `number`

Unix timestamp of when the activity was added to the user's session

#### Defined in

[packages/types/src/discord.ts:889](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L889)

---

### details

• `Optional` **details**: `null` \| `string`

What the player is currently doing

#### Defined in

[packages/types/src/discord.ts:891](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L891)

---

### emoji

• `Optional` **emoji**: `null` \| [`DiscordActivityEmoji`](discordeno_types.DiscordActivityEmoji.md)

The emoji used for a custom status

#### Defined in

[packages/types/src/discord.ts:903](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L903)

---

### flags

• `Optional` **flags**: `number`

Activity flags `OR`d together, describes what the payload includes

#### Defined in

[packages/types/src/discord.ts:897](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L897)

---

### instance

• `Optional` **instance**: `boolean`

Whether or not the activity is an instanced game session

#### Defined in

[packages/types/src/discord.ts:895](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L895)

---

### name

• **name**: `string`

The activity's name

#### Defined in

[packages/types/src/discord.ts:883](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L883)

---

### party

• `Optional` **party**: [`DiscordActivityParty`](discordeno_types.DiscordActivityParty.md)

Information for the current party of the player

#### Defined in

[packages/types/src/discord.ts:905](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L905)

---

### secrets

• `Optional` **secrets**: [`DiscordActivitySecrets`](discordeno_types.DiscordActivitySecrets.md)

Secrets for Rich Presence joining and spectating

#### Defined in

[packages/types/src/discord.ts:909](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L909)

---

### state

• `Optional` **state**: `null` \| `string`

The user's current party status

#### Defined in

[packages/types/src/discord.ts:893](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L893)

---

### timestamps

• `Optional` **timestamps**: [`DiscordActivityTimestamps`](discordeno_types.DiscordActivityTimestamps.md)

Unix timestamps for start and/or end of the game

#### Defined in

[packages/types/src/discord.ts:899](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L899)

---

### type

• **type**: [`ActivityTypes`](../enums/discordeno_types.ActivityTypes.md)

Activity type

#### Defined in

[packages/types/src/discord.ts:885](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L885)

---

### url

• `Optional` **url**: `null` \| `string`

Stream url, is validated when type is 1

#### Defined in

[packages/types/src/discord.ts:887](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L887)
