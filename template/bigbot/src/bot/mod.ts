import {
  BOT_ID,
  DEVELOPMENT,
  DISCORD_TOKEN,
  EVENT_HANDLER_PORT,
  EVENT_HANDLER_SECRET_KEY,
  GATEWAY_INTENTS,
  REST_AUTHORIZATION_KEY,
  REST_PORT,
} from "../../configs.ts";
import { createBot, createRestManager, DiscordGatewayPayload } from "../../deps.ts";
import logger from "../utils/logger.ts";
import { updateDevCommands } from "../utils/updateSlash.ts";
import { BotClient, setupBotClient } from "./botClient.ts";
import { setGuildCommands } from "./events/interactions/slash/setGuildCommands.ts";
import { setupEventHandlers } from "./events/mod.ts";

export const bot = createBot({
  token: DISCORD_TOKEN,
  botId: BOT_ID,
  events: {},
  intents: GATEWAY_INTENTS,
}) as BotClient;

setupEventHandlers();
// customizeBotInternals(bot);
setupBotClient(bot);

bot.rest = createRestManager({
  token: DISCORD_TOKEN,
  secretKey: REST_AUTHORIZATION_KEY,
  customUrl: `http://localhost:${REST_PORT}`,
});

if (DEVELOPMENT) {
  logger.info(`[DEV MODE] Updating slash commands for dev server.`);
  await updateDevCommands(bot);
} else {
  // THIS WILL UPDATE ALL YOUR GLOBAL COMMANDS ON STARTUP
  // await updateGlobalCommands(bot);
}

// Start listening on localhost.
const server = Deno.listen({ port: EVENT_HANDLER_PORT });
logger.info(
  `HTTP webserver running.  Access it at:  http://localhost:${EVENT_HANDLER_PORT}/`,
);

// Connections to the server will be yielded up as an async iterable.
for await (const conn of server) {
  // In order to not be blocking, we need to handle each connection individually
  // in its own async function.
  handleRequest(conn);
}

async function handleRequest(conn: Deno.Conn) {
  // This "upgrades" a network connection into an HTTP connection.
  const httpConn = Deno.serveHttp(conn);
  // Each request sent over the HTTP connection will be yielded as an async
  // iterator from the HTTP connection.
  for await (const requestEvent of httpConn) {
    if (
      !EVENT_HANDLER_SECRET_KEY ||
      EVENT_HANDLER_SECRET_KEY !==
        requestEvent.request.headers.get("AUTHORIZATION")
    ) {
      return requestEvent.respondWith(
        new Response(JSON.stringify({ error: "Invalid secret key." }), {
          status: 401,
        }),
      );
    }

    if (requestEvent.request.method !== "POST") {
      return requestEvent.respondWith(
        new Response(JSON.stringify({ error: "Method not allowed." }), {
          status: 405,
        }),
      );
    }

    const json = (await requestEvent.request.json()) as {
      data: DiscordGatewayPayload;
      shardId: number;
    };
    // EMITS RAW EVENT
    bot.events.raw(bot, json.data, json.shardId);

    if (json.data.t && json.data.t !== "RESUMED") {
      // When a guild or something isn't in cache this will fetch it before doing anything else
      if (!["READY", "GUILD_LOADED_DD"].includes(json.data.t)) {
        await bot.events.dispatchRequirements(bot, json.data, json.shardId);
        // WE ALSO WANT TO UPDATE GUILD SLASH IF NECESSARY AT THIS POINT
        await setGuildCommands(bot, json.data);
      }

      bot.handlers[json.data.t]?.(bot, json.data, json.shardId);
    }

    requestEvent.respondWith(
      new Response(undefined, {
        status: 204,
      }),
    );
  }
}
