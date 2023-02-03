import { Intents } from '@discordeno/types'
import uWS from 'uWebSockets.js'
import { createGatewayManager, ShardSocketCloseCodes } from '../../src/index.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createGatewayManagerWithPort = (port: number) =>
  createGatewayManager({
    connection: {
      url: `ws://localhost:${port}`,
      shards: 1,
      sessionStartLimit: {
        total: 1000,
        remaining: 998,
        resetAfter: 36579894,
        maxConcurrency: 1,
      },
    },
    token: ' ',
    url: `ws://localhost:${port}`,
    intents: Intents.Guilds,
    events: {},
  })

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createUWS = async ({ onOpen = () => {}, onMessage = (message: any) => {}, onClose = (code: number, message: string) => {} }) => {
  return await new Promise<{ port: number; uwsToken: any }>((resolve, reject) => {
    let port = 0
    let uwsToken = 0
    uWS
      .App()
      .ws('/*', {
        compression: uWS.SHARED_COMPRESSOR,
        maxPayloadLength: 16 * 1024 * 1024,
        idleTimeout: 10,
        open: async (ws) => {
          ws.send(
            JSON.stringify({
              op: 10,
              d: {
                heartbeat_interval: 100,
              },
            }),
          )
          onOpen()
        },
        message: async (ws, message, isBinary) => {
          const msg = JSON.parse(Buffer.from(message).toString())
          onMessage(msg)
          if (msg.op === 1) {
            ws.send(
              JSON.stringify({
                op: 11,
              }),
            )
            return
          }
          if (msg.op === 2) {
            ws.send(
              JSON.stringify({
                t: 'READY',
                s: 1,
                op: 0,
                d: {
                  v: 10,
                  user_settings: {},
                  user: {
                    verified: true,
                    username: 'testing bot',
                    mfa_enabled: false,
                    id: '000000707882254000',
                    flags: 0,
                    email: null,
                    discriminator: '1687',
                    bot: true,
                    avatar: null,
                  },
                  shard: [0, 1],
                  session_type: 'normal',
                  session_id: '0dff79e1a6f2697388eb08924a0805c8',
                  resume_gateway_url: `ws://localhost:${port}`,
                  relationships: [],
                  private_channels: [],
                  presences: [],
                  guilds: [],
                  guild_join_requests: [],
                  geo_ordered_rtc_regions: [],
                  application: { id: '000000707882254000', flags: 27828224 },
                },
              }),
            )

            return
          }
          if (msg.op === 6) {
            // resume
          }
        },
        close: (ws, code, message) => {
          const msg = Buffer.from(message).toString()
          onClose(code, msg)
        },
      })
      .listen(0, async (token) => {
        if (!token) {
          reject(new Error())
        }
        // retrieve listening port
        uwsToken = token
        port = uWS.us_socket_local_port(token)
        resolve({ port, uwsToken })
      })
  })
}

describe('gateway', () => {
  it('can connect to server', async function () {
    this.timeout(6000)
    let resolveConnected
    const connected = new Promise((resolve) => (resolveConnected = resolve))
    const { port, uwsToken } = await createUWS({ onOpen: resolveConnected })
    const gateway = createGatewayManagerWithPort(port)
    await gateway.spawnShards()
    await connected
    await gateway.shutdown(ShardSocketCloseCodes.Shutdown, 'User requested bot stop')
    uWS.us_listen_socket_close(uwsToken)
  })
})
