export function snowflakeToBigint(snowflake: string) {
  return BigInt(snowflake) | 0n;
}

export function bigintToSnowflake(snowflake: bigint) {
  return snowflake === 0n ? "" : snowflake.toString();
}

export function bigintToTimestamp(snowflake: string | bigint) {
  if (typeof snowflake === "string") snowflake = snowflakeToBigint(snowflake);

  return Math.floor(Number(snowflake) / 4194304) + 1420070400000;
}