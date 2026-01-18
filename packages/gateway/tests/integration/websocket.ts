import { type DiscordGatewayPayload, GatewayOpcodes } from '@discordeno/types';
import { type WebSocket, WebSocketServer } from 'ws';

/**
 * This value needs to be AT LEAST `1017`
 *
 * The reason for this is because the calculation in Shard.calculateSafeRequests will return 0 not allowing any sort of message to the websocket server.
 * Discord uses a way higher number for this value, but during this test we lower it since it would be annoying and useless make the test last 40+ seconds to test the heartbeat, but to make this work it needs to be at least 1017 so that calculateSafeRequests return 2 allowing for the shard to send messages.
 */
export const heartbeatInterval = 1017;

export function creatWSServer(options: CreateWsServerOptions) {
  // Port 0 according to the node:http docs is for requesting the OS a random unused port
  const server = new WebSocketServer({ port: 0 });

  const address = server.address();
  if (typeof address !== 'object' || !address) {
    throw new TypeError('The address of the WebSocketServer should be an non-null object');
  }

  server.on('connection', (socket) => {
    send(socket, {
      op: GatewayOpcodes.Hello,
      s: null,
      d: {
        heartbeat_interval: heartbeatInterval,
      },
    });

    options.onOpen?.();

    socket.on('message', (data) => {
      const msg = JSON.parse(data.toString('utf-8'));
      options.onMessage?.(msg);

      switch (msg.op) {
        case GatewayOpcodes.Heartbeat: {
          send(socket, {
            op: GatewayOpcodes.HeartbeatACK,
            s: null,
          });

          break;
        }

        case GatewayOpcodes.Identify: {
          send(socket, {
            op: GatewayOpcodes.Dispatch,
            t: 'READY',
            s: 1,
            d: {
              v: 10,
              user: {
                id: '0',
                username: 'test',
                discriminator: '0',
                global_name: 'test',
                avatar: null,
                bot: true,
                verified: true,
                email: null,
                flags: 0,
              },
              shard: [0, 1],
              session_id: '0',
              resume_gateway_url: `ws://localhost:${address.port}`,
              guilds: [],
              application: { id: '0', flags: 0 },
            },
          });

          break;
        }
      }
    });
  });

  return {
    port: address.port,
    close: () => server.close(),
  };
}

export interface CreateWsServerOptions {
  onOpen?: () => any;
  onMessage?: (message: DiscordGatewayPayload) => any;
}

function send(ws: WebSocket, payload: object) {
  ws.send(JSON.stringify(payload));
}
