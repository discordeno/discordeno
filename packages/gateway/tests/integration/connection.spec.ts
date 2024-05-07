import { Intents } from '@discordeno/types'
import uWS from 'uWebSockets.js'
import { ShardSocketCloseCodes, createGatewayManager, type GatewayManager } from '../../src/index.js'

function createGatewayManagerWithPort(port: number): GatewayManager {
  return createGatewayManager({
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
}

async function createUws(options: {
  onOpen?: () => any
  onMessage?: (message: any) => any
  onClose?: (code: number, message: string) => any
  closing?: boolean
}): Promise<{ port: number; uwsToken: uWS.us_listen_socket }> {
  options.onOpen ??= () => {}
  options.onMessage ??= (message: any) => {}
  options.onClose ??= (code: number, message: string) => {}
  options.closing ??= false

  return await new Promise<{ port: number; uwsToken: uWS.us_listen_socket }>((resolve, reject) => {
    let port = 0

    uWS
      .App()
      .ws('/*', {
        compression: uWS.SHARED_COMPRESSOR,
        maxPayloadLength: 16 * 1024 * 1024,
        idleTimeout: 10,
        open: async (ws) => {
          if (options.closing) {
            ws.end(3000)
            return
          }
          ws.send(
            JSON.stringify({
              op: 10,
              d: {
                heartbeat_interval: 1017,
              },
            }),
          )
          options.onOpen!()
        },
        message: async (ws, message, isBinary) => {
          const msg = JSON.parse(Buffer.from(message).toString())
          options.onMessage!(msg)
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
          options.onClose!(code, msg)
        },
      })
      .listen(0, async (token) => {
        if (!token) {
          reject(new Error())
        }

        port = uWS.us_socket_local_port(token as uWS.us_listen_socket)

        resolve({
          port,
          uwsToken: token,
        })
      })
  })
}

describe('gateway', () => {
  it('can connect to server', async function () {
    this.timeout(15000)
    let resolveConnected: () => void
    const connected = new Promise<void>((resolve) => (resolveConnected = resolve))
    const uwsOptions = { onOpen: resolveConnected!, closing: false }
    const { port, uwsToken } = await createUws(uwsOptions)
    const gateway = createGatewayManagerWithPort(port)
    await gateway.spawnShards()
    await connected
    uwsOptions.closing = true
    await gateway.shutdown(ShardSocketCloseCodes.Shutdown, 'User requested bot stop')
    uWS.us_listen_socket_close(uwsToken)
  })

  it('will heartbeat', async function () {
    this.timeout(15000)
    let resolveHeartbeat: () => void
    let resolveConnected: () => void
    const connected = new Promise<void>((resolve) => (resolveConnected = resolve))
    const heartbeated = new Promise<void>((resolve) => (resolveHeartbeat = resolve))
    const uwsOptions = {
      onOpen: resolveConnected!,
      onMessage: (message: any) => {
        if (message.op !== 1) return
        resolveHeartbeat()
      },
      closing: false,
    }
    const { port, uwsToken } = await createUws(uwsOptions)
    const gateway = createGatewayManagerWithPort(port)
    await gateway.spawnShards()
    await connected

    const timeout = setTimeout(() => {
      throw new Error('Not heartbeat in time')
    }, 1017)

    await heartbeated
    clearTimeout(timeout)
    uwsOptions.closing = true
    await gateway.shutdown(ShardSocketCloseCodes.Shutdown, 'User requested bot stop')
    uWS.us_listen_socket_close(uwsToken)
  })
})
