import dotenv from 'dotenv';
dotenv.config()

import { DiscordGatewayPayload } from "discordeno";
// ReferenceError: publishMessage is not defined
// import Embeds from "discordeno/embeds";
import express from "express";
import { BOT_ID, EVENT_HANDLER_URL } from "../configs.js";
import { bot } from "./bot.js";
import { updateDevCommands } from "./utils/slash/updateCommands.js";
import { webhookURLToIDAndToken } from "./utils/webhook.js";


const BUGS_ERRORS_REPORT_WEBHOOK = process.env.BUGS_ERRORS_REPORT_WEBHOOK as string
const DEVELOPMENT = process.env.DEVELOPMENT as string
const EVENT_HANDLER_AUTHORIZATION = process.env.EVENT_HANDLER_AUTHORIZATION as string
const EVENT_HANDLER_PORT = process.env.EVENT_HANDLER_PORT as string

process
  .on("unhandledRejection", (error) => {
    const { id, token } = webhookURLToIDAndToken(BUGS_ERRORS_REPORT_WEBHOOK);
    if (!id || !token) return;

    // DO NOT SEND ERRORS FROM NON PRODUCTION
    if (BOT_ID !== 270010330782892032n) {
      return console.error(error);
    }

    // An unhandled error occurred on the bot in production
    console.error(error ?? `An unhandled rejection error occurred but error was null or undefined`);

    if (!error) return;

    // ReferenceError: publishMessage is not defined
    /*
    const embeds = new Embeds()
      .setDescription(["```js", error, "```"].join(`\n`))
      .setTimestamp()
      .setFooter("Unhandled Rejection Error Occurred");

    // SEND ERROR TO THE LOG CHANNEL ON THE DEV SERVER
    return bot.helpers.sendWebhookMessage(bot.transformers.snowflake(id), token, { embeds }).catch(console.error);
    */
  })
  .on("uncaughtException", async (error) => {
    const { id, token } = webhookURLToIDAndToken(BUGS_ERRORS_REPORT_WEBHOOK);
    if (!id || !token) return;

    // DO NOT SEND ERRORS FROM NON PRODUCTION
    if (BOT_ID !== 270010330782892032n) {
      return console.error(error);
    }

    // An unhandled error occurred on the bot in production
    console.error(error ?? `An unhandled exception occurred but error was null or undefined`);

    if (!error) process.exit(1);

    /*
    const embeds = new Embeds()
      .setDescription(["```js", error.stack, "```"].join(`\n`))
      .setTimestamp()
      .setFooter("Unhandled Exception Error Occurred");
      // SEND ERROR TO THE LOG CHANNEL ON THE DEV SERVER
      await bot.helpers.sendWebhookMessage(bot.transformers.snowflake(id), token, { embeds }).catch(console.error);
      */

    process.exit(1);
  });

if (DEVELOPMENT) {
  bot.logger.info(`[DEV MODE] Updating slash commands for dev server.`);
  updateDevCommands(bot);
}

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

app.post("/", async (req, res) => {
  handleRequest(req, res);
});

app.put("/", async (req, res) => {
  handleRequest(req, res);
});

app.patch("/", async (req, res) => {
  handleRequest(req, res);
});

app.delete("/", async (req, res) => {
  handleRequest(req, res);
});

app.get("/", async (req, res) => {
  handleRequest(req, res);
});

async function handleRequest(req: express.Request, res: express.Response) {
  try {
    if (!EVENT_HANDLER_AUTHORIZATION || EVENT_HANDLER_AUTHORIZATION !== req.headers.authorization) {
      return res.status(401).json({ error: "Invalid authorization key." });
    }

    const json = req.body as {
      message: DiscordGatewayPayload;
      shardId: number;
    };

    // EMITS RAW EVENT
    bot.events.raw(bot, json.message, json.shardId);

    if (json.message.t && json.message.t !== "RESUMED") {
      // When a guild or something isnt in cache this will fetch it before doing anything else
      if (!["READY", "GUILD_LOADED_DD"].includes(json.message.t)) {
        await bot.events.dispatchRequirements(bot, json.message, json.shardId);
      }

      bot.handlers[json.message.t]?.(bot, json.message, json.shardId);
    }

    res.status(200).json({ success: true });
  } catch (error: any) {
    bot.logger.error(error);
    res.status(error.code).json(error);
  }
}

app.listen(EVENT_HANDLER_PORT, () => {
  console.log(`Bot is listening at ${EVENT_HANDLER_URL};`);
});
