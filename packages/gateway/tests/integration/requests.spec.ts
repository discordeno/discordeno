import assert from 'node:assert/strict';
import { type DiscordGatewayPayload, GatewayOpcodes, Intents } from '@discordeno/types';
import { delay } from '@discordeno/utils';
import { createGatewayManager, type GatewayManager } from '../../src/manager.js';
import Shard from '../../src/Shard.js';
import { ShardState } from '../../src/types.js';

describe('Gateway requests', () => {
  it('Serializes the guild ids of a soundboard sounds request', async () => {
    const { gateway, payloads, cleanup } = createGatewayManagerWithShard();

    await gateway.requestSoundboardSounds([869934315011870750n, '869934315011870750']);

    assert.deepEqual(payloads, [{ op: GatewayOpcodes.RequestSoundboardSounds, d: { guild_ids: ['869934315011870750', '869934315011870750'] } }]);

    cleanup();
  });

  it('Keeps the since and afk of a presence update', async () => {
    const { gateway, payloads, cleanup } = createGatewayManagerWithShard();

    await gateway.editShardStatus(0, { since: 1700000000000, afk: true, status: 'idle', activities: [] });

    assert.deepEqual(payloads, [{ op: GatewayOpcodes.PresenceUpdate, d: { since: 1700000000000, afk: true, activities: [], status: 'idle' } }]);

    cleanup();
  });

  it('Requests members by id without the GUILD_MEMBERS intent', async () => {
    const { gateway, payloads, cleanup } = createGatewayManagerWithShard();

    await gateway.requestMembers(869934315011870750n, { userIds: [1n], limit: 0 });

    const data = payloads[0]?.d as { guild_id: string; limit: number; user_ids: string[] };

    assert.equal(payloads[0]?.op, GatewayOpcodes.RequestGuildMembers);
    assert.equal(data.guild_id, '869934315011870750');
    assert.deepEqual(data.user_ids, ['1']);
    assert.equal(data.limit, 1);

    cleanup();
  });

  it('Still requires the GUILD_MEMBERS intent for the entire member list', async () => {
    const { gateway, cleanup } = createGatewayManagerWithShard();

    await assert.rejects(gateway.requestMembers(869934315011870750n), /GUILD_MEMBERS intent/);

    cleanup();
  });

  it('Does not keep a pending member request of a payload which could not be sent', async () => {
    const gateway = createGatewayManagerWithCache();

    // There is no shard to send the payload with.
    await assert.rejects(gateway.requestMembers(869934315011870750n, { userIds: ['1'], limit: 1 }));

    assert.equal(gateway.cache.requestMembers.pending.size, 0);
  });

  it('Rejects a member request which reuses the nonce of a pending one', async () => {
    const { gateway, payloads, cleanup } = createGatewayManagerWithShard(true);

    // This one stays pending until its members arrive.
    const pending = gateway.requestMembers(869934315011870750n, { userIds: ['1'], limit: 1, nonce: 'a-nonce' });
    await delay(20);

    await assert.rejects(gateway.requestMembers(869934315011870750n, { userIds: ['2'], limit: 1, nonce: 'a-nonce' }), /already pending/);

    // Only the first request may have been sent.
    assert.equal(payloads.length, 1);

    gateway.cache.requestMembers.pending.get('a-nonce')?.resolve([]);
    await pending;

    cleanup();
  });

  it('Uses the session start limit of the gateway information it is resharding with', async () => {
    const gateway = createGatewayManagerWithCache();
    gateway.totalShards = 16;
    gateway.lastShardId = 15;
    // The new shards are irrelevant for this test, so they are not actually identified.
    gateway.resharding.tellWorkerToPrepare = async () => {};

    await gateway.resharding.reshard({
      url: 'ws://127.0.0.1:1',
      shards: 32,
      sessionStartLimit: { total: 1000, remaining: 1000, resetAfter: 0, maxConcurrency: 16 },
    });

    assert.equal(gateway.connection.sessionStartLimit.maxConcurrency, 16);
    assert.equal(gateway.buckets.size, 16);
  });
});

function createGatewayManagerWithCache(cacheMembers: boolean = true): GatewayManager {
  return createGatewayManager({
    connection: {
      url: 'ws://127.0.0.1:1',
      shards: 1,
      sessionStartLimit: { total: 1000, remaining: 1000, resetAfter: 0, maxConcurrency: 1 },
    },
    token: '',
    url: 'ws://127.0.0.1:1',
    intents: Intents.Guilds,
    cache: { requestMembers: { enabled: cacheMembers } },
    logger: { debug: () => {}, info: () => {}, warn: () => {}, error: () => {}, fatal: () => {} },
    resharding: { enabled: false, checkInterval: 0, shardsFullPercentage: 0 },
  });
}

function createGatewayManagerWithShard(cacheMembers: boolean = false) {
  const gateway = createGatewayManagerWithCache(cacheMembers);
  const payloads: DiscordGatewayPayload[] = [];

  const shard = new Shard({
    id: 0,
    connection: {
      compress: false,
      transportCompression: null,
      intents: gateway.intents,
      properties: gateway.properties,
      token: gateway.token,
      totalShards: 1,
      url: gateway.url,
      version: 10,
    },
    events: {},
    logger: gateway.logger,
  });

  // A socket which only records what has been written to it.
  shard.state = ShardState.Connected;
  shard.socket = { readyState: WebSocket.OPEN, send: (message: string) => payloads.push(JSON.parse(message)) } as unknown as WebSocket;

  gateway.shards.set(0, shard);

  // To avoid needing to wait 1m to get the bucket refil timer to fire we cancel it
  return { gateway, payloads, cleanup: () => clearTimeout(shard.bucket.timeoutId) };
}
