[discordeno-monorepo](../README.md) / [Modules](../modules.md) / @discordeno/gateway

# Module: @discordeno/gateway

## Table of contents

### Enumerations

- [ShardSocketCloseCodes](../enums/ShardSocketCloseCodes.md)
- [ShardState](../enums/ShardState.md)

### Classes

- [DiscordenoShard](../classes/DiscordenoShard.md)

### Interfaces

- [BotActivity](../interfaces/BotActivity.md)
- [BotStatusUpdate](../interfaces/BotStatusUpdate.md)
- [CreateGatewayManagerOptions](../interfaces/CreateGatewayManagerOptions.md)
- [GatewayManager](../interfaces/GatewayManager.md)
- [RequestMemberRequest](../interfaces/RequestMemberRequest.md)
- [ShardCreateOptions](../interfaces/ShardCreateOptions.md)
- [ShardEvents](../interfaces/ShardEvents.md)
- [ShardGatewayConfig](../interfaces/ShardGatewayConfig.md)
- [ShardHeart](../interfaces/ShardHeart.md)
- [ShardSocketRequest](../interfaces/ShardSocketRequest.md)
- [StatusUpdate](../interfaces/StatusUpdate.md)
- [UpdateVoiceState](../interfaces/UpdateVoiceState.md)

### Functions

- [createGatewayManager](md#creategatewaymanager)

## Functions

### createGatewayManager

▸ **createGatewayManager**(`options`): [`GatewayManager`](../interfaces/GatewayManager.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`CreateGatewayManagerOptions`](../interfaces/CreateGatewayManagerOptions.md) |

#### Returns

[`GatewayManager`](../interfaces/GatewayManager.md)

#### Defined in

[packages/gateway/src/manager.ts:7](https://github.com/discordeno/discordeno/blob/b8c25357/packages/gateway/src/manager.ts#L7)
