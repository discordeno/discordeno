import {
  DISCORD_TOKEN,
  EVENT_HANDLER_PORT,
  EVENT_HANDLER_SECRET_KEY,
  EVENT_HANDLER_URL,
  GATEWAY_INTENTS,
  REST_AUTHORIZATION_KEY,
  REST_PORT,
} from "../../configs.ts";
import { createGatewayManager, createRestManager, endpoints } from "../../deps.ts";

// CREATE A SIMPLE MANAGER FOR REST
const rest = createRestManager({
  token: DISCORD_TOKEN,
  secretKey: REST_AUTHORIZATION_KEY,
  customUrl: `http://localhost:${REST_PORT}`,
});

// CALL THE REST PROCESS TO GET GATEWAY DATA
const result = await rest.runMethod(rest, "get", endpoints.GATEWAY_BOT).then((
  res,
) => ({
  url: res.url,
  shards: res.shards,
  sessionStartLimit: {
    total: res.session_start_limit.total,
    remaining: res.session_start_limit.remaining,
    resetAfter: res.session_start_limit.reset_after,
    maxConcurrency: res.session_start_limit.max_concurrency,
  },
}));

const gateway = createGatewayManager({
  // FOR DEBUGGING
  // debug: console.log,

  // THE AUTHORIZATION WE WILL USE ON OUR EVENT HANDLER PROCESS
  secretKey: EVENT_HANDLER_SECRET_KEY,
  token: DISCORD_TOKEN,
  intents: GATEWAY_INTENTS,
  // LOAD DATA FROM DISCORDS RECOMMENDATIONS OR YOUR OWN CUSTOM ONES HERE
  shardsRecommended: result.shards,
  sessionStartLimitTotal: result.sessionStartLimit.total,
  sessionStartLimitRemaining: result.sessionStartLimit.remaining,
  sessionStartLimitResetAfter: result.sessionStartLimit.resetAfter,
  maxConcurrency: result.sessionStartLimit.maxConcurrency,
  maxShards: result.shards,
  lastShardId: result.shards,

  // THIS WILL BASICALLY BE YOUR HANDLER FOR YOUR EVENTS.
  handleDiscordPayload: async function (_, data, shardId) {
    // TODO: CHANGE FROM SENDING THROUGH HTTP TO USING A WS FOR FASTER PROCESSING! OR HTTP3 OR WHATEVER!
    if (!data.t) return;

    await fetch(`${EVENT_HANDLER_URL}:${EVENT_HANDLER_PORT}`, {
      headers: {
        Authorization: gateway.secretKey,
      },
      method: "POST",
      body: JSON.stringify({
        shardId,
        data,
      }),
    })
      // BELOW IS FOR DENO MEMORY LEAK
      .then((res) => res.text())
      .catch(() => null);
  },
});

// START THE GATEWAY
gateway.spawnShards(gateway);
