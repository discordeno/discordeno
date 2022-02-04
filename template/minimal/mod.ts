import { ActivityTypes, createBot, enableCachePlugin, enableCacheSweepers, fastFileLoader, startBot } from "./deps.ts";
import { BOT_ID, BOT_TOKEN } from "./configs.ts";
import { logger } from "./src/utils/logger.ts";
import { events } from "./src/events/mod.ts";
import { updateCommands } from "./src/utils/helpers.ts";

const log = logger({ name: "Main" });

log.info("Starting Bot, this might take a while...");

const paths = ["./src/events", "./src/commands"];
await fastFileLoader(paths).catch((err) => {
  log.fatal(`Unable to Import ${paths}`);
  log.fatal(err);
  Deno.exit(1);
});

export const bot = enableCachePlugin(
  createBot({
    token: BOT_TOKEN,
    botId: BOT_ID,
    intents: [],
    events,
  }),
);

enableCacheSweepers(bot);

bot.gateway.presence = {
  status: "online",
  activities: [
    {
      name: "Discordeno is Best Lib",
      type: ActivityTypes.Game,
      createdAt: Date.now(),
    },
  ],
};

await startBot(bot);

await updateCommands(bot);
