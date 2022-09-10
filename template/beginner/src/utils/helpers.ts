import { BigString } from "../../../../types/shared.ts";

export function snowflakeToTimestamp(id: BigString) {
  return Number(BigInt(id) / 4194304n + 1420070400000n);
}
