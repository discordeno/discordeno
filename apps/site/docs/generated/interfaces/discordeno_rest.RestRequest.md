[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/rest](../modules/discordeno_rest.md) / RestRequest

# Interface: RestRequest

[@discordeno/rest](../modules/discordeno_rest.md).RestRequest

## Table of contents

### Properties

- [method](discordeno_rest.RestRequest.md#method)
- [reject](discordeno_rest.RestRequest.md#reject)
- [respond](discordeno_rest.RestRequest.md#respond)
- [url](discordeno_rest.RestRequest.md#url)

## Properties

### method

• **method**: [`RequestMethod`](../modules/discordeno_rest.md#requestmethod)

#### Defined in

[packages/rest/src/rest.ts:3](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/rest/src/rest.ts#L3)

---

### reject

• **reject**: (`payload`: [`RestRequestRejection`](discordeno_rest.RestRequestRejection.md)) => `unknown`

#### Type declaration

▸ (`payload`): `unknown`

##### Parameters

| Name      | Type                                                              |
| :-------- | :---------------------------------------------------------------- |
| `payload` | [`RestRequestRejection`](discordeno_rest.RestRequestRejection.md) |

##### Returns

`unknown`

#### Defined in

[packages/rest/src/rest.ts:5](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/rest/src/rest.ts#L5)

---

### respond

• **respond**: (`payload`: [`RestRequestResponse`](discordeno_rest.RestRequestResponse.md)) => `unknown`

#### Type declaration

▸ (`payload`): `unknown`

##### Parameters

| Name      | Type                                                            |
| :-------- | :-------------------------------------------------------------- |
| `payload` | [`RestRequestResponse`](discordeno_rest.RestRequestResponse.md) |

##### Returns

`unknown`

#### Defined in

[packages/rest/src/rest.ts:4](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/rest/src/rest.ts#L4)

---

### url

• **url**: `string`

#### Defined in

[packages/rest/src/rest.ts:2](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/rest/src/rest.ts#L2)
