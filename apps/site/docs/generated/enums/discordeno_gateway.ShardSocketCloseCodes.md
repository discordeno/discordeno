[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / ShardSocketCloseCodes

# Enumeration: ShardSocketCloseCodes

[@discordeno/gateway](../modules/discordeno_gateway.md).ShardSocketCloseCodes

## Table of contents

### Enumeration Members

- [ReIdentifying](discordeno_gateway.ShardSocketCloseCodes.md#reidentifying)
- [Resharded](discordeno_gateway.ShardSocketCloseCodes.md#resharded)
- [ResumeClosingOldConnection](discordeno_gateway.ShardSocketCloseCodes.md#resumeclosingoldconnection)
- [Shutdown](discordeno_gateway.ShardSocketCloseCodes.md#shutdown)
- [TestingFinished](discordeno_gateway.ShardSocketCloseCodes.md#testingfinished)
- [ZombiedConnection](discordeno_gateway.ShardSocketCloseCodes.md#zombiedconnection)

## Enumeration Members

### ReIdentifying

• **ReIdentifying** = `3066`

Shard is re-identifying therefore the old connection needs to be closed.

#### Defined in

[packages/gateway/src/shard/types.ts:139](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/shard/types.ts#L139)

---

### Resharded

• **Resharded** = `3065`

Special close code reserved for Discordeno's zero-downtime resharding system.

#### Defined in

[packages/gateway/src/shard/types.ts:137](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/shard/types.ts#L137)

---

### ResumeClosingOldConnection

• **ResumeClosingOldConnection** = `3024`

A resume has been requested and therefore the old connection needs to be closed.

#### Defined in

[packages/gateway/src/shard/types.ts:129](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/shard/types.ts#L129)

---

### Shutdown

• **Shutdown** = `3000`

A regular Shard shutdown.

#### Defined in

[packages/gateway/src/shard/types.ts:127](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/shard/types.ts#L127)

---

### TestingFinished

• **TestingFinished** = `3064`

Discordeno's gateway tests hae been finished, therefore the Shard can be turned off.

#### Defined in

[packages/gateway/src/shard/types.ts:135](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/shard/types.ts#L135)

---

### ZombiedConnection

• **ZombiedConnection** = `3010`

Did not receive a heartbeat ACK in time.
Closing the shard and creating a new session.

#### Defined in

[packages/gateway/src/shard/types.ts:133](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/gateway/src/shard/types.ts#L133)
