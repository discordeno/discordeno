export function snowflakeToTimestamp(id: bigint) {
  return Number(id / 4194304n + 1420070400000n);
}
