import { DiscordGatewayPayload, DiscordHello, DiscordReady } from "../../types/discord.ts";
import { GatewayOpcodes } from "../../types/shared.ts";
import { createLeakyBucket } from "../../util/bucket.ts";
import { delay } from "../../util/delay.ts";
import { decompressWith } from "./deps.ts";
import { GATEWAY_RATE_LIMIT_RESET_INTERVAL, Shard, ShardState } from "./types.ts";

const decoder = new TextDecoder();

export async function handleMessage(shard: Shard, message: MessageEvent<any>): Promise<void> {
  message = message.data;

  // If message compression is enabled,
  // Discord might send zlib compressed payloads.
  if (shard.gatewayConfig.compress && message instanceof Blob) {
    message = decompressWith(
      new Uint8Array(await message.arrayBuffer()),
      0,
      (slice: Uint8Array) => decoder.decode(slice),
    );
  }

  // Safeguard incase decompression failed to make a string.
  if (typeof message !== "string") return;

  const messageData = JSON.parse(message) as DiscordGatewayPayload;
  //   gateway.debug("GW RAW", { shardId, payload: messageData });

  // TODO: remove
  // console.log({ messageData: censor(messageData) });

  switch (messageData.op) {
    case GatewayOpcodes.Heartbeat: {
      // TODO: can this actually happen
      if (!shard.isOpen()) return;

      shard.heart.lastBeat = Date.now();
      // Discord randomly sends this requiring an immediate heartbeat back.
      // Using a direct socket.send call here because heartbeat requests are reserved by us.
      shard.socket?.send(
        JSON.stringify({
          op: GatewayOpcodes.Heartbeat,
          d: shard.previousSequenceNumber,
        }),
      );
      shard.events.heartbeat?.(shard);

      break;
    }
    case GatewayOpcodes.Hello: {
      const interval = (messageData.d as DiscordHello).heartbeat_interval;

      shard.startHeartbeating(interval);

      if (shard.state !== ShardState.Resuming) {
        // HELLO has been send on a non resume action.
        // This means that the shard starts a new session,
        // therefore the rate limit interval has been reset too.
        shard.bucket = createLeakyBucket({
          max: shard.calculateSafeRequests(),
          refillInterval: GATEWAY_RATE_LIMIT_RESET_INTERVAL,
          refillAmount: shard.calculateSafeRequests(),
          // Waiting acquires should not be lost on a re-identify.
          waiting: shard.bucket.waiting,
        });
      }

      shard.events.hello?.(shard);

      break;
    }
    case GatewayOpcodes.HeartbeatACK: {
      shard.heart.acknowledged = true;
      shard.heart.lastAck = Date.now();
      // Manually calculating the round trip time for users who need it.
      if (shard.heart.lastBeat) {
        shard.heart.rtt = shard.heart.lastAck - shard.heart.lastBeat;
      }

      shard.events.heartbeatAck?.(shard);

      break;
    }
    case GatewayOpcodes.Reconnect: {
      //   gateway.debug("GW RECONNECT", { shardId });

      shard.events.requestedReconnect?.(shard);

      await shard.resume();

      break;
    }
    case GatewayOpcodes.InvalidSession: {
      //   gateway.debug("GW INVALID_SESSION", { shardId, payload: messageData });
      const resumable = messageData.d as boolean;

      shard.events.invalidSession?.(shard, resumable);

      // We need to wait for a random amount of time between 1 and 5
      // Reference: https://discord.com/developers/docs/topics/gateway#resuming
      await delay(Math.floor((Math.random() * 4 + 1) * 1000));

      shard.resolves.get("INVALID_SESSION")?.(messageData);
      shard.resolves.delete("INVALID_SESSION");

      // When resumable is false we need to re-identify
      if (!resumable) {
        await shard.identify();

        break;
      }

      // The session is invalid but apparently it is resumable
      await shard.resume();

      break;
    }
  }

  if (messageData.t === "RESUMED") {
    // gateway.debug("GW RESUMED", { shardId });

    shard.state = ShardState.Connected;
    shard.events.resumed?.(shard);

    // Continue the requests which have been queued since the shard went offline.
    shard.offlineSendQueue.map((resolve) => resolve());

    shard.resolves.get("RESUMED")?.(messageData);
    shard.resolves.delete("RESUMED");
  } // Important for future resumes.
  else if (messageData.t === "READY") {
    const payload = messageData.d as DiscordReady;

    shard.sessionId = payload.session_id;
    shard.state = ShardState.Connected;

    // Continue the requests which have been queued since the shard went offline.
    // Important when this is a re-identify
    shard.offlineSendQueue.map((resolve) => resolve());

    shard.resolves.get("READY")?.(messageData);
    shard.resolves.delete("READY");
  }

  // Update the sequence number if it is present
  // `s` can be either `null` or a `number`.
  // In order to prevent update misses when `s` is `0` we check against null.
  if (messageData.s !== null) {
    shard.previousSequenceNumber = messageData.s;
  }

  // The necessary handling required for the Shards connection has been finished.
  // Now the event can be safely forwarded.
  shard.events.message?.(shard, messageData);
}
