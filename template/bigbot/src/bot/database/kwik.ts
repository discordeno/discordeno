import log from "../../utils/logger.ts";
import { decode, encode, Kwik, KwikTable } from "../../../deps.ts";

log.info("Initializing KwikDB Database.");

interface CommandVersionsSchema {
  version: number;
}

export const kwik = new Kwik();
export const commandVersions = new KwikTable<CommandVersionsSchema>(
  kwik,
  "commandVersions",
);

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

log.info("KwikDB Initialized!");
