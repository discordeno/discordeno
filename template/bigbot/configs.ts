import { dotEnvConfig, GatewayIntents } from "./deps.ts";

// Get the .env file that the user should have created, and load the configs.
const env = dotEnvConfig({ export: true });

// TODO: REMOVE THESE! THEY ARE BAD FOR YOU! DUH! Seriously, only keep the ones your bot needs!
export const GATEWAY_INTENTS: (keyof typeof GatewayIntents)[] = [
  "DirectMessageReactions",
  "DirectMessageTyping",
  "DirectMessages",
  "GuildBans",
  "GuildEmojis",
  "GuildIntegrations",
  "GuildInvites",
  "GuildMembers",
  "GuildMessageReactions",
  "GuildMessageTyping",
  "GuildMessages",
  "GuildPresences",
  "GuildVoiceStates",
  "GuildWebhooks",
  "Guilds",
];

if (!env.DISCORD_TOKEN) {
  throw new Error("DUDE! You did not provide a Discord token!");
}
export const DISCORD_TOKEN = env.DISCORD_TOKEN!;

// Set as 0 to make it use default values. NOT RECOMMENDED TO DEFAULT FOR BIG BOTS!!!!
export const MAX_SHARDS = env.MAX_SHARDS ? parseInt(env.MAX_SHARDS, 10) : 0;
export const FIRST_SHARD_ID = env.FIRST_SHARD_ID ? parseInt(env.FIRST_SHARD_ID, 10) : 0;
export const LAST_SHARD_ID = env.LAST_SHARD_ID ? parseInt(env.LAST_SHARD_ID, 10) : 0;
// Default to 10
export const SHARDS_PER_CLUSTER = env.SHARDS_PER_CLUSTER ? parseInt(env.SHARDS_PER_CLUSTER, 10) : 10;
export const MAX_CLUSTERS = parseInt(env.MAX_CLUSTERS!, 10);
if (!MAX_CLUSTERS) {
  throw new Error(
    "Please for the love of god, tell me how many clusters your machine can handle!",
  );
}

export const URL_GATEWAY_PROXY_WILL_FORWARD_TO = env
  .URL_GATEWAY_PROXY_WILL_FORWARD_TO!;
if (!URL_GATEWAY_PROXY_WILL_FORWARD_TO) {
  throw new Error(
    "Don't you think you need to give a URL where you want your gateway proxy to send events to?",
  );
}

export const EVENT_HANDLER_URL = env
  .EVENT_HANDLER_URL!;
if (!EVENT_HANDLER_URL) {
  throw new Error(
    "Don't you think you need to give a URL where you want your events sent to?",
  );
}

export const GATEWAY_SECRET_KEY = env.GATEWAY_SECRET_KEY!;
if (!GATEWAY_SECRET_KEY) {
  throw new Error(
    "Do you want to be hacked? Add a secret authorization key that can be used to identify requests are from you.",
  );
}

export const REST_AUTHORIZATION_KEY = env.REST_AUTHORIZATION_KEY!;
if (!REST_AUTHORIZATION_KEY) {
  throw new Error(
    "Do you want to be hacked? Add a secret authorization key to make sure requests are only made by you.",
  );
}

export const EVENT_HANDLER_SECRET_KEY = env.EVENT_HANDLER_SECRET_KEY!;
if (!EVENT_HANDLER_SECRET_KEY) {
  throw new Error(
    "Do you want to be hacked? Add a secret authorization key to make sure requests are only made by you.",
  );
}

export const BOT_ID = BigInt(atob(env.DISCORD_TOKEN.split(".")[0]));
if (!BOT_ID) {
  throw new Error("Please enter the BOT ID you want to run this with.");
}

export const REST_PORT = env.REST_PORT ? parseInt(env.REST_PORT, 10) : 5000;
export const GATEWAY_PORT = env.GATEWAY_PORT ? parseInt(env.GATEWAY_PORT, 10) : 8080;
export const EVENT_HANDLER_PORT = env.EVENT_HANDLER_PORT ? parseInt(env.EVENT_HANDLER_PORT, 10) : 7050;

export const DEVELOPMENT = env.DEVELOPMENT ?? true;
export const MISSING_TRANSLATION_WEBHOOK = env.MISSING_TRANSLATION_WEBHOOK ||
  "";
export const DEV_GUILD_ID = env.DEV_GUILD_ID ? BigInt(env.DEV_GUILD_ID) : 0n;
