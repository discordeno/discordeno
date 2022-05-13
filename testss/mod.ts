import { createBot, createRestManager, runMethod } from "../mod.ts";
import { dotenv } from "./deps.ts";

dotenv({ export: true, path: `${Deno.cwd()}/.env` });

export function loadBot() {
  const token = Deno.env.get("DISCORD_TOKEN");
  if (!token) throw new Error("Token was not provided.");

  const botId = BigInt(atob(token.split(".")[0]));
  const bot = createBot({
    events: {},
    intents: [],
    botId,
    token,
  });

  bot.rest = createRestManager({
    token,
    customUrl: Deno.env.get("PROXY_REST_URL"),
    secretKey: Deno.env.get("PROXY_REST_SECRET"),
  });

  return bot;
}
