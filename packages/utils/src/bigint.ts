import { BigString } from '@discordeno/types'

export function snowflakeToBigint (snowflake: BigString): bigint {
  return BigInt(snowflake) | 0n
}

export function bigintToSnowflake (snowflake: BigString): string {
  return snowflake === 0n ? '' : snowflake.toString()
}
