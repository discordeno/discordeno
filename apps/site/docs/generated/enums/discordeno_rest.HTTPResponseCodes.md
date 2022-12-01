[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/rest](../modules/discordeno_rest.md) / HTTPResponseCodes

# Enumeration: HTTPResponseCodes

[@discordeno/rest](../modules/discordeno_rest.md).HTTPResponseCodes

https://discord.com/developers/docs/topics/opcodes-and-status-codes#http

## Table of contents

### Enumeration Members

- [BadRequest](discordeno_rest.HTTPResponseCodes.md#badrequest)
- [Created](discordeno_rest.HTTPResponseCodes.md#created)
- [Forbidden](discordeno_rest.HTTPResponseCodes.md#forbidden)
- [GatewayUnavailable](discordeno_rest.HTTPResponseCodes.md#gatewayunavailable)
- [MethodNotAllowed](discordeno_rest.HTTPResponseCodes.md#methodnotallowed)
- [NoContent](discordeno_rest.HTTPResponseCodes.md#nocontent)
- [NotFound](discordeno_rest.HTTPResponseCodes.md#notfound)
- [NotModified](discordeno_rest.HTTPResponseCodes.md#notmodified)
- [Ok](discordeno_rest.HTTPResponseCodes.md#ok)
- [TooManyRequests](discordeno_rest.HTTPResponseCodes.md#toomanyrequests)
- [Unauthorized](discordeno_rest.HTTPResponseCodes.md#unauthorized)

## Enumeration Members

### BadRequest

• **BadRequest** = `400`

The request was improperly formatted, or the server couldn't understand it.

#### Defined in

packages/types/dist/shared.d.ts:909

---

### Created

• **Created** = `201`

The entity was created successfully.

#### Defined in

packages/types/dist/shared.d.ts:903

---

### Forbidden

• **Forbidden** = `403`

The `Authorization` token you passed did not have permission to the resource.

#### Defined in

packages/types/dist/shared.d.ts:913

---

### GatewayUnavailable

• **GatewayUnavailable** = `502`

There was not a gateway available to process your request. Wait a bit and retry.

#### Defined in

packages/types/dist/shared.d.ts:921

---

### MethodNotAllowed

• **MethodNotAllowed** = `405`

The HTTP method used is not valid for the location specified.

#### Defined in

packages/types/dist/shared.d.ts:917

---

### NoContent

• **NoContent** = `204`

The request completed successfully but returned no content.

#### Defined in

packages/types/dist/shared.d.ts:905

---

### NotFound

• **NotFound** = `404`

The resource at the location specified doesn't exist.

#### Defined in

packages/types/dist/shared.d.ts:915

---

### NotModified

• **NotModified** = `304`

The entity was not modified (no action was taken).

#### Defined in

packages/types/dist/shared.d.ts:907

---

### Ok

• **Ok** = `200`

The request completed successfully.

#### Defined in

packages/types/dist/shared.d.ts:901

---

### TooManyRequests

• **TooManyRequests** = `429`

You are being rate limited, see [Rate Limits](https://discord.com/developers/docs/topics/rate-limits).

#### Defined in

packages/types/dist/shared.d.ts:919

---

### Unauthorized

• **Unauthorized** = `401`

The `Authorization` header was missing or invalid.

#### Defined in

packages/types/dist/shared.d.ts:911
