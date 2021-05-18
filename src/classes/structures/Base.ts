import { snowflakeToBigint } from "../../util/bigint.ts";
import { camelize, snakelize } from "../../util/utils.ts";
import Client from "../Client.ts";

export class Base {
  /** The unique snowflake id */
  id: bigint;
  /** The client itself */
  client: Client;

  constructor(client: Client, id: bigint | string) {
    this.client = client;
    this.id = typeof id === "string" ? snowflakeToBigint(id) : id;
  }

  /** The timestamp when this item was created in discords database. */
  get createdAt() {
    return Math.floor(Number(this.id) / 4194304) + 1420070400000;
  }

  /** Converts an object to camelCase */
  camelize<T>(obj: Record<string, unknown> | Record<string, unknown>[]): T {
    return camelize(obj);
  }

  /** Converts an object to snake_case */
  snakeize<T>(obj: Record<string, unknown> | Record<string, unknown>[]): T {
    return snakelize(obj);
  }
}

export default Base;
