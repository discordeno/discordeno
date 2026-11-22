import { once } from 'node:events';
import { createServer, type Socket } from 'node:net';
import { Intents } from '@discordeno/types';
import { delay } from '@discordeno/utils';
import { expect } from 'chai';
import Shard from '../../src/Shard.js';
import { ShardSocketCloseCodes, ShardState } from '../../src/types.js';
import { creatWSServer } from './websocket.js';

describe('Gateway Shard lifecycle', () => {
  // Mocha does not abort the body of a test which times out, so a server left behind by one would keep the runner alive forever. Everything which
  // holds the event loop open is registered here and closed in `afterEach`, which does run after a timeout.
  const teardown: (() => void)[] = [];

  afterEach(() => {
    for (const close of teardown.splice(0)) close();
  });

  /** Start a TCP server on a random port which hands every accepted socket to `onConnection`. */
  async function listen(onConnection: (socket: Socket) => void): Promise<number> {
    const sockets: Socket[] = [];
    const server = createServer((socket) => {
      sockets.push(socket);
      onConnection(socket);
    });

    // Port 0 according to the node:net docs is for requesting the OS a random unused port
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');

    teardown.push(() => {
      for (const socket of sockets) socket.destroy();
      server.close();
    });

    const address = server.address();
    if (typeof address !== 'object' || !address) {
      throw new TypeError('The address of the server should be an non-null object');
    }

    return address.port;
  }

  it('Rejects the connection request when the opening handshake fails', async () => {
    // A server which drops the connection instead of answering the upgrade request, so the socket is closed before it ever opened. Dialing a port
    // nothing listens on would do as well, but whether that is refused or silently dropped depends on the machine the test runs on.
    const port = await listen((socket) => socket.destroy());

    const shard = createShard(`ws://127.0.0.1:${port}`);
    let error: unknown;

    await shard.connect().catch((err) => {
      error = err;
    });

    expect(error).to.be.instanceOf(Error);
    expect(shard.socket).to.equal(undefined);
    expect(shard.state).to.equal(ShardState.Disconnected);
  });

  it('Closes a socket which is still connecting', async () => {
    // A server which accepts the connection but never answers the upgrade request, keeping the socket in the `CONNECTING` state.
    const port = await listen(() => {});

    const shard = createShard(`ws://127.0.0.1:${port}`);
    const connecting = shard.connect().then(
      () => 'resolved',
      () => 'rejected',
    );

    await delay(100);
    expect(shard.socket?.readyState).to.equal(WebSocket.CONNECTING);

    await shard.close(ShardSocketCloseCodes.Shutdown, 'Shard shutting down while connecting.');

    expect(await connecting).to.equal('rejected');
    expect(shard.state).to.equal(ShardState.Disconnected);

    // The aborted handshake may not be treated as an unexpected closure, so the shard may not reconnect on its own.
    await delay(100);
    expect(shard.socket).to.equal(undefined);
  });

  it('Keeps trying to identify until the opening handshake succeeds', async () => {
    // Rejecting the first upgrade request fails the opening handshake once.
    let attempts = 0;
    const server = creatWSServer({ verifyClient: () => ++attempts > 1 });
    teardown.push(() => void server.close());

    const shard = createShard(`ws://localhost:${server.port}`);
    teardown.push(() => clearTimeout(shard.bucket.timeoutId));

    await shard.identify();

    expect(attempts).to.equal(2);
    expect(shard.state).to.equal(ShardState.Connected);

    await shard.shutdown();
  });

  it('Stops trying to connect once the shard is closed', async () => {
    let attempts = 0;
    const server = creatWSServer({ verifyClient: () => (++attempts, false) });
    teardown.push(() => void server.close());

    const shard = createShard(`ws://localhost:${server.port}`);
    teardown.push(() => clearTimeout(shard.bucket.timeoutId));

    const identifying = shard.identify();

    // Wait for the first attempt to fail, the shard is then waiting for its next attempt and has no socket.
    while (attempts === 0 || shard.socket) await delay(10);

    await shard.close(ShardSocketCloseCodes.Shutdown, 'Shard shutting down while waiting to reconnect.');
    await identifying;

    // The first retry would happen a second after the failed attempt.
    await delay(1500);
    expect(attempts).to.equal(1);
    expect(shard.socket).to.equal(undefined);
  });
});

function createShard(url: string): Shard {
  return new Shard({
    id: 0,
    connection: {
      compress: false,
      transportCompression: null,
      intents: Intents.Guilds,
      properties: { os: 'linux', browser: 'Discordeno', device: 'Discordeno' },
      token: '',
      totalShards: 1,
      url,
      version: 10,
    },
    events: {},
  });
}
