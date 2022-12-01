[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/utils](../modules/discordeno_utils.md) / LeakyBucket

# Interface: LeakyBucket

[@discordeno/utils](../modules/discordeno_utils.md).LeakyBucket

A Leaky Bucket.
Useful for rate limiting purposes.
This uses `performance.now()` instead of `Date.now()` for higher accuracy.

NOTE: This bucket is lazy, means it only updates when a related method is called.

## Table of contents

### Properties

- [acquire](discordeno_utils.LeakyBucket.md#acquire)
- [allowAcquire](discordeno_utils.LeakyBucket.md#allowacquire)
- [lastRefill](discordeno_utils.LeakyBucket.md#lastrefill)
- [max](discordeno_utils.LeakyBucket.md#max)
- [nextRefill](discordeno_utils.LeakyBucket.md#nextrefill)
- [refillAmount](discordeno_utils.LeakyBucket.md#refillamount)
- [refillInterval](discordeno_utils.LeakyBucket.md#refillinterval)
- [tokens](discordeno_utils.LeakyBucket.md#tokens)
- [tokensState](discordeno_utils.LeakyBucket.md#tokensstate)
- [waiting](discordeno_utils.LeakyBucket.md#waiting)

## Properties

### acquire

• **acquire**: (`amount`: `number`, `highPriority?`: `boolean`) => `Promise`<`void`\>

#### Type declaration

▸ (`amount`, `highPriority?`): `Promise`<`void`\>

Acquire tokens from the bucket.
Resolves when the tokens are acquired and available.

##### Parameters

| Name            | Type      | Description                                  |
| :-------------- | :-------- | :------------------------------------------- |
| `amount`        | `number`  | -                                            |
| `highPriority?` | `boolean` | Whether this acquire is should be done asap. |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/utils/src/bucket.ts:32](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/bucket.ts#L32)

---

### allowAcquire

• `Private` **allowAcquire**: `boolean`

Internal state of whether currently it is allowed to acquire tokens.
DO NOT TOUCH THIS! Unless you know what you are doing ofc :P

#### Defined in

[packages/utils/src/bucket.ts:52](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/bucket.ts#L52)

---

### lastRefill

• `Private` **lastRefill**: `number`

Internal track of when the last refill of tokens was.
DO NOT TOUCH THIS! Unless you know what you are doing ofc :P

#### Defined in

[packages/utils/src/bucket.ts:47](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/bucket.ts#L47)

---

### max

• **max**: `number`

How many tokens this bucket can hold.

#### Defined in

[packages/utils/src/bucket.ts:16](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/bucket.ts#L16)

---

### nextRefill

• **nextRefill**: () => `number`

#### Type declaration

▸ (): `number`

Returns the number of milliseconds until the next refill.

##### Returns

`number`

#### Defined in

[packages/utils/src/bucket.ts:35](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/bucket.ts#L35)

---

### refillAmount

• **refillAmount**: `number`

Amount of tokens gained per interval.
If bigger than `max` it will be pressed to `max`.

#### Defined in

[packages/utils/src/bucket.ts:20](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/bucket.ts#L20)

---

### refillInterval

• **refillInterval**: `number`

Interval at which the bucket gains tokens.

#### Defined in

[packages/utils/src/bucket.ts:22](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/bucket.ts#L22)

---

### tokens

• **tokens**: () => `number`

#### Type declaration

▸ (): `number`

Current tokens in the bucket.

##### Returns

`number`

#### Defined in

[packages/utils/src/bucket.ts:38](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/bucket.ts#L38)

---

### tokensState

• `Private` **tokensState**: `number`

Internal number of currently available tokens.
DO NOT TOUCH THIS! Unless you know what you are doing ofc :P

#### Defined in

[packages/utils/src/bucket.ts:57](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/bucket.ts#L57)

---

### waiting

• `Private` **waiting**: (`_?`: `unknown`) => `void`[]

Internal array of promises necessary to guarantee no race conditions.
DO NOT TOUCH THIS! Unless you know what you are doing ofc :P

#### Defined in

[packages/utils/src/bucket.ts:62](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/bucket.ts#L62)
