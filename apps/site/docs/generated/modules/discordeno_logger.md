[discordeno-monorepo](../README.md) / [Modules](../modules.md) / @discordeno/logger

# Module: @discordeno/logger

## Table of contents

### References

- [default](discordeno_logger.md#default)

### Enumerations

- [LogLevels](../enums/discordeno_logger.LogLevels.md)

### Variables

- [log](discordeno_logger.md#log)

### Functions

- [createLogger](discordeno_logger.md#createlogger)
- [logger](discordeno_logger.md#logger)

## References

### default

Renames and re-exports [log](discordeno_logger.md#log)

## Variables

### log

• `Const` **log**: `Object`

#### Type declaration

| Name       | Type                                                                                            |
| :--------- | :---------------------------------------------------------------------------------------------- |
| `debug`    | (...`args`: `any`[]) => `void`                                                                  |
| `error`    | (...`args`: `any`[]) => `void`                                                                  |
| `fatal`    | (...`args`: `any`[]) => `void`                                                                  |
| `info`     | (...`args`: `any`[]) => `void`                                                                  |
| `log`      | (`level`: [`LogLevels`](../enums/discordeno_logger.LogLevels.md), ...`args`: `any`[]) => `void` |
| `setLevel` | (`level`: [`LogLevels`](../enums/discordeno_logger.LogLevels.md)) => `void`                     |
| `warn`     | (...`args`: `any`[]) => `void`                                                                  |

#### Defined in

[packages/logger/src/index.ts:108](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/logger/src/index.ts#L108)

## Functions

### createLogger

▸ **createLogger**(`__namedParameters?`): `Object`

#### Parameters

| Name                          | Type                                                   |
| :---------------------------- | :----------------------------------------------------- |
| `__namedParameters`           | `Object`                                               |
| `__namedParameters.logLevel?` | [`LogLevels`](../enums/discordeno_logger.LogLevels.md) |
| `__namedParameters.name?`     | `string`                                               |

#### Returns

`Object`

| Name       | Type                                                                                            |
| :--------- | :---------------------------------------------------------------------------------------------- |
| `debug`    | (...`args`: `any`[]) => `void`                                                                  |
| `error`    | (...`args`: `any`[]) => `void`                                                                  |
| `fatal`    | (...`args`: `any`[]) => `void`                                                                  |
| `info`     | (...`args`: `any`[]) => `void`                                                                  |
| `log`      | (`level`: [`LogLevels`](../enums/discordeno_logger.LogLevels.md), ...`args`: `any`[]) => `void` |
| `setLevel` | (`level`: [`LogLevels`](../enums/discordeno_logger.LogLevels.md)) => `void`                     |
| `warn`     | (...`args`: `any`[]) => `void`                                                                  |

#### Defined in

[packages/logger/src/index.ts:28](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/logger/src/index.ts#L28)

---

### logger

▸ **logger**(`__namedParameters?`): `Object`

#### Parameters

| Name                          | Type                                                   |
| :---------------------------- | :----------------------------------------------------- |
| `__namedParameters`           | `Object`                                               |
| `__namedParameters.logLevel?` | [`LogLevels`](../enums/discordeno_logger.LogLevels.md) |
| `__namedParameters.name?`     | `string`                                               |

#### Returns

`Object`

| Name       | Type                                                                                            |
| :--------- | :---------------------------------------------------------------------------------------------- |
| `debug`    | (...`args`: `any`[]) => `void`                                                                  |
| `error`    | (...`args`: `any`[]) => `void`                                                                  |
| `fatal`    | (...`args`: `any`[]) => `void`                                                                  |
| `info`     | (...`args`: `any`[]) => `void`                                                                  |
| `log`      | (`level`: [`LogLevels`](../enums/discordeno_logger.LogLevels.md), ...`args`: `any`[]) => `void` |
| `setLevel` | (`level`: [`LogLevels`](../enums/discordeno_logger.LogLevels.md)) => `void`                     |
| `warn`     | (...`args`: `any`[]) => `void`                                                                  |

#### Defined in

[packages/logger/src/index.ts:28](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/logger/src/index.ts#L28)
