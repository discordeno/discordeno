import { GatewayOpcodes, Intents } from '@discordeno/types'
import { createGatewayManager, type GatewayManager, ShardSocketCloseCodes } from '../../src/index.js'
import { creatWSServer, heartbeatInterval } from './websocket.js'

describe('Gateway Integration', () => {
  it('Can connect to server', async () => {
    const { promise: connected, resolve: resolveConnected } = promiseWithResolvers<void>()

    const { port, close } = creatWSServer({
      onOpen: resolveConnected,
    })

    const gateway = createGatewayManagerWithPort(port)
    await gateway.spawnShards()
    await connected

    await gateway.shutdown(ShardSocketCloseCodes.TestingFinished, 'Testing finished')

    // To avoid needing to wait 1m to get the bucket refil timer to fire we cancel it
    clearTimeout(gateway.shards.get(0)?.bucket.timeoutId)

    close()
  })

  it('Can heartbeat', async () => {
    const { promise: connected, resolve: resolveConnected } = promiseWithResolvers<void>()
    const { promise: heartbeated, resolve: resolveHeartbeat, reject: rejectHeartbeat } = promiseWithResolvers<void>()

    const { port, close } = creatWSServer({
      onOpen: resolveConnected,
      onMessage: (message) => {
        if (message.op === GatewayOpcodes.Heartbeat) {
          resolveHeartbeat()
        }
      },
    })

    const gateway = createGatewayManagerWithPort(port)
    await gateway.spawnShards()
    await connected

    const timeout = setTimeout(() => rejectHeartbeat(new Error('Not heartbeat in time')), heartbeatInterval)
    await heartbeated

    clearTimeout(timeout)

    await gateway.shutdown(ShardSocketCloseCodes.TestingFinished, 'Testing finished')

    // To avoid needing to wait 1m to get the bucket refil timer to fire we cancel it
    clearTimeout(gateway.shards.get(0)?.bucket.timeoutId)

    close()
  })
})

function createGatewayManagerWithPort(port: number): GatewayManager {
  return createGatewayManager({
    connection: {
      url: `ws://localhost:${port}`,
      shards: 1,
      sessionStartLimit: {
        total: 1000,
        remaining: 1000,
        resetAfter: 0,
        maxConcurrency: 1,
      },
    },
    token: '',
    url: `ws://localhost:${port}`,
    intents: Intents.Guilds,
    resharding: {
      enabled: false,
      checkInterval: 0,
      shardsFullPercentage: 0,
    },
  })
}

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
