export function snowflakeToBigint(snowflake: string) {
  return BigInt(snowflake) | 0n;
}

export function bigintToSnowflake(snowflake: bigint) {
  return snowflake === 0n ? "" : snowflake.toString();
}
