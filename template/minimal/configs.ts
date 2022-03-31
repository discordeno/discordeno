import { dotEnvConfig } from "./deps.ts";

dotEnvConfig({ export: true });

export const BOT_TOKEN = Deno.env.get("BOT_TOKEN") || "";
export const BOT_ID = BigInt(atob(BOT_TOKEN.split(".")[0]));
