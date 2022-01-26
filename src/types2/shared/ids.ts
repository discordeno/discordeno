export type Snowflake<T extends "discord" | "lib" = "lib"> = T extends "discord" ? string : bigint;
