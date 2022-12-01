[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / LeakyBucket

# Interface: LeakyBucket

[@discordeno/gateway](../modules/discordeno_gateway.md).LeakyBucket

A Leaky Bucket.
Useful for rate limiting purposes.
This uses `performance.now()` instead of `Date.now()` for higher accuracy.

NOTE: This bucket is lazy, means it only updates when a related method is called.

## Table of contents

### Properties

- [acquire](discordeno_gateway.LeakyBucket.md#acquire)
- [allowAcquire](discordeno_gateway.LeakyBucket.md#allowacquire)
- [lastRefill](discordeno_gateway.LeakyBucket.md#lastrefill)
- [max](discordeno_gateway.LeakyBucket.md#max)
- [nextRefill](discordeno_gateway.LeakyBucket.md#nextrefill)
- [refillAmount](discordeno_gateway.LeakyBucket.md#refillamount)
- [refillInterval](discordeno_gateway.LeakyBucket.md#refillinterval)
- [tokens](discordeno_gateway.LeakyBucket.md#tokens)
- [tokensState](discordeno_gateway.LeakyBucket.md#tokensstate)
- [waiting](discordeno_gateway.LeakyBucket.md#waiting)

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

packages/utils/dist/bucket.d.ts:21

---

### allowAcquire

• `Private` **allowAcquire**: `boolean`

Internal state of whether currently it is allowed to acquire tokens.
DO NOT TOUCH THIS! Unless you know what you are doing ofc :P

#### Defined in

packages/utils/dist/bucket.d.ts:33

---

### lastRefill

• `Private` **lastRefill**: `number`

Internal track of when the last refill of tokens was.
DO NOT TOUCH THIS! Unless you know what you are doing ofc :P

#### Defined in

packages/utils/dist/bucket.d.ts:29

---

### max

• **max**: `number`

How many tokens this bucket can hold.

#### Defined in

packages/utils/dist/bucket.d.ts:10

---

### nextRefill

• **nextRefill**: () => `number`

#### Type declaration

▸ (): `number`

Returns the number of milliseconds until the next refill.

##### Returns

`number`

#### Defined in

packages/utils/dist/bucket.d.ts:23

---

### refillAmount

• **refillAmount**: `number`

Amount of tokens gained per interval.
If bigger than `max` it will be pressed to `max`.

#### Defined in

packages/utils/dist/bucket.d.ts:14

---

### refillInterval

• **refillInterval**: `number`

Interval at which the bucket gains tokens.

#### Defined in

packages/utils/dist/bucket.d.ts:16

---

### tokens

• **tokens**: () => `number`

#### Type declaration

▸ (): `number`

Current tokens in the bucket.

##### Returns

`number`

#### Defined in

packages/utils/dist/bucket.d.ts:25

---

### tokensState

• `Private` **tokensState**: `number`

Internal number of currently available tokens.
DO NOT TOUCH THIS! Unless you know what you are doing ofc :P

#### Defined in

packages/utils/dist/bucket.d.ts:37

---

### waiting

• `Private` **waiting**: (`_?`: `unknown`) => `void`[]

Internal array of promises necessary to guarantee no race conditions.
DO NOT TOUCH THIS! Unless you know what you are doing ofc :P

#### Defined in

packages/utils/dist/bucket.d.ts:41
