[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/utils](../modules/discordeno_utils.md) / Collection

# Class: Collection<K, V\>

[@discordeno/utils](../modules/discordeno_utils.md).Collection

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

- [constructor](discordeno_utils.Collection.md#constructor)

### Properties

- [[toStringTag]](discordeno_utils.Collection.md#[tostringtag])
- [maxSize](discordeno_utils.Collection.md#maxsize)
- [size](discordeno_utils.Collection.md#size)
- [sweeper](discordeno_utils.Collection.md#sweeper)
- [[species]](discordeno_utils.Collection.md#[species])

### Methods

- [[iterator]](discordeno_utils.Collection.md#[iterator])
- [array](discordeno_utils.Collection.md#array)
- [changeSweeperFilter](discordeno_utils.Collection.md#changesweeperfilter)
- [changeSweeperInterval](discordeno_utils.Collection.md#changesweeperinterval)
- [clear](discordeno_utils.Collection.md#clear)
- [delete](discordeno_utils.Collection.md#delete)
- [entries](discordeno_utils.Collection.md#entries)
- [every](discordeno_utils.Collection.md#every)
- [filter](discordeno_utils.Collection.md#filter)
- [find](discordeno_utils.Collection.md#find)
- [first](discordeno_utils.Collection.md#first)
- [forEach](discordeno_utils.Collection.md#foreach)
- [forceSet](discordeno_utils.Collection.md#forceset)
- [get](discordeno_utils.Collection.md#get)
- [has](discordeno_utils.Collection.md#has)
- [keys](discordeno_utils.Collection.md#keys)
- [last](discordeno_utils.Collection.md#last)
- [map](discordeno_utils.Collection.md#map)
- [random](discordeno_utils.Collection.md#random)
- [reduce](discordeno_utils.Collection.md#reduce)
- [set](discordeno_utils.Collection.md#set)
- [some](discordeno_utils.Collection.md#some)
- [startSweeper](discordeno_utils.Collection.md#startsweeper)
- [stopSweeper](discordeno_utils.Collection.md#stopsweeper)
- [values](discordeno_utils.Collection.md#values)

## Constructors

### constructor

• **new Collection**<`K`, `V`\>(`entries?`, `options?`)

#### Type parameters

| Name |
| :--- |
| `K`  |
| `V`  |

#### Parameters

| Name       | Type                                                                                  |
| :--------- | :------------------------------------------------------------------------------------ |
| `entries?` | `null` \| `Map`<`K`, `V`\> \| readonly readonly [`K`, `V`][]                          |
| `options?` | [`CollectionOptions`](../interfaces/discordeno_utils.CollectionOptions.md)<`K`, `V`\> |

#### Overrides

Map&lt;K, V\&gt;.constructor

#### Defined in

[packages/utils/src/collection.ts:10](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/collection.ts#L10)

## Properties

### [toStringTag]

• `Readonly` **[toStringTag]**: `string`

#### Inherited from

Map.\_\_@toStringTag@21911

#### Defined in

node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:135

---

### maxSize

• **maxSize**: `undefined` \| `number`

#### Defined in

[packages/utils/src/collection.ts:7](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/collection.ts#L7)

---

### size

• `Readonly` **size**: `number`

#### Inherited from

Map.size

#### Defined in

node_modules/typescript/lib/lib.es2015.collection.d.ts:48

---

### sweeper

• **sweeper**: `undefined` \| [`CollectionSweeper`](../interfaces/discordeno_utils.CollectionSweeper.md)<`K`, `V`\> & { `intervalId?`: `Timer` }

#### Defined in

[packages/utils/src/collection.ts:8](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/collection.ts#L8)

---

### [species]

▪ `Static` `Readonly` **[species]**: `MapConstructor`

#### Inherited from

Map.\_\_@species@22275

#### Defined in

node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:317

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`<[`K`, `V`]\>

Returns an iterable of entries in the map.

#### Returns

`IterableIterator`<[`K`, `V`]\>

#### Inherited from

Map.\_\_@iterator@21913

#### Defined in

node_modules/typescript/lib/lib.es2015.iterable.d.ts:121

---

### array

▸ **array**(): `V`[]

#### Returns

`V`[]

#### Defined in

[packages/utils/src/collection.ts:65](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/collection.ts#L65)

---

### changeSweeperFilter

▸ **changeSweeperFilter**(`newFilter`): `void`

#### Parameters

| Name        | Type                                                                                                                 |
| :---------- | :------------------------------------------------------------------------------------------------------------------- |
| `newFilter` | (`value`: `V`, `key`: `K`, `bot`: [`PlaceHolderBot`](../interfaces/discordeno_utils.PlaceHolderBot.md)) => `boolean` |

#### Returns

`void`

#### Defined in

[packages/utils/src/collection.ts:46](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/collection.ts#L46)

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

[packages/utils/src/collection.ts:40](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/collection.ts#L40)

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

[packages/utils/src/collection.ts:118](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/collection.ts#L118)

---

### filter

▸ **filter**(`callback`): [`Collection`](discordeno_utils.Collection.md)<`K`, `V`\>

#### Parameters

| Name       | Type                                    |
| :--------- | :-------------------------------------- |
| `callback` | (`value`: `V`, `key`: `K`) => `boolean` |

#### Returns

[`Collection`](discordeno_utils.Collection.md)<`K`, `V`\>

#### Defined in

[packages/utils/src/collection.ts:91](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/collection.ts#L91)

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

[packages/utils/src/collection.ts:83](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/collection.ts#L83)

---

### first

▸ **first**(): `undefined` \| `V`

Retrieve the value of the first element in this collection

#### Returns

`undefined` \| `V`

#### Defined in

[packages/utils/src/collection.ts:70](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/collection.ts#L70)

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

▸ **forceSet**(`key`, `value`): [`Collection`](discordeno_utils.Collection.md)<`K`, `V`\>

#### Parameters

| Name    | Type |
| :------ | :--- |
| `key`   | `K`  |
| `value` | `V`  |

#### Returns

[`Collection`](discordeno_utils.Collection.md)<`K`, `V`\>

#### Defined in

[packages/utils/src/collection.ts:61](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/collection.ts#L61)

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

[packages/utils/src/collection.ts:74](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/collection.ts#L74)

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

[packages/utils/src/collection.ts:100](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/collection.ts#L100)

---

### random

▸ **random**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Defined in

[packages/utils/src/collection.ts:78](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/collection.ts#L78)

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

[packages/utils/src/collection.ts:127](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/collection.ts#L127)

---

### set

▸ **set**(`key`, `value`): [`Collection`](discordeno_utils.Collection.md)<`K`, `V`\>

#### Parameters

| Name    | Type |
| :------ | :--- |
| `key`   | `K`  |
| `value` | `V`  |

#### Returns

[`Collection`](discordeno_utils.Collection.md)<`K`, `V`\>

#### Overrides

Map.set

#### Defined in

[packages/utils/src/collection.ts:52](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/collection.ts#L52)

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

[packages/utils/src/collection.ts:109](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/collection.ts#L109)

---

### startSweeper

▸ **startSweeper**(`options`): `Timer`

#### Parameters

| Name      | Type                                                                                  |
| :-------- | :------------------------------------------------------------------------------------ |
| `options` | [`CollectionSweeper`](../interfaces/discordeno_utils.CollectionSweeper.md)<`K`, `V`\> |

#### Returns

`Timer`

#### Defined in

[packages/utils/src/collection.ts:20](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/collection.ts#L20)

---

### stopSweeper

▸ **stopSweeper**(): `void`

#### Returns

`void`

#### Defined in

[packages/utils/src/collection.ts:36](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/collection.ts#L36)

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
