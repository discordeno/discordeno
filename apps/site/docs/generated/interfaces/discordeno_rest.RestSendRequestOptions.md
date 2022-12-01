[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/rest](../modules/discordeno_rest.md) / RestSendRequestOptions

# Interface: RestSendRequestOptions

[@discordeno/rest](../modules/discordeno_rest.md).RestSendRequestOptions

## Table of contents

### Properties

- [bucketId](discordeno_rest.RestSendRequestOptions.md#bucketid)
- [method](discordeno_rest.RestSendRequestOptions.md#method)
- [payload](discordeno_rest.RestSendRequestOptions.md#payload)
- [reject](discordeno_rest.RestSendRequestOptions.md#reject)
- [respond](discordeno_rest.RestSendRequestOptions.md#respond)
- [retryCount](discordeno_rest.RestSendRequestOptions.md#retrycount)
- [retryRequest](discordeno_rest.RestSendRequestOptions.md#retryrequest)
- [url](discordeno_rest.RestSendRequestOptions.md#url)

## Properties

### bucketId

• `Optional` **bucketId**: `string`

#### Defined in

[packages/rest/src/sendRequest.ts:9](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/rest/src/sendRequest.ts#L9)

---

### method

• **method**: [`RequestMethod`](../modules/discordeno_rest.md#requestmethod)

#### Defined in

[packages/rest/src/sendRequest.ts:8](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/rest/src/sendRequest.ts#L8)

---

### payload

• `Optional` **payload**: `Object`

#### Type declaration

| Name      | Type                          |
| :-------- | :---------------------------- |
| `body`    | `string` \| `FormData`        |
| `headers` | `Record`<`string`, `string`\> |

#### Defined in

[packages/rest/src/sendRequest.ts:14](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/rest/src/sendRequest.ts#L14)

---

### reject

• `Optional` **reject**: `Function`

#### Defined in

[packages/rest/src/sendRequest.ts:10](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/rest/src/sendRequest.ts#L10)

---

### respond

• `Optional` **respond**: `Function`

#### Defined in

[packages/rest/src/sendRequest.ts:11](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/rest/src/sendRequest.ts#L11)

---

### retryCount

• `Optional` **retryCount**: `number`

#### Defined in

[packages/rest/src/sendRequest.ts:13](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/rest/src/sendRequest.ts#L13)

---

### retryRequest

• `Optional` **retryRequest**: `Function`

#### Defined in

[packages/rest/src/sendRequest.ts:12](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/rest/src/sendRequest.ts#L12)

---

### url

• **url**: `string`

#### Defined in

[packages/rest/src/sendRequest.ts:7](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/rest/src/sendRequest.ts#L7)
