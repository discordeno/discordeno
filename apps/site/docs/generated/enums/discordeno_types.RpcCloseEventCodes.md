[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / RpcCloseEventCodes

# Enumeration: RpcCloseEventCodes

[@discordeno/types](../modules/discordeno_types.md).RpcCloseEventCodes

https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc

## Table of contents

### Enumeration Members

- [InvalidClientId](discordeno_types.RpcCloseEventCodes.md#invalidclientid)
- [InvalidEncoding](discordeno_types.RpcCloseEventCodes.md#invalidencoding)
- [InvalidOrigin](discordeno_types.RpcCloseEventCodes.md#invalidorigin)
- [InvalidVersion](discordeno_types.RpcCloseEventCodes.md#invalidversion)
- [RateLimited](discordeno_types.RpcCloseEventCodes.md#ratelimited)
- [TokenRevoked](discordeno_types.RpcCloseEventCodes.md#tokenrevoked)

## Enumeration Members

### InvalidClientId

• **InvalidClientId** = `4000`

You connected to the RPC server with an invalid client ID.

#### Defined in

[packages/types/src/shared.ts:761](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L761)

---

### InvalidEncoding

• **InvalidEncoding** = `4005`

The encoding specified in the connection string was not valid.

#### Defined in

[packages/types/src/shared.ts:771](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L771)

---

### InvalidOrigin

• **InvalidOrigin** = `4001`

You connected to the RPC server with an invalid origin.

#### Defined in

[packages/types/src/shared.ts:763](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L763)

---

### InvalidVersion

• **InvalidVersion** = `4004`

The RPC Server version specified in the connection string was not valid.

#### Defined in

[packages/types/src/shared.ts:769](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L769)

---

### RateLimited

• **RateLimited** = `4002`

You are being rate limited.

#### Defined in

[packages/types/src/shared.ts:765](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L765)

---

### TokenRevoked

• **TokenRevoked** = `4003`

The OAuth2 token associated with a connection was revoked, get a new one!

#### Defined in

[packages/types/src/shared.ts:767](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L767)
