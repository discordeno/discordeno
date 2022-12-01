[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/rest](../modules/discordeno_rest.md) / Collection

# Class: Collection<K, V\>

[@discordeno/rest](../modules/discordeno_rest.md).Collection

## Type parameters

| Name |
| :--- |
| `K`  |
| `V`  |

## Hierarchy

- `Map`<`K`, `V`\>

  ↳ **`Collection`**

## Table of contents

### Constructors

- [constructor](discordeno_rest.Collection.md#constructor)

### Properties

- [[toStringTag]](discordeno_rest.Collection.md#[tostringtag])
- [maxSize](discordeno_rest.Collection.md#maxsize)
- [size](discordeno_rest.Collection.md#size)
- [sweeper](discordeno_rest.Collection.md#sweeper)
- [[species]](discordeno_rest.Collection.md#[species])

### Methods

- [[iterator]](discordeno_rest.Collection.md#[iterator])
- [array](discordeno_rest.Collection.md#array)
- [changeSweeperFilter](discordeno_rest.Collection.md#changesweeperfilter)
- [changeSweeperInterval](discordeno_rest.Collection.md#changesweeperinterval)
- [clear](discordeno_rest.Collection.md#clear)
- [delete](discordeno_rest.Collection.md#delete)
- [entries](discordeno_rest.Collection.md#entries)
- [every](discordeno_rest.Collection.md#every)
- [filter](discordeno_rest.Collection.md#filter)
- [find](discordeno_rest.Collection.md#find)
- [first](discordeno_rest.Collection.md#first)
- [forEach](discordeno_rest.Collection.md#foreach)
- [forceSet](discordeno_rest.Collection.md#forceset)
- [get](discordeno_rest.Collection.md#get)
- [has](discordeno_rest.Collection.md#has)
- [keys](discordeno_rest.Collection.md#keys)
- [last](discordeno_rest.Collection.md#last)
- [map](discordeno_rest.Collection.md#map)
- [random](discordeno_rest.Collection.md#random)
- [reduce](discordeno_rest.Collection.md#reduce)
- [set](discordeno_rest.Collection.md#set)
- [some](discordeno_rest.Collection.md#some)
- [startSweeper](discordeno_rest.Collection.md#startsweeper)
- [stopSweeper](discordeno_rest.Collection.md#stopsweeper)
- [values](discordeno_rest.Collection.md#values)

## Constructors

### constructor

• **new Collection**<`K`, `V`\>(`entries?`, `options?`)

#### Type parameters

| Name |
| :--- |
| `K`  |
| `V`  |

#### Parameters

| Name       | Type                                                                                 |
| :--------- | :----------------------------------------------------------------------------------- |
| `entries?` | `null` \| readonly readonly [`K`, `V`][] \| `Map`<`K`, `V`\>                         |
| `options?` | [`CollectionOptions`](../interfaces/discordeno_rest.CollectionOptions.md)<`K`, `V`\> |

#### Overrides

Map&lt;K, V\&gt;.constructor

#### Defined in

packages/utils/dist/collection.d.ts:9

## Properties

### [toStringTag]

• `Readonly` **[toStringTag]**: `string`

#### Inherited from

Map.\_\_@toStringTag@18621

#### Defined in

node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:135

---

### maxSize

• **maxSize**: `undefined` \| `number`

#### Defined in

packages/utils/dist/collection.d.ts:5

---

### size

• `Readonly` **size**: `number`

#### Inherited from

Map.size

#### Defined in

node_modules/typescript/lib/lib.es2015.collection.d.ts:48

---

### sweeper

• **sweeper**: `undefined` \| [`CollectionSweeper`](../interfaces/discordeno_rest.CollectionSweeper.md)<`K`, `V`\> & { `intervalId?`: `Timer` }

#### Defined in

packages/utils/dist/collection.d.ts:6

---

### [species]

▪ `Static` `Readonly` **[species]**: `MapConstructor`

#### Inherited from

Map.\_\_@species@18859

#### Defined in

node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:317

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`<[`K`, `V`]\>

Returns an iterable of entries in the map.

#### Returns

`IterableIterator`<[`K`, `V`]\>

#### Inherited from

Map.\_\_@iterator@18608

#### Defined in

node_modules/typescript/lib/lib.es2015.iterable.d.ts:121

---

### array

▸ **array**(): `V`[]

#### Returns

`V`[]

#### Defined in

packages/utils/dist/collection.d.ts:16

---

### changeSweeperFilter

▸ **changeSweeperFilter**(`newFilter`): `void`

#### Parameters

| Name        | Type                                                                                                                |
| :---------- | :------------------------------------------------------------------------------------------------------------------ |
| `newFilter` | (`value`: `V`, `key`: `K`, `bot`: [`PlaceHolderBot`](../interfaces/discordeno_rest.PlaceHolderBot.md)) => `boolean` |

#### Returns

`void`

#### Defined in

packages/utils/dist/collection.d.ts:13

---

### changeSweeperInterval

▸ **changeSweeperInterval**(`newInterval`): `void`

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `newInterval` | `number` |

#### Returns

`void`

#### Defined in

packages/utils/dist/collection.d.ts:12

---

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Inherited from

Map.clear

#### Defined in

node_modules/typescript/lib/lib.es2015.collection.d.ts:23

---

### delete

▸ **delete**(`key`): `boolean`

#### Parameters

| Name  | Type |
| :---- | :--- |
| `key` | `K`  |

#### Returns

`boolean`

true if an element in the Map existed and has been removed, or false if the element does not exist.

#### Inherited from

Map.delete

#### Defined in

node_modules/typescript/lib/lib.es2015.collection.d.ts:27

---

### entries

▸ **entries**(): `IterableIterator`<[`K`, `V`]\>

Returns an iterable of key, value pairs for every entry in the map.

#### Returns

`IterableIterator`<[`K`, `V`]\>

#### Inherited from

Map.entries

#### Defined in

node_modules/typescript/lib/lib.es2015.iterable.d.ts:126

---

### every

▸ **every**(`callback`): `boolean`

#### Parameters

| Name       | Type                                    |
| :--------- | :-------------------------------------- |
| `callback` | (`value`: `V`, `key`: `K`) => `boolean` |

#### Returns

`boolean`

#### Defined in

packages/utils/dist/collection.d.ts:25

---

### filter

▸ **filter**(`callback`): [`Collection`](discordeno_rest.Collection.md)<`K`, `V`\>

#### Parameters

| Name       | Type                                    |
| :--------- | :-------------------------------------- |
| `callback` | (`value`: `V`, `key`: `K`) => `boolean` |

#### Returns

[`Collection`](discordeno_rest.Collection.md)<`K`, `V`\>

#### Defined in

packages/utils/dist/collection.d.ts:22

---

### find

▸ **find**(`callback`): `undefined` \| `NonNullable`<`V`\>

#### Parameters

| Name       | Type                                    |
| :--------- | :-------------------------------------- |
| `callback` | (`value`: `V`, `key`: `K`) => `boolean` |

#### Returns

`undefined` \| `NonNullable`<`V`\>

#### Defined in

packages/utils/dist/collection.d.ts:21

---

### first

▸ **first**(): `undefined` \| `V`

Retrieve the value of the first element in this collection

#### Returns

`undefined` \| `V`

#### Defined in

packages/utils/dist/collection.d.ts:18

---

### forEach

▸ **forEach**(`callbackfn`, `thisArg?`): `void`

Executes a provided function once per each key/value pair in the Map, in insertion order.

#### Parameters

| Name         | Type                                                          |
| :----------- | :------------------------------------------------------------ |
| `callbackfn` | (`value`: `V`, `key`: `K`, `map`: `Map`<`K`, `V`\>) => `void` |
| `thisArg?`   | `any`                                                         |

#### Returns

`void`

#### Inherited from

Map.forEach

#### Defined in

node_modules/typescript/lib/lib.es2015.collection.d.ts:31

---

### forceSet

▸ **forceSet**(`key`, `value`): [`Collection`](discordeno_rest.Collection.md)<`K`, `V`\>

#### Parameters

| Name    | Type |
| :------ | :--- |
| `key`   | `K`  |
| `value` | `V`  |

#### Returns

[`Collection`](discordeno_rest.Collection.md)<`K`, `V`\>

#### Defined in

packages/utils/dist/collection.d.ts:15

---

### get

▸ **get**(`key`): `undefined` \| `V`

Returns a specified element from the Map object. If the value that is associated to the provided key is an object, then you will get a reference to that object and any change made to that object will effectively modify it inside the Map.

#### Parameters

| Name  | Type |
| :---- | :--- |
| `key` | `K`  |

#### Returns

`undefined` \| `V`

Returns the element associated with the specified key. If no element is associated with the specified key, undefined is returned.

#### Inherited from

Map.get

#### Defined in

node_modules/typescript/lib/lib.es2015.collection.d.ts:36

---

### has

▸ **has**(`key`): `boolean`

#### Parameters

| Name  | Type |
| :---- | :--- |
| `key` | `K`  |

#### Returns

`boolean`

boolean indicating whether an element with the specified key exists or not.

#### Inherited from

Map.has

#### Defined in

node_modules/typescript/lib/lib.es2015.collection.d.ts:40

---

### keys

▸ **keys**(): `IterableIterator`<`K`\>

Returns an iterable of keys in the map

#### Returns

`IterableIterator`<`K`\>

#### Inherited from

Map.keys

#### Defined in

node_modules/typescript/lib/lib.es2015.iterable.d.ts:131

---

### last

▸ **last**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Defined in

packages/utils/dist/collection.d.ts:19

---

### map

▸ **map**<`T`\>(`callback`): `T`[]

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name       | Type                              |
| :--------- | :-------------------------------- |
| `callback` | (`value`: `V`, `key`: `K`) => `T` |

#### Returns

`T`[]

#### Defined in

packages/utils/dist/collection.d.ts:23

---

### random

▸ **random**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Defined in

packages/utils/dist/collection.d.ts:20

---

### reduce

▸ **reduce**<`T`\>(`callback`, `initialValue?`): `T`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name            | Type                                                  |
| :-------------- | :---------------------------------------------------- |
| `callback`      | (`accumulator`: `T`, `value`: `V`, `key`: `K`) => `T` |
| `initialValue?` | `T`                                                   |

#### Returns

`T`

#### Defined in

packages/utils/dist/collection.d.ts:26

---

### set

▸ **set**(`key`, `value`): [`Collection`](discordeno_rest.Collection.md)<`K`, `V`\>

#### Parameters

| Name    | Type |
| :------ | :--- |
| `key`   | `K`  |
| `value` | `V`  |

#### Returns

[`Collection`](discordeno_rest.Collection.md)<`K`, `V`\>

#### Overrides

Map.set

#### Defined in

packages/utils/dist/collection.d.ts:14

---

### some

▸ **some**(`callback`): `boolean`

#### Parameters

| Name       | Type                                    |
| :--------- | :-------------------------------------- |
| `callback` | (`value`: `V`, `key`: `K`) => `boolean` |

#### Returns

`boolean`

#### Defined in

packages/utils/dist/collection.d.ts:24

---

### startSweeper

▸ **startSweeper**(`options`): `Timer`

#### Parameters

| Name      | Type                                                                                 |
| :-------- | :----------------------------------------------------------------------------------- |
| `options` | [`CollectionSweeper`](../interfaces/discordeno_rest.CollectionSweeper.md)<`K`, `V`\> |

#### Returns

`Timer`

#### Defined in

packages/utils/dist/collection.d.ts:10

---

### stopSweeper

▸ **stopSweeper**(): `void`

#### Returns

`void`

#### Defined in

packages/utils/dist/collection.d.ts:11

---

### values

▸ **values**(): `IterableIterator`<`V`\>

Returns an iterable of values in the map

#### Returns

`IterableIterator`<`V`\>

#### Inherited from

Map.values

#### Defined in

node_modules/typescript/lib/lib.es2015.iterable.d.ts:136
