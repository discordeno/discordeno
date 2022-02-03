import { decode, encode, Kwik } from "../../deps.ts";
import { logger } from "../utils/logger.ts";

const log = logger({ name: "DB Manager" });

log.info("Initializing Database");

const kwik = new Kwik();

// Add BigInt Support
kwik.msgpackExtensionCodec.register({
  type: 0,
  encode: (object: unknown): Uint8Array | null => {
    if (typeof object === "bigint") {
      if (
        object <= Number.MAX_SAFE_INTEGER && object >= Number.MIN_SAFE_INTEGER
      ) {
        return encode(parseInt(object.toString(), 10), {});
      } else {
        return encode(object.toString(), {});
      }
    } else {
      return null;
    }
  },
  decode: (data: Uint8Array) => {
    return BigInt(decode(data, {}) as string);
  },
});

// Initialize the Database
await kwik.init();

log.info("Database Initialized!");
