[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / RpcCloseEventCodes

# Enumeration: RpcCloseEventCodes

[@discordeno/bot](../modules/discordeno_bot.md).RpcCloseEventCodes

https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc

## Table of contents

### Enumeration Members

- [InvalidClientId](discordeno_bot.RpcCloseEventCodes.md#invalidclientid)
- [InvalidEncoding](discordeno_bot.RpcCloseEventCodes.md#invalidencoding)
- [InvalidOrigin](discordeno_bot.RpcCloseEventCodes.md#invalidorigin)
- [InvalidVersion](discordeno_bot.RpcCloseEventCodes.md#invalidversion)
- [RateLimited](discordeno_bot.RpcCloseEventCodes.md#ratelimited)
- [TokenRevoked](discordeno_bot.RpcCloseEventCodes.md#tokenrevoked)

## Enumeration Members

### InvalidClientId

• **InvalidClientId** = `4000`

You connected to the RPC server with an invalid client ID.

#### Defined in

packages/types/dist/shared.d.ts:711

---

### InvalidEncoding

• **InvalidEncoding** = `4005`

The encoding specified in the connection string was not valid.

#### Defined in

packages/types/dist/shared.d.ts:721

---

### InvalidOrigin

• **InvalidOrigin** = `4001`

You connected to the RPC server with an invalid origin.

#### Defined in

packages/types/dist/shared.d.ts:713

---

### InvalidVersion

• **InvalidVersion** = `4004`

The RPC Server version specified in the connection string was not valid.

#### Defined in

packages/types/dist/shared.d.ts:719

---

### RateLimited

• **RateLimited** = `4002`

You are being rate limited.

#### Defined in

packages/types/dist/shared.d.ts:715

---

### TokenRevoked

• **TokenRevoked** = `4003`

The OAuth2 token associated with a connection was revoked, get a new one!

#### Defined in

packages/types/dist/shared.d.ts:717
