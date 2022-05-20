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
export const FIRST_SHARD_ID = env.FIRST_SHARD_ID
  ? parseInt(env.FIRST_SHARD_ID, 10)
  : 0;
export const LAST_SHARD_ID = env.LAST_SHARD_ID
  ? parseInt(env.LAST_SHARD_ID, 10)
  : 0;
// Default to 10
export const SHARDS_PER_CLUSTER = env.SHARDS_PER_CLUSTER
  ? parseInt(env.SHARDS_PER_CLUSTER, 10)
  : 10;
export const MAX_CLUSTERS = parseInt(env.MAX_CLUSTERS!, 10);
if (!MAX_CLUSTERS) {
  throw new Error(
    "How many clusters can you run on your machine (MAX_CLUSTERS)? Check your .env file!",
  );
}

export const GATEWAY_PROXY_URL = env
  .GATEWAY_PROXY_URL!;
if (!GATEWAY_PROXY_URL) {
  throw new Error(
    "Hmm, it seems like you don't have somewhere to send gateway events to (GATEWAY_PROXY_URL). Please check your .env file!",
  );
}

export const EVENT_HANDLER_URL = env
  .EVENT_HANDLER_URL!;
if (!EVENT_HANDLER_URL) {
  throw new Error(
    "Hmm, it seems like you don't have somewhere to send events to (EVENT_HANDLER_URL). Please check your .env file!",
  );
}

export const GATEWAY_SECRET_KEY = env.GATEWAY_SECRET_KEY!;
if (!GATEWAY_SECRET_KEY) {
  throw new Error(
    "You need to add a GATEWAY_SECRET_KEY to your .env file!",
  );
}

export const REST_AUTHORIZATION_KEY = env.REST_AUTHORIZATION_KEY!;
if (!REST_AUTHORIZATION_KEY) {
  throw new Error(
    "You need to add a REST_AUTHORIZATION_KEY to your .env file!",
  );
}

export const EVENT_HANDLER_SECRET_KEY = env.EVENT_HANDLER_SECRET_KEY!;
if (!EVENT_HANDLER_SECRET_KEY) {
  throw new Error(
    "You need to add an EVENT_HANDLER_SECRET_KEY to your .env file!",
  );
}

export const BOT_ID = BigInt(atob(env.DISCORD_TOKEN.split(".")[0]));
if (!BOT_ID) {
  throw new Error(
    "Hmm, it seems like you didn't put in a valid DISCORD_TOKEN. Check your .env file!",
  );
}

export const REST_PORT = env.REST_PORT ? parseInt(env.REST_PORT, 10) : 5000;
export const GATEWAY_PORT = env.GATEWAY_PORT
  ? parseInt(env.GATEWAY_PORT, 10)
  : 8080;
export const EVENT_HANDLER_PORT = env.EVENT_HANDLER_PORT
  ? parseInt(env.EVENT_HANDLER_PORT, 10)
  : 7050;

export const DEVELOPMENT = env.DEVELOPMENT ?? true;
export const MISSING_TRANSLATION_WEBHOOK = env.MISSING_TRANSLATION_WEBHOOK ||
  "";
export const DEV_GUILD_ID = env.DEV_GUILD_ID ? BigInt(env.DEV_GUILD_ID) : 0n;
