[discordeno-monorepo](../README.md) / [Modules](../modules.md) / @discordeno/rest

# Module: @discordeno/rest

## Table of contents

### Classes

- [Queue](../classes/Queue.md)

### Interfaces

- [CreateRequestBodyOptions](../interfaces/CreateRequestBodyOptions.md)
- [CreateRestManagerOptions](../interfaces/CreateRestManagerOptions.md)
- [CreateWebhook](../interfaces/CreateWebhook.md)
- [InvalidRequestBucket](../interfaces/InvalidRequestBucket.md)
- [InvalidRequestBucketOptions](../interfaces/InvalidRequestBucketOptions.md)
- [QueueOptions](../interfaces/QueueOptions.md)
- [RequestBody](../interfaces/RequestBody.md)
- [RestManager](../interfaces/RestManager.md)
- [RestRateLimitedPath](../interfaces/RestRateLimitedPath.md)
- [RestRequestRejection](../interfaces/RestRequestRejection.md)
- [RestRequestResponse](../interfaces/RestRequestResponse.md)
- [RestRoutes](../interfaces/RestRoutes.md)
- [SendRequestOptions](../interfaces/SendRequestOptions.md)
- [WebhookMessageEditor](../interfaces/WebhookMessageEditor.md)

### Type Aliases

- [ApiVersions](md#apiversions)
- [RequestMethods](md#requestmethods)

### Functions

- [createInvalidRequestBucket](md#createinvalidrequestbucket)
- [createRestManager](md#createrestmanager)

## Type Aliases

### ApiVersions

Ƭ **ApiVersions**: ``9`` \| ``10``

#### Defined in

[packages/rest/src/types.ts:2439](https://github.com/discordeno/discordeno/blob/b8c25357/packages/rest/src/types.ts#L2439)

___

### RequestMethods

Ƭ **RequestMethods**: ``"GET"`` \| ``"POST"`` \| ``"DELETE"`` \| ``"PATCH"`` \| ``"PUT"``

#### Defined in

[packages/rest/src/types.ts:2438](https://github.com/discordeno/discordeno/blob/b8c25357/packages/rest/src/types.ts#L2438)

## Functions

### createInvalidRequestBucket

▸ **createInvalidRequestBucket**(`options`): [`InvalidRequestBucket`](../interfaces/InvalidRequestBucket.md)

A invalid request bucket is used in a similar manner as a leaky bucket but a invalid request bucket can be refilled as needed.
It's purpose is to make sure the bot does not hit the limit to getting a 1 hr ban.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`InvalidRequestBucketOptions`](../interfaces/InvalidRequestBucketOptions.md) | The options used to configure this bucket. |

#### Returns

[`InvalidRequestBucket`](../interfaces/InvalidRequestBucket.md)

RefillingBucket

#### Defined in

[packages/rest/src/invalidBucket.ts:10](https://github.com/discordeno/discordeno/blob/b8c25357/packages/rest/src/invalidBucket.ts#L10)

___

### createRestManager

▸ **createRestManager**(`options`): [`RestManager`](../interfaces/RestManager.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`CreateRestManagerOptions`](../interfaces/CreateRestManagerOptions.md) |

#### Returns

[`RestManager`](../interfaces/RestManager.md)

#### Defined in

[packages/rest/src/manager.ts:72](https://github.com/discordeno/discordeno/blob/b8c25357/packages/rest/src/manager.ts#L72)
