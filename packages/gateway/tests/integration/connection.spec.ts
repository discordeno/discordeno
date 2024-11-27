import { type DiscordGatewayPayload, GatewayCloseEventCodes, GatewayOpcodes, Intents } from '@discordeno/types'
import uWS from 'uWebSockets.js'
import { type GatewayManager, createGatewayManager } from '../../src/index.js'

/**
 * This value needs to be AT LEAST `1017`
 *
 * The reason for this is because the calculation in Shard.calculateSafeRequests will return 0 not allowing any sort of message to the websocket server.
 * Discord uses a way higher number for this value, but during this test we lower it since it would be annoying and useless make the test last 40+ seconds to test the heartbeat, but to make this work it needs to be at least 1017 so that calculateSafeRequests return 2 allowing for the shard to send messages.
 */
const heartbeatInterval = 1050

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

async function createUws(options: CreateUwsOptions) {
  let port: number

  const { promise, resolve, reject } = promiseWithResolvers<{ port: number; uwsToken: uWS.us_listen_socket }>()

  const app = uWS.App()

  app.ws('/*', {
    open: async (ws) => {
      ws.send(
        JSON.stringify({
          op: GatewayOpcodes.Hello,
          d: {
            heartbeat_interval: heartbeatInterval,
          },
        }),
      )
      options.onOpen?.()
    },
    message: async (ws, message, _isBinary) => {
      const msg = JSON.parse(Buffer.from(message).toString())
      options.onMessage?.(msg)

      if (msg.op === GatewayOpcodes.Heartbeat) {
        ws.send(
          JSON.stringify({
            op: GatewayOpcodes.HeartbeatACK,
          }),
        )

        return
      }
      if (msg.op === GatewayOpcodes.Identify) {
        ws.send(
          JSON.stringify({
            t: 'READY',
            s: 1,
            op: GatewayOpcodes.Dispatch,
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
    },
  })

  app.listen(0, (token) => {
    if (!token) {
      reject('Unable to get the socket token')
    }

    port = uWS.us_socket_local_port(token)

    resolve({
      port,
      uwsToken: token,
    })
  })

  return promise
}

describe('gateway', () => {
  it('can connect to server', async function () {
    this.timeout(15000)

    const { promise: connected, resolve: resolveConnected } = promiseWithResolvers<void>()

    const uwsOptions: CreateUwsOptions = {
      onOpen: resolveConnected,
    }

    const { port, uwsToken } = await createUws(uwsOptions)

    const gateway = createGatewayManagerWithPort(port)
    await gateway.spawnShards()
    await connected

    // TODO: We should use ShardSocketCloseCodes.TestingFinished but there is an issue with sending 3xxx codes to uWS
    await gateway.shutdown(GatewayCloseEventCodes.InvalidShard, 'User requested bot stop', true)

    uWS.us_listen_socket_close(uwsToken)
  })

  it('will heartbeat', async function () {
    this.timeout(15000)

    const { promise: connected, resolve: resolveConnected } = promiseWithResolvers<void>()
    const { promise: heartbeated, resolve: resolveHeartbeat } = promiseWithResolvers<void>()

    const uwsOptions: CreateUwsOptions = {
      onOpen: resolveConnected,
      onMessage: (message) => {
        if (message.op !== 1) return

        resolveHeartbeat()
      },
    }

    const { port, uwsToken } = await createUws(uwsOptions)

    const gateway = createGatewayManagerWithPort(port)
    await gateway.spawnShards()
    await connected

    const timeout = setTimeout(() => {
      throw new Error('Not heartbeat in time')
    }, heartbeatInterval)

    await heartbeated

    clearTimeout(timeout)

    // TODO: We should use ShardSocketCloseCodes.TestingFinished but there is an issue with sending 3xxx codes to uWS
    await gateway.shutdown(GatewayCloseEventCodes.InvalidShard, 'User requested bot stop', true)

    uWS.us_listen_socket_close(uwsToken)
  })
})

// Polyfill for https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers
function promiseWithResolvers<T>() {
  let resolve!: (value: T | PromiseLike<T>) => void
  let reject!: (reason?: any) => void

  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  })

  return {
    promise,
    resolve,
    reject,
  }
}

interface CreateUwsOptions {
  onOpen?: () => any
  onMessage?: (message: DiscordGatewayPayload) => any
}
