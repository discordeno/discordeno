import type { BigString } from '@discordeno/types'

export function snowflakeToBigint(snowflake: BigString): bigint {
  return BigInt(snowflake) | 0n
}

export function bigintToSnowflake(snowflake: BigString): string {
  return snowflake === 0n ? '' : snowflake.toString()
}

export function snowflakeToTimestamp(snowflake: BigString): number {
  return Number(BigInt(snowflake) / 4194304n + 1420070400000n)
}
