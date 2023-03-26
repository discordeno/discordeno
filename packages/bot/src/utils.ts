import type { BigString } from '@discordeno/types'

export function snowflakeToBigint(snowflake: BigString) {
  return BigInt(snowflake) | 0n
}

export function bigintToSnowflake(snowflake: BigString) {
  return snowflake === 0n ? '' : snowflake.toString()
}
