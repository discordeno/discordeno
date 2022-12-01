[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/utils](../modules/discordeno_utils.md) / CollectionSweeper

# Interface: CollectionSweeper<K, V\>

[@discordeno/utils](../modules/discordeno_utils.md).CollectionSweeper

## Type parameters

| Name |
| :--- |
| `K`  |
| `V`  |

## Table of contents

### Properties

- [bot](discordeno_utils.CollectionSweeper.md#bot)
- [filter](discordeno_utils.CollectionSweeper.md#filter)
- [interval](discordeno_utils.CollectionSweeper.md#interval)

## Properties

### bot

• `Optional` **bot**: [`PlaceHolderBot`](discordeno_utils.PlaceHolderBot.md)

The bot object itself

#### Defined in

[packages/utils/src/collection.ts:150](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/collection.ts#L150)

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

[packages/utils/src/collection.ts:146](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/collection.ts#L146)

---

### interval

• **interval**: `number`

The interval in which the sweeper should run

#### Defined in

[packages/utils/src/collection.ts:148](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/collection.ts#L148)
