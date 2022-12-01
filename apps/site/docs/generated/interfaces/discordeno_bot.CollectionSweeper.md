[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / CollectionSweeper

# Interface: CollectionSweeper<K, V\>

[@discordeno/bot](../modules/discordeno_bot.md).CollectionSweeper

## Type parameters

| Name |
| :--- |
| `K`  |
| `V`  |

## Table of contents

### Properties

- [bot](discordeno_bot.CollectionSweeper.md#bot)
- [filter](discordeno_bot.CollectionSweeper.md#filter)
- [interval](discordeno_bot.CollectionSweeper.md#interval)

## Properties

### bot

• `Optional` **bot**: [`PlaceHolderBot`](discordeno_bot.PlaceHolderBot.md)

The bot object itself

#### Defined in

packages/utils/dist/collection.d.ts:38

---

### filter

• **filter**: (`value`: `V`, `key`: `K`, ...`args`: `any`[]) => `boolean`

#### Type declaration

▸ (`value`, `key`, ...`args`): `boolean`

The filter to determine whether an element should be deleted or not

##### Parameters

| Name      | Type    |
| :-------- | :------ |
| `value`   | `V`     |
| `key`     | `K`     |
| `...args` | `any`[] |

##### Returns

`boolean`

#### Defined in

packages/utils/dist/collection.d.ts:34

---

### interval

• **interval**: `number`

The interval in which the sweeper should run

#### Defined in

packages/utils/dist/collection.d.ts:36
