[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / HTTPResponseCodes

# Enumeration: HTTPResponseCodes

[@discordeno/types](../modules/discordeno_types.md).HTTPResponseCodes

https://discord.com/developers/docs/topics/opcodes-and-status-codes#http

## Table of contents

### Enumeration Members

- [BadRequest](discordeno_types.HTTPResponseCodes.md#badrequest)
- [Created](discordeno_types.HTTPResponseCodes.md#created)
- [Forbidden](discordeno_types.HTTPResponseCodes.md#forbidden)
- [GatewayUnavailable](discordeno_types.HTTPResponseCodes.md#gatewayunavailable)
- [MethodNotAllowed](discordeno_types.HTTPResponseCodes.md#methodnotallowed)
- [NoContent](discordeno_types.HTTPResponseCodes.md#nocontent)
- [NotFound](discordeno_types.HTTPResponseCodes.md#notfound)
- [NotModified](discordeno_types.HTTPResponseCodes.md#notmodified)
- [Ok](discordeno_types.HTTPResponseCodes.md#ok)
- [TooManyRequests](discordeno_types.HTTPResponseCodes.md#toomanyrequests)
- [Unauthorized](discordeno_types.HTTPResponseCodes.md#unauthorized)

## Enumeration Members

### BadRequest

• **BadRequest** = `400`

The request was improperly formatted, or the server couldn't understand it.

#### Defined in

[packages/types/src/shared.ts:961](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L961)

---

### Created

• **Created** = `201`

The entity was created successfully.

#### Defined in

[packages/types/src/shared.ts:955](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L955)

---

### Forbidden

• **Forbidden** = `403`

The `Authorization` token you passed did not have permission to the resource.

#### Defined in

[packages/types/src/shared.ts:965](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L965)

---

### GatewayUnavailable

• **GatewayUnavailable** = `502`

There was not a gateway available to process your request. Wait a bit and retry.

#### Defined in

[packages/types/src/shared.ts:973](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L973)

---

### MethodNotAllowed

• **MethodNotAllowed** = `405`

The HTTP method used is not valid for the location specified.

#### Defined in

[packages/types/src/shared.ts:969](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L969)

---

### NoContent

• **NoContent** = `204`

The request completed successfully but returned no content.

#### Defined in

[packages/types/src/shared.ts:957](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L957)

---

### NotFound

• **NotFound** = `404`

The resource at the location specified doesn't exist.

#### Defined in

[packages/types/src/shared.ts:967](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L967)

---

### NotModified

• **NotModified** = `304`

The entity was not modified (no action was taken).

#### Defined in

[packages/types/src/shared.ts:959](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L959)

---

### Ok

• **Ok** = `200`

The request completed successfully.

#### Defined in

[packages/types/src/shared.ts:953](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L953)

---

### TooManyRequests

• **TooManyRequests** = `429`

You are being rate limited, see [Rate Limits](https://discord.com/developers/docs/topics/rate-limits).

#### Defined in

[packages/types/src/shared.ts:971](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L971)

---

### Unauthorized

• **Unauthorized** = `401`

The `Authorization` header was missing or invalid.

#### Defined in

[packages/types/src/shared.ts:963](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L963)
