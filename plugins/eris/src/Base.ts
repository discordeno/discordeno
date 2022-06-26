import { BigString } from "./Client.ts";

export class Base {
  /** Internal storage of the id done in bigint to preserve memory */
  _id: bigint;

  constructor(id: BigString) {
    this._id = BigInt(id);
  }

  /** The snowflake id */
  get id() {
    return this._id.toString();
  }

  set id(value: BigString) {
    this._id = BigInt(value);
  }

  get createdAt(): number {
    return Number(this._id / 4194304n + 1420070400000n);
  }

  /**
   * Calculates the timestamp in milliseconds associated with a Discord ID/snowflake.
   * @deprecated Recommend using Object.createdAt or Client.snowflakeToTimestamp if you want to get a timestamp from a id. This is not desired but supported only to keep a similar api to eris.
   */
  static getCreatedAt(id: string) {
    return Base.getDiscordEpoch(id) + 1420070400000;
  }

  /**
   * Gets the number of milliseconds since epoch represented by an ID/snowflake
   * @deprecated Recommend using Object.createdAt or Client.snowflakeToTimestamp if you want to get a timestamp from a id. This is not desired but supported only to keep a similar api to eris.
   */
  static getDiscordEpoch(id: string) {
    // @ts-ignore some eris magic at play here
    return Math.floor(id / 4194304);
  }

  toString() {
    return `[${this.constructor.name} ${this.id}]`;
  }

  toJSON(props: string[] = []) {
    const json = {
      id: this.id,
      createdAt: this.createdAt,
    };
    for (const prop of props) {
      // @ts-ignore some eris magic at play here
      const value = this[prop];
      const type = typeof value;
      if (value === undefined) {
        continue;
      } else if (type !== "object" && type !== "function" && type !== "bigint" || value === null) {
        // @ts-ignore some eris magic at play here
        json[prop] = value;
      } else if (value.toJSON !== undefined) {
        // @ts-ignore some eris magic at play here
        json[prop] = value.toJSON();
      } else if (value.values !== undefined) {
        // @ts-ignore some eris magic at play here
        json[prop] = [...value.values()];
      } else if (type === "bigint") {
        // @ts-ignore some eris magic at play here
        json[prop] = value.toString();
      } else if (type === "object") {
        // @ts-ignore some eris magic at play here
        json[prop] = value;
      }
    }
    return json;
  }
}

new Base("785384884197392387").toString();
