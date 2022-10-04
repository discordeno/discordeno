import { getBotIdFromToken, Intents } from "discordeno";

// General Configurations
/** Whether or not this process is a local development version. Change to false for the main production bot. */
// SETUP-DD-TEMP: Change this to false in your server for production bot. Keep true in local testing.
export const DEVELOPMENT = true;

/** The server id where you develop/test the bot. */
// SETUP-DD-TEMP: Change the id to a server where you develop the bot privately.
export const DEV_SERVER_ID: string = "";

/** The discord bot token, without the BOT prefix. */
// SETUP-DD-TEMP: Add the bot token here.
export const DISCORD_TOKEN = "";

/** The bot id, derived from the bot token. */
export const BOT_ID = getBotIdFromToken(DISCORD_TOKEN);

// Bot Configurations
/** The secret passcode that the bot code (event handler) is listening for. This is used to prevent someone else from trying to send malicious messages to your bot. */
// SETUP-DD-TEMP: Add a secret passcode here.
export const EVENT_HANDLER_AUTHORIZATION = "";

/** The port where the event handler is listening for events. */
// SETUP-DD-TEMP: Set the desired port where events will be sent to be processed.
export const EVENT_HANDLER_PORT = 8081;

/** The url where the bot code(event handler) will run. This is where the gateway will send its messages to. */
// SETUP-DD-TEMP: Set the bot's url here.
export const EVENT_HANDLER_URL = `http://localhost:${EVENT_HANDLER_PORT}`;

/** The full webhook url where the bot can send errors to alert you that the bot is missing translations. */
// SETUP-DD-TEMP: Set a full discord webhook url here.
export const MISSING_TRANSLATION_WEBHOOK = "";

/** The full webhook url where the bot can send errors to alert you that the bot is throwing errors. */
// SETUP-DD-TEMP: Set a full discord webhook url here.
export const BUGS_ERRORS_REPORT_WEBHOOK = "";

// Rest Proxy Configurations
/** The authorization code that the REST proxy will check for to make sure the requests are coming from you.  */
// SETUP-DD-TEMP: Add a secret passcode here.
export const REST_AUTHORIZATION = "";

/** The port that will run the REST proxy. */
// SETUP-DD-TEMP: Choose the port number here that will be used for the REST proxy.
export const REST_PORT = 8000;

/** The url where requests will be sent to from the bot. */
// SETUP-DD-TEMP: Provide the url where you will host your REST proxy. If it is on the same server as others, you can use localhost but if it is on a separate server you should change this entirely.
export const REST_URL = `http://localhost:${REST_PORT}`;

// Gateway Proxy Configurations
/** The gateway intents you would like to use. */
export const INTENTS: Intents =
  // SETUP-DD-TEMP: Add the intents you want enabled here. Or Delete the intents you don't want in your bot.
  Intents.DirectMessageReactions |
  Intents.DirectMessageTyping |
  Intents.DirectMessages |
  Intents.GuildBans |
  Intents.GuildEmojis |
  Intents.GuildIntegrations |
  Intents.GuildInvites |
  Intents.GuildMembers |
  Intents.GuildMessageReactions |
  Intents.GuildMessageTyping |
  Intents.GuildMessages |
  Intents.GuildPresences |
  Intents.GuildVoiceStates |
  Intents.GuildWebhooks |
  Intents.Guilds;

/** The amount of shards to start. Useful with multiple servers where each server is handling a portion of your bot. */
// SETUP-DD-TEMP: To start all bots, leave it as undefined. Specify he number of shards this process should handle.
export const TOTAL_SHARDS: number | undefined = undefined;

/** The amount of shards to start per worker. */
// SETUP-DD-TEMP: Choose how many shards to start per worker. If you are not sure just stick to 16.
export const SHARDS_PER_WORKER: number = 16;

/** The total amount of workers to start. Generally this should be equal to the number of cores your server has. */
// SETUP-DD-TEMP: Choose how many workers to start up. If you are not sure, check how many cores your server has.
export const TOTAL_WORKERS: number = 4;

/** The secret passcode that the gateway is listening for. This is used to prevent someone else from trying to send malicious messages to your bot. */
// SETUP-DD-TEMP: Add a secret passcode here.
export const GATEWAY_AUTHORIZATION = "";

/** The host where the gateway will run. Must follow https://nodejs.org/api/net.html#serverlistenoptions-callback. */
// SETUP-DD-TEMP: Set the gateways's host here.
export const GATEWAY_HOST = "localhost";

/** The port where the gateway will run. This is where the bot will send its messages to the gateway. */
// SETUP-DD-TEMP: Set the gateways's port here.
export const GATEWAY_PORT: number = 8080;

/** The url where the gateway will run. This is where the bot will send its messages to the gateway. */
// SETUP-DD-TEMP: Set the gateways's url here.
export const GATEWAY_URL = `${GATEWAY_HOST}:${GATEWAY_PORT}`;

// Database Configurations

/** These INFLUX configs are only if you wish to enable analytics. */
// SETUP-DD-TEMP: This is optional. If you want to build analytics, add influxdb here.
export const INFLUX_BUCKET = "";
export const INFLUX_ORG = "";
export const INFLUX_TOKEN = "";
export const INFLUX_URL = "";
