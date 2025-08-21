import type { BigString } from '@discordeno/types'

export function snowflakeToBigint(snowflake: BigString): bigint {
  return BigInt(snowflake)
}

export function bigintToSnowflake(snowflake: BigString): string {
  return snowflake.toString()
}

export function snowflakeToTimestamp(snowflake: BigString): number {
  return Number(BigInt(snowflake) >> 22n) + 1420070400000
}
